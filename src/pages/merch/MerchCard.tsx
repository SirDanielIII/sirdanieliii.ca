import {memo, useState} from 'react';
import {useTheme} from 'styled-components';
import type {MerchItem} from './merch';
import {merchColourStyles} from './merchColours';
import {
    Card,
    Artwork,
    Photo,
    Placeholder,
    Badge,
    Content,
    Name,
    Description,
    PriceBlock,
    Price,
    PriceNote,
    PurchaseButton,
} from '../../css/merch/MerchCard.styles';

interface MerchCardProps {
    item: MerchItem;
    defaultButtonLabel: string;
    onSelect: (item: MerchItem) => void;
    eager?: boolean;
}

const MerchCard = ({item, defaultButtonLabel, onSelect, eager = false}: MerchCardProps) => {
    const theme = useTheme();
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const titleId = `merch-${item.id}`;
    const buttonLabel = item.buttonLabel ?? defaultButtonLabel;
    // Shared colours inherit from the grid; resolve only this item's overrides here.
    const colourStyles = item.colours ? merchColourStyles(item.colours, theme.mode) : undefined;
    const canShowDialog = item.dialog && (!item.link?.url || (item.link.chancePercent ?? 100) < 100);

    return (
        <Card aria-labelledby={titleId} style={colourStyles}>
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
                    <PriceNote aria-hidden={item.priceNote ? undefined : true}>{item.priceNote}</PriceNote>
                </PriceBlock>
                <PurchaseButton
                    type="button"
                    onClick={() => { onSelect(item); }}
                    aria-label={`${buttonLabel}: ${item.name}`}
                    aria-haspopup={canShowDialog ? 'dialog' : undefined}
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

export default memo(MerchCard);
