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
2. Copy everything in `dist/` into DocumentRoot, including the photography assets and compiled gallery manifest.

The public portfolio has an about page and dedicated photography, videography, and short film collections. Photography originals and generated JSON live in `public/portfolio/photography/`, with optional WebP previews in each category's `previews/` folder. Run `npm run photography:generate -- --all` when adding photos, and `npm run photography:compile` after editing their JSON. Production serves the compiled gallery through PHP. Editable video and film JSON lives in `public/portfolio/video/videography.json` and `public/portfolio/short_film/short-films.json`; `npm run portfolio:compile` validates assets, generates WebP display previews, and compiles ordered React data. Development and production builds run media compilation automatically. Preview generation uses the existing Python/Pillow authoring dependency. Public source JSON is tracked; portfolio assets/previews are excluded from Git and must be backed up/deployed separately. Site-wide scroll restoration retains positions on refresh and return visits within a browser tab. See [Editing the portfolio](docs/portfolio.md) and [Editing Videography and Short Films](docs/portfolio-media.md).

---

## Project structure

Guides are written as MDX files in `src/pages/guides/content/`. See [Writing guides](docs/guides.md) to add recipes, tutorials, posts, or resources.

- `src/pages/<category>/`: each page's components, editable data, and helpers. Home card configuration is in `home/homeSections.ts`; merch configuration is in `merch/merch.ts`.
- `src/css/`: all styled-components definitions (`*.styles.ts`), global styles, fonts, and theme settings. Category folders mirror the page folders; shared styles live in `layout/` and `feedback/`.
- `src/shared/`: shared layout, feedback, and navigation components.
- `src/utils/`: utilities used across categories.
- `src/assets/`: bundled images and icons; `public/`: public files and PHP endpoints.
- `public/portfolio/`: photography originals, previews, and generated metadata/manifest, included in the build.
- `build/`: Vite build helpers. `tools/photography/`: authoring generator/compiler and regression checks. `docs/`: editing guides.

Keep category-specific code with its page and styling in the matching CSS folder. Use lowercase folder names and direct imports. Larger category pages load on demand. No new styling library is required; configurable colours and image positions remain data-driven.
