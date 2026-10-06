# Editing Videography and Short Films

Source content:

- `public/portfolio/video/videography.json`
- `public/portfolio/short_film/short-films.json`

Assets belong in `public/portfolio/video/` or `public/portfolio/short_film/`. Every source image path is relative to its section's asset directory. **Do not use `/public/images/` or `/images/`.** Keep the actual originals; previews are derived from them, never substituted artwork.

## Edit and publish

Edit either JSON, upload it and any new assets to the matching deployed `portfolio/` directory, then refresh the page. PHP reads and validates the source at request time; React fetches it on each visit with HTTP revalidation. No generated TypeScript, cache-generation command or website rebuild is required for content edits. The two collections load independently; invalid JSON in one does not break the other. Failed requests show a retry control, and detailed validation errors go to the PHP error log.

Preview generation is an optional, standalone Python command:

```sh
python -m pip install -r tools/photography/requirements.txt
python tools/portfolio_media/previews.py
```

Non-WebP posters, stills and logos get a maximum 1600px WebP at quality 82 under `previews/`, retaining the full composition and EXIF orientation. Originals are untouched. Thumbnails always use their original files: preview generation and runtime detection skip thumbnails. Existing WebP artwork is used directly; missing previews fall back to originals. Unchanged previews are reused; add `--force` to regenerate them. Preview generation never rewrites source JSON or compiles website code.

Build/deploy once for website code changes with `npm run build`. Copy the complete `dist/`, including public PHP scripts, JSON and assets. Later content changes need only the edited JSON/assets; synchronize local source before future deployments. `npm run dev` serves live source content through PHP with no generation step. Production requires PHP 8. Source video/film JSON is tracked; artwork is backed up and deployed separately.

## Manual ordering and featured films

**Array order is the display order.** The runtime loader and React renderers never sort sections, groups, collections, videos, films, posters, or explicit screenshot lists. Reorder source arrays to change the page. A featured flag changes visual prominence, never position.

Short Films has a top-level `featuredFilm` **slug reference**, followed by ordered `collections`. Each collection owns its canonical `films` array. The featured presentation looks up that same film object without removing it from its collection. There is no duplicated featured metadata.

```json
{
  "featuredFilm": "k_town_noir",
  "collections": [
    {"slug": "street-drugs", "title": "STREET DRUGS", "films": []},
    {"slug": "filmography", "title": "The filmography", "films": []}
  ]
}
```

To feature an existing film, change `featuredFilm` to its canonical slug and refresh. Set it to `null` to omit the feature. Slugs must be unique across entries and structural groups within each source file; use lowercase letters/digits with `_` or `-`.

## Add a Videography item

1. Add its thumbnail to `public/portfolio/video/`.
2. Add an object to the desired `items` array in `videography.json`, at its intended position.
3. Upload the JSON and artwork, then refresh the page.

```json
{
  "slug": "new-video",
  "title": "A new video",
  "description": "A short description.",
  "date": "2026 Oct",
  "thumbnail": "new-video.webp",
  "video": {"type": "youtube", "url": "https://youtu.be/Qs6sIiztsIQ"}
}
```

`description`, `date`, `thumbnail`, and `video` are optional. Omit them or use `null`; use `[]` for empty collections. `presentation: "feature"` gives an item more prominence **in place**; its default is `standard`.

Videography's `sections` have four supported `kind` values:

| Kind | Content and presentation |
| --- | --- |
| `channel` | Ordered `items`; a prominent highlight and smaller follow-up; optional `logo` and channel `link`. |
| `series` | Ordered `items` presented together; optional `collectionTitle`, `logo`, description and playlist `link`. |
| `commissions` | Ordered `groups`, each with `slug`, `title`, description, optional `link`, and `items`. A group's single featured item gets a case-study layout. Optional nested `collections` with `slug`, `title`, `items` display compact additional projects after its lead work. |
| `experience` | Résumé entry with `organization`, `location`, `workMode`, `employment`, `start`, `end`, and description. No media card. |

Each section also has `slug`, `title`, and optional `label`. Links are `{ "url": "https://…", "label": "About the project" }`. Add sections/groups/collections using the same shapes; no new React markup is needed for these supported layouts.

## Add a Short Film

Add its artwork under `public/portfolio/short_film/`, then insert a film object in the intended collection's `films` array:

```json
{
  "slug": "new_film",
  "title": "A new film",
  "year": 2026,
  "type": "Short Film",
  "video": {"type": "hls", "url": "/media/new_film/master.m3u8"},
  "thumbnail": "new-film-still.png",
  "synopsis": "A brief synopsis.",
  "funFact": "An optional production note.",
  "posters": ["new-film-poster.png"],
  "screenshotsDirectory": "new_film"
}
```

