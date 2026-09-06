# Editing the merch page

The shop is a joke: the buttons open product-specific punchlines, and nothing is purchased or submitted.

## Products and page copy

Edit [`src/data/merch.ts`](../src/data/merch.ts). The `merchCopy` object holds the headings, introduction, shop note, and shared button/dialog text. The `merchItems` array holds the products in display order.

- **Add:** copy an item, give it a unique `id`, and change its content.
- **Remove:** delete the item's object from the array.
- **Hide temporarily:** set `visible: false` on an item. Omit it or use `true` to show it again.
- **Reorder:** move objects up or down in the array.
- **Change an image:** put a photo in `public/merch/`, then set `image` to `/merch/your-photo.webp` and describe it in `imageAlt`. PNG and JPEG also work. Landscape or square photos work best; cards crop them to 4:3.
- **Change the joke:** edit `punchline`. It appears when that product's button is clicked.

Only `id`, `name`, `description`, `price`, and `punchline` are required. `price` is plain text, so currencies and joke prices both work. `badge`, `priceNote`, `image`, `imageAlt`, `buttonLabel`, and `visible` are optional. An omitted or broken image gets a built-in placeholder. If every item is hidden or removed, the page displays an empty-shop message.

For example, add this object anywhere inside `merchItems`:

```ts
{
    id: 'spare-brain-cell',
    name: 'One Spare Brain Cell',
    description: 'Lightly used. Mostly on weekends.',
    price: 'Your last good idea',
    badge: 'Limited supply',
    buttonLabel: 'Think about it',
    punchline: 'I forgot where I put it. That probably explains a lot.',
},
```

Keep IDs unique and unchanged when renaming an existing item. Long descriptions and prices wrap naturally; cards have no fixed text height. There are no separate mobile layouts to maintain: the grid uses three columns on desktop, two on tablets, and one on phones. New source changes require a build and deployment to appear on the live site.

## Layout and images

- [`src/pages/MerchPage.tsx`](../src/pages/MerchPage.tsx): page layout and accessible native purchase dialog, including Escape/backdrop dismissal and focus restoration.
- [`src/components/pages/MerchCard.tsx`](../src/components/pages/MerchCard.tsx): reusable product card and image fallback.
- [`public/merch/`](../public/merch/): six temporary product photos, optimized to 800px WebP files. The page loads no third-party image services.

Styling uses the site's existing styled-components theme and Berlin Sans fonts. The green merch accent uses a darker shade for readable text in light mode. The page shares the existing header, footer, and theme toggle.
