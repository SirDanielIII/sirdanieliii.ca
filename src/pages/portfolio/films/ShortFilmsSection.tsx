import {useMemo} from 'react';
import {CollectionIntro, Eyebrow} from '../../../css/portfolio/shared/PortfolioTypography.styles';
import {FeaturedFilmFrame, FilmCollectionFrame, FilmEntryFrame, FilmSectionDivider} from '../../../css/portfolio/films/Films.styles';
import {WatchButton} from '../../../css/portfolio/media/Media.styles';
import {useJson} from '../../../shared/media/useJson';
import ContentStatus from '../shared/ContentStatus';
import {filmEntries, type Film, type ShortFilmsContent} from '../media/media';
import {useMediaViewer, type OpenGallery, type OpenTrailer, type OpenVideo} from '../media/useMediaViewer';
import ExternalLink from '../shared/ExternalLink';
import VideoThumbnail from '../media/VideoThumbnail';
import FilmGallery from './FilmGallery';
import MediaViewer from '../media/MediaViewer';
import TableOfContents from '../shared/TableOfContents';

function FeaturedFilm({film, onOpen, onTrailer}: {film: Film; onOpen: OpenVideo; onTrailer: OpenTrailer}) {
    return <FeaturedFilmFrame id="featured-film" aria-labelledby="featured-film-title">
        <div className="feature-image"><VideoThumbnail work={film} onOpen={onOpen} onTrailer={onTrailer} eager />
            <span className="feature-marker">Featured film</span></div>
        <div className="feature-caption">
            <div><Eyebrow>{film.year} · {film.type}</Eyebrow><h2 id="featured-film-title">{film.title}</h2></div>
            <div>{film.synopsis && <p className="feature-synopsis">{film.synopsis}</p>}
                <div className="feature-actions">
                    {film.video && <WatchButton type="button" onClick={event => { onOpen(film, event.currentTarget); }} aria-label={`Watch featured film ${film.title}`}><span aria-hidden="true">▶</span> Watch Film</WatchButton>}
                    {film.trailer && <WatchButton type="button" onClick={event => { onTrailer(film, event.currentTarget); }} aria-label={`Watch featured trailer for ${film.title}`}><span aria-hidden="true">▶</span> Watch Trailer</WatchButton>}
                    <a href={`#film-${film.slug}`}>Explore the film <span aria-hidden="true">↓</span></a>
                </div>
            </div>
        </div>
    </FeaturedFilmFrame>;
}

function FilmEntry({film, index, onVideo, onTrailer, onGallery}: {film: Film; index: number; onVideo: OpenVideo; onTrailer: OpenTrailer; onGallery: OpenGallery}) {
    const imageCount = (film.thumbnail ? 1 : 0) + film.posters.length + film.screenshots.length;
    return <FilmEntryFrame id={`film-${film.slug}`} aria-labelledby={`${film.slug}-title`} data-has-media={Boolean(film.video ?? film.trailer ?? film.thumbnail)}>
        <header className="film-heading">
            <span className="film-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} /</span>
            <Eyebrow>{film.year} · {film.type}</Eyebrow><h3 id={`${film.slug}-title`}>{film.title}</h3>
        </header>
        <div className="film-media">
            {(film.video ?? film.trailer ?? film.thumbnail) && <VideoThumbnail work={film} onOpen={onVideo} onTrailer={onTrailer} />}
            {(film.trailer ?? film.video ?? (imageCount > 0)) && <div className="film-actions">
                {film.trailer && <WatchButton type="button" onClick={event => { onTrailer(film, event.currentTarget); }} aria-label={`Watch trailer for ${film.title}`}><span aria-hidden="true">▶</span> Watch Trailer</WatchButton>}
                {film.video && <WatchButton type="button" onClick={event => { onVideo(film, event.currentTarget); }} aria-label={`Watch ${film.title}`}><span aria-hidden="true">▶</span> Watch Film</WatchButton>}
                {imageCount > 0 && <button className="gallery-button" type="button" onClick={event => { onGallery(film, 0, event.currentTarget); }} aria-label={`View ${film.title} image gallery`}>
                    View Gallery ({imageCount})
                </button>}
            </div>}
        </div>
        {(film.synopsis || film.funFact) && <div className="film-copy">
            {film.synopsis && <><h4 className="film-label">Synopsis</h4><p className="film-synopsis">{film.synopsis}</p></>}
            {film.funFact && <aside className="production-note" aria-labelledby={`${film.slug}-note-title`}>
                <h4 className="film-label" id={`${film.slug}-note-title`}>Production Note</h4><p>{film.funFact}</p>
            </aside>}
        </div>}
        <FilmGallery film={film} onOpen={onGallery} />
    </FilmEntryFrame>;
}

export default function ShortFilmsSection() {
    const {data, status, retry} = useJson<ShortFilmsContent>('/scripts/list_short_films.php');
    return data ? <ShortFilmsContent shortFilms={data} /> : <ContentStatus status={status} retry={retry} />;
}

function ShortFilmsContent({shortFilms}: {shortFilms: ShortFilmsContent}) {
    const viewerEntries = useMemo(() => filmEntries(shortFilms), [shortFilms]);
    const viewer = useMediaViewer(viewerEntries);
    // Lookup only. The featured film and its ordered listing share this exact object.
    const featured = shortFilms.collections.flatMap(collection => collection.films).find(film => film.slug === shortFilms.featuredFilm);
    return <>
        <CollectionIntro><Eyebrow>03 / Short films</Eyebrow><h1>"One Man <em>Crew</em>"</h1>
            <p>Is something you <b>DO NOT</b> accidentally call yourself when making a short film with your friends. 😭</p></CollectionIntro>
        <TableOfContents label="Short film sections" layout="films" items={[
            ...(featured ? [{id: 'featured-film', label: `Featured: ${featured.title} (${String(featured.year)})`}] : []),
            ...shortFilms.collections.map(collection => ({
                id: collection.slug,
                label: collection.title,
                children: collection.films.map(film => ({id: `film-${film.slug}`, label: `${film.title} (${String(film.year)})`})),
            })),
        ]} />
        {featured && <FeaturedFilm film={featured} onOpen={viewer.openVideo} onTrailer={viewer.openTrailer} />}
        {featured && shortFilms.collections[0]?.presentation === 'series' && <FilmSectionDivider />}
        {shortFilms.collections.map(collection => <FilmCollectionFrame key={collection.slug} id={collection.slug}
            data-presentation={collection.presentation} aria-labelledby={`${collection.slug}-title`}>
            <header>
                <div><Eyebrow>{collection.label}</Eyebrow><h2 id={`${collection.slug}-title`}>{collection.title}</h2></div>
                {collection.link && <ExternalLink href={collection.link.url}>{collection.link.label}</ExternalLink>}
            </header>
            <div className="film-entries">
                {collection.films.map((film, index) => <FilmEntry key={film.slug} film={film} index={index} onVideo={viewer.openVideo} onTrailer={viewer.openTrailer} onGallery={viewer.openGallery} />)}
            </div>
        </FilmCollectionFrame>)}
        <MediaViewer {...viewer} />
    </>;
}
