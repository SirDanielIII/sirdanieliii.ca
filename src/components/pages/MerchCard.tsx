import {useState} from 'react';
import styled from 'styled-components';
import type {MerchItem} from '../../data/merch';

const Card = styled.article`
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#353535' : '#dedede'};
    border-radius: 18px;
    background: ${({theme}) => theme.colors.background2};
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        border-color: ${({theme}) => theme.colors.highlight4};
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`;

const Artwork = styled.div`
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: ${({theme}) => theme.colors.sectionCard};
`;

const Photo = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Placeholder = styled.div`
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

const Badge = styled.span`
    position: absolute;
    top: 1rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
    padding: 0.4rem 0.7rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background: #fffdf4;
    color: #242424;
    font-size: 0.8rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
`;

const Content = styled.div`
    flex: 1;
    padding: clamp(1.15rem, 2.2vw, 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-wrap: anywhere;
`;

const Name = styled.h3`
    font-size: clamp(1.4rem, 2vw, 1.65rem);
    font-weight: 400;
    line-height: 1.15;
`;

const Description = styled.p`
    margin-top: 0.75rem;
    margin-bottom: 1.4rem;
    font-size: 1.05rem;
    line-height: 1.5;
    opacity: 0.78;
`;

const PriceBlock = styled.div`
    margin-top: auto;
`;

const Price = styled.p`
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'};
    font-size: 1.8rem;
    line-height: 1.15;
`;

const PriceNote = styled.p`
    margin-top: 0.35rem;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 0.7;
`;

const PurchaseButton = styled.button`
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
    background: ${({theme}) => theme.mode === 'dark' ? '#1b2c24' : '#e5f5ed'};
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#166344'};
    text-align: left;
    transition: background-color 0.18s ease, color 0.18s ease;

    svg {
        flex: 0 0 auto;
        width: 1.1rem;
        height: 1.1rem;
    }

    &:hover {
        background: ${({theme}) => theme.colors.highlight4};
        color: #11261d;
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight4};
        outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

interface MerchCardProps {
    item: MerchItem;
    defaultButtonLabel: string;
    onSelect: (item: MerchItem) => void;
    eager?: boolean;
}

const MerchCard = ({item, defaultButtonLabel, onSelect, eager = false}: MerchCardProps) => {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const titleId = `merch-${item.id}`;
    const buttonLabel = item.buttonLabel ?? defaultButtonLabel;

    return (
        <Card aria-labelledby={titleId}>
            <Artwork>
                {item.image && failedImage !== item.image ? (
                    <Photo
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        loading={eager ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={() => { setFailedImage(item.image ?? null); }}
                    />
                ) : (
                    <Placeholder>
                        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="m8 19 24-12 24 12v27L32 58 8 46V19Z M8 19l24 12 24-12 M32 31v27 M20 13l24 12v10"/>
                        </svg>
                        <span>Use your imagination.</span>
                    </Placeholder>
                )}
                {item.badge && <Badge>{item.badge}</Badge>}
            </Artwork>
            <Content>
                <Name id={titleId}>{item.name}</Name>
                <Description>{item.description}</Description>
                <PriceBlock>
                    <Price>{item.price}</Price>
                    {item.priceNote && <PriceNote>{item.priceNote}</PriceNote>}
                </PriceBlock>
                <PurchaseButton
                    type="button"
                    onClick={() => { onSelect(item); }}
                    aria-label={`${buttonLabel}: ${item.name}`}
                    aria-haspopup="dialog"
                >
                    {buttonLabel}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M4 12h15m-6-6 6 6-6 6"/>
                    </svg>
                </PurchaseButton>
            </Content>
        </Card>
    );
};

export default MerchCard;
