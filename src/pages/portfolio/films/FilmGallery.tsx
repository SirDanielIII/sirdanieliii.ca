import {FilmGalleryFrame} from '../../../css/portfolio/films/Films.styles';
import {filmImages, type Film} from '../media/media';
import type {OpenGallery} from '../media/useMediaViewer';

export default function FilmGallery({film, onOpen}: {film: Film; onOpen: OpenGallery}) {
    if (!film.posters.length && !film.screenshots.length) return null;
    const images = filmImages(film);
    return <FilmGalleryFrame aria-label={`${film.title} artwork`}>
        {film.posters.length > 0 && <div className="poster-set"><h4 className="gallery-label">Posters</h4><div className="poster-images">
            {film.posters.map(image => <button key={image.src} type="button" aria-label={`Enlarge ${image.title}`}
                onClick={event => { onOpen(film, images.findIndex(item => item.src === image.src), event.currentTarget); }}>
                <img src={image.previewSrc ?? image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
            </button>)}
        </div></div>}
        {film.screenshots.length > 0 && <div className="still-set"><h4 className="gallery-label">Stills · {film.screenshots.length}</h4>
            <div className="still-images" role="region" aria-label={`${film.title} stills`} tabIndex={0}>
            {film.screenshots.map(image => <button key={image.src} type="button" aria-label={`Enlarge ${image.title}`}
                onClick={event => { onOpen(film, images.findIndex(item => item.src === image.src), event.currentTarget); }}>
                <img src={image.previewSrc ?? image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
            </button>)}
        </div></div>}
    </FilmGalleryFrame>;
}
