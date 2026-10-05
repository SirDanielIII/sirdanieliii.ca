# Editing the visual portfolio

The portfolio starts at `/portfolio/`. Photography is served from generated JSON. Videography and Short Films use validated source JSON and compiled React data; see [Editing Videography and Short Films](portfolio-media.md).

## Overview image choices

Choose the three collection thumbnails in `collections` and the two pictures beside “A little life. A different lens.” in `portfolioSpotlight`, both in **`src/pages/portfolio/portfolio.ts`**. Each image is independent of the photography gallery and video/film project images. The overview loads these chosen files directly and does not request gallery data.

The current AI-generated placeholders are saved directly under `public/portfolio/`:

| Use | File | Configuration |
| --- | --- | --- |
| Photography thumbnail | `collection-photography.webp` | `collections`: photography |
| Videography thumbnail | `collection-videography.webp` | `collections`: videography |
| Short Films thumbnail | `collection-short-films.webp` | `collections`: short-films |
| Main spotlight | `spotlight-street.webp` | `portfolioSpotlight.primary` |
| Overlapping spotlight | `spotlight-portrait.webp` | `portfolioSpotlight.secondary` |

To use your own pictures, add web-sized images under `public/portfolio/` and update the relevant `image` URL (for example `/portfolio/my-cover.webp`), original pixel `width`/`height`, and `position` crop setting. Update each spotlight image's `alt` to describe your chosen picture. Collection thumbnails have empty alt text because the surrounding link already names the collection. Their fixed layout reserves space; spotlight dimensions and placement preserve the existing overlapping presentation.

These overview assets are outside the photography category folders, so they do not need photo JSON or metadata generation and never become gallery records. Back them up/deploy them with the other public portfolio assets.

## Photography workflow

The authoritative photography source is `public/portfolio/photography/`. Each configured category has direct originals and matching JSON sidecars; optional derived WebP files go in its `previews/` folder:

```text
portraiture/
  DSC01234.jpg
  DSC01234.json
  previews/
    DSC01234.webp
```

1. Add an original directly inside its category. Use a unique basename within that category.
2. Optionally add a WebP preview with the same basename under `previews/`. Generate previews separately, with a maximum dimension of about 1920 pixels. No visitor request resizes or reprocesses images.
3. Generate its metadata and refresh the gallery:

   ```sh
   npm run photography:generate -- public/portfolio/photography/portraiture/DSC01234.jpg
   ```

4. Edit `title`, `description`, `alt`, and `weighting` in its JSON. Then publish those changes to the cached gallery:

   ```sh
   npm run photography:compile
   ```

For all originals, use `npm run photography:generate -- --all`. This never descends into previews. Multiple original paths are accepted in one command. Install the authoring dependency if needed with `python -m pip install -r tools/photography/requirements.txt`; this environment already has Pillow. Production only needs PHP 8, not Python or an EXIF extension.

Regeneration preserves all four editorial fields and refreshes the image headers/EXIF each time, without decoding full image pixels. Identical JSON is not rewritten. `--overwrite-curated` explicitly resets editorial fields; use it only when intended. `--no-compile` defers publishing until a later compilation command. An unreadable existing JSON is preserved and reported so it can be repaired without losing copy.

Higher `weighting` sorts first. The default is `0`; ties sort naturally by title, then stable photo ID. Initial titles and alt text were written after inspecting these category previews. Continue supplying useful descriptions of the actual scene, without camera settings or filenames in alt text.

## Sidecar schema

Each original uses its basename plus `.json`, including originals with uppercase image extensions. Example:

