import styled from 'styled-components';

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
