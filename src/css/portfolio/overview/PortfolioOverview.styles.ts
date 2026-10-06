import styled from 'styled-components';
import {Link} from 'react-router';

export const About = styled.section`
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    align-items: center;
    gap: 3.5rem;
    padding: 1rem 0 4.5rem;
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
    .about-copy p + p {
        margin-top: 1rem;
    }
    @media (max-width: 800px) {
        gap: 1.5rem;
        h1 {
            font-size: 3.5rem;
        }
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding-bottom: 3rem;
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
    margin-bottom: 1.5rem;
    padding-top: 1.5rem;
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
    /* PortfolioOverview renders these collection-card descendants. */
    /*noinspection CssUnusedSymbol*/
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
    /*noinspection CssUnusedSymbol*/
    .cover::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(transparent 55%, #0007);
    }
    /*noinspection CssUnusedSymbol*/
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
