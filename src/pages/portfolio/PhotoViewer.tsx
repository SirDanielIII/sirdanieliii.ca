import {Fragment} from 'react';
import {Lightbox} from '../../css/portfolio/PortfolioPage.styles';
import {metadataRows, type Photo} from './photography';
import ViewerImage from '../../shared/media/ViewerImage';
import {useModalDialog} from '../../shared/media/useModalDialog';

export default function PhotoViewer({items, index, opener, onNavigate, onClose}: {
    items: Photo[];
    index: number;
    opener: HTMLButtonElement | null;
    onNavigate?: (id: string) => void;
    onClose: () => void;
}) {
    const selected = items[index];
    const modal = useModalDialog(opener, onClose, [`#photo-${selected.id}`, '[aria-label="Photography categories"] a[aria-current]']);
    const changePhoto = (offset: number) => {
        if (items.length > 1) onNavigate?.(items[(index + offset + items.length) % items.length].id);
    };

    return (
        <Lightbox
            {...modal}
            onClick={event => {
                if (event.target === event.currentTarget) event.currentTarget.close();
            }}
            aria-labelledby="photo-viewer-title"
            onKeyDown={event => {
                // Leave arrow keys available for scrolling the metadata panel and browser shortcuts.
                if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).matches('.viewer-sidebar') || (event.target as HTMLElement).closest('.viewer-metadata')) return;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    changePhoto(event.key === 'ArrowLeft' ? -1 : 1);
                }
            }}
        >
            <ViewerImage key={selected.id} image={selected} noun="photograph" onDismiss={() => { modal.ref.current?.close(); }} />
            {/* All information and controls live beside the image; the sidebar scrolls independently. */}
            <aside className="viewer-sidebar" aria-label="Photograph information" tabIndex={0}>
                <div className="viewer-controls">
                    <nav className="viewer-navigation" aria-label="Photograph navigation">
                        <button type="button" onClick={() => { changePhoto(-1); }} aria-label="Previous photograph" disabled={items.length < 2}><span className="viewer-arrow viewer-arrow-left" aria-hidden="true" /></button>
                        <span className="viewer-count"><span className="sr-only">Photograph </span>{String(index + 1).padStart(2, '0')}<span aria-hidden="true"> / </span><span className="sr-only"> of </span>{items.length}</span>
                        <button type="button" onClick={() => { changePhoto(1); }} aria-label="Next photograph" disabled={items.length < 2}><span className="viewer-arrow viewer-arrow-right" aria-hidden="true" /></button>
                    </nav>
                    <button type="button" className="viewer-close" data-viewer-close onClick={() => { modal.ref.current?.close(); }} aria-label="Close photograph viewer">
                        Close
                    </button>
                </div>
                <header className="viewer-heading" aria-live="polite" aria-atomic="true">
                    <h2 id="photo-viewer-title">{selected.title}</h2>
                    <p>{selected.category_title}.</p>
                </header>
                <div className="viewer-metadata">
                    <p>{selected.description || 'No description added.'}</p>
                    <dl>{metadataRows(selected).map(([label, value]) => <Fragment key={label}><dt>{label}</dt><dd>{value}</dd></Fragment>)}</dl>
                </div>
            </aside>
        </Lightbox>
    );
}
