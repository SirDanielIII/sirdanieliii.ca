import styled, {css} from 'styled-components';
import {monochromeIcon} from '../../icon.styles';
import type {PortfolioMedium} from '../../theme';

export const Page = styled.main<{$medium?: PortfolioMedium}>`
    ${({$medium}) => ($medium === 'videography' || $medium === 'short-films') && css`
        --portfolio-divider-space: 2.5rem;
        @media (max-width: 700px) { --portfolio-divider-space: 2rem; }
    `}
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
    /* Shared viewer and ExternalLink descendants render this class. */
    /*noinspection CssUnusedSymbol*/
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
    #collections {
        scroll-margin-top: 100px;
    }
    /* VideoThumbnail renders the play control. */
    /*noinspection CssUnusedSymbol*/
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

export const Contact = styled.section<{$compact?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    border-top: 1px solid var(--portfolio-line);
    margin-top: var(--portfolio-divider-space, ${({$compact}) => $compact ? '2rem' : '2.5rem'});
    padding: 1.5rem 0 4rem;
    padding-top: var(--portfolio-divider-space, 1.5rem);
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
        align-items: center;
        gap: 2rem;
    }
    .contact-link img { width: 24px; height: 24px; flex-shrink: 0; ${monochromeIcon} }
    .contact-link:hover {
        background: var(--portfolio-panel);
    }
    @media (max-width: 600px) {
        align-items: start;
        flex-direction: column;
        margin-top: var(--portfolio-divider-space, 2rem);
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
