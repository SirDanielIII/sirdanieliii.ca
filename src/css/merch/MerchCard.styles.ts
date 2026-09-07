import styled from 'styled-components';

export const Card = styled.article`
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#353535' : '#dedede'};
    border-radius: 18px;
    background: var(--merch-card-background, ${({theme}) => theme.colors.background2});
    color: var(--merch-card-text, ${({theme}) => theme.colors.text});
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        border-color: ${({theme}) => theme.colors.highlight5};
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`;

export const Artwork = styled.div`
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: ${({theme}) => theme.colors.sectionCard};
`;

export const Photo = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Placeholder = styled.div`
    height: 100%;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-align: center;

    svg {
        width: 4rem;
        height: 4rem;
        opacity: 0.65;
    }
`;

export const Badge = styled.span`
    position: absolute;
    top: 1rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
    padding: 0.4rem 0.7rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background-color: var(--merch-card-badgeBackground, #fffdf4);
    color: var(--merch-card-badgeText, #242424);
    font-size: 0.8rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
`;

export const Content = styled.div`
    flex: 1;
    padding: clamp(1.15rem, 2.2vw, 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-wrap: anywhere;
`;

export const Name = styled.h3`
    font-size: clamp(1.4rem, 2vw, 1.65rem);
    font-weight: 400;
    line-height: 1.15;
`;

export const Description = styled.p`
    margin-top: 0.75rem;
    margin-bottom: 1.4rem;
    font-size: 1.05rem;
    line-height: 1.5;
    opacity: 0.78;
`;

export const PriceBlock = styled.div`
    margin-top: auto;
`;

export const Price = styled.p`
    color: var(--merch-card-price, ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'});
    font-size: 1.8rem;
    line-height: 1.15;
`;

export const PriceNote = styled.p`
    min-height: 1.4em;
    margin-top: 0.35rem;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 0.7;
`;

export const PurchaseButton = styled.button`
    width: 100%;
    min-height: 46px;
    margin-top: 1.25rem;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#456b59' : '#a2d1bb'};
    border-radius: 8px;
    background: var(--merch-card-buttonBackground, ${({theme}) => theme.mode === 'dark' ? '#1b2c24' : '#e5f5ed'});
    color: var(--merch-card-buttonText, ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#166344'});
    text-align: left;
    transition: background-color 0.18s ease, color 0.18s ease;

    svg {
        flex: 0 0 auto;
        width: 1.1rem;
        height: 1.1rem;
    }

    &:hover {
        background: var(--merch-card-buttonBackground, ${({theme}) => theme.colors.highlight4});
        color: var(--merch-card-buttonText, #11261d);
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight4};
        outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;
