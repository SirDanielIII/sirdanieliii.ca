# sirdanieliii.ca

> 🍓 My personal website & resource hub— featuring a dynamic projects page, guides, portfolio, and merch. 😏

---

## 🛠️ Tech Stack

| Layer    | Tech                                                    |
|----------|---------------------------------------------------------|
| Frontend | React + Typescript + Vite                               |
| Styling  | styled‑components 6, vanilla CSS                        |
| Backend  | PHP 8 (CLI for dev, Apache2 + PHP module in production) |

---

## 🚀 Getting Started

### 1. Clone & install packages

```bash
git clone https://github.com/SirDanielIII/sirdanieliii.ca.git
cd sirdanieliii.ca
npm install
```

### 2. Commands to run during development

| Script              | What it does                                                                                                                  |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `npm run serve:php` | Starts PHP built‑in server on **http://localhost:8000** serving `public/`                                                     |
| `npm run dev`       | Runs **both** `serve:php` and Vite dev‑server (via `concurrently`) on **http://localhost:5173** & proxies `/scripts/*` to PHP |
| `npm run build`     | Type‑checks (`tsc -b`) then builds optimized production bundle into `dist/`                                                   |

### 3. How to Deploy (Apache2)

1. Run `npm run build`.
2. Copy everything in `dist/` into DocumentRoot, including the portfolio JSON, assets and PHP endpoints.

Portfolio content is editable public JSON loaded at runtime. Update the JSON/assets on the server and refresh; no website rebuild or content cache generation is needed. Overview copy/artwork lives in `public/portfolio/portfolio.json`; video and film entries live beside their assets in `public/portfolio/video/videography.json` and `public/portfolio/short_film/short-films.json`. Photography uses one JSON sidecar per original; deleting that JSON unpublishes the photo.

Generate photo metadata directly with `python tools/photography/generate.py PATH_TO_PHOTO`; add `--previews` to create WebP previews, or use `--all` for every configured original. Optional video/film artwork previews use `python tools/portfolio_media/previews.py`. Install Pillow once with `python -m pip install -r tools/photography/requirements.txt`. Builds do not run these tools. The home page uses `public/SD_NAS.JPG`, its preview and generated `SD_NAS.json` with the shared photography viewer. See [Editing the portfolio](docs/portfolio.md) and [Editing Videography and Short Films](docs/portfolio-media.md) for schemas and deployment details.

---

## Project structure

Guides are written as MDX files in `src/pages/guides/content/`. See [Writing guides](docs/guides.md) to add recipes, tutorials, posts, or resources.

- `src/pages/<category>/`: each page's components, editable data, and helpers. Home card configuration is in `home/homeSections.ts`; merch configuration is in `merch/merch.ts`.
- `src/css/`: all styled-components definitions (`*.styles.ts`), global styles, fonts, and theme settings. Category folders mirror the page folders; shared styles live in `layout/` and `feedback/`.
- `src/shared/`: shared layout, feedback, and navigation components.
- `src/utils/`: utilities used across categories.
- `src/assets/`: bundled images and icons; `public/`: public files and PHP endpoints.
- `public/portfolio/`: photography originals, previews, and editable photo metadata, included in the build.
- `tools/portfolio/`: overview JSON validation checks. `tools/photography/`: Python authoring generator and regression checks. `tools/portfolio_media/`: video/film preview generation and regression checks. `docs/`: editing guides.

Keep category-specific code with its page and styling in the matching CSS folder. Use lowercase folder names and direct imports. Larger category pages load on demand. No new styling library is required; configurable colours and image positions remain data-driven.
