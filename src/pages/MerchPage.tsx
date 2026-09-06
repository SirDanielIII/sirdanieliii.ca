import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import MerchCard from '../components/pages/MerchCard';
import {merchCopy, merchItems, type MerchItem} from '../data/merch';

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
    font-size: clamp(3rem, 7vw, 4.5rem);
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

const ShopNote = styled.aside`
    margin-top: 3rem;
    padding: 1.75rem 1.25rem;
    border: 1px dashed ${({theme}) => theme.mode === 'dark' ? '#456b59' : '#a2d1bb'};
    border-radius: 12px;
    text-align: center;

    h2 {
        font-size: 1.25rem;
        font-weight: 400;
    }

    p {
        margin-top: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.5;
        opacity: 0.7;
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

const MerchPage = () => {
    const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const visibleItems = merchItems.filter(item => item.visible !== false);

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
                <Title>{merchCopy.title}</Title>
                <Tagline>{merchCopy.tagline}</Tagline>
                <Introduction>{merchCopy.introduction}</Introduction>
            </Intro>

            <section aria-labelledby="merch-collection-title">
                <CollectionHeading>
                    <h2 id="merch-collection-title">{merchCopy.collectionTitle}</h2>
                    <p>{merchCopy.collectionNote}</p>
                </CollectionHeading>
                {visibleItems.length > 0 ? (
                    <Grid>
                        {visibleItems.map((item, index) => (
                            <MerchCard
                                key={item.id}
                                item={item}
                                defaultButtonLabel={merchCopy.defaultButtonLabel}
                                onSelect={setSelectedItem}
                                eager={index < 3}
                            />
                        ))}
                    </Grid>
                ) : (
                    <EmptyState>
                        <h3>{merchCopy.emptyTitle}</h3>
                        <p>{merchCopy.emptyMessage}</p>
                    </EmptyState>
                )}
            </section>

            <ShopNote>
                <h2>{merchCopy.disclaimerTitle}</h2>
                <p>{merchCopy.disclaimer}</p>
            </ShopNote>

            <PurchaseDialog
                ref={dialogRef}
                aria-labelledby="merch-dialog-title"
                aria-describedby="merch-dialog-message merch-dialog-note"
                onClose={() => { setSelectedItem(null); }}
                onClick={event => {
                    if (event.target !== event.currentTarget) return;
                    const {left, right, top, bottom} = event.currentTarget.getBoundingClientRect();
                    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                        event.currentTarget.close();
                    }
                }}
            >
                <DialogProduct>{selectedItem?.name}</DialogProduct>
                <h2 id="merch-dialog-title">{merchCopy.dialogTitle}</h2>
                <Punchline id="merch-dialog-message">{selectedItem?.punchline}</Punchline>
                <DialogNote id="merch-dialog-note">{merchCopy.dialogNote}</DialogNote>
                <CloseButton type="button" autoFocus onClick={() => { dialogRef.current?.close(); }}>
                    {merchCopy.dialogCloseLabel}
                </CloseButton>
            </PurchaseDialog>
        </Page>
    );
};

export default MerchPage;
