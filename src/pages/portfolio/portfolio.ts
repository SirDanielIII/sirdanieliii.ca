// Add images to public/images/portfolio/, then add an entry below.
export const portfolioImage = (name: string) => `/images/portfolio/${name}.webp`;

export const portfolio = {
    name: 'Daniel Zhuo',
    about: "I'm Daniel, and this is my world through a lens. From portraits and quiet landscapes to client projects and questionable short films, I like finding stories worth keeping — and having some fun along the way.",
    email: 'sirdanieldathird@gmail.com',
    youtube: 'https://www.youtube.com/@SirDanielIII',
};

export const collections = [
    {
        id: 'photography',
        title: 'Photography',
        label: 'Still moments',
        description: 'People, places, and the details in between.',
        image: portfolioImage('portrait-50'),
        position: '50% 35%',
    },
    {
        id: 'videography',
        title: 'Videography',
        label: 'Life in motion',
        description: 'Vlogs, reviews, trailers, and creative edits.',
        image: portfolioImage('room-tour'),
        position: '50% 50%',
    },
    {
        id: 'short-films',
        title: 'Short films',
        label: 'A little cinema',
        description: 'Small stories. A different world in every frame.',
        image: portfolioImage('k-town-noir'),
        position: '50% 50%',
    },
] as const;

export const genres = ['Portraiture', 'Studio Q · Client work', 'Landscapes', 'Products'] as const;
export type Genre = (typeof genres)[number];

export interface Photo {
    id: string;
    title: string;
    genre: Genre;
    src: string;
    alt: string;
    width: number;
    height: number;
}

const photo = (id: string, title: string, genre: Genre, alt: string, width: number, height: number): Photo => ({
    id,
    title,
    genre,
    src: portfolioImage(id),
    alt,
    width,
    height,
});

export const photos: Photo[] = [
    photo(
        'portrait-50',
        'A moment of warmth',
        'Portraiture',
        'A smiling woman in a black dress at an indoor event',
        608,
        912,
    ),
    photo(
        'landscape-90',
        'City after dark',
        'Landscapes',
        'The illuminated CN Tower and Toronto skyline reflected in the water at night',
        737,
        1106,
    ),
    photo(
        'product-102',
        'Light from within',
        'Products',
        'Colourful RGB fans and components inside a gaming computer',
        859,
        483,
    ),
    photo(
        'studio-q-74',
        'On the ice',
        'Studio Q · Client work',
        'Hockey players approaching the goal during a game',
        859,
        483,
    ),
    photo('portrait-52', 'Together', 'Portraiture', 'Two people embracing in a green park', 644, 430),
    photo(
        'landscape-88',
        'Last light',
        'Landscapes',
        'A waterfront tower silhouetted against a pink and orange sunset',
        719,
        664,
    ),
    photo(
        'studio-q-76',
        'In the studio',
        'Studio Q · Client work',
        'Full-length portrait of a woman against a white studio backdrop',
        600,
        900,
    ),
    photo(
        'product-104',
        'A splash of colour',
        'Products',
        'Water splashing from a glass with colourful fruit against a black background',
        600,
        900,
    ),
    photo(
        'portrait-46',
        'Out in the city',
        'Portraiture',
        'A man in a white shirt standing on a city street at dusk',
        309,
        465,
    ),
    photo(
        'portrait-48',
        'Neon nights',
        'Portraiture',
        'A person lit by colourful computer lights in a dark room',
        309,
        466,
    ),
    photo(
        'portrait-61',
        'Under the lights',
        'Portraiture',
        'A seated person surrounded by purple and pink event lighting',
        608,
        913,
    ),
    photo('portrait-63', 'Movie night', 'Portraiture', 'A group of friends posing outside Imagine Cinemas', 778, 519),
    photo('portrait-65', 'In character', 'Portraiture', 'A person with sunglasses posing in a hallway', 247, 371),
    photo(
        'portrait-67',
        'Behind the camera',
        'Portraiture',
        'A photographer using a tripod outdoors at night',
        247,
        370,
    ),
    photo(
        'portrait-69',
        'Looking back',
        'Portraiture',
        'A person holding a camera toward the viewer in a sunlit park',
        247,
        370,
    ),
    photo(
        'studio-q-78',
        'A shared celebration',
        'Studio Q · Client work',
        'Two women posing together in front of a decorative backdrop',
        592,
        394,
    ),
    photo(
        'studio-q-80',
        'In session',
        'Studio Q · Client work',
        'A seated participant holding up a card at an indoor event',
        249,
        395,
    ),
    photo(
        'landscape-97',
        'The quiet way home',
        'Landscapes',
        'A curved road and bare trees under a glowing streetlight at night',
        737,
        1106,
    ),
    photo(
        'landscape-99',
        'Off the beaten path',
        'Landscapes',
        'A stone path between rustic buildings surrounded by trees',
        720,
        664,
    ),
    photo(
        'product-106',
        'Something refreshing',
        'Products',
        'Two bubble tea drinks framed by sunlit green plants',
        593,
        394,
    ),
    photo(
        'product-108',
        'Reflections',
        'Products',
        'Compact discs catching rainbow reflections against a dark background',
        249,
        394,
    ),
];

