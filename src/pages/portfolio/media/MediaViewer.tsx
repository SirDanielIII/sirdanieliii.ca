import {useRef} from 'react';
import {GalleryDialog, VideoDialog} from '../../../css/portfolio/media/MediaViewer.styles';
import {useModalDialog} from '../../../shared/media/useModalDialog';
import ViewerImage from '../../../shared/media/ViewerImage';
import PortfolioVideoPlayer from './PortfolioVideoPlayer';
import ExternalLink from '../shared/ExternalLink';
import type {ViewerSelection} from './useMediaViewer';

function GalleryViewer({selection, onNavigate, onClose}: {
    selection: Extract<ViewerSelection, {kind: 'gallery'}>;
    onNavigate: (offset: number) => void;
    onClose: () => void;
}) {
    const modal = useModalDialog(selection.opener, onClose, [`#film-${selection.film.slug} button`]);
    const start = useRef<{x: number; y: number} | null>(null);
    const image = selection.images[selection.index];
    return <GalleryDialog {...modal} aria-labelledby="media-gallery-title"
        onKeyDown={event => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                onNavigate(event.key === 'ArrowLeft' ? -1 : 1);
            }
        }}>
        <header className="viewer-controls">
            <h2 id="media-gallery-title">{image.title}</h2>
            <button type="button" className="viewer-close" data-viewer-close onClick={() => { modal.ref.current?.close(); }} aria-label="Close image gallery">Close</button>
        </header>
        <div className="viewer-image"
            onTouchStart={event => {
                const touch = event.touches[0];
                start.current = event.touches.length === 1 ? {x: touch.clientX, y: touch.clientY} : null;
            }}
            onTouchCancel={() => { start.current = null; }}
            onTouchEnd={event => {
                const touch = event.changedTouches[0];
                if (start.current) {
                    const dx = touch.clientX - start.current.x;
                    const dy = touch.clientY - start.current.y;
                    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) onNavigate(dx < 0 ? 1 : -1);
                }
                start.current = null;
            }}>
            <ViewerImage key={image.src} image={image} />
        </div>
        <footer className="gallery-footer">
            <p aria-live="polite" aria-atomic="true">{image.kind} · {selection.index + 1} of {selection.images.length}</p>
            <nav className="viewer-navigation" aria-label="Image navigation">
                <button type="button" aria-label="Previous image" disabled={selection.images.length < 2} onClick={() => { onNavigate(-1); }}><span className="viewer-arrow viewer-arrow-left" aria-hidden="true" /></button>
                <span className="viewer-count" aria-hidden="true">{String(selection.index + 1).padStart(2, '0')} / {selection.images.length}</span>
                <button type="button" aria-label="Next image" disabled={selection.images.length < 2} onClick={() => { onNavigate(1); }}><span className="viewer-arrow viewer-arrow-right" aria-hidden="true" /></button>
            </nav>
        </footer>
    </GalleryDialog>;
}

function VideoViewer({selection, onClose}: {selection: Extract<ViewerSelection, {kind: 'video'}>; onClose: () => void}) {
    const {work, collection, description, link} = selection.entry;
    const modal = useModalDialog(selection.opener, onClose, [`#film-${work.slug} button`, `#work-${work.slug} button`]);
    const isFilm = 'year' in work;
    const copy = isFilm ? work.synopsis : work.description || description;
    const details = isFilm ? `${String(work.year)} · ${work.type}`
        : [work.date, collection === work.title ? '' : collection].filter(Boolean).join(' · ');
    if (!work.video) return null;
    return <VideoDialog {...modal} aria-labelledby="portfolio-video-title">
        <div className="video-viewer-media">
            <PortfolioVideoPlayer key={work.slug} video={work.video} title={work.title} poster={work.thumbnail?.previewSrc ?? work.thumbnail?.src} />
        </div>
        <aside className="viewer-sidebar" aria-label="Video information" tabIndex={0}>
            <div className="viewer-controls">
                <button type="button" className="viewer-close" data-viewer-close onClick={() => { modal.ref.current?.close(); }} aria-label="Close video player">Close</button>
            </div>
            <header className="viewer-heading">
                <h2 id="portfolio-video-title">{work.title}</h2>
                {details && <p>{details}</p>}
            </header>
            <div className="viewer-metadata">
                {copy && <p>{copy}</p>}
                {isFilm && work.funFact && <div className="video-production-note"><h3>Production note</h3><p>{work.funFact}</p></div>}
            </div>
            <div className="video-viewer-links">
                {link && <ExternalLink href={link.url}>{link.label}</ExternalLink>}
                {work.video.type === 'youtube' && <ExternalLink href={work.video.url}>Watch on YouTube</ExternalLink>}
            </div>
        </aside>
    </VideoDialog>;
}

export default function MediaViewer({selection, onClose, onNavigate}: {
    selection: ViewerSelection | null;
    onClose: () => void;
    onNavigate: (offset: number) => void;
}) {
    if (!selection) return null;
    return selection.kind === 'video'
        ? <VideoViewer selection={selection} onClose={onClose} />
        : <GalleryViewer selection={selection} onClose={onClose} onNavigate={onNavigate} />;
}
