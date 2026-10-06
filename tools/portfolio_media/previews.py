"""Cached display previews of referenced video/film artwork; originals stay untouched."""
import json
from pathlib import Path
import sys

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".bmp"}


def references(value, asset_root):
    if isinstance(value, dict):
        for key, child in value.items():
            if key == "logo" and isinstance(child, str):
                yield child
            elif key in {"posters", "screenshots"} and isinstance(child, list):
                yield from (item for item in child if isinstance(item, str))
            elif key == "screenshotsDirectory" and isinstance(child, str):
                directory = asset_root / child
                if directory.is_dir() and directory.resolve().is_relative_to(asset_root):
                    # Filesystem discovery order is deliberately retained, without sorting.
                    yield from (
                        str(item.relative_to(asset_root)).replace("\\", "/")
                        for item in directory.iterdir()
                        if item.is_file() and item.suffix.lower() in SUPPORTED
                    )
            else:
                yield from references(child, asset_root)
    elif isinstance(value, list):
        for child in value:
            yield from references(child, asset_root)


def main():
    count = 0
    for name, folder in (("videography", "video"), ("short-films", "short_film")):
        asset_root = (ROOT / "public" / "portfolio" / folder).resolve()
        source = json.loads((asset_root / f"{name}.json").read_text(encoding="utf-8"))
        for relative in dict.fromkeys(references(source, asset_root)):
            image_path = asset_root / relative
            # PHP provides contextual errors for missing/invalid source assets. Never substitute.
            if ("\\" in relative or relative.startswith("/") or ".." in Path(relative).parts
                    or not image_path.is_file() or image_path.is_symlink()
                    or not image_path.resolve().is_relative_to(asset_root)
                    or image_path.suffix.lower() not in SUPPORTED
                    or image_path.suffix.lower() == ".webp"):
                continue
            relative_path = Path(relative)
            output = asset_root / "previews" / relative_path.parent / f"preview-{relative_path.name}.webp"
            if output.is_file() and output.stat().st_mtime_ns >= image_path.stat().st_mtime_ns and "--force" not in sys.argv:
                continue
            if output.parent.exists() and not output.parent.resolve().is_relative_to(asset_root):
                raise ValueError(f"Preview directory escapes asset root: {output}")
            output.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(image_path) as original:
                image = ImageOps.exif_transpose(original)
                image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                if image.mode not in ("RGB", "RGBA"):
                    image = image.convert("RGB")
                temporary = output.with_suffix(".tmp")
                image.save(temporary, format="WEBP", quality=82, method=6)
                temporary.replace(output)
                count += 1
    print(f"Portfolio media: generated {count} display previews (unchanged previews reused).")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError) as error:
        print(f"Portfolio preview generation failed: {error}", file=sys.stderr)
        sys.exit(1)
