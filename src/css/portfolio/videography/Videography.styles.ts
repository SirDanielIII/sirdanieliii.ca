import styled from 'styled-components';

export const WorkGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    &[data-layout='channel'] { grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
    &[data-layout='series'] { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
    &[data-layout='compact'] { gap: 1.5rem 2rem; }
    @media (max-width: 700px) {
        &, &[data-layout='series'] { grid-template-columns: minmax(0, 1fr); }
        &[data-layout='series'] { gap: 2rem; }
    }
`;

export const VideoEntryFrame = styled.article`
    min-width: 0;
    h3, h4, h5 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 1.6rem; line-height: 1.22; margin: 0.55rem 0; }
    .video-copy { padding-top: 1rem; overflow-wrap: anywhere; }
    .video-description { color: var(--portfolio-muted); font-size: 0.95rem; margin-bottom: 0.8rem; }
    .video-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.5rem; }
    .video-actions .text-link { font-size: 0.85rem; }
    .video-date { font-size: 0.75rem; color: var(--portfolio-muted); }
    &[data-feature='true'] {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: minmax(0, 1.65fr) minmax(0, 0.85fr);
        align-items: center;
        gap: 2rem;
        h3, h4 { font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.035em; }
        .video-copy { padding: 0; }
    }
    &[data-layout='channel']:not([data-feature='true']) {
        display: grid;
        grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
        align-items: center;
        gap: 1.5rem;
        max-width: 51rem;
        .video-copy { padding-top: 0; }
        h3 { font-size: 1.65rem; }
    }
    &[data-layout='series'] h3 { font-size: 1.35rem; }
    &[data-layout='compact'] {
        display: grid;
        grid-template-columns: 9rem minmax(0, 1fr);
        gap: 1.1rem;
        align-items: start;
        padding: 0;
        .video-copy { padding: 0; }
        h5 { font-size: 1.15rem; min-height: 2.44em; margin: 0; }
        /* VideoThumbnail renders the play control. */
        /*noinspection CssUnusedSymbol*/
        .play { width: 36px; height: 36px; font-size: 0.75rem; }
    }
    @media (max-width: 850px) {
        &[data-feature='true'] { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 1.5rem; }
    }
    @media (max-width: 700px) {
        &[data-feature='true'], &[data-layout='channel']:not([data-feature='true']) {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
        }
        &[data-layout='channel']:not([data-feature='true']) { max-width: 31rem; }
    }
    @media (max-width: 400px) {
        &[data-layout='compact'] { grid-template-columns: 6.5rem minmax(0, 1fr); gap: 0.8rem; }
    }
`;

export const CommissionGroup = styled.section`
    margin-top: 3rem;
    &:first-of-type { margin-top: 0; }
    > header { margin-bottom: 1.5rem; }
    > header h3 { font-size: clamp(1.75rem, 3vw, 2.3rem); margin-bottom: 0.75rem; }
    .group-heading { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .group-heading h3 { margin-bottom: 0; }
    .group-heading img { width: 64px; height: 64px; object-fit: contain; flex-shrink: 0; }
    @media (max-width: 600px) { .group-heading img { width: 48px; height: 48px; } }
    > header p { color: var(--portfolio-muted); max-width: 44rem; }
    .subcollection { margin-top: 2rem; }
    .subcollection h4 { font-size: 1.3rem; padding-bottom: 0.5rem; color: var(--portfolio-muted); }
`;

export const ExperienceEntry = styled.section`
    margin-top: var(--portfolio-divider-space);
    padding-top: var(--portfolio-divider-space);
    border-top: 1px solid var(--portfolio-line);
    scroll-margin-top: 7rem;
    .experience-position { display: flex; align-items: flex-start; gap: 1.25rem; margin-top: 1rem; }
    .experience-logo { width: 64px; height: 64px; object-fit: contain; flex-shrink: 0; }
    .experience-details { min-width: 0; font-size: 1rem; line-height: 1.6; }
    h2 { font-family: ${({theme}) => theme.fonts.regular}; font-size: 1.3rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.4rem; }
    .experience-meta { font-size: 0.95rem; color: var(--portfolio-muted); margin-top: 0.35rem; }
    .experience-copy { margin-top: 1rem; max-width: 45rem; color: var(--portfolio-muted); }
    @media (max-width: 700px) {
        .experience-position { gap: 1rem; }
        .experience-logo { width: 56px; height: 56px; }
    }
`;
