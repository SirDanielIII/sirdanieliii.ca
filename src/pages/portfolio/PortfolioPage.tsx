import {useEffect, useRef, useState} from 'react';
import {Link, NavLink, Route, Routes} from 'react-router';
import NotFoundPage from '../not-found/NotFoundPage';
import {
    collections,
    editingLinks,
    films,
    genres,
    photos,
    portfolio,
    portfolioDocuments,
    portfolioImage,
    videos,
    type Photo,
    type VideoProject,
} from './portfolio';
import {
    Page,
    Eyebrow,
    About,
    AboutImages,
    SectionHeading,
    CollectionGrid,
    CollectionCard,
    Contact,
    CollectionNav,
    CollectionIntro,
    Filters,
    PhotoGrid,
    PhotoCard,
    Lightbox,
    VideoGrid,
    VideoCard,
    VideoImage,
    FilmFeature,
    FilmList,
    FilmRow,
    Stills,
    EditingWork,
} from '../../css/portfolio/PortfolioPage.styles';

const Arrow = () => <span aria-hidden="true">↗</span>;
const WatchLink = ({project}: {project: VideoProject}) => (
    <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">
        Watch {project.type === 'Short film' || project.type === 'Broadcast parody' ? 'film' : 'video'} <Arrow />
        <span className="sr-only"> (opens in a new tab)</span>
    </a>
);

