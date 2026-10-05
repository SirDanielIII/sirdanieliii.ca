import styled, {css} from 'styled-components';
import {Link} from 'react-router';
import type {PortfolioMedium} from '../theme';
import arrowLeftSquare from '../../assets/icons/arrow-left-square.svg';
import arrowRightSquare from '../../assets/icons/arrow-right-square.svg';

export const Page = styled.main<{$medium?: PortfolioMedium}>`
    --portfolio-accent: ${({theme}) => theme.portfolioBase.accent};
    --portfolio-muted: ${({theme}) => theme.portfolioBase.muted};
    --portfolio-line: ${({theme}) => theme.portfolioBase.border};
    --portfolio-panel: ${({theme}) => theme.portfolioBase.surface};
    --portfolio-viewer-surface: ${({theme}) => theme.portfolioViewer.surface};
    --portfolio-viewer-sidebar-surface: ${({theme}) => theme.portfolioViewer.sidebarSurface};
    --portfolio-viewer-control-surface: ${({theme}) => theme.colors.background2};
    --portfolio-viewer-text: ${({theme}) => theme.colors.text};
    ${({theme, $medium}) => {
        if (!$medium) return '';
        const palette = theme.portfolio[$medium];
        return css`
            --portfolio-accent: ${palette.accent};
            --portfolio-accent-hover: ${palette.accentHover};
            --portfolio-accent-subtle: ${palette.accentSubtle};
            --portfolio-on-accent: ${palette.onAccent};
            --portfolio-line: ${palette.border};
            --portfolio-control-border: ${palette.controlBorder};
            --portfolio-focus: ${palette.focus};
            --portfolio-panel: ${palette.surface};
            --portfolio-muted: ${palette.muted};
        `;
    }}
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 9rem 2rem 0;
    h1,
    h2,
    h3 {
        font-family: Georgia, 'Times New Roman', serif;
        font-weight: 400;
    }
    em {
        color: var(--portfolio-accent);
        font-weight: 400;
    }
    p {
        line-height: 1.75;
    }
    .text-link {
        display: inline-flex;
        align-items: center;
        gap: 1.2rem;
        padding: 0.6rem 0;
        border-bottom: 1px solid var(--portfolio-accent);
    }
    .text-link:hover {
        color: var(--portfolio-accent);
    }
    :is(a, button):focus-visible {
        outline: 2px solid var(--portfolio-focus, var(--portfolio-accent));
        outline-offset: 5px;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
    }
    .channel-link {
        margin-top: 2rem;
    }
    #collections {
        scroll-margin-top: 100px;
    }
    .play {
        width: 64px;
        height: 64px;
        border: 1px solid #ffffff8c;
        border-radius: 50%;
        background: #1119;
        color: white;
        display: grid;
        place-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding-left: 3px;
        transition: background 0.2s;
    }
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            transition: none !important;
        }
    }
    @media (max-width: 700px) {
        padding: 7rem 1.25rem 0;
    }
`;

export const Eyebrow = styled.p`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 0.7rem;
    line-height: 1.5;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--portfolio-accent);
`;

export const About = styled.section`
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    align-items: center;
    gap: 3.5rem;
    padding: 1rem 0 5.5rem;
    h1 {
        font-size: clamp(3rem, 5.8vw, 5rem);
        line-height: 1.07;
        letter-spacing: -0.045em;
        margin-top: 1.5rem;
    }
    .about-copy {
        margin: 2rem 0 1.2rem;
        max-width: 29rem;
    }
    h2 {
        font-size: 1.25rem;
        margin-bottom: 0.65rem;
    }
    .about-copy p {
        color: var(--portfolio-muted);
        font-size: 1rem;
    }
    @media (max-width: 800px) {
        gap: 1.5rem;
        h1 {
            font-size: 3.5rem;
        }
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding-bottom: 3.5rem;
        h1 {
            font-size: clamp(3rem, 11vw, 4rem);
        }
    }
`;

export const AboutImages = styled.div`
    position: relative;
    height: 490px;
    img {
        position: absolute;
        object-fit: cover;
    }
    .city {
        width: 68%;
        height: 89%;
        right: 0;
        top: 0;
    }
    .portrait {
        width: 47%;
        height: 62%;
        left: 0;
        bottom: 1rem;
        border: 8px solid ${({theme}) => theme.colors.background1};
        border-left: 0;
        object-position: 50% 32%;
    }
    .image-note {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--portfolio-muted);
        font-size: 0.75rem;
        letter-spacing: 0.04em;
    }
    .frame-number {
        position: absolute;
        left: 8%;
        top: 7%;
        writing-mode: vertical-rl;
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        color: var(--portfolio-accent);
    }
    @media (max-width: 800px) {
        height: 410px;
    }
    @media (max-width: 600px) {
        height: 440px;
        max-width: 450px;
        width: 100%;
        margin: 1rem auto 0;
    }
    @media (max-width: 380px) {
        height: 370px;
    }
`;

