export interface PortfolioDocument {
    id: string;
    title: string;
    description: string;
    /** Site-relative URL. Files in public/portfolio/ are served at /portfolio/. */
    file: string;
}

export const portfolio = {
    title: 'PORTFOLIO',
    introduction: 'A selection of my photography and videography. Pick a collection to take a look.',
};

// Update file when replacing a portfolio with a differently named PDF.
export const portfolioDocuments: [PortfolioDocument, ...PortfolioDocument[]] = [
    {
        id: 'photography',
        title: 'Photography',
        description: 'Selected moments, places, and perspectives.',
        file: '/portfolio/Daniel\'s Photography Portfolio (2025).pdf',
    },
    {
        id: 'videography',
        title: 'Videography',
        description: 'A selection of stories told through moving images.',
        file: '/portfolio/Daniel\'s Videography Portfolio (2025).pdf',
    },
];
