# Editing the visual portfolio

The portfolio starts at `/portfolio/`. All collections load editable public JSON at runtime; see [Editing Videography and Short Films](portfolio-media.md).

## Overview image choices

Choose the three collection thumbnails in `collections` and the two pictures beside “A little life. A different lens.” in `portfolioSpotlight`, both in **`public/portfolio/portfolio.json`**. Each image is independent of the photography gallery and video/film project images. The overview loads these chosen files directly and does not request gallery data.

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

The browser validates the overview JSON before rendering. Keep `portfolio.name`, `about`, and `email` as strings; each image needs a nonempty `image` URL and `position`, plus positive integer `width` and `height`. Both spotlight images require string `alt` text. Collections need string `title`, `label`, and `description`, and a unique supported `id` (`photography`, `videography`, or `short-films`). Their authored order is retained. Invalid JSON or an invalid shape shows the existing retry message; correct the public file and choose **Try again**, or refresh. This validation checks data structure, not whether an image URL exists.

## Photography workflow

The authoritative photography source is `public/portfolio/photography/`. Each configured category has direct originals and matching JSON sidecars; optional derived WebP files go in its `previews/` folder:

```text
portraiture/
  DSC01234.jpg
  DSC01234.json
  previews/
    DSC01234.webp
```

1. Add an original directly inside its category, using a unique basename.
2. Generate its JSON with Python. Add `--previews` to also create a missing or stale WebP preview (maximum 1920px, EXIF orientation applied, original unchanged):

   ```sh
   python -m pip install -r tools/photography/requirements.txt
   python tools/photography/generate.py public/portfolio/photography/portraiture/DSC01234.jpg --previews
   ```

3. Edit `title`, `description`, `alt`, and `weighting` in the adjacent JSON. Higher weighting appears first; ties use natural title order, then stable ID.
4. Upload the JSON, original and optional preview to the same relative paths on the server. Refresh the page. No npm command, content cache generation or website rebuild is needed.

Run `python tools/photography/generate.py --all --previews` to process all configured originals. Running the file without arguments also processes all originals, generating JSON only. Batch generation recreates missing JSON, including deliberately unpublished photos; use explicit image paths when adding individual photos. It never scans inside `previews/`.

Regeneration preserves editorial fields and existing preview choices. `--overwrite-curated` explicitly resets editorial fields. Malformed existing JSON is reported and preserved unless that flag is supplied. Identical JSON and current previews are not rewritten. Production only requires PHP 8; Python/Pillow is an authoring dependency.

To remove a photo from the page, delete its JSON; the original may remain for safekeeping. Restore the JSON to publish it again. Editing categories in `public/scripts/photography/config.json` also takes effect on refresh. Images without JSON are not published.

The home page uses the same viewer with `public/SD_NAS.JPG`, `public/preview-SD_NAS.webp` and `public/SD_NAS.json`. Regenerate its metadata directly:

```sh
python tools/photography/generate.py public/SD_NAS.JPG --preview public/preview-SD_NAS.webp
```

The preview loads on the page; the original loads only when opening the dialog. The four editorial fields in `SD_NAS.json` remain editable and survive regeneration.

### Photo JSON

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

Unavailable metadata is `null`; the viewer consistently displays `—`. File size is shown in MiB (1 MiB = 1,048,576 bytes), alongside the precise stored byte count. Missing previews use **`"preview_filename": null`**. That explicitly selects the original for the grid; the runtime loader never guesses a preview. Capture date comes from EXIF DateTimeOriginal, never filesystem modification time. Camera timezone offsets are retained when present; otherwise the local capture time remains unconverted. Dimensions account for EXIF orientation.

`max_aperture_apex` stores the camera's EXIF MaxApertureValue. PHP converts it with `2 ** (value / 2)` in `public/scripts/photography/catalog.php` when loading the gallery; the viewer formats the resulting `max_aperture_f_stop` as, for example, `f/2.8`. Zero means `f/1`; missing or invalid input remains null. Neither the generator nor hand-edited photo JSON needs to calculate an f-number. The response includes only the converted value. This is separate from `f_stop`, which is the aperture actually used for the photograph.

Sidecars contain the fields needed to display and organize photographs: no source fingerprints, duplicate maker/model fields, GPS, serial numbers, maker notes or unrelated EXIF. Regenerating also removes obsolete fields while preserving curated title, description, alt text and weighting.

Browsers cannot display every original format (notably TIFF) natively. JPEG, PNG, WebP and other browser-supported formats are recommended for web originals. Unsupported or failed images receive an accessible retry/error state; they still keep their JSON record.

## Categories and URLs

Edit `public/scripts/photography/config.json` to change labels, order or publication status, then refresh the page. Japan Trip is `coming-soon`: its category is selectable and displays Coming Soon, while its photographs are excluded from All work and the public gallery. Change it to `published` when it is ready.

Category links use `/portfolio/photography/?category=portraiture`. Reload, direct links, browser back and forward restore the selected category. Removing the query parameter selects All work. Unknown categories show an explanation and All work.

Opening a photograph adds `&photo=<stable-photo-id>` (or `?photo=<stable-photo-id>` in All work). Reloading or sharing that URL restores the viewer and original image. IDs come from the runtime gallery, never from filesystem paths. Next/Previous replaces the current viewer history entry; Back closes a viewer opened from a gallery and Forward reopens it. Close on a direct link removes the photo parameter without navigating away from Photography. A valid photo link without a matching category filter navigates through All work; a missing photo gets a clear return-to-gallery message.