export const SectionHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--portfolio-line);
    h2 {
        font-size: clamp(1.8rem, 3vw, 2.6rem);
        letter-spacing: -0.025em;
        margin-top: 0.55rem;
    }
    > span {
        font-size: 0.85rem;
        color: var(--portfolio-muted);
    }
    @media (max-width: 600px) {
        align-items: start;
        flex-direction: column;
        gap: 0.8rem;
    }
`;

export const CollectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
`;

export const CollectionCard = styled(Link)`
    display: block;
    .cover {
        position: relative;
        overflow: hidden;
        aspect-ratio: 4 / 3;
        margin-bottom: 1.4rem;
        background: var(--portfolio-panel);
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
    }
    .cover::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(transparent 55%, #0007);
    }
    .number {
        position: absolute;
        z-index: 1;
        left: 1rem;
        bottom: 1rem;
        color: white;
        font-size: 0.85rem;
        letter-spacing: 0.12em;
    }
    h3 {
        font-size: 2rem;
        margin: 0.35rem 0 0.55rem;
    }
    > p:last-child {
        color: var(--portfolio-muted);
        font-size: 0.9rem;
    }
    &:hover img {
        transform: scale(1.035);
    }
    &:hover h3 {
        color: var(--portfolio-accent);
    }
    @media (max-width: 850px) {
        h3 {
            font-size: 1.65rem;
        }
    }
`;

export const Contact = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    border-top: 1px solid var(--portfolio-line);
    margin-top: 5rem;
    padding: 3rem 0 4rem;
    h2 {
        font-size: clamp(1.8rem, 3vw, 2.6rem);
        max-width: 34rem;
        margin-top: 0.7rem;
        line-height: 1.2;
    }
    .contact-link {
        white-space: nowrap;
        border: 1px solid var(--portfolio-line);
        padding: 1rem 1.4rem;
        display: flex;
        gap: 2rem;
    }
    .contact-link:hover {
        background: var(--portfolio-panel);
    }
    @media (max-width: 600px) {
        align-items: start;
        flex-direction: column;
        margin-top: 3rem;
    }
`;

export const CollectionNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-bottom: 1.3rem;
    border-bottom: 1px solid var(--portfolio-line);
    font-size: 0.85rem;
    > a {
        color: var(--portfolio-muted);
    }
    > div {
        display: flex;
        gap: 1.7rem;
        flex-wrap: wrap;
    }
    a {
        padding: 0.4rem 0;
    }
    a[aria-current='page'] {
        color: var(--portfolio-accent);
        border-bottom: 1px solid var(--portfolio-accent);
    }
    @media (max-width: 600px) {
        align-items: start;
        flex-direction: column;
        gap: 0.7rem;
        > div {
            gap: 1.3rem;
        }
    }
`;

export const CollectionIntro = styled.div`
    padding: 3.5rem 0;
    h1 {
        font-size: clamp(3rem, 6vw, 5.5rem);
        line-height: 1.08;
        letter-spacing: -0.04em;
        margin: 1rem 0 1.4rem;
    }
    > p:last-child {
        color: var(--portfolio-muted);
        max-width: 42rem;
    }
    @media (max-width: 600px) {
        padding: 2.5rem 0;
        h1 {
            font-size: 3rem;
        }
    }
`;

export const Filters = styled.nav`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 2rem;
    a {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.35rem;
        min-height: 44px;
        padding: 0.7rem 1rem;
        border: 1px solid var(--portfolio-control-border);
        color: inherit;
        font-size: 0.85rem;
        border-radius: 2px;
    }
    a[aria-current='page'] {
        background: var(--portfolio-accent);
        color: var(--portfolio-on-accent);
        border-color: var(--portfolio-accent);
        text-decoration: underline;
        text-underline-offset: 3px;
    }
    a:hover {
        border-color: var(--portfolio-accent-hover);
    }
    a:not([aria-current]):hover {
        background: var(--portfolio-accent-subtle);
    }
    small {
        font-size: 0.75rem;
    }
    > span {
        margin-left: auto;
        color: var(--portfolio-muted);
        font-size: 0.8rem;
        padding: 0.5rem 0;
    }
`;

