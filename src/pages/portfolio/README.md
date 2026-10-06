# Portfolio code

`PortfolioPage.tsx` loads the overview catalog and defines the routes. Components and data helpers are grouped by feature; their styled components live in the matching folders under `src/css/portfolio/`.

- `overview/`: landing page and collection cards.
- `photography/`: photo catalog, gallery, and photo viewer (also used on the home page).
- `videography/`: video work and professional experience.
- `films/`: featured film, film collections, and film galleries.
- `media/`: shared video types, thumbnails, playback, and media viewer state.
- `layout/`: shared collection-page shell, navigation, and contact section.
- `shared/`: portfolio context/validation, loading states, external links, and table of contents.

Shared CSS includes page typography, dialog styles, contents navigation, and action geometry. Divider spacing is defined by the page layout's `--portfolio-divider-space` variable.

Editable catalogs and assets remain under `public/portfolio/`. PHP catalog endpoints remain under `public/scripts/`. Run `npm run build`, `npm run lint`, and `node --test tools/portfolio/test_overview.mjs` after changing the frontend structure.