```json
{
  "filename": "DSC01234.jpg",
  "preview_filename": "previews/DSC01234.webp",
  "title": "A moment together",
  "description": "",
  "alt": "A couple share a kiss in a warmly lit room.",
  "weighting": 0,
  "metadata": {
    "file": {"type": "JPEG", "size_bytes": 4200000},
    "image": {"width": 6240, "height": 4160},
    "capture": {
      "date_taken": "2025-04-03T12:30:00",
      "camera": "Canon EOS R5",
      "f_stop": 2.8,
      "exposure_time_seconds": 0.004,
      "iso_speed": 400,
      "exposure_bias_ev": 0.7,
      "focal_length_mm": 50,
      "max_aperture_apex": 3,
      "metering_mode": "Pattern",
      "flash_mode": "No flash",
      "focal_length_35mm": 50
    }
  }
}
```

Unavailable metadata is `null`; the viewer consistently displays `—`. File size is shown in decimal MB (1 MB = 1,000,000 bytes), alongside the precise stored byte count. Missing previews use **`"preview_filename": null`**. That explicitly selects the original for the grid; the compiler never guesses a preview. Capture date comes from EXIF DateTimeOriginal, never filesystem modification time. Camera timezone offsets are retained when present; otherwise the local capture time remains unconverted. Dimensions account for EXIF orientation.

`max_aperture_apex` stores the camera's EXIF MaxApertureValue. PHP converts it with `2 ** (value / 2)` in `public/scripts/photography/catalog.php` when compiling the gallery; the viewer formats the resulting `max_aperture_f_stop` as, for example, `f/2.8`. Zero means `f/1`; missing or invalid input remains null. Neither the generator nor hand-edited photo JSON needs to calculate an f-number. The compiled response includes only the converted value. This is separate from `f_stop`, which is the aperture actually used for the photograph.

Sidecars contain the fields needed to display and organize photographs: no source fingerprints, duplicate maker/model fields, GPS, serial numbers, maker notes or unrelated EXIF. Regenerating also removes obsolete fields while preserving curated title, description, alt text and weighting.

Browsers cannot display every original format (notably TIFF) natively. JPEG, PNG, WebP and other browser-supported formats are recommended for web originals. Unsupported or failed images receive an accessible retry/error state; they still keep their JSON record.

## Categories and URLs

Edit `public/scripts/photography/config.json` to change labels, order or publication status, then compile. Japan Trip is `coming-soon`: its category is selectable and displays Coming Soon, while its photographs are excluded from All work and the public gallery manifest. Change it to `published` and regenerate when it is ready.

Category links use `/portfolio/photography/?category=portraiture`. Reload, direct links, browser back and forward restore the selected category. Removing the query parameter selects All work. Unknown categories show an explanation and All work.

Opening a photograph adds `&photo=<stable-photo-id>` (or `?photo=<stable-photo-id>` in All work). Reloading or sharing that URL restores the viewer and original image. IDs come from the manifest, never from filesystem paths. Next/Previous replaces the current viewer history entry; Back closes a viewer opened from a gallery and Forward reopens it. Close on a direct link removes the photo parameter without navigating away from Photography. A valid photo link without a matching category filter navigates through All work; a missing photo gets a clear return-to-gallery message.

## Manifest, cache and deployment

`tools/photography/compile.php` compiles direct originals and their JSON into `public/portfolio/photography/gallery-manifest.json`. It never enters `previews/` to discover originals. Missing or malformed JSON degrades to a photo record with unknown metadata, with an authoring warning; regenerate before publishing. Invalid paths, escaping symlinks and client-supplied file paths are not accepted. Deleted originals are dropped. Deleted or invalid referenced previews become null.

The cache is an explicit authoring/build snapshot. Regeneration automatically compiles it. Run `npm run photography:compile` after manual JSON/category edits, removal of originals, or replacement/removal of previews. Adding a preview requires regeneration so its JSON changes from null to the explicit path. `npm run build` also compiles before bundling. This explicit publishing step avoids directory scans, JSON parsing and EXIF processing under visitor traffic. Files copied directly to a live server are visible only after compiling there or deploying an updated manifest.

Writers serialize with a file lock and atomically rename a complete temporary file in the same directory. Identical compilation leaves the manifest unchanged. Image URLs include file modification/size versions, refreshed at compilation. The PHP endpoint `/scripts/list_photography.php` reads this one snapshot, returns only allowlisted data, and uses a content-based ETag with revalidation (`304` for unchanged content). It accepts GET/HEAD and no query parameters. It reports a generic error when the manifest is missing, without exposing server paths.