export const PhotoGrid = styled.div`
    columns: 3;
    column-gap: 1.5rem;
    @media (max-width: 850px) {
        columns: 2;
    }
    @media (max-width: 480px) {
        columns: 1;
    }
`;

export const PhotoCard = styled.figure`
    break-inside: avoid;
    margin-bottom: 1.8rem;
    .skeleton-image, .skeleton-caption {
        background: var(--portfolio-panel);
        border: 1px solid var(--portfolio-line);
    }
    .skeleton-caption { height: 1rem; width: 50%; }
    small.skeleton-caption { width: 25%; }
    button {
        position: relative;
        display: block;
        border: 0;
        width: 100%;
        overflow: hidden;
        background: var(--portfolio-panel);
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.35s;
    }
    [data-loading='true'] img {
        opacity: 0;
    }
    .photo-placeholder {
        position: absolute;
        inset: 0;
        background: var(--portfolio-panel);
        border: 1px solid var(--portfolio-line);
    }
    .photo-error {
        display: grid;
        place-content: center;
        padding: 1rem;
        text-align: center;
        color: var(--portfolio-muted);
    }
    button:hover img {
        transform: scale(1.025);
    }
    figcaption {
        display: flex;
        justify-content: space-between;
        gap: 0.7rem;
        margin-top: 0.7rem;
        font-size: 0.8rem;
        line-height: 1.4;
    }
    small {
        color: var(--portfolio-muted);
        font-size: 0.7rem;
        text-align: right;
    }
`;

export const Lightbox = styled.dialog`
    position: fixed;
    margin: auto;
    width: 98vw;
    max-width: 98vw;
    height: 98dvh;
    max-height: 98dvh;
    border: 1px solid var(--portfolio-line);
    border-radius: 0.5rem;
    background: var(--portfolio-viewer-surface);
    color: var(--portfolio-viewer-text);
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
    .viewer-placeholder {
        position: absolute;
        inset: 0;
        background: var(--portfolio-panel);
        border: 1px solid var(--portfolio-line);
    }
    .viewer-loading {
        position: relative;
        padding: 1rem;
        text-align: center;
        color: var(--portfolio-muted);
    }
    .viewer-error {
        text-align: center;
        padding: 1rem;
        background: var(--portfolio-viewer-surface);
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
        background: var(--portfolio-viewer-sidebar-surface);
        border-left: 1px solid var(--portfolio-line);
        overflow-wrap: anywhere;
    }
    .viewer-sidebar:focus-visible {
        outline: 2px solid var(--portfolio-focus);
        outline-offset: -2px;
    }
    .viewer-metadata > p {
        margin-bottom: 1rem;
        color: var(--portfolio-muted);
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
        border-bottom: 1px solid var(--portfolio-line);
        overflow-wrap: anywhere;
    }
    dt {
        color: var(--portfolio-muted);
        padding-right: 0.8rem;
    }
    button {
        color: inherit;
        min-width: 44px;
        min-height: 44px;
        border: 1px solid var(--portfolio-control-border);
        padding: 0.4rem 0.8rem;
    }
    button:not(:disabled):hover {
        background: var(--portfolio-accent-subtle);
        border-color: var(--portfolio-accent-hover);
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
        background: var(--portfolio-viewer-control-surface);
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
        color: var(--portfolio-accent);
    }
    .viewer-navigation button:not(:disabled):hover {
        background: transparent;
        color: var(--portfolio-accent-hover);
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
        color: var(--portfolio-muted);
    }
    .viewer-close {
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        margin-left: auto;
        min-width: 5.5rem;
        min-height: 44px;
        padding: 0.4rem 1.25rem;
        border: 1px solid var(--portfolio-control-border);
        border-radius: 0.5rem;
        background: transparent;
        color: var(--portfolio-accent);
    }
    .viewer-close:not(:disabled):is(:hover, :focus-visible) {
        /* Match the category filters' subtle fill, retaining a red cue for Close. */
        background: ${({theme}) => theme.portfolioViewer.closeHoverSurface};
        border-color: ${({theme}) => theme.colors.highlight1};
        color: var(--portfolio-viewer-text);
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
        color: var(--portfolio-accent);
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
            border-top: 1px solid var(--portfolio-line);
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
export const GalleryMessage = styled.div`
    padding: 2.5rem 1.5rem;
    background: var(--portfolio-panel);
    border: 1px solid var(--portfolio-line);
    margin-bottom: 2rem;
    h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    p { color: var(--portfolio-muted); }
    button {
        min-height: 44px;
        padding: 0.6rem 1rem;
        margin-top: 1rem;
        color: inherit;
        border: 1px solid var(--portfolio-control-border);
    }
`;
