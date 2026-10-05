import {createContext, useContext} from 'react';

interface OverviewImage {
    image: string;
    alt?: string;
    width: number;
    height: number;
    position: string;
}

export interface PortfolioContent {
    portfolio: {name: string; about: string; email: string};
    portfolioSpotlight: {primary: OverviewImage & {alt: string}; secondary: OverviewImage & {alt: string}};
    collections: (OverviewImage & {id: 'photography' | 'videography' | 'short-films'; title: string; label: string; description: string})[];
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOverviewImage(value: unknown): value is OverviewImage {
    return isObject(value)
        && typeof value.image === 'string' && value.image.trim() !== ''
        && typeof value.width === 'number' && Number.isInteger(value.width) && value.width > 0
        && typeof value.height === 'number' && Number.isInteger(value.height) && value.height > 0
        && typeof value.position === 'string' && value.position.trim() !== ''
        && (value.alt === undefined || typeof value.alt === 'string');
}

function isCollection(value: unknown): value is PortfolioContent['collections'][number] {
    return isObject(value) && isOverviewImage(value)
        && (value.id === 'photography' || value.id === 'videography' || value.id === 'short-films')
        && typeof value.title === 'string' && typeof value.label === 'string' && typeof value.description === 'string';
}

/** Reject malformed editable JSON before it reaches the overview and collection navigation. */
export function isPortfolioContent(value: unknown): value is PortfolioContent {
    if (!isObject(value) || !isObject(value.portfolio) || !isObject(value.portfolioSpotlight)) return false;
    const {portfolio, portfolioSpotlight, collections} = value;
    return typeof portfolio.name === 'string' && typeof portfolio.about === 'string' && typeof portfolio.email === 'string'
        && isOverviewImage(portfolioSpotlight.primary) && typeof portfolioSpotlight.primary.alt === 'string'
        && isOverviewImage(portfolioSpotlight.secondary) && typeof portfolioSpotlight.secondary.alt === 'string'
        && Array.isArray(collections) && collections.every(isCollection)
        && new Set(collections.map(collection => collection.id)).size === collections.length;
}

export const PortfolioContext = createContext<PortfolioContent | null>(null);
export function usePortfolio() {
    const data = useContext(PortfolioContext);
    if (!data) throw new Error('Portfolio content has not loaded.');
    return data;
}
