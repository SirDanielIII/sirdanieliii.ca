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
2. Copy everything in `dist/` into DocumentRoot. The build includes any PDFs placed in `public/portfolio/`.
3. If updating the password-protected version, remove the old deployed `scripts/portfolio.php`, `private/` folder, and any `portfolio/.htaccess` that denies PDF access.

The portfolio is public and serves PDFs directly without PHP or a password. Put the PDFs in `public/portfolio/` (excluded from Git), then edit their URLs and collection text in `src/pages/portfolio/portfolio.ts`.

---

## Project structure

Guides are written as MDX files in `src/pages/guides/content/`. See [Writing guides](docs/guides.md) to add recipes, tutorials, posts, or resources.

- `src/pages/<category>/`: each page's components, editable data, and helpers. Home card configuration is in `home/homeSections.ts`; merch configuration is in `merch/merch.ts`.
- `src/css/`: all styled-components definitions (`*.styles.ts`), global styles, fonts, and theme settings. Category folders mirror the page folders; shared styles live in `layout/` and `feedback/`.
- `src/shared/`: shared layout, feedback, and navigation components.
- `src/utils/`: utilities used across categories.
- `src/assets/`: bundled images and icons; `public/`: public files and PHP endpoints.
- `public/portfolio/`: publicly accessible portfolio PDFs, included in the build.
- `build/`: Vite build helpers. `docs/`: editing guides.

Keep category-specific code with its page and styling in the matching CSS folder. Use lowercase folder names and direct imports. Larger category pages load on demand. No new styling library is required; configurable colours and image positions remain data-driven.
