import projectsImage from '../../assets/images/section_card/section_projects.webp';
import portfolioImage from '../../assets/images/section_card/section_portfolio.webp';
import merchImage from '../../assets/images/section_card/section_merch.webp';
import guidesImage from '../../assets/images/section_card/section_guides.webp';

export interface HomeSection {
    id: string;
    title: string;
    description: string;
    to: string;
    /** Import a src/assets image above, or use a public URL such as /images/projects.webp. */
    image: string;
    /** Adjust the crop without editing the component, e.g. '50% 35%' or 'left center'. */
    imagePosition?: string;
    /** Match the corresponding navigation colour from the site's theme. */
    accent: 'highlight2' | 'highlight3' | 'highlight4' | 'highlight5';
}

// Every card uses this proportion at every screen size.
export const homeSectionAspectRatio = '16 / 10';

export const homeSections: HomeSection[] = [
    {
        id: 'projects',
        title: 'PROJECTS',
        description: 'A collection of coding projects I have made.',
        to: '/projects/',
        image: projectsImage,
        imagePosition: '50% 50%',
        accent: 'highlight2',
    },
    {
        id: 'portfolio',
        title: 'PORTFOLIO',
        description: 'Photography, videography, and short films.',
        to: '/portfolio/',
        image: portfolioImage,
        imagePosition: '50% 55%',
        accent: 'highlight3',
    },
    {
        id: 'merch',
        title: 'MERCH',
        description: 'The best merch store to ever gaze upon the Earth.',
        to: '/merch/',
        image: merchImage,
        imagePosition: '50% 50%',
        accent: 'highlight4',
    },
    {
        id: 'guides',
        title: 'GUIDES',
        description: 'Recipes, docs, and other loosely organized things.',
        to: '/guides/',
        image: guidesImage,
        imagePosition: '50% 50%',
        accent: 'highlight5',
    },
];
