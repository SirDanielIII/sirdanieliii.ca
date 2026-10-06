import {useMemo} from 'react';
import {CollectionIntro, Eyebrow} from '../../../css/portfolio/shared/PortfolioTypography.styles';
import {CommissionGroup, ExperienceEntry, VideoEntryFrame, WorkGrid} from '../../../css/portfolio/videography/Videography.styles';
import {MediaSection, WatchButton} from '../../../css/portfolio/media/Media.styles';
import TableOfContents from '../shared/TableOfContents';
import {useJson} from '../../../shared/media/useJson';
import ContentStatus from '../shared/ContentStatus';
import {videographyEntries, type ExternalProjectLink, type ProfessionalExperience, type VideographyContent, type VideoWork, type VideoWorkSection} from '../media/media';
import ExternalLink from '../shared/ExternalLink';
import VideoThumbnail from '../media/VideoThumbnail';
import MediaViewer from '../media/MediaViewer';
import {useMediaViewer, type OpenVideo} from '../media/useMediaViewer';

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
            {section.logo && <img src={section.logo.previewSrc ?? section.logo.src} alt={section.logo.alt} width={section.logo.width} height={section.logo.height} loading="lazy" decoding="async" />}
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
                {!singleFeature && <header><div className="group-heading">
                    {group.logo && <img src={group.logo.src} alt={group.logo.alt} width={group.logo.width} height={group.logo.height} loading="lazy" decoding="async" />}
                    <h3>{group.title}</h3>
                </div>{group.description && <p>{group.description}</p>}
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
        <Eyebrow>{entry.label}</Eyebrow>
        <div className="experience-position">
            {entry.logo && <img className="experience-logo" src={entry.logo.src} alt={entry.logo.alt} width={entry.logo.width} height={entry.logo.height} loading="lazy" decoding="async" />}
            <div className="experience-details">
                <h2 id={`${entry.slug}-title`}>{entry.title}</h2>
                <p>{entry.organization} · {entry.employment}</p>
                <p className="experience-meta">{entry.start} — {entry.end}</p>
                <p className="experience-meta">{entry.location} · {entry.workMode}</p>
                <p className="experience-copy">{entry.description}</p>
            </div>
        </div>
    </ExperienceEntry>;
}

export default function VideographySection() {
    const {data, status, retry} = useJson<VideographyContent>('/scripts/list_videography.php');
    return data ? <VideographyContent videography={data} /> : <ContentStatus status={status} retry={retry} />;
}

function VideographyContent({videography}: {videography: VideographyContent}) {
    const viewerEntries = useMemo(() => videographyEntries(videography), [videography]);
    const viewer = useMediaViewer(viewerEntries);
    return <>
        <CollectionIntro>
            <Eyebrow>02 / Videography</Eyebrow>
            <h1>Roll the <em>tape.</em> 🎬</h1>
            <p>
                I started video editing in Grade 7 on Windows Movie Maker, using my mom's prehistoric Windows 7 laptop, an HP G60-550CA with a Core 2 Duo. It overheated so easily that I had to prop it up on a textbook just to keep it usable. At one point, the hard drive died, and I even had to hunt down an unofficial graphics driver for Windows 10 because its Intel Media Accelerator graphics predated Intel HD Graphics. But, that's a story for another time.<br /><br />

                Between that laptop and my NVIDIA Shield Tablet K1, I made a bunch of home videos with my little brother and friends using Windows Movie Maker. Once I got to high school, my dad helped me buy a proper PC. From there, I discovered Adobe Premiere Pro, and now I've become a wizard. 🧙
            </p>
        </CollectionIntro>
        <TableOfContents label="Videography sections" items={videography.sections.map(section => ({
            id: section.slug, label: section.kind === 'experience' ? section.label : section.title,
        }))} />
        {videography.sections.map((section, index) => section.kind === 'experience'
            ? <Experience key={section.slug} entry={section} />
            : <CreativeSection key={section.slug} section={section} onOpen={viewer.openVideo} first={index === 0} />)}
        <MediaViewer {...viewer} />
    </>;
}
