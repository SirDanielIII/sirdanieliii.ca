import styled from 'styled-components';
import {Lightbox} from '../shared/Lightbox.styles';

export const GalleryDialog = styled(Lightbox)`
    &[open] {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto;
        gap: 0.5rem;
    }
    .viewer-controls {
        position: static;
        padding: 0.5rem 0.75rem;
        gap: 1rem;
    }
    .viewer-controls h2 { font-size: clamp(1.1rem, 3vw, 1.6rem); }
    .gallery-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem 1.5rem;
        padding: 0.25rem 0.75rem;
        font-size: 0.85rem;
        color: var(--portfolio-muted);
    }
    .viewer-image { touch-action: pan-y pinch-zoom; }
    .viewer-image > .viewer-image { width: 100%; height: 100%; }
    .viewer-navigation { flex: 0 0 12rem; }
`;

export const VideoDialog = styled(Lightbox)`
    width: min(100rem, 98vw);
    /* Size the window around a landscape frame, with enough room for the sidecar. */
    height: min(96dvh, max(26rem, calc((min(100rem, 98vw) - 24rem) * 9 / 16 + 1rem)));
    max-height: 96dvh;
    .video-viewer-media {
        display: grid;
        place-items: center;
        min-width: 0;
        min-height: 0;
        background: #080808;
        container-type: size;
    }
    .player-stage {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        max-height: 100%;
        background: #080808;
    }
    @supports (width: 1cqh) {
        .player-stage { width: min(100cqw, calc(100cqh * 16 / 9)); }
    }
    video, iframe { width: 100%; height: 100%; border: 0; display: block; object-fit: contain; }
    .player-error {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
        gap: 1rem;
        padding: 1.5rem;
        text-align: center;
        background: var(--portfolio-viewer-surface);
    }
    .player-error button { justify-self: center; }
    .video-production-note { margin-top: 2rem; }
    .video-production-note h3 { font-size: 0.8rem; color: var(--portfolio-accent); margin-bottom: 0.5rem; }
    .video-viewer-links { display: flex; flex-direction: column; align-items: start; gap: 0.75rem; margin-top: 2rem; font-size: 0.85rem; }
    @media (max-width: 48rem) {
        height: 96dvh;
        &[open] { grid-template-rows: auto minmax(0, 1fr); }
        .video-viewer-media { width: 100%; aspect-ratio: 16 / 9; }
    }
    @media (max-width: 48rem) and (max-height: 30rem) {
        &[open] { grid-template-columns: minmax(0, 1fr) minmax(14rem, 35%); grid-template-rows: minmax(0, 1fr); }
        .video-viewer-media { height: 100%; aspect-ratio: auto; }
        .viewer-sidebar { border-top: 0; border-left: 1px solid var(--portfolio-line); }
    }
`;
