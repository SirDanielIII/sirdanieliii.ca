import {CollectionIntro, Eyebrow} from '../../css/portfolio/PortfolioPage.styles';
import {CommissionGroup, ExperienceEntry, MediaSection, SectionIndex, VideoEntryFrame, WatchButton, WorkGrid} from '../../css/portfolio/PortfolioMedia.styles';
import {videography} from './generated/media';
import {videographyEntries, type ExternalProjectLink, type ProfessionalExperience, type VideoWork, type VideoWorkSection} from './media';
import ExternalLink from './ExternalLink';
import VideoThumbnail from './VideoThumbnail';
import MediaViewer from './MediaViewer';
import {useMediaViewer, type OpenVideo} from './useMediaViewer';

const viewerEntries = videographyEntries(videography);

function VideoEntry({work, onOpen, layout, heading: Heading = 'h3', eager = false, description, link, label}: {
    work: VideoWork;
    onOpen: OpenVideo;
    layout: string;
    heading?: 'h3' | 'h4' | 'h5';
    eager?: boolean;
    description?: string;
    link?: ExternalProjectLink | null;
    label?: string;
}) {
    const copy = description ?? work.description;
    return <VideoEntryFrame id={`work-${work.slug}`} data-feature={work.presentation === 'feature'} data-layout={layout}>
        <VideoThumbnail work={work} onOpen={onOpen} eager={eager} />
        <div className="video-copy">
            {label && <Eyebrow>{label}</Eyebrow>}
            {work.date && <p className="video-date">{work.date}</p>}
            <Heading>{work.title}</Heading>
            {copy && <p className="video-description">{copy}</p>}
            <div className="video-actions">
                {work.video && <WatchButton type="button" onClick={event => { onOpen(work, event.currentTarget); }} aria-label={`Watch ${work.title}`}><span aria-hidden="true">▶</span> Watch video</WatchButton>}
                {link && <ExternalLink href={link.url}>{link.label}</ExternalLink>}
            </div>
        </div>
    </VideoEntryFrame>;
}

function CreativeSection({section, onOpen, first}: {section: VideoWorkSection; onOpen: OpenVideo; first: boolean}) {
    return <MediaSection id={section.slug} aria-labelledby={`${section.slug}-title`}>
        <header>
            {section.logo && <img src={section.logo.src} alt="" width={section.logo.width} height={section.logo.height} loading="lazy" />}
            <div><Eyebrow>{section.label}</Eyebrow><h2 id={`${section.slug}-title`}>{section.title}</h2></div>
        </header>
        {section.description && <p className="section-description">{section.description}</p>}
        {section.collectionTitle && <h3 className="series-title">{section.collectionTitle}</h3>}
        {section.items.length > 0 && <WorkGrid data-layout={section.kind}>
            {section.items.map((work, index) => <VideoEntry key={work.slug} work={work} onOpen={onOpen} layout={section.kind}
                eager={first && index === 0} label={work.presentation === 'feature' ? 'Channel highlight' : undefined} />)}
        </WorkGrid>}
        {section.groups.map(group => {
            const singleFeature = group.items.length === 1 && group.items[0].presentation === 'feature';
            return <CommissionGroup key={group.slug} aria-label={group.title}>
                {!singleFeature && <header><h3>{group.title}</h3>{group.description && <p>{group.description}</p>}
                    {group.link && <ExternalLink href={group.link.url}>{group.link.label}</ExternalLink>}</header>}
                <WorkGrid>
                    {group.items.map(work => <VideoEntry key={work.slug} work={work} onOpen={onOpen} layout="commission"
                        heading={singleFeature ? 'h3' : 'h4'} description={singleFeature ? group.description : undefined}
                        link={singleFeature ? group.link : undefined} label={singleFeature ? 'Commission' : undefined} />)}
                </WorkGrid>
                {group.collections.map(collection => <section key={collection.slug} className="subcollection" aria-labelledby={`${collection.slug}-title`}>
                    <h4 id={`${collection.slug}-title`}>{collection.title}</h4>
                    <WorkGrid data-layout="compact">{collection.items.map(work => <VideoEntry key={work.slug} work={work}
                        onOpen={onOpen} layout="compact" heading="h5" />)}</WorkGrid>
                </section>)}
            </CommissionGroup>;
        })}
        {section.link && <p className="section-link"><ExternalLink href={section.link.url}>{section.link.label}</ExternalLink></p>}
    </MediaSection>;
}

function Experience({entry}: {entry: ProfessionalExperience}) {
    return <ExperienceEntry id={entry.slug} aria-labelledby={`${entry.slug}-title`}>
        <div><Eyebrow>{entry.label}</Eyebrow><p className="experience-dates">{entry.start} — {entry.end}</p></div>
        <div>
            <h2 id={`${entry.slug}-title`}>{entry.title}</h2><h3>{entry.organization}</h3>
            <div className="experience-meta"><p>{entry.location}</p><p>{entry.workMode}</p><p>{entry.employment}</p></div>
            <p className="experience-copy">{entry.description}</p>
        </div>
    </ExperienceEntry>;
}

export default function VideographySection() {
    const viewer = useMediaViewer(viewerEntries);
    return <>
        <CollectionIntro><Eyebrow>02 / Videography</Eyebrow><h1>Always <em>in motion.</em></h1>
            <p>Everyday adventures, live performances, and stories made for others.<br />A selection from behind the camera and on the timeline.</p></CollectionIntro>
        <SectionIndex aria-label="Videography sections">{videography.sections.map((section, index) => <a key={section.slug} href={`#${section.slug}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.kind === 'experience' ? section.label : section.title}
        </a>)}</SectionIndex>
        {videography.sections.map((section, index) => section.kind === 'experience'
            ? <Experience key={section.slug} entry={section} />
            : <CreativeSection key={section.slug} section={section} onOpen={viewer.openVideo} first={index === 0} />)}
        <MediaViewer {...viewer} />
    </>;
}
