import styled from 'styled-components';
import {Link} from 'react-router';

export const Page = styled.main<{$cinema?: boolean}>`
    --portfolio-accent: ${({theme, $cinema}) => ($cinema ? (theme.mode === 'dark' ? '#e6c990' : '#805e23') : theme.mode === 'dark' ? '#c4b3ef' : '#705397')};
    --portfolio-muted: ${({theme}) => (theme.mode === 'dark' ? '#aaa5b1' : '#66616d')};
    --portfolio-line: ${({theme}) => (theme.mode === 'dark' ? '#343039' : '#dad5df')};
    --portfolio-panel: ${({theme}) => (theme.mode === 'dark' ? '#1d1b20' : '#efecf2')};
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
        outline: 2px solid var(--portfolio-accent);
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
    .archive-link {
        margin-top: 3rem;
        font-size: 0.85rem;
        color: var(--portfolio-muted);
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }
    .archive-link a {
        text-decoration: underline;
        text-underline-offset: 4px;
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
    .round-arrow {
        position: absolute;
        z-index: 1;
        right: 1rem;
        bottom: 1rem;
        border-radius: 50%;
        border: 1px solid #fff9;
        width: 38px;
        height: 38px;
        display: grid;
        place-items: center;
        color: white;
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

export const Filters = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 2rem;
    button {
        min-height: 44px;
        padding: 0.7rem 1rem;
        border: 1px solid var(--portfolio-line);
        color: inherit;
        font-size: 0.85rem;
        border-radius: 2px;
    }
    button[aria-pressed='true'] {
        background: var(--portfolio-accent);
        color: ${({theme}) => (theme.mode === 'dark' ? '#1c1724' : '#fff')};
        border-color: var(--portfolio-accent);
    }
    button:hover {
        border-color: var(--portfolio-accent);
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
        height: auto;
        transition: transform 0.35s;
    }
    button:hover img {
        transform: scale(1.025);
    }
    .enlarge {
        position: absolute;
        bottom: 0.8rem;
        right: 0.8rem;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        background: #12121299;
        color: white;
        border-radius: 50%;
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
    width: min(1100px, 96vw);
    max-width: 96vw;
    height: min(900px, 94dvh);
    max-height: 94dvh;
    border: 1px solid #45414a;
    background: #141217;
    color: #f7f3fc;
    padding: 1rem;
    &[open] {
        display: flex;
        flex-direction: column;
    }
    &::backdrop {
        background: #000e;
    }
    > img {
        width: 100%;
        height: 0;
        flex: 1;
        min-height: 0;
        object-fit: contain;
    }
    button {
        color: inherit;
        min-width: 44px;
        min-height: 44px;
        border: 1px solid #665d73;
        padding: 0.4rem 0.8rem;
    }
    button:focus-visible {
        outline-color: #c4b3ef;
    }
    .viewer-toolbar,
    .viewer-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-shrink: 0;
    }
    .viewer-toolbar {
        padding-bottom: 1rem;
        font-size: 0.8rem;
    }
    .viewer-caption {
        padding-top: 1rem;
        text-align: center;
    }
    h2 {
        font-size: 1.25rem;
    }
    p {
        font-size: 0.8rem;
        color: #bfb7ca;
        margin-top: 0.25rem;
    }
`;

export const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.5rem 2rem;
    @media (max-width: 650px) {
        grid-template-columns: 1fr;
    }
`;

export const VideoCard = styled.article<{$featured: boolean}>`
    grid-column: ${({$featured}) => ($featured ? '1 / -1' : 'auto')};
    display: ${({$featured}) => ($featured ? 'grid' : 'block')};
    grid-template-columns: 1.6fr 1fr;
    background: ${({$featured}) => ($featured ? 'var(--portfolio-panel)' : 'transparent')};
    .video-copy {
        padding: ${({$featured}) => ($featured ? '2rem' : '1.3rem 0 0')};
        align-self: center;
    }
    h2 {
        font-size: ${({$featured}) => ($featured ? '2.3rem' : '1.75rem')};
        line-height: 1.2;
        margin: 0.6rem 0;
    }
    .video-copy > p:not(:first-child) {
        color: var(--portfolio-muted);
        font-size: 0.95rem;
    }
    .text-link {
        margin-top: 1rem;
        font-size: 0.85rem;
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        h2 {
            font-size: 1.75rem;
        }
    }
`;

export const VideoImage = styled.a`
    position: relative;
    display: block;
    aspect-ratio: 16 / 9;
    align-self: center;
    overflow: hidden;
    background: #0b0b0b;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }
    .featured-label {
        position: absolute;
        left: 1rem;
        top: 1rem;
        padding: 0.5rem 0.75rem;
        background: #151119e6;
        color: #eee5ff;
        text-transform: uppercase;
        font-size: 0.6rem;
        letter-spacing: 0.15em;
    }
    &:hover .play {
        background: #111d;
    }
`;

export const EditingWork = styled.section`
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 2rem;
    align-items: center;
    margin-top: 3.5rem;
    padding: 2rem;
    border: 1px solid var(--portfolio-line);
    img {
        width: 100%;
        height: auto;
    }
    h2 {
        font-size: 2rem;
        margin: 0.4rem 0;
    }
    p:not(:first-child) {
        color: var(--portfolio-muted);
    }
    .editing-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.5rem;
        margin-top: 1rem;
        font-size: 0.85rem;
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding: 1.5rem;
        img {
            width: 85px;
        }
    }
`;

export const FilmFeature = styled.article`
    margin-bottom: 4rem;
    .film-cover {
        display: block;
        position: relative;
        background: #080808;
        padding: 2.5rem 0;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
    }
    .feature-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        padding-top: 1.8rem;
    }
    h2 {
        font-size: clamp(2.5rem, 5vw, 4rem);
        margin: 0.5rem 0;
    }
    .feature-caption p:not(:first-child) {
        color: var(--portfolio-muted);
    }
    .text-link {
        white-space: nowrap;
    }
    .film-cover:hover .play {
        background: #111d;
    }
    @media (max-width: 600px) {
        .film-cover {
            padding: 1rem 0;
        }
        .feature-caption {
            align-items: start;
            flex-direction: column;
        }
    }
`;

export const FilmList = styled.div`
    display: grid;
`;

export const FilmRow = styled.article`
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr) minmax(0, 1.15fr);
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--portfolio-line);
    .film-number {
        color: var(--portfolio-muted);
        font-size: 0.8rem;
        align-self: start;
    }
    .film-thumbnail {
        display: block;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
    h2 {
        font-size: clamp(1.5rem, 3vw, 2.4rem);
        margin: 0.7rem 0;
    }
    .text-link {
        font-size: 0.85rem;
    }
    @media (max-width: 600px) {
        grid-template-columns: 1.3rem minmax(0, 1fr);
        gap: 1rem;
        > div {
            grid-column: 2;
        }
    }
`;

export const Stills = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
    grid-column: 1 / -1;
    img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: auto;
    }
`;
