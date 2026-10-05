/** Normalized, runtime-validated content. Author JSON lives beside assets in public/portfolio/. */
export interface MediaImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    previewSrc: string | null;
}

export interface GalleryImage extends MediaImage {
    title: string;
    kind: 'Poster' | 'Still';
}

export type VideoSource =
    | {type: 'youtube'; url: string; embedUrl: string}
    | {type: 'hls'; url: string};

export interface PortfolioWork {
    slug: string;
    title: string;
    thumbnail: MediaImage | null;
    video: VideoSource | null;
}

export interface VideoWork extends PortfolioWork {
    description: string;
    date: string;
    presentation: 'feature' | 'standard';
}

export interface ExternalProjectLink {
    url: string;
    label: string;
}

export interface VideoCollection {
    slug: string;
    title: string;
    items: VideoWork[];
}

export interface VideoGroup extends VideoCollection {
    description: string;
    link: ExternalProjectLink | null;
    collections: VideoCollection[];
}

export interface VideoWorkSection {
    kind: 'channel' | 'series' | 'commissions';
    slug: string;
    title: string;
    label: string;
    description: string;
    collectionTitle: string;
    logo: MediaImage | null;
    link: ExternalProjectLink | null;
    items: VideoWork[];
    groups: VideoGroup[];
}

export interface ProfessionalExperience {
    kind: 'experience';
    slug: string;
    title: string;
    label: string;
    organization: string;
    location: string;
    workMode: string;
    employment: string;
    start: string;
    end: string;
    description: string;
}

export interface VideographyContent {
    sections: (VideoWorkSection | ProfessionalExperience)[];
}

export interface Film extends PortfolioWork {
    year: number;
    type: 'Short Film' | 'Documentary';
    status: 'released' | 'coming-soon';
    synopsis: string;
    funFact: string;
    posters: GalleryImage[];
    screenshots: GalleryImage[];
}

export interface FilmCollection {
    slug: string;
    title: string;
    label: string;
    presentation: 'filmography' | 'series';
    link: ExternalProjectLink | null;
    films: Film[];
}

export interface ShortFilmsContent {
    featuredFilm: string | null;
    collections: FilmCollection[];
}

export type WatchableWork = VideoWork | Film;

/** Context references collection information, while work remains the canonical entry. */
export interface MediaViewerEntry {
    work: WatchableWork;
    collection: string;
    description?: string;
    link: ExternalProjectLink | null;
}

export function videographyEntries(content: VideographyContent): MediaViewerEntry[] {
    return content.sections.flatMap(section => {
        if (section.kind === 'experience') return [];
        const context = {collection: section.collectionTitle || section.title, description: section.description, link: section.link};
        return [
            ...section.items.map(work => ({work, ...context})),
            ...section.groups.flatMap(group => {
                const groupContext = {collection: group.title, description: group.description, link: group.link ?? section.link};
                return [
                    ...group.items.map(work => ({work, ...groupContext})),
                    ...group.collections.flatMap(collection => collection.items.map(work => ({
                        work, ...groupContext, collection: `${group.title} · ${collection.title}`,
                    }))),
                ];
            }),
        ];
    });
}

export function filmEntries(content: ShortFilmsContent): MediaViewerEntry[] {
    return content.collections.flatMap(collection => collection.films.map(work => ({
        work, collection: collection.title, link: collection.link,
    })));
}

export function filmImages(film: Film): GalleryImage[] {
    return [
        ...(film.thumbnail ? [{...film.thumbnail, title: `${film.title} — film still`, kind: 'Still' as const}] : []),
        ...film.posters,
        ...film.screenshots,
    ];
}
