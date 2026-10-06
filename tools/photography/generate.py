#!/usr/bin/env python3
"""Generate editable photo JSON with Python. Optionally create WebP previews; no build or PHP required."""

import argparse
from datetime import datetime
import json
import math
import os
from pathlib import Path
import re
import struct
import sys
import tempfile
import warnings

from PIL import Image, ImageOps


PROJECT = Path(__file__).resolve().parents[2]
PUBLIC = PROJECT / "public"
ROOT = PROJECT / "public/portfolio/photography"
CONFIG = PROJECT / "public/scripts/photography/config.json"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff", ".gif", ".bmp"}
CURATED = ("title", "description", "alt", "weighting")
METERING = {0: "Unknown", 1: "Average", 2: "Center-weighted", 3: "Spot",
            4: "Multi-spot", 5: "Pattern", 6: "Partial", 255: "Other"}


def number(value, *, positive=False):
    """EXIF rationals, zero denominators and malformed values share a null fallback."""
    try:
        if isinstance(value, (tuple, list)):
            value = value[0] if len(value) == 1 else value[0] / value[1]
        result = float(value)
        return result if math.isfinite(result) and (not positive or result > 0) else None
    except (TypeError, ValueError, ZeroDivisionError, OverflowError, IndexError):
        return None


def text(value):
    if isinstance(value, bytes):
        value = value.decode("utf-8", errors="replace")
    return value.strip(" \x00") if isinstance(value, str) else None


def camera(maker, model):
    maker, model = text(maker), text(model)
    # Makers sometimes repeat their name in Model (e.g. NIKON CORPORATION / NIKON D70s).
    short_maker = re.sub(r"\s+(corporation|corp\.?|inc\.?)$", "", maker or "", flags=re.I)
    display = model if model and model.lower().startswith(short_maker.lower()) else " ".join(
        part for part in (short_maker, model) if part
    )
    return display or None


def date_taken(value, offset):
    # Preserve the camera's local time; never invent a timezone or use filesystem dates.
    try:
        parsed = datetime.strptime(text(value) or "", "%Y:%m:%d %H:%M:%S").isoformat()
        zone = text(offset)
        if zone and re.fullmatch(r"[+-](?:0\d|1[0-4]):[0-5]\d", zone):
            parsed += zone
        return parsed
    except ValueError:
        return None


def flash_mode(value):
    flags = number(value)
    if flags is None or not 0 <= flags <= 127:
        return None
    flags = int(flags)
    label = "Flash fired" if flags & 1 else "No flash"
    return label + (" (Auto)" if (flags >> 3) & 3 == 3 else "")


def extract(path):
    """Read headers/EXIF without decoding full-resolution pixel data or retaining GPS."""
    metadata = {
        "file": {"type": None, "size_bytes": path.stat().st_size},
        "image": {"width": None, "height": None},
        "capture": {
            "date_taken": None, "camera": camera(None, None), "f_stop": None,
            "exposure_time_seconds": None, "iso_speed": None, "exposure_bias_ev": None,
            "focal_length_mm": None, "max_aperture_apex": None, "metering_mode": None,
            "flash_mode": None, "focal_length_35mm": None,
        },
    }
    try:
        with warnings.catch_warnings(record=True), Image.open(path) as image:
            metadata["file"]["type"] = image.format
            width, height = image.size
            metadata["image"].update(width=width, height=height)
            try:
                tags = image.getexif()
                # Some formats flatten EXIF. Prefer the dedicated capture IFD when present.
                capture = dict(tags)
                capture.update(tags.get_ifd(34665))
                if tags.get(274) in (5, 6, 7, 8):
                    metadata["image"].update(width=height, height=width)
                iso = number(capture.get(34855, capture.get(34867)), positive=True)
                metadata["capture"] = {
                    "date_taken": date_taken(capture.get(36867), capture.get(36881)),
                    "camera": camera(tags.get(271), tags.get(272)),
                    "f_stop": number(capture.get(33437), positive=True),
                    "exposure_time_seconds": number(capture.get(33434), positive=True),
                    "iso_speed": int(iso) if iso is not None else None,
                    "exposure_bias_ev": number(capture.get(37380)),
                    "focal_length_mm": number(capture.get(37386), positive=True),
                    # Keep the EXIF value; the runtime loader owns the display conversion.
                    "max_aperture_apex": number(capture.get(37381)),
                    "metering_mode": METERING.get(number(capture.get(37383))),
                    "flash_mode": flash_mode(capture.get(37385)),
                    "focal_length_35mm": number(capture.get(41989), positive=True),
                }
            except (OSError, ValueError, TypeError, OverflowError, SyntaxError, KeyError, IndexError, struct.error) as error:
                print(f"Warning: incomplete EXIF for {path.name}: {error}", file=sys.stderr)
    except (OSError, ValueError, TypeError, SyntaxError, struct.error, Image.DecompressionBombError) as error:
        print(f"Warning: image metadata unavailable for {path.name}: {error}", file=sys.stderr)
    return metadata


def display_title(path):
    # Camera counters provide no accessible description; leave a neutral title to curate later.
    if re.match(r"^(?:dsc[fn]?|img|pxl|dji)[_-]?\d", path.stem, flags=re.I):
        return "Untitled photograph"
    title = re.sub(r"[_-]+", " ", path.stem).strip().capitalize()
    return title or "Untitled photograph"


