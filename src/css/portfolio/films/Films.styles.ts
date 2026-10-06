import styled from 'styled-components';
import {MediaSection, VideoPoster} from '../media/Media.styles';
import {mediaAction} from '../shared/MediaAction.styles';

export const FeaturedFilmFrame = styled.section`
    margin: 0;
    scroll-margin-top: 7rem;
    .feature-image { position: relative; }
    .feature-image ${VideoPoster} { aspect-ratio: 2 / 1; }
    .feature-marker {
        position: absolute;
        left: 1.25rem;
        top: 1.25rem;
        color: #fff;
        background: #111d;
        padding: 0.5rem 0.75rem;
        font-size: 0.65rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        pointer-events: none;
    }
    .feature-caption {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        align-items: start;
        gap: 3rem;
        padding: 1.75rem 0 0;
    }
    h2 { font-size: clamp(2.75rem, 6vw, 5rem); line-height: 1.1; letter-spacing: -0.045em; margin: 0.6rem 0; }
    .feature-synopsis { color: var(--portfolio-muted); font-size: 1rem; }
    .feature-actions { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; align-items: center; margin-top: 1rem; }
    .feature-actions a {
        ${mediaAction}
        color: var(--portfolio-muted);
    }
    @media (max-width: 700px) {
        .feature-caption { grid-template-columns: 1fr; gap: 1rem; }
        .feature-image ${VideoPoster} { aspect-ratio: 16 / 9; }
    }
`;

export const FilmEntryFrame = styled.article`
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    align-items: start;
    gap: 1.75rem 2.75rem;
    padding: var(--portfolio-divider-space) 0;
    scroll-margin-top: 7rem;
    .film-copy { min-width: 0; overflow-wrap: anywhere; }
    .film-index { display: block; color: var(--portfolio-muted); font-size: 0.7rem; letter-spacing: 0.15em; margin-bottom: 0.75rem; }
    h3 { font-size: clamp(2rem, 3.5vw, 2.75rem); line-height: 1.12; letter-spacing: -0.025em; margin: 0.75rem 0 1rem; }
    .film-synopsis { color: var(--portfolio-muted); font-size: 0.95rem; }
    .production-note {
        font-size: 0.82rem;
        color: var(--portfolio-muted);
        padding-left: 1rem;
        border-left: 2px solid var(--portfolio-line);
        margin-top: 1.25rem;
    }
    .production-note span { display: block; color: var(--portfolio-accent); font-size: 0.7rem; margin-bottom: 0.25rem; }
    .film-actions { display: flex; align-items: center; gap: 0.5rem 1.5rem; flex-wrap: wrap; margin-top: 1rem; }
    .gallery-button { color: var(--portfolio-muted); min-height: 44px; font-size: 0.85rem; border: 0; border-bottom: 1px solid var(--portfolio-line); }
    .gallery-button:hover { color: var(--portfolio-accent); border-color: var(--portfolio-accent); }
    @media (max-width: 850px) { gap: 1.5rem 2rem; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    @media (max-width: 700px) { grid-template-columns: minmax(0, 1fr); }
`;

export const FilmGalleryFrame = styled.div`
    grid-column: 1 / -1;
    display: flex;
    align-items: start;
    gap: 1.5rem 2rem;
    .gallery-label { color: var(--portfolio-muted); font-size: 0.7rem; letter-spacing: 0.08em; margin-bottom: 0.6rem; }
    .poster-set { flex: 0 1 auto; min-width: 0; }
    .poster-images { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .still-set { flex: 1 1 0; min-width: 0; }
    .still-images {
        display: flex;
        gap: 0.75rem;
        overflow-x: auto;
        padding: 0.35rem 0.35rem 1rem;
        overscroll-behavior-x: contain;
        scroll-snap-type: x proximity;
        scroll-padding-inline: 0.35rem;
        scrollbar-width: thin;
        scrollbar-color: var(--portfolio-control-border) var(--portfolio-panel);
    }
    .still-images:focus-visible { outline: 2px solid var(--portfolio-focus); outline-offset: 3px; }
    .still-images button { scroll-snap-align: start; }
    /* Firefox uses the standard colours above; WebKit/Blink also get the rounded rail. */
    @supports selector(::-webkit-scrollbar) {
        .still-images { scrollbar-width: auto; scrollbar-color: auto; }
        .still-images::-webkit-scrollbar { height: 10px; }
        .still-images::-webkit-scrollbar-track { background: var(--portfolio-panel); border-radius: 999px; }
        .still-images::-webkit-scrollbar-thumb {
            background: var(--portfolio-control-border);
            border: 2px solid var(--portfolio-panel);
            border-radius: 999px;
        }
        .still-images::-webkit-scrollbar-thumb:hover { background: var(--portfolio-accent); }
    }
    button { display: block; border: 0; background: var(--portfolio-panel); flex-shrink: 0; }
    img { display: block; object-fit: contain; }
    .poster-images img { width: auto; max-width: 10rem; height: 10rem; }
    .still-images img { width: 12rem; height: auto; aspect-ratio: 16 / 9; }
    button:hover { outline: 1px solid var(--portfolio-accent); outline-offset: 3px; }
    @media (max-width: 700px) {
        flex-direction: column;
        .poster-set, .still-set { width: 100%; flex-basis: auto; }
        .poster-images img { max-width: 8rem; height: 9rem; }
    }
`;

export const ComingSoonFilm = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: var(--portfolio-divider-space) 0;
    scroll-margin-top: 7rem;
    h3 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 0.5rem; letter-spacing: -0.025em; }
    .coming-soon-status {
        color: var(--portfolio-accent);
        font-size: 0.7rem;
        letter-spacing: 0.18em;
        white-space: nowrap;
        padding: 0.7rem 0;
    }
    @media (max-width: 600px) { flex-direction: column; align-items: start; gap: 1rem; }
`;

export const FilmCollectionFrame = styled(MediaSection)`
    > header { justify-content: space-between; flex-wrap: wrap; margin-bottom: 0; }
    /* ExternalLink renders this class in the collection header. */
    /*noinspection CssUnusedSymbol*/
    > header .text-link { font-size: 0.85rem; }
    /* A single divider between siblings; the next collection/contact owns its own top rule. */
    .film-entries > article + article { border-top: 1px solid var(--portfolio-line); }
    .film-entries > article:last-child { padding-bottom: 0; }
    &[data-presentation='series'] {
        background: var(--portfolio-panel);
        border-left: 2px solid var(--portfolio-accent);
        padding: 2rem clamp(1.25rem, 3vw, 2.5rem);
        > header { border-top: 0; padding-top: 0; }
        /* FilmEntry in ShortFilmsSection renders the index. */
        /*noinspection CssUnusedSymbol*/
        .film-index { display: none; }
        ${ComingSoonFilm} h3 { font-size: clamp(1.5rem, 3vw, 2.1rem); }
    }
    @media (max-width: 700px) {
        &[data-presentation='series'] { padding: 1.5rem 1.25rem; }
    }
`;

export const FilmSectionDivider = styled.hr`
    border: 0;
    border-top: 1px solid var(--portfolio-line);
    margin: var(--portfolio-divider-space) 0;
    & + ${FilmCollectionFrame} { margin-top: 0; }
`;
