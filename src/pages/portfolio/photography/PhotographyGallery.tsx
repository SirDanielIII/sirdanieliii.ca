import {useState} from 'react';
import {GalleryMessage} from '../../../css/portfolio/shared/PortfolioTypography.styles';
import {PhotoCard, PhotoGrid} from '../../../css/portfolio/photography/Photography.styles';
import {gallerySource, photoAspectRatio, type Photo, type PhotographyCategory} from './photography';

function GalleryItem({photo, eager, onOpen}: {photo: Photo; eager: boolean; onOpen: (opener: HTMLButtonElement) => void}) {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    return (
        <PhotoCard>
            <button id={`photo-${photo.id}`} type="button" onClick={event => { onOpen(event.currentTarget); }} aria-label={`View ${photo.title}`} style={{aspectRatio: photoAspectRatio(photo)}} data-loading={status === 'loading'}>
                {status !== 'error' && <img
                    src={gallerySource(photo)}
                    alt={photo.alt}
                    width={photo.width ?? undefined}
                    height={photo.height ?? undefined}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={() => { setStatus('ready'); }}
                    onError={() => { setStatus('error'); }}
                />}
                {status === 'loading' && <span className="photo-placeholder" aria-hidden="true" />}
                {status === 'error' && <span className="photo-placeholder photo-error">Image unavailable<br />Open photograph</span>}
            </button>
            <figcaption><span>{photo.title}</span><small>{photo.category_title}</small></figcaption>
        </PhotoCard>
    );
}

export default function PhotographyGallery({items, category, status, retry, onOpen}: {
    items: Photo[];
    category?: PhotographyCategory;
    status: 'loading' | 'ready' | 'error';
    retry: () => void;
    onOpen: (id: string, opener: HTMLButtonElement) => void;
}) {
    return (
        <>
            {category?.status === 'coming-soon' && <GalleryMessage><h2>{category.title} · Coming Soon</h2><p>This collection is still in progress. Check back for new photographs.</p></GalleryMessage>}
            {status === 'error' && <GalleryMessage><p>Photography could not be loaded. Please try again.</p><button type="button" onClick={retry}>Try again</button></GalleryMessage>}
            {status === 'ready' && !items.length && category?.status !== 'coming-soon' && <GalleryMessage><p>No photographs are available in this collection yet.</p></GalleryMessage>}
            <PhotoGrid id="photo-gallery" aria-label="Photographs" aria-busy={status === 'loading'}>
                {status === 'loading' && Array.from({length: 6}, (_, index) => <PhotoCard key={index} aria-hidden="true">
                    <div className="skeleton-image" style={{aspectRatio: index % 2 ? '3 / 2' : '2 / 3'}} />
                    <figcaption><span className="skeleton-caption" /><small className="skeleton-caption" /></figcaption>
                </PhotoCard>)}
                {items.map((photo, index) => <GalleryItem key={`${photo.id}:${gallerySource(photo)}`} photo={photo} eager={index < 3} onOpen={opener => { onOpen(photo.id, opener); }} />)}
            </PhotoGrid>
        </>
    );
}
