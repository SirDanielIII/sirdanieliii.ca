import styled from 'styled-components';
import {SectionIndex} from '../shared/TableOfContents.styles';
import {mediaAction} from '../shared/MediaAction.styles';

export const MediaSection = styled.section`
    margin-top: var(--portfolio-divider-space);
    scroll-margin-top: 7rem;
    > header {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        border-top: 1px solid var(--portfolio-line);
        padding-top: var(--portfolio-divider-space);
        margin-bottom: 2rem;
    }
    > header img { width: 64px; height: 64px; object-fit: contain; flex-shrink: 0; }
    > header h2 { font-size: clamp(1.9rem, 3.5vw, 2.8rem); line-height: 1.15; margin-top: 0.4rem; }
    .section-description { max-width: 44rem; color: var(--portfolio-muted); margin-bottom: 1.5rem; }
    .section-link { margin-top: 1.5rem; font-size: 0.85rem; }
    .series-title { font-size: 1.35rem; margin-bottom: 1.5rem; }
    @media (max-width: 600px) {
        > header { gap: 1rem; }
        > header img { width: 48px; height: 48px; }
    }
    ${SectionIndex} + & { margin-top: 0; }
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
    /* VideoThumbnail renders both descendants. */
    /*noinspection CssUnusedSymbol*/
    &:hover .play { background: #111d; }
    /*noinspection CssUnusedSymbol*/
    .media-placeholder { display: grid; place-content: center; height: 100%; padding: 1rem; color: #ddd; font-size: 0.85rem; }
`;

export const WatchButton = styled.button`
    ${mediaAction}
    border-bottom-color: var(--portfolio-accent);
    color: var(--portfolio-accent);
    &:hover { color: var(--portfolio-accent-hover); }
    span { font-size: 0.65rem; }
`;
