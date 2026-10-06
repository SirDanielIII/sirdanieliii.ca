import styled from 'styled-components';

export const Eyebrow = styled.p`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 0.7rem;
    line-height: 1.5;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--portfolio-accent);
`;

export const CollectionIntro = styled.div`
    padding: 2rem 0 1.25rem;
    h1 {
        font-size: clamp(3rem, 6vw, 5.5rem);
        line-height: 1.08;
        letter-spacing: -0.04em;
        margin: 1rem 0 1.4rem;
    }
    p {
        color: var(--portfolio-muted);
        max-width: 62rem;
        margin-bottom: 1rem;
    }
    p:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 600px) {
        padding: 1.5rem 0 1.25rem;
        h1 {
            font-size: 3rem;
        }
    }
`;

export const GalleryMessage = styled.div`
    padding: 2.5rem 1.5rem;
    background: var(--portfolio-panel, ${({theme}) => theme.portfolio.photography.surface});
    border: 1px solid var(--portfolio-line, ${({theme}) => theme.portfolio.photography.border});
    margin-bottom: 2rem;
    h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    p { color: var(--portfolio-muted, ${({theme}) => theme.portfolio.photography.muted}); }
    button {
        min-height: 44px;
        padding: 0.6rem 1rem;
        margin-top: 1rem;
        color: inherit;
        border: 1px solid var(--portfolio-control-border, ${({theme}) => theme.portfolio.photography.controlBorder});
    }
`;
