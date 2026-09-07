/** Use one CSS colour for both themes, or specify each theme separately. */
export type MerchColour = string | {light: string; dark: string};

export type MerchCardColours = Partial<Record<
    'background' | 'text' | 'price' | 'badgeBackground' | 'badgeText' |
    'buttonBackground' | 'buttonText', MerchColour
>>;

export interface MerchDialogOptions {
    /** Omit text overrides to use the product name and shared dialog text. */
    productName?: string;
    title?: string;
    message?: string;
    note?: string;
    closeLabel?: string;
    showProductName?: boolean;
    showNote?: boolean;
}

export interface MerchLink {
    /** A full URL or site-relative path, such as /surprise/. */
    url: string;
    /** Chance per click, from 0 (never) to 100 (always). Defaults to 100. */
    chancePercent?: number;
    /** Defaults to true. Set false to open the link in the current tab. */
    openInNewTab?: boolean;
}

interface MerchItemDetails {
    /** Keep IDs unique and stable, even when renaming a product. */
    id: string;
    name: string;
    description: string;
    /** Prices are text, so "$4,999.99", "Free-ish", and "Your dignity" all work. */
    price: string;
    /** Optional note. One line of space is still reserved when omitted. */
    priceNote?: string;
    badge?: string;
    /** Override any card colours. Omitted colours follow the current theme. */
    colours?: MerchCardColours;
    /** Put photos in public/merch/ and use a path such as /merch/rock.webp. */
    image?: string;
    imageAlt?: string;
    buttonLabel?: string;
    /** Set false to temporarily hide an item without deleting it. */
    visible?: boolean;
}

// Choose one button behaviour. Only buttons that can show a popup need dialog text.
export type MerchItem = MerchItemDetails & (
    | {
        action: 'file-not-found';
        dialog?: never;
        link?: never;
    }
    | {
        action?: never;
        dialog: MerchDialogOptions & {message: string};
        link?: MerchLink;
    }
    | {
        action?: never;
        dialog?: never;
        // Without a fallback dialog, the link must always open.
        link: MerchLink & {chancePercent?: 100};
    }
);

// Edit the page copy here. No layout changes needed.
export const merch = {
    title: 'THINGS FOR SALE 🪧',
    tagline: 'Questionable products. Unreasonable prices.',
    introduction: 'Give me money. I’ll send you a stawberry. 🍓',
    collectionTitle: 'THE COLLECTION 📂',
    collectionNote: 'Free shipping on all orders over $67.',
    defaultButtonLabel: 'Click to purchase',
    emptyTitle: 'The shelves are suspiciously empty.',
    emptyMessage: 'Even the imaginary inventory needs a restock. Check back later.',
    // Shared dialog defaults. Each item's dialog object can override these.
    dialog: {
        title: 'Excellent taste. Terrible news.',
        note: 'Thank you for shopping at Sir Daniel III\'s merch store!',
        closeLabel: 'Keep shopping',
        showProductName: true,
        showNote: true,
    } satisfies MerchDialogOptions,
    // Shared green for prices and purchase buttons. Use a darker price in light mode for contrast.
    // Keep image-inspired backgrounds and badge colours in each item's colours object.
    cardColours: {
        price: {light: '#16784f', dark: '#3fd49a'},
        buttonBackground: '#3fd49a',
        buttonText: '#11261d',
    } satisfies MerchCardColours,
};

// Temporary products: add, remove, or reorder these objects to update the shop.
// Copy any item to get started. Required: id, name, description, price, and a button behaviour.
// Choose dialog (optionally with a random link), an always-open link, or action: 'file-not-found'.
// Omit colours to use the default theme. Keep popup text inside dialog.
// Optional with a dialog: link: {url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', chancePercent: 25}
export const merchItems: MerchItem[] = [
    {
        id: 'emotional-support-rock',
        colours: {
            badgeBackground: '#d8cce7',
            badgeText: '#352d40',
        },
        name: 'Emotional Support Rock',
        description: 'Listens to your problems. Offers absolutely no solutions. Basically a senior developer.',
        price: '$4,999.99',
        priceNote: 'Therapy sold separately',
        badge: 'BESTSELLER',
        image: '/merch/emotional-support-rock.webp',
        imageAlt: 'A grey rock with googly eyes on a lavender background.',
        dialog: {
            message: 'Your rock has read your message and chosen not to respond. It\'s already doing its job.',
        },
    },
    {
        id: 'daniels-upload-schedule',
        colours: {
            badgeBackground: '#e4c6cc',
            badgeText: '#452f38',
        },
        name: 'Daniel\'s YT Upload Schedule',
        description: 'A detailed schedule of every upcoming upload on the @SirDanielIII YouTube channel.',
        price: 'FREE',
        image: '/merch/daniels-upload-schedule.png',
        badge: 'POPULAR',
        buttonLabel: 'Download the schedule',
        action: 'file-not-found',
    },
    {
        id: 'emergency-grass',
        name: 'Emergency Touch Grass Kit',
        description: 'A piece of the outside conveniently relocated indoors. Smells surprisingly legitimate.',
        price: '12,500 V-Bucks',
        priceNote: 'Outside sold separately',
        image: '/merch/emergency-grass.webp',
        imageAlt: 'A tiny square of fresh grass and soil on a warm yellow background.',
        buttonLabel: 'Touch grass',
        dialog: {
            message: 'For the full experience, close this tab and step outside. However, thanks for the V-Bucks anyways.',
        },
    },
    {
        id: 'server-air',
        name: 'Server Air',
        description: 'Bottled next to the server hosting this website. Warm, loud, and faintly concerning.',
        price: '$127.99',
        priceNote: 'Now with 30% more uptime',
        image: '/merch/server-air.webp',
        imageAlt: 'An empty glass jar labelled SERVER AIR on a mint background.',
        dialog: {
            message: 'The air escaped during checkout. Please take a deep breath near your computer to receive your order.',
        },
    },
    {
        id: 'ten-dollar-canadian-bill',
        name: '$10',
        description: '',
        price: '$20.00',
        priceNote: 'Price is in Canadian Dollars',
        image: '/merch/ten-dollar-canadian-bill.webp',
        buttonLabel: 'Click to confirm trade',
        dialog: {
            productName: 'PREMIUM CURRENCY EXCHANGE',
            title: 'Your money, but less of it.',
            message: 'You have successfully exchanged $20 for $10. Thank you for supporting the economy. Mine, specifically.',
            closeLabel: 'Reconsider my investments',
            showNote: false,
        },
    },
    {
        id: 'daniels-sleep-schedule',
        name: 'Daniel\'s Sleep Schedule',
        description: '',
        price: '$4.99',
        buttonLabel: 'Click to purchase',
        dialog: {
            title: 'Some words of wisdom:',
            message: '"I want to sleep my fix schedule"',
            note: '@Sir Daniel III, 2021-07-21',
            closeLabel: '💀 aight.',
            showProductName: false,
        },
    },
];
