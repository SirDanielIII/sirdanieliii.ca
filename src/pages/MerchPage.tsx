import {useCallback, useEffect, useRef, useState} from 'react';
import styled, {useTheme} from 'styled-components';
import MerchCard from '../components/pages/MerchCard';
import {merch, merchItems, type MerchDialogOptions, type MerchItem} from '../data/merch';
import {merchColourStyles} from '../utils/merchColours';

const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8.25rem 1.5rem 4.5rem;

    @media (max-width: 600px) {
        padding: 7rem 1.25rem 3rem;
    }
`;

const Intro = styled.div`
    margin: 0 auto 3.5rem;
    text-align: center;

    @media (max-width: 600px) {
        margin-bottom: 2.5rem;
    }
`;

const Title = styled.h1`
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'};
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0.08em;
`;

const Tagline = styled.p`
    margin-top: 1rem;
    font-size: clamp(1.3rem, 3vw, 1.75rem);
    line-height: 1.35;
`;

const Introduction = styled.p`
    margin-top: 0.65rem;
    font-size: 1.05rem;
    line-height: 1.5;
    opacity: 0.7;
`;

const CollectionHeading = styled.div`
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    border-bottom: 1px solid ${({theme}) => theme.mode === 'dark' ? '#353535' : '#dedede'};

    h2 {
        font-size: 1.05rem;
        font-weight: 400;
        letter-spacing: 0.1em;
    }

    p {
        font-size: 0.9rem;
        line-height: 1.4;
        opacity: 0.65;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;

    @media (max-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 1.5rem;
    }
`;

const EmptyState = styled.div`
    padding: 3rem 1.25rem;
    text-align: center;

    h3 {
        font-size: 1.6rem;
        font-weight: 400;
    }

    p {
        margin-top: 0.75rem;
        line-height: 1.5;
        opacity: 0.75;
    }
`;

const PurchaseDialog = styled.dialog`
    position: fixed;
    inset: 0;
    width: min(30rem, calc(100% - 2.5rem));
    max-height: calc(100dvh - 3rem);
    margin: auto;
    padding: clamp(1.5rem, 5vw, 2.25rem);
    overflow-y: auto;
    border: 2px solid ${({theme}) => theme.colors.highlight4};
    border-radius: 18px;
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};
    text-align: center;
    overflow-wrap: anywhere;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);

    &::backdrop {
        background: rgba(0, 0, 0, 0.72);
        backdrop-filter: blur(4px);
    }

    h2 {
        margin-top: 0.8rem;
        color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'};
        font-size: 2rem;
        font-weight: 400;
        line-height: 1.15;
    }
`;

const DialogProduct = styled.p`
    font-size: 0.85rem;
    line-height: 1.4;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.65;
`;

const Punchline = styled.p`
    margin-top: 1.25rem;
    font-size: 1.15rem;
    line-height: 1.5;
`;

const DialogNote = styled.p`
    margin-top: 1.25rem;
    font-size: 0.85rem;
    line-height: 1.5;
    opacity: 0.65;
`;

const CloseButton = styled.button`
    width: 100%;
    min-height: 46px;
    margin-top: 1.5rem;
    padding: 0.8rem 1rem;
    border: 0;
    border-radius: 8px;
    background: ${({theme}) => theme.colors.highlight4};
    color: #11261d;

    &:hover {
        filter: brightness(1.08);
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight4};
        outline-offset: 4px;
    }
`;

// Product data is static; dialog and theme changes do not need to filter it again.
const visibleItems = merchItems.filter(item => item.visible !== false);

const MerchPage = () => {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogOptions: MerchDialogOptions = {
        ...merch.dialog,
        ...selectedItem?.dialog,
    };
    const dialogProduct = dialogOptions.productName ?? selectedItem?.name;
    const dialogTitle = dialogOptions.title;
    const dialogMessage = dialogOptions.message;
    const dialogNote = dialogOptions.showNote ? dialogOptions.note : '';
    const dialogCloseLabel = (dialogOptions.closeLabel ?? 'Close').trim() || 'Close';
    const dialogDescriptionIds = [
        dialogMessage ? 'merch-dialog-message' : '',
        dialogNote ? 'merch-dialog-note' : '',
    ].filter(Boolean).join(' ') || undefined;

    const handleSelect = useCallback((item: MerchItem) => {
        if (item.action === 'file-not-found') {
            // Force the browser to render its native ERR_FILE_NOT_FOUND error page.
            // Navigating to a non-existent blob URL fails in Chromium's internal BlobRegistry,
            // triggering a file-not-found network failure without creating in-memory objects.
            window.location.assign(`blob:${window.location.origin}/HA_YOU_THOUGHT`);
            return;
        }

        const link = item.link;
        const chancePercent = link?.chancePercent ?? 100;
        const shouldOpenLink = link?.url && (
            chancePercent >= 100 || (chancePercent > 0 && Math.random() * 100 < chancePercent)
        );

        if (shouldOpenLink) {
            if (link.openInNewTab === false) {
                window.location.assign(link.url);
            } else {
                window.open(link.url, '_blank', 'noopener,noreferrer');
            }
            return;
        }

        if (item.dialog) setSelectedItem(item);
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!selectedItem || !dialog) return;

        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [selectedItem]);

    return (
        <Page>
            <Intro>
                <Title>{merch.title}</Title>
                <Tagline>{merch.tagline}</Tagline>
                <Introduction>{merch.introduction}</Introduction>
            </Intro>

            <section aria-labelledby="merch-collection-title">
                <CollectionHeading>
                    <h2 id="merch-collection-title">{merch.collectionTitle}</h2>
                    <p>{merch.collectionNote}</p>
                </CollectionHeading>
                {visibleItems.length > 0 ? (
                    <Grid style={merchColourStyles(merch.cardColours, theme.mode)}>
                        {visibleItems.map((item, index) => (
                            <MerchCard
                                key={item.id}
                                item={item}
                                defaultButtonLabel={merch.defaultButtonLabel}
                                onSelect={handleSelect}
                                eager={index < 3}
                            />
                        ))}
                    </Grid>
                ) : (
                    <EmptyState>
                        <h3>{merch.emptyTitle}</h3>
                        <p>{merch.emptyMessage}</p>
                    </EmptyState>
                )}
            </section>

            <PurchaseDialog
                ref={dialogRef}
                aria-labelledby={dialogTitle ? 'merch-dialog-title' : undefined}
                aria-label={dialogTitle ? undefined : selectedItem?.name}
                aria-describedby={dialogDescriptionIds}
                onClose={() => { setSelectedItem(null); }}
                onClick={event => {
                    if (event.target !== event.currentTarget) return;
                    const {left, right, top, bottom} = event.currentTarget.getBoundingClientRect();
                    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                        event.currentTarget.close();
                    }
                }}
            >
                {dialogOptions.showProductName && dialogProduct && <DialogProduct>{dialogProduct}</DialogProduct>}
                {dialogTitle && <h2 id="merch-dialog-title">{dialogTitle}</h2>}
                {dialogMessage && <Punchline id="merch-dialog-message">{dialogMessage}</Punchline>}
                {dialogNote && <DialogNote id="merch-dialog-note">{dialogNote}</DialogNote>}
                <CloseButton type="button" autoFocus onClick={() => { dialogRef.current?.close(); }}>
                    {dialogCloseLabel}
                </CloseButton>
            </PurchaseDialog>
        </Page>
    );
};

export default MerchPage;