export interface VideoProject {
    id: string;
    title: string;
    type: string;
    year?: string;
    image: string;
    url: string;
    description: string;
    // Optional stills appear beneath the project. Add public image URLs and alt text.
    stills?: {src: string; alt: string}[];
}

export const videos: VideoProject[] = [
    {
        id: 'room-tour',
        title: 'Room tour + in-depth review',
        type: 'Tour & review',
        image: portfolioImage('room-tour'),
        url: 'https://youtu.be/Qs6sIiztsIQ',
        description: 'A closer look at life in Leonard Hall.',
    },
    {
        id: 'dorm-setup',
        title: 'Can I fit a $3000 gaming setup in my dorm?',
        type: 'Vlog',
        image: portfolioImage('dorm-setup'),
        url: 'https://youtu.be/EcepVOODAmg',
        description: 'Move-in day, with a gaming setup in tow.',
    },
    {
        id: 'lt-smp',
        title: 'LT SMP launch trailer',
        type: 'Launch trailer',
        year: '2024',
        image: portfolioImage('lt-smp'),
        url: 'https://ivanlikes.men/url/ltsmp2024trailer',
        description: 'The launch trailer for LT SMP 2024.',
    },
    {
        id: 'lt-smp-s3',
        title: 'LT SMP Season 3',
        type: 'Launch trailer',
        image: portfolioImage('lt-smp-s3'),
        url: 'https://youtu.be/cVNjydmCgAw',
        description: 'A new season, a new trailer.',
    },
];

export const films: VideoProject[] = [
    {
        id: 'k-town-noir',
        title: 'K-Town Noir',
        type: 'Short film',
        year: '2024',
        image: portfolioImage('k-town-noir'),
        url: 'https://files.ivanlikes.men/s/ktownnoir',
        description: 'A story told in light and shadow.',
    },
    {
        id: 'bachelorette-party',
        title: 'The Bachelorette Party',
        type: 'Short film',
        year: '2024',
        image: portfolioImage('bachelorette-party'),
        url: 'https://files.ivanlikes.men/s/TheBacheloretteParty',
        description: '',
    },
    {
        id: 'shelter',
        title: 'Shelter',
        type: 'Short film',
        year: '2024',
        image: portfolioImage('shelter'),
        url: 'https://files.ivanlikes.men/s/shelter2024',
        description: '',
    },
    {
        id: 'street-drugs',
        title: 'UofW Street Drugs',
        type: 'Broadcast parody',
        image: portfolioImage('street-drugs'),
        url: 'https://youtu.be/e81ixhQzadU',
        description: '',
    },
    {
        id: 'last-slice',
        title: 'Last Slice',
        type: 'Short film',
        year: '2019',
        image: portfolioImage('last-slice'),
        url: 'https://files.ivanlikes.men/s/lastslice',
        description: '',
    },
];

export const editingLinks = ['jbJdxJRpNXg', 'MlyeegdykZ0', 'ErWbuR0HcZ4', '95aTxXO_Bjw'];

export interface PortfolioDocument {
    id: string;
    title: string;
    description: string;
    file: string;
}
export const portfolioDocuments: PortfolioDocument[] = [
    {
        id: 'photography',
        title: 'Photography PDF',
        description: 'January 2025 collection',
        file: `/portfolio/${encodeURIComponent("Daniel's Photography Portfolio (2025).pdf")}`,
    },
    {
        id: 'videography',
        title: 'Videography PDF',
        description: 'January 2025 collection',
        file: `/portfolio/${encodeURIComponent("Daniel's Videography Portfolio (2025).pdf")}`,
    },
];
