# Editing the merch page

Edit [src/pages/merch/merch.ts](../src/pages/merch/merch.ts). The `merch` object holds shared page and dialog text; `merchItems` holds products in display order. Edit values while keeping field names and value types intact.

## Adding and editing products

Copy this object into `merchItems`:

```ts
{
    id: 'spare-brain-cell',
    name: 'One Spare Brain Cell',
    description: 'Lightly used. Mostly on weekends.',
    price: 'Your last good idea',
    badge: 'Limited supply',
    buttonLabel: 'Think about it',
    dialog: {
        message: 'I forgot where I put it. That probably explains a lot.',
    },
},
```

Required fields are `id`, `name`, `description`, and `price`, plus one button behaviour:

- `dialog` with a `message`: show a popup, optionally with a chance-based `link`.
- `link` alone: always open the link. Omit `chancePercent` or set it to `100`.
- `action: 'file-not-found'`: open the native browser error. Omit both `dialog` and `link`.

TypeScript checks these combinations, including requiring fallback dialog text for chance-based links. Keep IDs unique and stable. Prices are text, so currencies and joke prices both work.

- Add, remove, or reorder objects to change the collection.
- Set `visible: false` to hide a product.
- Set `image` to a file in `public/merch/`, for example `/merch/rock.webp`. Describe it with `imageAlt`; the product name is the default. Missing images show a placeholder.
- Edit `badge`, `priceNote`, and `buttonLabel` for the optional card text.
- Edit `dialog.message` for the popup's punchline.

## Popup text

All popup text lives under `dialog`:

| Field | Default |
| --- | --- |
| `productName` | Product name |
| `title` | `merch.dialog.title` |
| `message` | Required for products with a dialog |
| `note` | `merch.dialog.note` |
| `closeLabel` | `merch.dialog.closeLabel` |
| `showProductName`, `showNote` | `true` |

An empty title, message, or note hides that section. The close button keeps a usable label. Escape, the close button, and clicking outside dismiss the popup.

Fonts, spacing, dimensions, borders, and popup colours are shared component styles rather than per-product settings.

## Basic card colours

To change **every card**, edit `cardColours` inside `export const merch` in `src/pages/merch/merch.ts`. Replace the empty object with any of these seven keys:

```ts
cardColours: {
    background: {light: '#fff8f0', dark: '#29231e'},
    text: {light: '#30251b', dark: '#fff4e8'},
    price: {light: '#8a4600', dark: '#ffbf75'},
    badgeBackground: '#e9c683',
    badgeText: '#242424',
    buttonBackground: {light: '#f5dfc4', dark: '#533b25'},
    buttonText: {light: '#623400', dark: '#ffe0b8'},
} satisfies MerchCardColours,
```

To change **one card**, add `colours` to that entry in `merchItems`. Only the listed keys override the shared colours:

```ts
colours: {
    badgeBackground: '#E9C683',
    badgeText: '#242424',
    price: {light: '#16784f', dark: '#3FD49A'},
},
```

Each colour accepts a CSS string or separate `light` and `dark` values. Omitted colours use the shared value, then the site's theme. Shared colour variables are applied once to the grid and inherited by its cards. Card text inherits `text`; description and small-note text retain their muted opacity. Hover, focus, and layout styles remain shared. These settings colour the cards, not the page heading, purchase popup, or Chrome's native error page.

## Links and random surprises

Add `link` to a product:

```ts
link: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    chancePercent: 25,
    openInNewTab: true,
},
```

- `url`: a full URL or site-relative path.
- `chancePercent`: chance on each click, from 0 (always show the dialog) to 100 (always open the link). Defaults to 100. Each click rolls independently.
- `openInNewTab`: defaults to true. Set false to navigate in the current tab.

Keep `dialog.message` as the fallback when the link is not selected. For an always-open link, omit `dialog` and use `link: {url: 'https://example.com/'}`. Guaranteed links skip the random roll. A video or existing jumpscare page can be the destination; playback follows browser and destination-site settings.

## Native missing-file error

The upload-schedule item uses `action: 'file-not-found'`, with no `dialog` or `link`. It navigates to a randomly generated, nonexistent `blob:` URL in the current tab. No files on the visitor's device are accessed or deleted.

In the Chrome version tested, this displays the browser's own error page: “Your file couldn’t be accessed” with `ERR_FILE_NOT_FOUND`. Older versions use “Your file was not found”; wording and appearance depend on the browser. The address is a generated `blob:` URL, not a downloadable PDF or an HTTP 404 endpoint.

Browser Back returns to merch. Refresh retries the missing file and still fails. To switch back to a popup or link, replace `action` with `dialog` or `link`. It works without PHP.

## Where the layout lives

- [MerchPage.tsx](../src/pages/merch/MerchPage.tsx): page composition and purchase actions.
- [MerchCard.tsx](../src/pages/merch/MerchCard.tsx): card layout, basic colour overrides, and image fallback.
- [MerchDialog.tsx](../src/pages/merch/MerchDialog.tsx): popup content and open/close behaviour.
- [src/css/merch/](../src/css/merch/): page, card, and popup styling.
- [public/merch/](../public/merch/): product images.

Cards adapt to desktop, tablet, and phone widths. Source edits need a build and deployment to appear on the live site.
