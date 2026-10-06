import {usePortfolio, portfolioImageSource} from '../shared/portfolio';
import ContactSection from '../layout/ContactSection';
import {Page} from '../../../css/portfolio/layout/PortfolioLayout.styles';
import {Eyebrow} from '../../../css/portfolio/shared/PortfolioTypography.styles';
import {About, AboutImages, SectionHeading, CollectionGrid, CollectionCard} from '../../../css/portfolio/overview/PortfolioOverview.styles';

const collectionsId = 'collections';

const PortfolioOverview = () => {
    const {collections, portfolio, portfolioSpotlight} = usePortfolio();
    return (
    <Page>
        <About aria-labelledby="about-title">
            <div>
                <Eyebrow>{portfolio.name} / Visual portfolio</Eyebrow>
                <h1 id="about-title">
                    Making things
                    <br/>cause <em>it's fun!</em>
                </h1>
                <div className="about-copy">
                    <h2>Hallo, I’m Daniel.</h2>
                    <p>{portfolio.about[0]}</p>
                    <p>{portfolio.about[1]}</p>
                </div>
                <a className="text-link" href={`#${collectionsId}`}>
                    Check out my work <span aria-hidden="true">↓</span>
                </a>
            </div>
            <AboutImages>
                <img
                    className="city"
                    src={portfolioImageSource(portfolioSpotlight.primary.image)}
                    alt={portfolioSpotlight.primary.alt}
                    style={{objectPosition: portfolioSpotlight.primary.position}}
                    fetchPriority="high"
                    decoding="async"
                />
                <img
                    className="portrait"
                    src={portfolioImageSource(portfolioSpotlight.secondary.image)}
                    alt={portfolioSpotlight.secondary.alt}
                    style={{objectPosition: portfolioSpotlight.secondary.position}}
                    decoding="async"
                />
                <span className="image-note">Portfolio v2026.0</span>
                <span className="frame-number" aria-hidden="true">
                    01 — 03
                </span>
            </AboutImages>
        </About>
        <section id={collectionsId} aria-labelledby="collections-title">
            <SectionHeading>
                <div>
                    <Eyebrow>The collection</Eyebrow>
                    <h2 id="collections-title">Pick a category.</h2>
                </div>
                <span>Hope you enjoy!</span>
            </SectionHeading>
            <CollectionGrid>
                {collections.map((collection, index) => (
                    <CollectionCard key={collection.id} to={`/portfolio/${collection.id}/`}>
                        <div className="cover">
                            <img
                                src={portfolioImageSource(collection.image)}
                                alt={collection.alt ?? ''}
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
        <ContactSection compact />
    </Page>
    );
};

export default PortfolioOverview;
