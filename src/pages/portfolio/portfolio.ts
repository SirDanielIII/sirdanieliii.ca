

// Put PDFs in public/portfolio/ and update their URLs below.
export interface PortfolioDocument {
    id: string;
    title: string;
    description: string;
    /** Public PDF URL. */
    file: string;
}

export const portfolio = {
    title: 'PORTFOLIO',
    introduction: 'Pick a collection to take a look 🙂',
};

export const portfolioDocuments: [PortfolioDocument, ...PortfolioDocument[]] = [
    {
        id: 'photography',
        title: 'Photography 📸',
        description: 'A pick of my favourite photos throughout the years.',
        file: `/portfolio/${encodeURIComponent("Daniel's Photography Portfolio (2025).pdf")}`,
    },
    {
        id: 'videography',
        title: 'Videography 🎥',
        description: 'My collection of questionable short films and video projects.',
        file: `/portfolio/${encodeURIComponent("Daniel's Videography Portfolio (2025).pdf")}`,
    },
];
