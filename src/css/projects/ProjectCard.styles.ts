import styled from 'styled-components';

export interface CardPalette {
    title: string;
    background: string;
    description: string;
    accent: string;
    border: string;
    tagBackground: string;
    tagText: string;
}

export const Card = styled.article<{ $palette: CardPalette }>`
    width: 100%;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 484 / 920;
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: clamp(3px, 0.3vw, 5px) solid ${({$palette}) => $palette.border};
    background: ${({$palette}) => $palette.background};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 22px 44px rgba(0, 0, 0, 0.24);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`;

export const Artwork = styled.div<{ $background: string }>`
    position: relative;
    width: 76%;
    margin: clamp(1.25rem, 8.25cqw, 2.5rem) auto 0;
    flex: 0 0 auto;
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({$background}) => $background};

    @container (max-width: 19rem) {
        width: 68%;
        margin-top: 6cqw;
    }
`;

export const ThumbnailImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ArtworkPlaceholder = styled.div<{ $color: string }>`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(3.25rem, 18cqw, 9rem);
    opacity: 0.75;
`;

export const Content = styled.div`
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: clamp(0.7rem, 4.1cqw, 1.25rem) clamp(1.2rem, 8.25cqw, 2.5rem) clamp(0.65rem, 3.3cqw, 1rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-align: center;
`;

export const Title = styled.h2<{ $color: string }>`
    max-width: 100%;
    color: ${({$color}) => $color};
    font-family: 'BRLNSR', sans-serif;
    font-size: clamp(1.35rem, 7.4cqw, 2.25rem);
    font-weight: 400;
    line-height: 1.1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-transform: uppercase;
`;

export const Version = styled.p<{ $color: string }>`
    margin-top: clamp(0.15rem, 0.8cqw, 0.25rem);
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(1rem, 5.1cqw, 1.55rem);
    line-height: 1.25;
`;

export const Description = styled.p<{ $color: string }>`
    width: 100%;
    margin-top: clamp(0.65rem, 4.1cqw, 1.25rem);
    color: ${({$color}) => $color};
    font-size: clamp(0.9rem, 4.1cqw, 1.25rem);
    line-height: 1.25;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    overflow-wrap: anywhere;
`;

export const Tags = styled.ul`
    width: 100%;
    max-height: clamp(3.5rem, 17cqw, 5rem);
    margin-top: clamp(0.75rem, 5cqw, 1.5rem);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.4rem, 2.5cqw, 0.75rem);
    overflow: hidden;
    list-style: none;
`;

export const Tag = styled.li<{ $background: string; $color: string }>`
    max-width: 100%;
    padding: clamp(0.3rem, 1.5cqw, 0.45rem) clamp(0.65rem, 3.3cqw, 1rem);
    border-radius: 9px;
    background: ${({$background}) => $background};
    color: ${({$color}) => $color};
    font-size: clamp(0.85rem, 3.5cqw, 1.05rem);
    line-height: 1.1;
    overflow-wrap: anywhere;
`;

export const CardFooter = styled.footer`
    width: 100%;
    margin-top: auto;
    padding-top: clamp(0.75rem, 5cqw, 1.5rem);
    flex: 0 0 auto;
`;

export const Actions = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.4rem, 2.5cqw, 0.75rem);
    list-style: none;
`;

export const ActionItem = styled.li`
    flex: 1 1 clamp(3.75rem, 17cqw, 5rem);
    max-width: clamp(5.5rem, 25cqw, 7.75rem);
`;

export const ActionLink = styled.a<{ $background: string; $border: string }>`
    min-height: clamp(3rem, 15.4cqw, 4.65rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({$border}) => $border};
    border-radius: clamp(14px, 4.1cqw, 20px);
    background: ${({$background}) => $background};
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-3px);
        filter: brightness(1.12);
        box-shadow: 5px 7px 8px rgba(0, 0, 0, 0.24);
    }

    &:focus-visible {
        outline: 3px solid ${({$border}) => $border};
        outline-offset: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }

`;

export const ActionIcon = styled.img`
    width: clamp(2rem, 10.25cqw, 3.1rem);
    height: clamp(2rem, 10.25cqw, 3.1rem);
    object-fit: contain;
`;

export const LastUpdated = styled.p<{ $color: string }>`
    margin-top: clamp(0.5rem, 2.65cqw, 0.8rem);
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(0.75rem, 3.3cqw, 1rem);
    line-height: 1.25;
`;
