"""Regression checks for missing EXIF, editorial preservation and confined file handling."""

import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from PIL import Image, TiffImagePlugin

import generate


class GeneratorTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="photography-test-")
        self.root = Path(self.temporary.name)
        self.category = self.root / "portraiture"
        self.category.mkdir()
        (self.category / "previews").mkdir()
        self.photo = self.category / "sample.jpg"
        Image.new("RGB", (640, 480)).save(self.photo)
        self.root_patch = patch.object(generate, "ROOT", self.root)
        self.root_patch.start()
        self.addCleanup(self.root_patch.stop)
        self.addCleanup(self.temporary.cleanup)

    def sidecar(self):
        return json.loads(self.photo.with_suffix(".json").read_text(encoding="utf-8"))

    def test_missing_exif_still_generates_complete_record(self):
        generate.generate(self.photo)
        data = self.sidecar()
        self.assertIsNone(data["preview_filename"])
        self.assertEqual(data["weighting"], 0)
        self.assertEqual(data["metadata"]["image"], {"width": 640, "height": 480})
        self.assertEqual(data["metadata"]["file"]["type"], "JPEG")
        self.assertTrue(all(value is None for value in data["metadata"]["capture"].values()))
        self.assertEqual(set(data), {"filename", "preview_filename", "title", "description", "alt", "weighting", "metadata"})

    def test_exif_capture_orientation_and_apex(self):
        exif = Image.Exif()
        exif[271], exif[272], exif[274] = "NIKON CORPORATION", "NIKON Z6", 6
        exif[34665] = {36867: "2025:04:03 12:30:00", 33437: TiffImagePlugin.IFDRational(28, 10),
                       33434: TiffImagePlugin.IFDRational(1, 250), 34855: 400, 37381: 3,
                       37383: 5, 37385: 24, 41989: 75}
        Image.new("RGB", (640, 480)).save(self.photo, exif=exif)
        generate.generate(self.photo)
        data = self.sidecar()["metadata"]
        self.assertEqual(data["image"], {"width": 480, "height": 640})
        self.assertEqual(data["capture"]["camera"], "NIKON Z6")
        self.assertEqual(data["capture"]["date_taken"], "2025-04-03T12:30:00")
        self.assertEqual(data["capture"]["f_stop"], 2.8)
        self.assertEqual(data["capture"]["exposure_time_seconds"], 0.004)
        self.assertEqual(data["capture"]["max_aperture_apex"], 3)
        self.assertNotIn("max_aperture_f_stop", data["capture"])
        self.assertEqual(data["capture"]["metering_mode"], "Pattern")
        self.assertEqual(data["capture"]["flash_mode"], "No flash (Auto)")

    def test_preview_updates_and_curated_values_survive(self):
        generate.generate(self.photo)
        sidecar = self.photo.with_suffix(".json")
        data = self.sidecar()
        data.update(title="Curated title", description="My description", alt="A useful description", weighting=9)
        # Regenerating an older sidecar removes unneeded fields without losing editorial work.
        data.update(source={"size_bytes": 123, "mtime_ns": 456}, schema_version=1)
        sidecar.write_text(json.dumps(data), encoding="utf-8")
        preview = self.category / "previews/preview-sample.webp"
        Image.new("RGB", (64, 48)).save(preview)
        generate.generate(self.photo)
        data = self.sidecar()
        self.assertEqual([data[key] for key in generate.CURATED], ["Curated title", "My description", "A useful description", 9])
        self.assertEqual(data["preview_filename"], "previews/preview-sample.webp")
        self.assertNotIn("source", data)
        self.assertNotIn("schema_version", data)
        preview.unlink()
        generate.generate(self.photo)
        self.assertIsNone(self.sidecar()["preview_filename"])

    def test_identical_generation_leaves_timestamp_unchanged(self):
        generate.generate(self.photo)
        timestamp = self.photo.with_suffix(".json").stat().st_mtime_ns
        generate.generate(self.photo)
        self.assertEqual(self.photo.with_suffix(".json").stat().st_mtime_ns, timestamp)

    def test_malformed_editorial_json_is_preserved_until_explicit_reset(self):
        sidecar = self.photo.with_suffix(".json")
        sidecar.write_text("unfinished editorial JSON", encoding="utf-8")
        with self.assertRaises(ValueError):
            generate.generate(self.photo)
        self.assertEqual(sidecar.read_text(encoding="utf-8"), "unfinished editorial JSON")
        generate.generate(self.photo, overwrite_curated=True)
        self.assertEqual(self.sidecar()["weighting"], 0)

    def test_malformed_image_does_not_break_metadata_generation(self):
        self.photo.write_bytes(b"invalid JPEG headers")
        generate.generate(self.photo)
        self.assertEqual(self.sidecar()["filename"], "sample.jpg")
        self.assertIsNone(self.sidecar()["metadata"]["image"]["width"])

    def test_previews_and_outside_paths_are_not_originals(self):
        preview = self.category / "previews/preview-sample.webp"
        Image.new("RGB", (64, 48)).save(preview)
        with self.assertRaises(ValueError):
            generate.original_path(preview, {"portraiture": {}})
        outside = self.root / "outside.jpg"
        Image.new("RGB", (64, 48)).save(outside)
        with self.assertRaises(ValueError):
            generate.original_path(outside, {"portraiture": {}})
        self.assertEqual(generate.original_path(self.photo, {"portraiture": {}}), self.photo.resolve())

    def test_invalid_numbers_and_dates_are_null(self):
        for value in (float("nan"), float("inf"), "broken", TiffImagePlugin.IFDRational(1, 0)):
            self.assertIsNone(generate.number(value))
        self.assertIsNone(generate.date_taken("not a capture date", None))
        self.assertEqual(generate.date_taken("2025:04:03 12:30:00", "+05:30"), "2025-04-03T12:30:00+05:30")

    def test_camera_filename_is_not_used_as_a_title(self):
        self.assertEqual(generate.display_title(Path('DSC01234.jpg')), 'Untitled photograph')

    def test_duplicate_basenames_are_rejected(self):
        Image.new('RGB', (64, 48)).save(self.category / 'sample.png')
        with self.assertRaises(ValueError):
            generate.original_path(self.photo, {'portraiture': {}})

    def test_batch_discovery_only_lists_direct_originals(self):
        Image.new('RGB', (64, 48)).save(self.category / 'previews/preview-sample.webp')
        self.assertEqual(generate.originals({'portraiture': {}}), [self.photo])

    def test_invalid_configured_category_is_rejected_before_listing(self):
        with self.assertRaises(ValueError):
            generate.originals({'../outside': {}})

    def test_preview_generation_preserves_original_and_is_idempotent(self):
        original = self.photo.read_bytes()
        generate.generate(self.photo, create_previews=True)
        preview = self.category / 'previews/preview-sample.webp'
        with Image.open(preview) as image:
            self.assertEqual(image.size, (640, 480))
        self.assertEqual(self.sidecar()['preview_filename'], 'previews/preview-sample.webp')
        timestamp = preview.stat().st_mtime_ns
        generate.generate(self.photo, create_previews=True)
        self.assertEqual(preview.stat().st_mtime_ns, timestamp)
        self.assertEqual(self.photo.read_bytes(), original)

    def test_preview_respects_orientation_and_maximum_size(self):
        exif = Image.Exif()
        exif[274] = 6
        Image.new('RGB', (2400, 1200)).save(self.photo, exif=exif)
        generate.generate(self.photo, create_previews=True)
        with Image.open(self.category / 'previews/preview-sample.webp') as image:
            self.assertEqual(image.size, (960, 1920))
            self.assertNotIn(274, image.getexif())

    def test_standalone_public_photo_and_existing_preview(self):
        photo = self.root / 'SD_NAS.JPG'
        preview = self.root / 'preview-SD_NAS.webp'
        Image.new('RGB', (64, 48)).save(photo)
        Image.new('RGB', (64, 48)).save(preview)
        with patch.object(generate, 'PUBLIC', self.root):
            self.assertEqual(generate.original_path(photo, {}), photo.resolve())
            generate.generate(photo, preview_path=preview)
        data = json.loads(photo.with_suffix('.json').read_text())
        self.assertEqual(data['preview_filename'], 'preview-SD_NAS.webp')

    def test_preview_path_cannot_escape_original_directory(self):
        with self.assertRaises(ValueError):
            generate.generate(self.photo, preview_path=self.root / 'outside.webp', create_previews=True)
        self.assertFalse((self.root / 'outside.webp').exists())


if __name__ == "__main__":
    unittest.main()