def original_path(path, categories):
    resolved = path.resolve(strict=True)
    if (path.is_symlink() or path.parent.is_symlink() or (resolved.parent != PUBLIC.resolve() and (resolved.parent.parent != ROOT.resolve()
            or resolved.parent.name not in categories)) or resolved.parent.is_symlink()
            or not resolved.is_file() or resolved.suffix.lower() not in EXTENSIONS
            or not re.fullmatch(r"[a-zA-Z0-9][a-zA-Z0-9_. ()-]*", resolved.name)
            or ".." in resolved.name):
        raise ValueError("Use an original in public/ or directly inside a configured photography category.")
    if any(other != resolved and other.suffix.lower() in EXTENSIONS and other.stem.lower() == resolved.stem.lower()
           for other in resolved.parent.iterdir() if other.is_file()):
        raise ValueError("Originals in one category must have unique basenames so their JSON and previews cannot collide.")
    return resolved


def originals(categories):
    """Validate configured directories before listing, so authoring also ignores escaping symlinks."""
    paths = []
    for category in categories:
        if not re.fullmatch(r"[a-z0-9][a-z0-9_-]*", category):
            raise ValueError("Invalid photography category configuration.")
        folder = ROOT / category
        if not folder.exists():
            continue
        if folder.is_symlink() or not folder.is_dir() or folder.resolve().parent != ROOT.resolve():
            raise ValueError("Photography category is outside its source root.")
        # No recursion: previews are derived assets, never independent photograph records.
        paths.extend(path for path in sorted(folder.iterdir()) if path.is_file() and path.suffix.lower() in EXTENSIONS)
    return paths


def atomic_json(path, data):
    encoded = json.dumps(data, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if path.exists() and path.read_text(encoding="utf-8") == encoded:
        return
    descriptor, temporary = tempfile.mkstemp(prefix=".photo-", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(encoded)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, 0o644)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def generate(path, *, overwrite_curated=False, preview_path=None, create_previews=False):
    sidecar = path.with_suffix(".json")
    if sidecar.is_symlink():
        raise ValueError("Photo JSON must not be a symbolic link.")
    existing = {}
    if sidecar.exists():
        try:
            existing = json.loads(sidecar.read_text(encoding="utf-8"))
            if not isinstance(existing, dict):
                raise ValueError("Expected a JSON object")
        except (ValueError, OSError) as error:
            # Never destroy an unreadable file that could contain manually curated copy.
            if not overwrite_curated:
                raise ValueError(f"Repair {sidecar.name} or explicitly use --overwrite-curated: {error}") from error
            existing = {}
    # Header extraction only runs during authoring. No source fingerprints or duplicate
    # raw fields need to live in the public JSON; identical output still avoids a write.
    metadata = extract(path)
    preview = preview_path
    if preview is None:
        # Retain authored preview choices; also recognize the standalone home preview.
        authored = existing.get("preview_filename")
        if isinstance(authored, str):
            preview = path.parent / authored
        else:
            standalone = path.parent / ("preview-" + path.stem + ".webp")
            preview = standalone if standalone.is_file() else path.parent / "previews" / ("preview-" + path.stem + ".webp")
    preview = preview.absolute()
    parent = path.parent.resolve()
    allowed = {parent / "previews" / ("preview-" + path.stem + ".webp"), parent / ("preview-" + path.stem + ".webp")}
    if preview not in allowed or preview.is_symlink() or preview.parent.is_symlink():
        raise ValueError("Use previews/preview-<original stem>.webp or preview-<original stem>.webp beside the original.")
    if create_previews and (not preview.is_file() or preview.stat().st_mtime_ns < path.stat().st_mtime_ns):
        preview.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(path) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")
            descriptor, temporary = tempfile.mkstemp(prefix=".preview-", suffix=".tmp", dir=preview.parent)
            os.close(descriptor)
            try:
                image.save(temporary, format="WEBP", quality=82, method=6)
                os.chmod(temporary, 0o644)
                os.replace(temporary, preview)
            finally:
                if os.path.exists(temporary):
                    os.unlink(temporary)
    has_preview = preview.is_file()
    data = {
        "filename": path.name,
        "preview_filename": preview.relative_to(parent).as_posix() if has_preview else None,
        "title": display_title(path), "description": "", "alt": "", "weighting": 0,
        "metadata": metadata,
    }
    if not overwrite_curated:
        for key in CURATED:
            if key in existing:
                data[key] = existing[key]
    atomic_json(sidecar, data)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("photos", nargs="*", type=Path, help="Original image path(s), relative to your working directory")
    parser.add_argument("--all", action="store_true", help="Process direct originals in configured categories only")
    parser.add_argument("--overwrite-curated", action="store_true", help="Explicitly reset title, description, alt and weighting")
    parser.add_argument("--preview", type=Path, help="Existing preview for a single photo")
    parser.add_argument("--previews", action="store_true", help="Create missing/stale WebP previews (originals are never changed)")
    args = parser.parse_args()
    if args.all and args.photos:
        parser.error("Supply image paths or --all, not both")
    if args.preview and (args.all or len(args.photos) != 1):
        parser.error("--preview requires exactly one original image")
    categories = json.loads(CONFIG.read_text(encoding="utf-8"))
    paths = args.photos
    if args.all or not paths:
        try:
            paths = originals(categories)
        except (OSError, ValueError) as error:
            parser.error(str(error))
    failed = False
    for path in paths:
        try:
            generate(original_path(path, categories), overwrite_curated=args.overwrite_curated,
                     preview_path=args.preview, create_previews=args.previews)
        except (OSError, ValueError) as error:
            failed = True
            print(f"Could not generate {path.name}: {error}", file=sys.stderr)
    print(f"Processed {len(paths)} photography original(s).")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
