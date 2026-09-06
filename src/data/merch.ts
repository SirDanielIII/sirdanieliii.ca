export interface MerchItem {
    /** Keep IDs unique and stable, even when renaming a product. */
    id: string;
    name: string;
    description: string;
    /** Prices are text, so "$4,999.99", "Free-ish", and "Your dignity" all work. */
    price: string;
    priceNote?: string;
    badge?: string;
    /** Put photos in public/merch/ and use a path such as /merch/rock.webp. */
    image?: string;
    imageAlt?: string;
    buttonLabel?: string;
    punchline: string;
    /** Set to false to temporarily hide an item without deleting it. */
    visible?: boolean;
}

// Edit the page copy here. No layout changes needed.
export const merchCopy = {
    title: 'MERCH',
    tagline: 'Questionable products. Unreasonable prices.',
    introduction: 'Things you never knew you needed. Mostly because you don\'t.',
    collectionTitle: 'THE COLLECTION',
    collectionNote: 'Free imaginary shipping on absolutely everything.',
    defaultButtonLabel: 'Attempt purchase',
    emptyTitle: 'The shelves are suspiciously empty.',
    emptyMessage: 'Even the imaginary inventory needs a restock. Check back later.',
    disclaimerTitle: 'Yes, this entire shop is a joke.',
    disclaimer: 'Nothing here is actually for sale. No payments, no deliveries, just questionable life choices.',
    dialogTitle: 'Excellent taste. Terrible news.',
    dialogNote: 'This is a pretend shop. No order was placed and you haven\'t been charged.',
    dialogCloseLabel: 'Keep window shopping',
};

// Temporary products: add, remove, or reorder these objects to update the shop.
// Copy any item to get started. Only id, name, description, price, and punchline are required.
export const merchItems: MerchItem[] = [
    {
        id: 'emotional-support-rock',
        name: 'Emotional Support Rock',
        description: 'Listens to your problems. Offers absolutely no solutions. Basically a senior developer.',
        price: '$4,999.99',
        priceNote: 'Therapy sold separately',
        badge: 'Best seller (allegedly)',
        image: '/merch/emotional-support-rock.webp',
        imageAlt: 'A grey rock with googly eyes on a lavender background.',
        punchline: 'Your rock has read your message and chosen not to respond. It\'s already doing its job.',
    },
    {
        id: 'server-air',
        name: 'Artisanal Server Air',
        description: 'Bottled next to the server hosting this website. Warm, loud, and faintly concerning.',
        price: '$128.00',
        priceNote: 'Now with 30% more uptime',
        badge: 'Locally overheated',
        image: '/merch/server-air.webp',
        imageAlt: 'An empty glass jar labelled SERVER AIR on a mint background.',
        punchline: 'The air escaped during checkout. Please take a deep breath near your computer to receive your order.',
    },
    {
        id: 'emergency-grass',
        name: 'Emergency Touch Grass Kit',
        description: 'A little piece of outside, brought inside. For when the comment section gets to you.',
        price: '$69.00',
        priceNote: 'Outside sold separately',
        badge: 'For indoor people',
        image: '/merch/emergency-grass.webp',
        imageAlt: 'A tiny square of fresh grass and soil on a warm yellow background.',
        buttonLabel: 'Touch grass',
        punchline: 'For the full experience, close this tab and step outside. Congratulations, you just saved $69.',
    },
];
