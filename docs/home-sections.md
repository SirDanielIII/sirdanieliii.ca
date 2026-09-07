# Editing the home-page section cards

Edit `src/data/homeSections.ts` to change the images, labels, descriptions, routes, and accent colours. The four image imports at the top are the only paths you need to replace when changing photos.

When replacing a photo, export a WebP around 1200px wide (quality 80 is a useful starting point) and update its import. Oversized camera images will slow down loading even with preloading.

For example, use the computer-build photo for Projects:

```ts
import projectsImage from '../assets/images/section_card/Building The Josh Computer (1).webp';
```

Use forward slashes in imports. Imported images are processed by Vite for both development and production; a raw Windows path such as `src\assets\...` is not a browser URL. For an image in `public/images/`, you can instead set an entry's `image` to `/images/filename.webp`.

Every card has the shared `homeSectionAspectRatio` (`16 / 10`). Images cover the full card without stretching or letterboxing. Some cropping is expected when the original image has a different shape. Set `imagePosition` in the relevant entry (for example, `'50% 35%'`) to choose which part stays in view.

The category text and description remain visible on touchscreens. Hover adds an image zoom; keyboard users get a visible focus outline. The optional inner frame is currently hidden by `display: none` on `Frame` in `SectionCard.tsx`. Reduced-motion settings disable the movement. A failed image leaves a gradient behind the category text so the link remains usable.

All four images load eagerly. `build/homeImagePreloads.ts` also adds the first two image imports to the HTML preload list, allowing the browser to request them before React renders. Keep those imports in card order. Imported filenames remain the single place to edit; public-folder URLs are not automatically preloaded. Small, appropriately sized WebP/AVIF images still matter for slow connections.

The old card placed image URLs inside an unquoted CSS `url(...)`. Filenames containing spaces or parentheses could invalidate that background rule, leaving a dark card. The new card uses an `<img>` with `object-fit: cover`, which avoids that CSS parsing issue.
