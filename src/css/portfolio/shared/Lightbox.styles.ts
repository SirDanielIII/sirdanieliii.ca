import styled from 'styled-components';
import arrowLeftSquare from '../../../assets/icons/arrow-left-square.svg';
import arrowRightSquare from '../../../assets/icons/arrow-right-square.svg';

export const Lightbox = styled.dialog`
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }
    h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
    p { line-height: 1.75; }
    button:focus-visible {
        outline: 2px solid var(--portfolio-focus, ${({theme}) => theme.portfolio.photography.focus});
        outline-offset: 3px;
    }
    position: fixed;
    margin: auto;
    width: 98vw;
    max-width: 98vw;
    height: 98dvh;
    max-height: 98dvh;
    border: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
    border-radius: 0.5rem;
    background: var(--portfolio-viewer-surface, ${({theme}) => theme.portfolioViewer.surface});
    color: var(--portfolio-viewer-text, ${({theme}) => theme.colors.text});
    box-shadow: ${({theme}) => theme.portfolioViewer.shadow};
    padding: 0.5rem;
    overflow: hidden;
    &[open] {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
        gap: 0.75rem;
    }
    &::backdrop {
        /* Apply mode tokens directly to the backdrop in the browser's top layer. */
        background: ${({theme}) => theme.portfolioViewer.backdrop};
    }
    .viewer-image {
        position: relative;
        min-width: 0;
        min-height: 0;
        display: grid;
        place-items: center;
    }
    .viewer-image img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .viewer-image img[data-loading='true'] {
        visibility: hidden;
    }
    .viewer-zoomable {
        overflow: hidden;
    }
    .viewer-image-viewport {
        position: relative;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        min-height: 0;
        overflow: hidden;
        touch-action: none;
    }
    .viewer-image-viewport:focus-visible {
        outline: 2px solid var(--portfolio-focus, ${({theme}) => theme.portfolio.photography.focus});
        outline-offset: -2px;
    }
    .viewer-image-viewport img {
        left: 50%;
        top: 50%;
        max-width: none;
        max-height: none;
        cursor: default;
        user-select: none;
    }
    .viewer-zoomable[data-zoomed='true'] img { cursor: grab; }
    .viewer-zoomable[data-zoomed='true'] img:active { cursor: grabbing; }
    /* ViewerImage renders the loading and error states. */
    /*noinspection CssUnusedSymbol*/
    .viewer-placeholder {
        position: absolute;
        inset: 0;
        background: var(--portfolio-panel, ${({theme}) => theme.portfolio.photography.surface});
        border: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
    }
    /*noinspection CssUnusedSymbol*/
    .viewer-loading {
        position: relative;
        padding: 1rem;
        text-align: center;
        color: var(--portfolio-muted, ${({theme}) => theme.portfolio.photography.muted});
    }
    /*noinspection CssUnusedSymbol*/
    .viewer-error {
        text-align: center;
        padding: 1rem;
        background: var(--portfolio-viewer-surface, ${({theme}) => theme.portfolioViewer.surface});
        z-index: 1;
    }
    .viewer-error button {
        margin-top: 0.75rem;
    }
    .viewer-sidebar {
        min-width: 0;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        padding: 0 1rem 1rem;
        background: var(--portfolio-viewer-sidebar-surface, ${({theme}) => theme.portfolioViewer.sidebarSurface});
        border-left: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
        overflow-wrap: anywhere;
    }
    .viewer-sidebar:focus-visible {
        outline: 2px solid var(--portfolio-focus, ${({theme}) => theme.portfolio.photography.focus});
        outline-offset: -2px;
    }
    .viewer-metadata > p {
        margin-bottom: 1rem;
        color: var(--portfolio-muted, ${({theme}) => theme.portfolio.photography.muted});
        font-size: 0.9rem;
    }
    dl {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
        font-size: 0.85rem;
        line-height: 1.5;
    }
    dt, dd {
        padding: 0.55rem 0;
        border-bottom: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
        overflow-wrap: anywhere;
    }
    dt {
        color: var(--portfolio-muted, ${({theme}) => theme.portfolio.photography.muted});
        padding-right: 0.8rem;
    }
    button {
        color: inherit;
        min-width: 44px;
        min-height: 44px;
        border: 1px solid var(--portfolio-control-border, ${({theme}) => theme.portfolio.photography.controlBorder});
        padding: 0.4rem 0.8rem;
    }
    button:not(:disabled):hover {
        background: var(--portfolio-accent-subtle, ${({theme}) => theme.portfolio.photography.accentSubtle});
        border-color: var(--portfolio-accent-hover, ${({theme}) => theme.portfolio.photography.accentHover});
    }
    button:disabled {
        opacity: 0.5;
        cursor: default;
    }
    .viewer-controls {
        /* Keeping Close in view never consumes any of the image's vertical space. */
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.75rem 0;
        background: var(--portfolio-viewer-control-surface, ${({theme}) => theme.colors.background2});
        font-size: 0.8rem;
    }
    .viewer-navigation {
        /* Fixed arrow columns never move when proportional counter digits change width. */
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr) 44px;
        flex: 0 1 10rem;
        min-width: 0;
        align-items: center;
        gap: 0.25rem;
    }
    .viewer-navigation button {
        display: grid;
        place-items: center;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--portfolio-accent, ${({theme}) => theme.portfolio.photography.accent});
    }
    .viewer-navigation button:not(:disabled):hover {
        background: transparent;
        color: var(--portfolio-accent-hover, ${({theme}) => theme.portfolio.photography.accentHover});
    }
    .viewer-arrow {
        display: block;
        width: 44px;
        height: 44px;
        background: currentColor;
    }
    .viewer-arrow-left {
        /* Quoting also supports Vite's inlined SVG data URLs. */
        -webkit-mask: url("${arrowLeftSquare}") center / contain no-repeat;
        mask: url("${arrowLeftSquare}") center / contain no-repeat;
    }
    .viewer-arrow-right {
        -webkit-mask: url("${arrowRightSquare}") center / contain no-repeat;
        mask: url("${arrowRightSquare}") center / contain no-repeat;
    }
    .viewer-count {
        min-width: 0;
        text-align: center;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
        color: var(--portfolio-muted, ${({theme}) => theme.portfolio.photography.muted});
    }
    .viewer-close {
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        margin-left: auto;
        min-width: 5.5rem;
        min-height: 44px;
        padding: 0.4rem 1.25rem;
        border: 1px solid var(--portfolio-control-border, ${({theme}) => theme.portfolio.photography.controlBorder});
        border-radius: 0.5rem;
        background: transparent;
        color: var(--portfolio-accent, ${({theme}) => theme.portfolio.photography.accent});
    }
    .viewer-close:not(:disabled):is(:hover, :focus-visible) {
        /* Match the category filters' subtle fill, retaining a red cue for Close. */
        background: ${({theme}) => theme.portfolioViewer.closeHoverSurface};
        border-color: ${({theme}) => theme.colors.highlight1};
        color: var(--portfolio-viewer-text, ${({theme}) => theme.colors.text});
    }
    .viewer-heading {
        padding: 0.75rem 0 1.25rem;
    }
    .viewer-heading h2 {
        font-size: 1.8rem;
        line-height: 1.2;
        overflow-wrap: anywhere;
    }
    .viewer-heading p {
        font-size: 0.85rem;
        color: var(--portfolio-accent, ${({theme}) => theme.portfolio.photography.accent});
        margin-top: 0.5rem;
    }
    @media (max-width: 48rem) {
        padding: 0.35rem;
        &[open] {
            /* Reflow at narrow widths/zoom; both panes stay independently usable. */
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: minmax(0, 58%) minmax(0, 1fr);
            gap: 0.5rem;
        }
        .viewer-sidebar {
            border-left: 0;
            border-top: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
            padding: 0 0.5rem 1rem;
        }
        .viewer-heading h2 {
            font-size: 1.5rem;
        }
    }
    @media (max-height: 30rem), (max-width: 30rem) {
        .viewer-controls {
            /* Let enlarged text scroll past controls in constrained viewports. */
            position: static;
        }
    }
`;

// Static skeletons avoid animation overhead and respect reduced motion by default.