Required fields: `slug`, `title`, `year` (a four-digit number or nonempty display text such as `"2027 (estimated)"` or `"TBD"`), and `type` (`Short Film` or `Documentary`). The page displays no availability/status labels; no planned flag is needed. Omit unavailable media: the presence of `video`, `trailer`, thumbnail and gallery fields determines which features appear. Synopsis and production notes remain visible for upcoming films. `trailer` uses the same `{ "type": "hls" | "youtube", "url": "..." }` format as `video`; `?trailer=FILM_SLUG` opens it directly. Watch Trailer, Watch Film and View Gallery share an action row directly under the player, wrapping on narrow screens. The main artwork opens the full film when available, otherwise its trailer, including in the featured presentation. With neither source, it remains a static image. Video, trailer, thumbnail, synopsis, production note and gallery fields are optional. Do not use strings such as `"None"` as media placeholders.

Collections have `slug`, `title`, optional `label` and external `link`, and an ordered `films` array. The current collection sequence is STREET DRUGS → filmography. The normal film sequence is K-Town Noir → Shelter → The Bachelorette Party.

Set a collection's `presentation` to `series` to keep related films together in one visually unified section, including upcoming entries. STREET DRUGS and STREET DRUGS 3 share this treatment. The default `filmography` presentation uses editorial rows. Collection titles are slightly larger and bold; dividers separate collections, sections and sibling films within a collection. Synopsis and Production Note headings share the same accent color, typography and spacing. This only changes presentation; the authored film order remains the same.

