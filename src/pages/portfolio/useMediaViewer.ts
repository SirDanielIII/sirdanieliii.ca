import {useMemo, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router';
import {filmImages, type Film, type GalleryImage, type MediaViewerEntry, type WatchableWork} from './media';

export type ViewerSelection =
    | {kind: 'video'; entry: MediaViewerEntry; opener: HTMLButtonElement | null}
    | {kind: 'gallery'; film: Film; images: GalleryImage[]; index: number; opener: HTMLButtonElement | null};

export type OpenVideo = (work: WatchableWork, opener: HTMLButtonElement) => void;
export type OpenGallery = (film: Film, index: number, opener: HTMLButtonElement) => void;

export function useMediaViewer(entries: MediaViewerEntry[]) {
    const [opener, setOpener] = useState<HTMLButtonElement | null>(null);
    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const viewerState = location.state as {portfolioMediaViewer?: boolean} | null;
    const requestedVideo = params.get('watch');
    const requestedGallery = params.get('gallery');
    const entry = entries.find(item => item.work.slug === (requestedVideo ?? requestedGallery));
    const images = useMemo(() => requestedGallery && entry && 'year' in entry.work ? filmImages(entry.work) : [], [entry, requestedGallery]);
    let selection: ViewerSelection | null = null;
    if (requestedVideo && entry?.work.video) selection = {kind: 'video', entry, opener};
    else if (requestedGallery && entry && 'year' in entry.work) {
        const requestedIndex = Number(params.get('image') ?? 0);
        const index = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < images.length ? requestedIndex : 0;
        if (images.length) selection = {kind: 'gallery', film: entry.work, images, index, opener};
    }
    const update = (next: URLSearchParams, replace: boolean, state: typeof viewerState) => {
        void navigate({search: next.size ? `?${next.toString()}` : '', hash: location.hash}, {replace, state});
    };
    const open = (next: URLSearchParams, button: HTMLButtonElement) => {
        setOpener(button);
        // One history entry per session, just like Photography; retain in-page anchors.
        const alreadyOpen = Boolean(requestedVideo ?? requestedGallery);
        update(next, alreadyOpen, alreadyOpen ? viewerState : {portfolioMediaViewer: true});
    };
    const openVideo: OpenVideo = (work, opener) => {
        if (!work.video) return;
        const next = new URLSearchParams(params);
        next.delete('gallery');
        next.delete('image');
        next.set('watch', work.slug);
        open(next, opener);
    };
    const openGallery: OpenGallery = (film, index, opener) => {
        if (!filmImages(film)[index]) return;
        const next = new URLSearchParams(params);
        next.delete('watch');
        next.set('gallery', film.slug);
        next.set('image', String(index));
        open(next, opener);
    };
    return {
        selection,
        openVideo,
        openGallery,
        onClose: () => {
            if (viewerState?.portfolioMediaViewer) {
                void navigate(-1);
            } else {
                const next = new URLSearchParams(params);
                next.delete('watch');
                next.delete('gallery');
                next.delete('image');
                update(next, true, null);
            }
        },
        onNavigate: (offset: number) => {
            if (selection?.kind !== 'gallery') return;
            const next = new URLSearchParams(params);
            next.set('image', String((selection.index + offset + selection.images.length) % selection.images.length));
            update(next, true, viewerState);
        },
    };
}