## Runtime loading and deployment

The PHP endpoint `/scripts/list_photography.php` reads the category configuration and direct JSON sidecars on each request. It reads file stats, never EXIF or full image pixels. Missing/malformed sidecars and missing originals are skipped and logged; valid photos remain available. Invalid/missing referenced previews fall back to originals. Preview folders are never scanned for independent entries.

There is no generated gallery manifest, disk cache, lock file or publishing command. Responses use content-based ETags with revalidation (`304` when unchanged). File modification time/size versions on asset URLs update when images change. Endpoints accept GET/HEAD without parameters and return generic errors without leaking server paths.

Photography still benefits from browser caching: `Cache-Control: public, no-cache` allows storing the JSON but requires revalidation before reuse. PHP reads the current sidecars on each request, including conditional requests that return `304`. React shares only in-flight requests and keeps loaded data while the page is mounted; revisiting or refreshing requests it again. Previews and originals use versioned URLs and the web server's normal image-cache policy. Content edits are picked up on the next request, rather than being pushed into an already-open gallery.

Photography assets and sidecars remain Git-ignored; back them up and include them when deploying a fresh checkout. Build/deploy the website once for code changes, including the PHP endpoints and all public assets. Later content edits can be uploaded straight to the deployed `portfolio/` paths (there is no `public/` prefix in browser URLs). Removing a local JSON also requires deleting its deployed copy. Keep local and deployed source JSON in sync before future deployments. Production must run PHP and retain its existing SPA fallback.

## Styling and viewer

Change Photography, Videography and Short Film colours in **`src/css/theme.ts`**, in each mode's `portfolio` palettes. Photography uses green, Videography blue, and Short Films violet. All three collection pages select their palette through `$medium`, while the overview retains the shared site treatment. Shared semantic values include `accent`, `accentHover`, `accentSubtle`, `onAccent`, `border`, `controlBorder`, `focus`, `surface`, and `muted`. `Page` in `src/css/portfolio/PortfolioPage.styles.ts` maps these to the existing portfolio CSS custom properties. Keep text/control contrast against both page backgrounds and subtle surfaces when adjusting colours.

The same theme file's **`portfolioViewer`** values control `surface`, `sidebarSurface`, `backdrop` and `shadow`. The viewer and metadata sidebar use solid surfaces that follow light/dark mode, with the original dark backdrop and no blur. The native backdrop reads its mode tokens directly; viewer text and controls use the existing section variables.

`src/css/portfolio/variables.css` declares the runtime custom-property names for WebStorm's CSS resolver. Its `initial` values preserve the existing theme fallbacks; actual section colours still come from `Page` and the theme. A few selectors have local `CssUnusedSymbol` inspection comments because WebStorm cannot trace their descendants across React components. The adjacent comments identify their JSX owners; check those references before removing a selector.

The current masonry presentation and name/category captions are retained, without circular arrow decorations on thumbnails. Photography grids use the explicit preview, falling back to the original when null; overview covers use the independently chosen images described above. Offscreen images are lazy loaded, with reserved aspect ratios and static decorative gallery skeletons. `PhotographyGallery.tsx` handles gallery/error states; `PhotographySection.tsx` owns URL selection.

`PhotoViewer.tsx` loads only the original image, with a static skeleton until it arrives and a retry control if it fails. Its image pane uses the full available height. The right sidebar contains the photo name/category, counter, navigation, Close, description and all metadata, visible by default. The sidebar scrolls independently and stacks below the image on narrow screens/zoom. The native dialog provides inert background, focus containment and Escape; focus returns to the opening card (or the matching card/category link after opening a shared URL). Previous/next buttons and arrow keys work by keyboard. The sidebar's definition list associates each label with its value; focus the sidebar to scroll it with the keyboard.

Previous/next controls use `src/assets/icons/arrow-left-square.svg` and `arrow-right-square.svg` as CSS masks, coloured by the section accent. Their artwork fills the 44px controls, and their compact fixed grid columns keep arrow positions stable as counter digits change. Close is a wider rounded rectangle with a subtle red tint on hover and keyboard focus, matching the category filters' restrained fill. Adjust that tint in `portfolioViewer.closeHoverSurface` in each mode's theme; its border uses the site's red `colors.highlight1` and its label uses the normal viewer text colour. It retains a native accessible name, visible focus indicator and 44px minimum height.

## Checks

The overview validation test uses Node.js 24's built-in TypeScript support and test runner.

```sh
node --test tools/portfolio/test_overview.mjs
python tools/photography/test_generate.py
php tools/photography/test_catalog.php
npm run lint
npm run build
```

The generator checks use isolated images and never modify portfolio originals. Catalog checks cover aperture conversion, sorting, previews, live edits/removals, malformed JSON and path confinement. Also review light/dark mode, narrow screens, keyboard navigation, direct photo URLs, back/forward and dialog focus after changing viewer styles.

## Other portfolio content

Overview copy and collection artwork remain in `public/portfolio/portfolio.json`. Video/film entries live beside their assets in `public/portfolio/video/videography.json` and `public/portfolio/short_film/short-films.json`; see [the media editing guide](portfolio-media.md) for the schema, ordering, featured references, artwork, playback and saved scroll positions. Portfolio routes remain in `PortfolioPage.tsx`. Shared styles and viewers retain the Photography design language. Video players load only after a visitor opens one.
