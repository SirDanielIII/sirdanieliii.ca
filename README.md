# SirDanielIII.ca

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
2. Copy everything in /dist into DocumentRoot.
3. Copy `private/` beside DocumentRoot (outside the public website) and set the password in `private/portfolio.php`. Include the PDFs in `private/portfolio/`; they are intentionally excluded from Git and the Vite build.
4. Remove any previously deployed PDFs from the public `/portfolio/` directory. Deploy its `.htaccess` too, which denies access to leftover public PDF copies on Apache with overrides enabled.

The portfolio requires PHP 8.1+. Set `'password' => 'your-password'` in `private/portfolio.php`; an empty password keeps access locked. Edit PDF filenames in that same file and collection text in `src/data/portfolio.ts`. For example, if DocumentRoot is `/var/www/site`, the configuration belongs at `/var/www/private/portfolio.php` and the PDFs at `/var/www/private/portfolio/`. Run `npm run dev` locally so PHP handles the password check.

---
