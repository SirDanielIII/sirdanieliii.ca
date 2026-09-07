import MerchDialog from './MerchDialog';
import {useCallback, useState} from 'react';
import {useTheme} from 'styled-components';
import MerchCard from './MerchCard';
import {merch, merchItems, type MerchItem} from './merch';
import {merchColourStyles} from './merchColours';
import {
    Page,
    Intro,
    Title,
    Tagline,
    Introduction,
    CollectionHeading,
    Grid,
    EmptyState,
} from '../../css/merch/MerchPage.styles';

// Product data is static; dialog and theme changes do not need to filter it again.
const visibleItems = merchItems.filter(item => item.visible !== false);

const MerchPage = () => {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
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

            {selectedItem && <MerchDialog item={selectedItem} onClose={() => { setSelectedItem(null); }}/>}
        </Page>
    );
};

export default MerchPage;
