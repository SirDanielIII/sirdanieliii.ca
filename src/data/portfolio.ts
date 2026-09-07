// Set the password and PDF filenames in private/portfolio.php (server-only).
export interface PortfolioDocument {
    id: string;
    title: string;
    description: string;
    /** Protected endpoint; filenames are configured in private/portfolio.php. */
    file: string;
}

export const portfolio = {
    title: 'PORTFOLIO',
    introduction: 'Pick a collection to take a look 🙂',
};

// Keep endpoint IDs in sync with the files map in private/portfolio.php.
export const portfolioDocuments: [PortfolioDocument, ...PortfolioDocument[]] = [
    {
        id: 'photography',
        title: 'Photography 📸',
        description: 'A pick of my favourite photos throughout the years.',
        file: '/scripts/portfolio.php?action=file&id=photography',
    },
    {
        id: 'videography',
        title: 'Videography 🎥',
        description: 'My collection of questionable short films and video projects.',
        file: '/scripts/portfolio.php?action=file&id=videography',
    },
];
