# Editing the home-page section cards

Edit `src/data/homeSections.ts` to change the images, labels, descriptions, routes, and accent colours. The four image imports at the top are the only paths you need to replace when changing photos.

For example, use the computer-build photo for Projects:

```ts
import projectsImage from '../assets/images/section_card/Building The Josh Computer (1).webp';
```

Use forward slashes in imports. Imported images are processed by Vite for both development and production; a raw Windows path such as `src\assets\...` is not a browser URL. For an image in `public/images/`, you can instead set an entry's `image` to `/images/filename.webp`.

Every card has the shared `homeSectionAspectRatio` (`16 / 10`). Images cover the full card without stretching or letterboxing. Some cropping is expected when the original image has a different shape. Set `imagePosition` in the relevant entry (for example, `'50% 35%'`) to choose which part stays in view.

The category text and description remain visible on touchscreens. Hover adds an image zoom and an accent frame; keyboard users get a visible focus outline. Reduced-motion settings disable the movement. A failed image leaves a gradient behind the category text so the link remains usable.

The old card placed image URLs inside an unquoted CSS `url(...)`. Filenames containing spaces or parentheses could invalidate that background rule, leaving a dark card. The new card uses an `<img>` with `object-fit: cover`, which avoids that CSS parsing issue.