Film entries place the title above a player/actions and synopsis row. The synopsis has a readable line length; production notes sit directly beneath the synopsis in the same column, with artwork below the main row. Below 850px the main row stacks. This hierarchy draws on the separate viewing actions, synopsis, metadata and artwork sections in [A24?s Past Lives page](https://a24films.com/films/past-lives) and [Criterion?s Following page](https://www.criterion.com/films/28030-following).

## Posters and screenshots

`posters` is an ordered array of filenames. Use either:

- `screenshots`: an explicitly ordered filename/path array, **or**
- `screenshotsDirectory`: a relative directory such as `the_bachelorette_party`.

Directory discovery includes direct JPEG, PNG, WebP, AVIF, GIF and BMP files, retaining **filesystem enumeration order without sorting**. That order is filesystem-dependent; use the explicit `screenshots` array when an editorial sequence matters. Discovery never searches legacy images, unrelated directories, or Photography sidecars.

Shelter discovers `shelter`; The Bachelorette Party discovers `the_bachelorette_party`. Adding another supported image to either directory updates its gallery automatically.

Film image folders sit directly under `public/portfolio/short_film/`, without an intermediate screenshots folder. Preview paths mirror them: `shelter/image.png` uses `previews/shelter/preview-image.png.webp`, with `preview-image.webp` also supported for manually exported previews. Poster and still previews are detected automatically; their gallery viewers load the original images.

The gallery order is the thumbnail, then authored posters, then screenshots. Portrait posters retain their complete artwork. The gallery and Photography share `ViewerImage` for original loading/retry, cursor-centered wheel zoom, double-click zoom, keyboard zoom/reset and bounded panning; `useImageViewer` for dialog dismissal and keyboard navigation; and `ViewerNavigation` for accessible controls. At fit, horizontal swipes and left/right keys navigate; while zoomed, drags and arrow keys pan. Clicking outside the image, Close or Escape dismisses the viewer and restores focus and scroll. Photography retains its metadata sidecar; film galleries keep their header/footer without a sidecar. Each section retains its existing URL/history behavior.

## Viewer layout and keeping your place

The video viewer puts playback on the left and the canonical title, date/type, synopsis/description, production note and external links in an independently scrolling right sidebar. On portrait mobile screens the compact 16:9 viewer stacks above the information; constrained landscape screens retain two panes.

Video and artwork viewers use `?watch=SLUG` or `?gallery=SLUG&image=INDEX` (zero-based image index). Opening pushes one browser history entry; changing gallery images replaces it. Back/Escape/Close returns to the page. Refresh reopens a valid viewer URL, with its surrounding page position retained. The URL contains identifiers only; it resolves canonical entries without duplicating metadata. Unknown identifiers never become asset paths.

Shared `ScrollRestoration` stores positions per history entry and visited URL in tab-local session storage, so refreshing, Back/Forward, and returning through site navigation preserve your place throughout the website. It waits for lazy routes and API-backed Photography/Projects content to have enough height, and stops pending restoration when the visitor starts scrolling. New anchor links still go to their targets; refreshing a previously scrolled anchor URL restores the saved position. The shared dialog hook prevents focus changes from scrolling the page underneath. No cookies or account/server state are involved.

## Playback

- **YouTube:** provide `type: "youtube"` with an HTTPS `youtu.be`, watch, shorts or embed URL. The runtime loader validates the host and 11-character ID. A `youtube-nocookie.com` iframe mounts only when the visitor opens the video. The dialog includes a link to watch on YouTube.
- **HLS:** provide `type: "hls"` and an HTTPS or `/media/` URL ending in `.m3u8`. Same-site `https://sirdanieliii.ca/media/…` URLs normalize to `/media/…`. The dev server proxies `/media` to the existing production Apache setup. Native HLS is preferred when supported; other compatible browsers dynamically import `hls.js`. Only an opened video gets a player. Closing/unmounting destroys the HLS instance and releases the native media element. Failed streams offer a retry.

The frontend's data contains public stream URLs only; it has no Jellyfin IDs, tokens, credentials or client API. Server-generated playlists and segment URLs are browser-visible; any desired rewriting of those URLs belongs in Apache/Jellyfin's existing server setup. Remote HLS providers must supply appropriate CORS headers. Publishing a new film's public `/media/` route remains a server task; see [the streaming setup](jellyfin_portfolio_streaming_documentation.md).

No subtitle files were supplied. YouTube/native video controls support their available captions; add subtitles to the stream or extend the schema with WebVTT tracks for locally hosted caption files when available. The full `hls.js` build is loaded on demand to retain codec/audio/subtitle support. Vite may report its size above 500kB; it is not downloaded on page mount.

## Validation and regression checks

```sh
php tools/portfolio_media/test_catalog.php
python tools/portfolio_media/test_runtime.py
python tools/portfolio_media/test_previews.py
php tools/photography/test_catalog.php
python tools/photography/test_generate.py
npm run lint
npm run build
```

Media checks use isolated fixture assets, leaving portfolio originals untouched. They cover exact supplied order, reordering, canonical featured references, URL encoding, screenshot discovery, coming-soon/optional media, duplicate/missing slugs, invalid types/providers/URLs, malformed JSON, missing thumbnails/posters/directories, path traversal and legacy assets. Invalid content produces a retryable error in that collection; PHP logs identify the source/entry/field. Correct the JSON and refresh to recover.

Run the shared viewer browser regression checks against `npm run dev` with `node tools/portfolio/test_viewers.mjs /path/to/chrome-devtools.js [page-id]`. They cover both layouts at desktop and mobile widths, zoom, panning, navigation, swipe guards, retry, dismissal, focus and history.

Browser review should include desktop/tablet/mobile, both themes, reduced motion, galleries, keyboard/focus, native HLS and hls.js playback, and zero player/manifest requests before clicking. Stream availability is controlled by the existing server, not the runtime content validator.

## Implementation file map

| Files | Purpose |
| --- | --- |
| `public/portfolio/video/videography.json`, `public/portfolio/short_film/short-films.json`; `src/pages/portfolio/media.ts` | Authored public content and normalized TypeScript schema. |
| `public/scripts/portfolio_media/catalog.php`, `tools/portfolio_media/previews.py`, `test_catalog.php` | Live validation/normalization, optional Python artwork previews, isolated regression checks. |
| `src/pages/portfolio/VideographySection.tsx`, `ShortFilmsSection.tsx`, `VideoThumbnail.tsx`, `FilmGallery.tsx` | Editorial video collections, cinematic filmography, thumbnail actions and artwork. |
| `src/pages/portfolio/MediaViewer.tsx`, `PortfolioVideoPlayer.tsx`, `useMediaViewer.ts`, `ExternalLink.tsx` | Reusable galleries/players, selection state and consistent external links. |
| `src/shared/media/ViewerImage.tsx`, `useModalDialog.ts`; `src/pages/portfolio/PhotoViewer.tsx` | Shared original-image loading and accessible modal lifecycle, reused by Photography. |
| `src/shared/navigation/ScrollRestoration.tsx`, `src/App.tsx`; `src/pages/guides/GuideArticle.tsx` | Site-wide saved scroll positions and shared anchor restoration, replacing unconditional scroll-to-top. |
| `src/pages/home/PhotoItem.tsx` | Home preview uses the Photography viewer and its shared dialog lifecycle with generated SD_NAS JSON. |
| `src/css/portfolio/PortfolioMedia.styles.ts`, `MediaViewer.styles.ts`, `PortfolioPage.styles.ts` | New layouts and viewer styles; obsolete legacy video/film styles removed. |
| `src/pages/portfolio/PortfolioPage.tsx`, `portfolio.ts` | Existing routes wired to the new sections; legacy hard-coded video/film data removed. |
| `package.json`, `package-lock.json`, `vite.config.ts`, `.gitignore` | Build/dev commands, `hls.js`, and local PHP/media proxies. |
| `docs/portfolio-media.md`, `docs/portfolio.md`, `README.md` | Editing and build documentation. |

Current implementation retains the supplied copy, including the Lost Tribe heading and its `2021 Dec` S3 date. The screenshot directory in the brief is interpreted relative to `public/portfolio/short_film/`. Existing collection routes and in-page film anchors are retained instead of adding detail routes.

The existing dependency audit reports a `brace-expansion` advisory in the development toolchain. Adding `hls.js` does not change that package; resolving the unrelated tooling advisory is outside this redesign.
