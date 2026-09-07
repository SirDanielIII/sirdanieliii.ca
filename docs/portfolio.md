# Portfolio PDFs

The Portfolio page uses these files under `public/portfolio/`:

- `Daniel's Photography Portfolio (2025).pdf`
- `Daniel's Videography Portfolio (2025).pdf`

The Portfolio page lets visitors switch between the documents, browse them with their browser's PDF viewer, open them in a new tab, or download them. Browsers without an embedded PDF viewer can use the open/download links.

Filenames are case-sensitive on the production server. If you prefer different names, update `file` in `src/data/portfolio.ts`. Paths there begin with `/portfolio/`, without the `public` prefix. You can edit collection titles and descriptions in the same file.

If a PDF is missing, the page shows an availability message. Replace either PDF at the same path to update its contents, then rebuild and deploy the site. Vite copies these public files into the build automatically.

This project's `.gitignore` excludes `public/portfolio/`. A build made from a fresh checkout needs the PDFs copied into that directory first, or uploaded separately to the deployed site's `/portfolio/` directory.
