import {Fragment} from 'react';
import {Lightbox} from '../../../css/portfolio/shared/Lightbox.styles';
import {metadataRows, type Photo} from './photography';
import ViewerImage from '../../../shared/media/ViewerImage';
import {useImageViewer} from '../../../shared/media/useImageViewer';
import ViewerNavigation from '../../../shared/media/ViewerNavigation';

export default function PhotoViewer({items, index, opener, onNavigate, onClose}: {
    items: Photo[];
    index: number;
    opener: HTMLButtonElement | null;
    onNavigate?: (id: string) => void;
    onClose: () => void;
}) {
    const selected = items[index];
    const changePhoto = (offset: number) => {
        if (items.length > 1) onNavigate?.(items[(index + offset + items.length) % items.length].id);
    };
    const viewer = useImageViewer({opener, onClose, onNavigate: changePhoto,
        fallbackSelectors: [`#photo-${selected.id}`, '[aria-label="Photography categories"] a[aria-current]']});

    return (
        <Lightbox
            {...viewer.dialogProps}
            aria-labelledby="photo-viewer-title"
        >
            <ViewerImage key={selected.id} image={selected} noun="photograph" onDismiss={viewer.dismiss} onNavigate={changePhoto} />
            {/* All information and controls live beside the image; the sidebar scrolls independently. */}
            <aside className="viewer-sidebar" aria-label="Photograph information" tabIndex={0}>
                <div className="viewer-controls">
                    <ViewerNavigation index={index} count={items.length} noun="photograph" onNavigate={changePhoto} />
                    <button type="button" className="viewer-close" data-viewer-close onClick={viewer.dismiss} aria-label="Close photograph viewer">
                        Close
                    </button>
                </div>
                <header className="viewer-heading" aria-live="polite" aria-atomic="true">
                    <h2 id="photo-viewer-title">{selected.title}</h2>
                    <p>{selected.category_title}</p>
                </header>
                <div className="viewer-metadata">
                    <p>{selected.description || 'No description added.'}</p>
                    <dl>{metadataRows(selected).map(([label, value]) => <Fragment key={label}><dt>{label}</dt><dd>{value}</dd></Fragment>)}</dl>
                </div>
            </aside>
        </Lightbox>
    );
}