Photography files, JSON and the manifest live under the existing Git-ignored `public/portfolio/` directory. Back them up and include them when deploying from a fresh checkout. The Vite build copies public assets; production must execute PHP and use the site's existing SPA fallback for nested routes. Deploy a complete asset/manifest snapshot together. The lock file is an empty authoring artifact and does not need to be deployed.

## Styling and viewer

Change Photography, Videography and Short Film colours in **`src/css/theme.ts`**, in each mode's `portfolio` palettes. Photography uses green, Videography blue, and Short Films violet. All three collection pages select their palette through `$medium`, while the overview retains the shared site treatment. Shared semantic values include `accent`, `accentHover`, `accentSubtle`, `onAccent`, `border`, `controlBorder`, `focus`, `surface`, and `muted`. `Page` in `src/css/portfolio/PortfolioPage.styles.ts` maps these to the existing portfolio CSS custom properties. Keep text/control contrast against both page backgrounds and subtle surfaces when adjusting colours.

The same theme file's **`portfolioViewer`** values control `surface`, `sidebarSurface`, `backdrop` and `shadow`. The viewer and metadata sidebar use solid surfaces that follow light/dark mode, with the original dark backdrop and no blur. The native backdrop reads its mode tokens directly; viewer text and controls use the existing section variables.

The current masonry presentation and name/category captions are retained, without circular arrow decorations on thumbnails. Photography grids use the explicit preview, falling back to the original when null; overview covers use the independently chosen images described above. Offscreen images are lazy loaded, with reserved aspect ratios and static decorative gallery skeletons. `PhotographyGallery.tsx` handles gallery/error states; `PhotographySection.tsx` owns URL selection.

`PhotoViewer.tsx` loads only the original image, with a static skeleton until it arrives and a retry control if it fails. Its image pane uses the full available height. The right sidebar contains the photo name/category, counter, navigation, Close, description and all metadata, visible by default. The sidebar scrolls independently and stacks below the image on narrow screens/zoom. The native dialog provides inert background, focus containment and Escape; focus returns to the opening card (or the matching card/category link after opening a shared URL). Previous/next buttons and arrow keys work by keyboard. The sidebar's definition list associates each label with its value; focus the sidebar to scroll it with the keyboard.

Previous/next controls use `src/assets/icons/arrow-left-square.svg` and `arrow-right-square.svg` as CSS masks, coloured by the section accent. Their artwork fills the 44px controls, and their compact fixed grid columns keep arrow positions stable as counter digits change. Close is a wider rounded rectangle with a subtle red tint on hover and keyboard focus, matching the category filters' restrained fill. Adjust that tint in `portfolioViewer.closeHoverSurface` in each mode's theme; its border uses the site's red `colors.highlight1` and its label uses the normal viewer text colour. It retains a native accessible name, visible focus indicator and 44px minimum height.

## Checks

```sh
python tools/photography/test_generate.py
php tools/photography/test_catalog.php
npm run lint
npm run build
```

The generator checks use isolated images and never modify portfolio originals. Catalog checks cover PHP aperture conversion, sorting, null previews, changes/removals, idempotent compilation, invalid JSON and traversal prevention. Also review light/dark mode, narrow screens, keyboard navigation, direct photo URLs, back/forward and dialog focus after changing viewer styles.

## Other portfolio content

Overview copy and collection artwork remain in `src/pages/portfolio/portfolio.ts`. Video/film entries live beside their assets in `public/portfolio/video/videography.json` and `public/portfolio/short_film/short-films.json`; see [the media editing guide](portfolio-media.md) for the schema, ordering, featured references, artwork, playback and saved scroll positions. Portfolio routes remain in `PortfolioPage.tsx`. Shared styles and viewers retain the Photography design language. Video players load only after a visitor opens one.
