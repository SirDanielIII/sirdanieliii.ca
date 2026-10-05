import {CollectionIntro, Eyebrow} from '../../css/portfolio/PortfolioPage.styles';
import {ComingSoonFilm, FeaturedFilmFrame, FilmCollectionFrame, FilmEntryFrame, WatchButton} from '../../css/portfolio/PortfolioMedia.styles';
import {shortFilms} from './generated/media';
import {filmEntries, filmImages, type Film} from './media';
import {useMediaViewer, type OpenGallery, type OpenVideo} from './useMediaViewer';
import ExternalLink from './ExternalLink';
import VideoThumbnail from './VideoThumbnail';
import FilmGallery from './FilmGallery';
import MediaViewer from './MediaViewer';

const viewerEntries = filmEntries(shortFilms);

function FeaturedFilm({film, onOpen}: {film: Film; onOpen: OpenVideo}) {
    return <FeaturedFilmFrame aria-labelledby="featured-film-title">
        <div className="feature-image"><VideoThumbnail work={film} onOpen={onOpen} eager />
            <span className="feature-marker">{film.status === 'coming-soon' ? 'Featured film · Coming soon' : 'Featured film'}</span></div>
        <div className="feature-caption">
            <div><Eyebrow>{film.year} · {film.type}</Eyebrow><h2 id="featured-film-title">{film.title}</h2></div>
            <div>{film.synopsis && <p className="feature-synopsis">{film.synopsis}</p>}
                <div className="feature-actions">
                    {film.video && <WatchButton type="button" onClick={event => { onOpen(film, event.currentTarget); }} aria-label={`Watch featured film ${film.title}`}><span aria-hidden="true">▶</span> Watch film</WatchButton>}
                    <a href={`#film-${film.slug}`}>Explore the film <span aria-hidden="true">↓</span></a>
                </div>
            </div>
        </div>
    </FeaturedFilmFrame>;
}

function FilmEntry({film, index, onVideo, onGallery}: {film: Film; index: number; onVideo: OpenVideo; onGallery: OpenGallery}) {
    if (film.status === 'coming-soon') return <ComingSoonFilm id={`film-${film.slug}`} aria-labelledby={`${film.slug}-title`}>
        <div><h3 id={`${film.slug}-title`}>{film.title}</h3><Eyebrow>{film.year} · {film.type}</Eyebrow></div>
        <p className="coming-soon-status">COMING SOON</p>
    </ComingSoonFilm>;
    const images = filmImages(film);
    return <FilmEntryFrame id={`film-${film.slug}`} aria-labelledby={`${film.slug}-title`}>
        <VideoThumbnail work={film} onOpen={onVideo} />
        <div className="film-copy">
            <span className="film-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} /</span>
            <Eyebrow>{film.year} · {film.type}</Eyebrow><h3 id={`${film.slug}-title`}>{film.title}</h3>
            {film.synopsis && <p className="film-synopsis">{film.synopsis}</p>}
            <div className="film-actions">
                {film.video && <WatchButton type="button" onClick={event => { onVideo(film, event.currentTarget); }} aria-label={`Watch ${film.title}`}><span aria-hidden="true">▶</span> Watch film</WatchButton>}
                {images.length > 0 && <button className="gallery-button" type="button" onClick={event => { onGallery(film, 0, event.currentTarget); }} aria-label={`View ${film.title} image gallery`}>
                    {images.length === 1 ? 'View film still' : `View gallery (${String(images.length)})`}
                </button>}
            </div>
            {film.funFact && <p className="production-note"><span>Production note</span>{film.funFact}</p>}
        </div>
        <FilmGallery film={film} onOpen={onGallery} />
    </FilmEntryFrame>;
}

export default function ShortFilmsSection() {
    const viewer = useMediaViewer(viewerEntries);
    // Lookup only. The featured film and its ordered listing share this exact object.
    const featured = shortFilms.collections.flatMap(collection => collection.films).find(film => film.slug === shortFilms.featuredFilm);
    return <>
        <CollectionIntro><Eyebrow>03 / Short films</Eyebrow><h1>A story.<br /><em>A world of its own.</em></h1>
            <p>Turn down the lights. Stay for a story.</p></CollectionIntro>
        {featured && <FeaturedFilm film={featured} onOpen={viewer.openVideo} />}
        {shortFilms.collections.map(collection => <FilmCollectionFrame key={collection.slug} id={collection.slug}
            data-presentation={collection.presentation} aria-labelledby={`${collection.slug}-title`}>
            <header>
                <div><Eyebrow>{collection.label}</Eyebrow><h2 id={`${collection.slug}-title`}>{collection.title}</h2></div>
                {collection.link && <ExternalLink href={collection.link.url}>{collection.link.label}</ExternalLink>}
            </header>
            <div className="film-entries">
                {collection.films.map((film, index) => <FilmEntry key={film.slug} film={film} index={index} onVideo={viewer.openVideo} onGallery={viewer.openGallery} />)}
            </div>
        </FilmCollectionFrame>)}
        <MediaViewer {...viewer} />
    </>;
}
