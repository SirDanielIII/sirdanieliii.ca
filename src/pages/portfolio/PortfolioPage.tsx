import {Link, NavLink, Route, Routes} from 'react-router';
import NotFoundPage from '../not-found/NotFoundPage';
import PhotographySection from './PhotographySection';
import VideographySection from './VideographySection';
import ShortFilmsSection from './ShortFilmsSection';
import {collections, portfolio, portfolioSpotlight} from './portfolio';
import {
    Page, Eyebrow, About, AboutImages, SectionHeading, CollectionGrid,
    CollectionCard, Contact, CollectionNav,
} from '../../css/portfolio/PortfolioPage.styles';

const Arrow = () => <span aria-hidden="true">?</span>;

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
                    src={portfolioSpotlight.primary.image}
                    alt={portfolioSpotlight.primary.alt}
                    width={portfolioSpotlight.primary.width}
                    height={portfolioSpotlight.primary.height}
                    style={{objectPosition: portfolioSpotlight.primary.position}}
                    fetchPriority="high"
                    decoding="async"
                />
                <img
                    className="portrait"
                    src={portfolioSpotlight.secondary.image}
                    alt={portfolioSpotlight.secondary.alt}
                    width={portfolioSpotlight.secondary.width}
                    height={portfolioSpotlight.secondary.height}
                    style={{objectPosition: portfolioSpotlight.secondary.position}}
                    decoding="async"
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
                                width={collection.width}
                                height={collection.height}
                                loading="lazy"
                                decoding="async"
                                style={{objectPosition: collection.position}}
                            />
                            <span className="number">0{index + 1}</span>
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

const Photography = () => (
    <Page $medium="photography">
        <Navigation />
        <PhotographySection />
        <ContactSection />
    </Page>
);

const Videography = () => (
    <Page $medium="videography">
        <Navigation />
        <VideographySection />
        <ContactSection />
    </Page>
);

const ShortFilms = () => (
    <Page $medium="short-films">
        <Navigation />
        <ShortFilmsSection />
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
