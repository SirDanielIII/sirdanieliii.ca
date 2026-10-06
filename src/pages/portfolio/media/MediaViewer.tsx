import {GalleryDialog, VideoDialog} from '../../../css/portfolio/media/MediaViewer.styles';
import {useModalDialog} from '../../../shared/media/useModalDialog';
import ViewerImage from '../../../shared/media/ViewerImage';
import ViewerNavigation from '../../../shared/media/ViewerNavigation';
import {useImageViewer} from '../../../shared/media/useImageViewer';
import PortfolioVideoPlayer from './PortfolioVideoPlayer';
import ExternalLink from '../shared/ExternalLink';
import type {ViewerSelection} from './useMediaViewer';

function GalleryViewer({selection, onNavigate, onClose}: {
    selection: Extract<ViewerSelection, {kind: 'gallery'}>;
    onNavigate: (offset: number) => void;
    onClose: () => void;
}) {
    const viewer = useImageViewer({opener: selection.opener, onClose, onNavigate,
        fallbackSelectors: [`#film-${selection.film.slug} button`]});
    const image = selection.images[selection.index];
    return <GalleryDialog {...viewer.dialogProps} aria-labelledby="media-gallery-title">
        <header className="viewer-controls">
            <h2 id="media-gallery-title">{image.title}</h2>
            <button type="button" className="viewer-close" data-viewer-close onClick={viewer.dismiss} aria-label="Close image gallery">Close</button>
        </header>
        <ViewerImage key={image.src} image={image} onDismiss={viewer.dismiss} onNavigate={onNavigate} />
        <footer className="gallery-footer">
            <p aria-live="polite" aria-atomic="true">{image.kind} · {selection.index + 1} of {selection.images.length}</p>
            <ViewerNavigation index={selection.index} count={selection.images.length} onNavigate={onNavigate} />
        </footer>
    </GalleryDialog>;
}

function VideoViewer({selection, onClose}: {selection: Extract<ViewerSelection, {kind: 'video'}>; onClose: () => void}) {
    const {work, collection, description, link} = selection.entry;
    const {video, isTrailer} = selection;
    const title = isTrailer ? `${work.title} — Trailer` : work.title;
    const modal = useModalDialog(selection.opener, onClose, [`#film-${work.slug} button`, `#work-${work.slug} button`]);
    const isFilm = 'year' in work;
    const copy = isFilm ? work.synopsis : work.description || description;
    const details = isFilm ? `${String(work.year)} · ${work.type}`
        : [work.date, collection === work.title ? '' : collection].filter(Boolean).join(' · ');
    return <VideoDialog {...modal} aria-labelledby="portfolio-video-title">
        <div className="video-viewer-media">
            <PortfolioVideoPlayer key={`${work.slug}-${isTrailer ? 'trailer' : 'film'}`} video={video} title={title} poster={work.thumbnail?.src} />
        </div>
        <aside className="viewer-sidebar" aria-label="Video information" tabIndex={0}>
            <div className="viewer-controls">
                <button type="button" className="viewer-close" data-viewer-close onClick={() => { modal.ref.current?.close(); }} aria-label="Close video player">Close</button>
            </div>
            <header className="viewer-heading">
                <h2 id="portfolio-video-title">{title}</h2>
                {details && <p>{details}</p>}
            </header>
            <div className="viewer-metadata">
                {copy && <p>{copy}</p>}
                {isFilm && work.funFact && <div className="video-production-note"><h3>Production note</h3><p>{work.funFact}</p></div>}
            </div>
            <div className="video-viewer-links">
                {link && <ExternalLink href={link.url}>{link.label}</ExternalLink>}
                {video.type === 'youtube' && <ExternalLink href={video.url}>Watch on YouTube</ExternalLink>}
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
