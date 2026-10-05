import styled from 'styled-components';

export const SectionIndex = styled.nav`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    padding: 0 0 1rem;
    font-size: 0.8rem;
    color: var(--portfolio-muted);
    a { display: inline-flex; gap: 0.65rem; align-items: center; min-height: 44px; }
    span { color: var(--portfolio-accent); font-variant-numeric: tabular-nums; font-size: 0.7rem; }
    a:hover { color: var(--portfolio-accent); }
`;

export const MediaSection = styled.section`
    margin-top: 3.5rem;
    scroll-margin-top: 7rem;
    > header {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        border-top: 1px solid var(--portfolio-line);
        padding-top: 1.75rem;
        margin-bottom: 2rem;
    }
    > header img { width: 64px; height: 64px; object-fit: contain; flex-shrink: 0; }
    > header h2 { font-size: clamp(1.9rem, 3.5vw, 2.8rem); line-height: 1.15; margin-top: 0.4rem; }
    .section-description { max-width: 44rem; color: var(--portfolio-muted); margin-bottom: 1.5rem; }
    .section-link { margin-top: 1.5rem; font-size: 0.85rem; }
    .series-title { font-size: 1.35rem; margin-bottom: 1.5rem; }
    @media (max-width: 600px) {
        margin-top: 2.5rem;
        > header { gap: 1rem; }
        > header img { width: 48px; height: 48px; }
    }
`;

export const VideoPoster = styled.button`
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 0;
    color: inherit;
    background: #090909;
    img { width: 100%; height: 100%; object-fit: contain; display: block; transition: opacity 0.25s; }
    &:hover img { opacity: 0.85; }
    &:hover .play { background: #111d; }
    .media-placeholder { display: grid; place-content: center; height: 100%; padding: 1rem; color: #ddd; font-size: 0.85rem; }
`;

export const WatchButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    min-height: 44px;
    border: 0;
    border-bottom: 1px solid var(--portfolio-accent);
    color: var(--portfolio-accent);
    padding: 0.5rem 0;
    font-size: 0.85rem;
    &:hover { color: var(--portfolio-accent-hover); }
    span { font-size: 0.65rem; }
`;

export const WorkGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    &[data-layout='channel'] { grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
    &[data-layout='series'] { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
    &[data-layout='compact'] { gap: 0 2rem; }
    @media (max-width: 700px) {
        &, &[data-layout='series'] { grid-template-columns: minmax(0, 1fr); }
        &[data-layout='series'] { gap: 2rem; }
    }
`;

export const VideoEntryFrame = styled.article`
    min-width: 0;
    h3, h4, h5 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 1.6rem; line-height: 1.22; margin: 0.55rem 0; }
    .video-copy { padding-top: 1rem; overflow-wrap: anywhere; }
    .video-description { color: var(--portfolio-muted); font-size: 0.95rem; margin-bottom: 0.8rem; }
    .video-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.5rem; }
    .video-actions .text-link { font-size: 0.85rem; }
    .video-date { font-size: 0.75rem; color: var(--portfolio-muted); }
    &[data-feature='true'] {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: minmax(0, 1.65fr) minmax(0, 0.85fr);
        align-items: center;
        gap: 2rem;
        h3, h4 { font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.035em; }
        .video-copy { padding: 0; }
    }
    &[data-layout='channel']:not([data-feature='true']) {
        display: grid;
        grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
        align-items: center;
        gap: 1.5rem;
        max-width: 51rem;
        .video-copy { padding-top: 0; }
        h3 { font-size: 1.65rem; }
    }
    &[data-layout='series'] h3 { font-size: 1.35rem; }
    &[data-layout='compact'] {
        display: grid;
        grid-template-columns: 9rem minmax(0, 1fr);
        gap: 1.1rem;
        align-items: center;
        padding: 1.25rem 0;
        border-bottom: 1px solid var(--portfolio-line);
        .video-copy { padding: 0; }
        h5 { font-size: 1.15rem; margin: 0; }
        .play { width: 36px; height: 36px; font-size: 0.75rem; }
    }
    @media (max-width: 850px) {
        &[data-feature='true'] { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 1.5rem; }
    }
    @media (max-width: 700px) {
        &[data-feature='true'], &[data-layout='channel']:not([data-feature='true']) {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
        }
        &[data-layout='channel']:not([data-feature='true']) { max-width: 31rem; }
    }
    @media (max-width: 400px) {
        &[data-layout='compact'] { grid-template-columns: 6.5rem minmax(0, 1fr); gap: 0.8rem; }
    }
`;

export const CommissionGroup = styled.section`
    margin-top: 3rem;
    &:first-of-type { margin-top: 0; }
    > header { margin-bottom: 1.5rem; }
    > header h3 { font-size: clamp(1.75rem, 3vw, 2.3rem); margin-bottom: 0.75rem; }
    > header p { color: var(--portfolio-muted); max-width: 44rem; }
    .subcollection { margin-top: 2rem; }
    .subcollection h4 { font-size: 1.3rem; padding-bottom: 0.5rem; color: var(--portfolio-muted); }
`;

export const ExperienceEntry = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
    gap: 3rem;
    margin-top: 5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--portfolio-line);
    scroll-margin-top: 7rem;
    .experience-dates { color: var(--portfolio-muted); margin-top: 1rem; font-size: 0.9rem; }
    h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 0.5rem; }
    h3 { font-family: ${({theme}) => theme.fonts.regular}; font-size: 1.1rem; margin-bottom: 0.8rem; }
    .experience-meta { display: flex; flex-wrap: wrap; gap: 0.35rem 1.2rem; font-size: 0.85rem; color: var(--portfolio-muted); }
    .experience-copy { margin-top: 1.5rem; max-width: 45rem; color: var(--portfolio-muted); }
    @media (max-width: 700px) { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 3.5rem; }
`;

export const FeaturedFilmFrame = styled.section`
    margin: 0 0 4rem;
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
    .feature-actions a { min-height: 44px; padding: 0.6rem 0; font-size: 0.85rem; color: var(--portfolio-muted); }
    @media (max-width: 700px) {
        margin-bottom: 2.5rem;
        .feature-caption { grid-template-columns: 1fr; gap: 1rem; }
        .feature-image ${VideoPoster} { aspect-ratio: 16 / 9; }
    }
`;

export const FilmEntryFrame = styled.article`
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    align-items: start;
    gap: 1.75rem 2.75rem;
    padding: 2.5rem 0;
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
    @media (max-width: 700px) { grid-template-columns: minmax(0, 1fr); padding: 2rem 0; }
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
    padding: 2.25rem 0;
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
    > header .text-link { font-size: 0.85rem; }
    /* A single divider between siblings; the next collection/contact owns its own top rule. */
    .film-entries > article + article { border-top: 1px solid var(--portfolio-line); }
    &[data-presentation='series'] {
        background: var(--portfolio-panel);
        border-left: 2px solid var(--portfolio-accent);
        padding: 2rem clamp(1.25rem, 3vw, 2.5rem);
        > header { border-top: 0; padding-top: 0; }
        .film-index { display: none; }
        .film-entries > article:last-child { padding-bottom: 0; }
        ${ComingSoonFilm} h3 { font-size: clamp(1.5rem, 3vw, 2.1rem); }
    }
    @media (max-width: 700px) {
        &[data-presentation='series'] { padding: 1.5rem 1.25rem; }
    }
`;