const ProjectStills = ({project}: {project: VideoProject}) =>
    project.stills?.length ? (
        <Stills aria-label={`Stills from ${project.title}`}>
            {project.stills.map((still) => (
                <a
                    key={still.src}
                    href={still.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${still.alt} (open full image in a new tab)`}
                >
                    <img src={still.src} alt={still.alt} loading="lazy" />
                </a>
            ))}
        </Stills>
    ) : null;

const ContactSection = () => (
    <Contact>
        <div>
            <Eyebrow>Have something in mind?</Eyebrow>
            <h2>
                Let’s make something <em>worth keeping.</em>
            </h2>
        </div>
        <a className="contact-link" href={`mailto:${portfolio.email}`}>
            Get in touch <Arrow />
        </a>
    </Contact>
);

const Landing = () => (
    <Page>
        <About aria-labelledby="about-title">
            <div>
                <Eyebrow>Daniel Zhuo / Visual portfolio</Eyebrow>
                <h1 id="about-title">
                    A little life.
                    <br />A different <em>lens.</em>
                </h1>
                <div className="about-copy">
                    <h2>Hi, I’m Daniel.</h2>
                    <p>{portfolio.about}</p>
                </div>
                <a className="text-link" href="#collections">
                    Explore my work <span aria-hidden="true">↓</span>
                </a>
            </div>
            <AboutImages>
                <img
                    className="city"
                    src={portfolioImage('landscape-90')}
                    alt="Toronto's skyline lit up at night"
                    width="737"
                    height="1106"
                    fetchPriority="high"
                />
                <img
                    className="portrait"
                    src={portfolioImage('portrait-50')}
                    alt="A smiling guest captured at an event"
                    width="608"
                    height="912"
                />
                <span className="image-note">People. Places. Stories.</span>
                <span className="frame-number" aria-hidden="true">
                    01 — 03
                </span>
            </AboutImages>
        </About>
        <section id="collections" aria-labelledby="collections-title">
            <SectionHeading>
                <div>
                    <Eyebrow>The collections</Eyebrow>
                    <h2 id="collections-title">Pick a perspective.</h2>
                </div>
                <span>Three ways of seeing the world.</span>
            </SectionHeading>
            <CollectionGrid>
                {collections.map((collection, index) => (
                    <CollectionCard key={collection.id} to={`/portfolio/${collection.id}/`}>
                        <div className="cover">
                            <img
                                src={collection.image}
                                alt=""
                                loading="lazy"
                                style={{objectPosition: collection.position}}
                            />
                            <span className="number">0{index + 1}</span>
                            <span className="round-arrow">
                                <Arrow />
                            </span>
                        </div>
                        <Eyebrow>{collection.label}</Eyebrow>
                        <h3>{collection.title}</h3>
                        <p>{collection.description}</p>
                    </CollectionCard>
                ))}
            </CollectionGrid>
        </section>
        <ContactSection />
    </Page>
);

const Navigation = () => (
    <CollectionNav aria-label="Portfolio collections">
        <Link to="/portfolio/">← Overview</Link>
        <div>
            {collections.map((collection) => (
                <NavLink key={collection.id} to={`/portfolio/${collection.id}/`}>
                    {collection.title}
                </NavLink>
            ))}
        </div>
    </CollectionNav>
);

const PhotoLightbox = ({items, initial, onClose}: {items: Photo[]; initial: number; onClose: () => void}) => {
    const [index, setIndex] = useState(initial);
    const dialog = useRef<HTMLDialogElement>(null);
    const selected = items[index];
    const changePhoto = (offset: number) => {
        setIndex((current) => (current + offset + items.length) % items.length);
    };

    useEffect(() => {
        const element = dialog.current;
        const previousOverflow = document.body.style.overflow;
        element?.showModal();
        document.body.style.overflow = 'hidden';
        return () => {
            element?.close();
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <Lightbox
            ref={dialog}
            aria-label="Photograph viewer"
            onClose={() => {
                // Strict Mode reopens the dialog before its cleanup close event arrives.
                if (!dialog.current?.open) onClose();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    changePhoto(-1);
                }
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    changePhoto(1);
                }
            }}
        >
            <div className="viewer-toolbar">
                <span>
                    {String(index + 1).padStart(2, '0')} / {items.length}
                </span>
                <button type="button" onClick={onClose} aria-label="Close photograph viewer" autoFocus>
                    Close ×
                </button>
            </div>
            <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} />
            <div className="viewer-caption">
                <button
                    type="button"
                    onClick={() => {
                        changePhoto(-1);
                    }}
                    aria-label="Previous photograph"
                >
                    ←
                </button>
                <div aria-live="polite">
                    <h2>{selected.title}</h2>
                    <p>{selected.genre}</p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        changePhoto(1);
                    }}
                    aria-label="Next photograph"
                >
                    →
                </button>
            </div>
        </Lightbox>
    );
};

const Photography = () => {
    const [genre, setGenre] = useState('All work');
    const [selected, setSelected] = useState<number | null>(null);
    const filtered = photos.filter((photo) => genre === 'All work' || photo.genre === genre);
    return (
        <Page>
            <Navigation />
            <CollectionIntro>
                <Eyebrow>01 / Photography</Eyebrow>
                <h1>
                    Life, <em>in stills.</em>
                </h1>
                <p>
                    A favourite face. A familiar place. Something you might have walked past.
                    <br />A collection of moments, one frame at a time.
                </p>
            </CollectionIntro>
            <Filters aria-label="Filter photography by genre">
                {['All work', ...genres].map((item) => (
                    <button
                        type="button"
                        key={item}
                        aria-pressed={genre === item}
                        aria-controls="photo-gallery"
                        onClick={() => {
                            setGenre(item);
                        }}
                    >
                        {item}
                    </button>
                ))}
                <span role="status">{filtered.length} photographs</span>
            </Filters>
            <PhotoGrid id="photo-gallery">
                {filtered.map((photo, index) => (
                    <PhotoCard key={photo.id}>
                        <button
                            type="button"
                            onClick={() => {
                                setSelected(index);
                            }}
                            aria-label={`Enlarge ${photo.title}`}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                width={photo.width}
                                height={photo.height}
                                loading={index < 3 ? 'eager' : 'lazy'}
                            />
                            <span className="enlarge" aria-hidden="true">
                                ↗
                            </span>
                        </button>
                        <figcaption>
                            <span>{photo.title}</span>
                            <small>{photo.genre}</small>
                        </figcaption>
                    </PhotoCard>
                ))}
            </PhotoGrid>
            {selected !== null && (
                <PhotoLightbox
                    items={filtered}
                    initial={selected}
                    onClose={() => {
                        setSelected(null);
                    }}
                />
            )}
            <ArchiveLink id="photography" />
            <ContactSection />
        </Page>
    );
};

const ArchiveLink = ({id}: {id: string}) => {
    const document = portfolioDocuments.find((document) => document.id === id);
    return document ? (
        <p className="archive-link">
            From the archive <span aria-hidden="true">/</span>{' '}
            <a href={document.file} target="_blank" rel="noopener noreferrer">
                View the 2025 {id} PDF <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
            </a>
        </p>
    ) : null;
};

const Videography = () => (
    <Page>
        <Navigation />
        <CollectionIntro>
            <Eyebrow>02 / Videography</Eyebrow>
            <h1>
                Always <em>in motion.</em>
            </h1>
            <p>
                Everyday adventures, creative edits, and a few ambitious setups.
                <br />A selection from behind the camera and on the timeline.
            </p>
        </CollectionIntro>
        <VideoGrid>
            {videos.map((project, index) => (
                <VideoCard key={project.id} $featured={index === 0}>
                    <VideoImage
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${project.title} (opens in a new tab)`}
                    >
                        <img
                            src={project.image}
                            alt={`Thumbnail for ${project.title}`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            width="1420"
                            height="798"
                        />
                        <span className="play" aria-hidden="true">
                            ▶
                        </span>
                        {index === 0 && <span className="featured-label">In the spotlight</span>}
                    </VideoImage>
                    <div className="video-copy">
                        <Eyebrow>
                            {project.type}
                            {project.year && ` / ${project.year}`}
                        </Eyebrow>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <WatchLink project={project} />
                    </div>
                    <ProjectStills project={project} />
                </VideoCard>
            ))}
        </VideoGrid>
        <EditingWork>
            <img src={portfolioImage('lost-tribe')} alt="Lost Tribe" width="378" height="378" loading="lazy" />
            <div>
                <Eyebrow>On the timeline</Eyebrow>
                <h2>Client editing work</h2>
                <p>A selection of paid video editing projects.</p>
                <div className="editing-links">
                    {editingLinks.map((id, index) => (
                        <a
                            key={id}
                            className="text-link"
                            href={`https://youtu.be/${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Project 0{index + 1} <Arrow />
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    ))}
                </div>
            </div>
        </EditingWork>
        <p className="channel-link">
            <a className="text-link" href={portfolio.youtube} target="_blank" rel="noopener noreferrer">
                More on YouTube @SirDanielIII <Arrow />
            </a>
        </p>
        <ArchiveLink id="videography" />
        <ContactSection />
    </Page>
);

const ShortFilms = () => (
    <Page $cinema>
        <Navigation />
        <CollectionIntro>
            <Eyebrow>03 / Short films</Eyebrow>
            <h1>
                A story.
                <br />
                <em>A world of its own.</em>
            </h1>
            <p>Turn down the lights. Stay for a story.</p>
        </CollectionIntro>
        {films.slice(0, 1).map((project) => (
            <FilmFeature key={project.id}>
                <a
                    className="film-cover"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${project.title} (opens in a new tab)`}
                >
                    <img src={project.image} alt={`Still from ${project.title}`} width="1420" height="798" />
                    <span className="play" aria-hidden="true">
                        ▶
                    </span>
                </a>
                <div className="feature-caption">
                    <div>
                        <Eyebrow>Featured short / {project.year}</Eyebrow>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                    <WatchLink project={project} />
                </div>
                <ProjectStills project={project} />
            </FilmFeature>
        ))}
        <SectionHeading>
            <div>
                <Eyebrow>The film shelf</Eyebrow>
                <h2>More stories to step into.</h2>
            </div>
            <span>{films.length} short films</span>
        </SectionHeading>
        <FilmList>
            {films.slice(1).map((project, index) => (
                <FilmRow key={project.id}>
                    <span className="film-number">0{index + 2}</span>
                    <a
                        className="film-thumbnail"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${project.title} (opens in a new tab)`}
                    >
                        <img
                            src={project.image}
                            alt={`Still from ${project.title}`}
                            width="1420"
                            height="798"
                            loading="lazy"
                        />
                    </a>
                    <div>
                        <Eyebrow>
                            {project.type}
                            {project.year && ` / ${project.year}`}
                        </Eyebrow>
                        <h2>{project.title}</h2>
                        {project.description && <p>{project.description}</p>}
                        <WatchLink project={project} />
                    </div>
                    <ProjectStills project={project} />
                </FilmRow>
            ))}
        </FilmList>
        <ArchiveLink id="videography" />
        <ContactSection />
    </Page>
);

const PortfolioPage = () => (
    <Routes>
        <Route index element={<Landing />} />
        <Route path="photography" element={<Photography />} />
        <Route path="videography" element={<Videography />} />
        <Route path="short-films" element={<ShortFilms />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);
export default PortfolioPage;
