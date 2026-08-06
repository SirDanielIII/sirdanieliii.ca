export type SavedTheme = 'dark' | 'light';

// Cookie names and lifetimes are kept here so they are easy to change later.
export const COOKIE_SETTINGS = {
    theme: {
        name: 'sd_theme',
        maxAgeDays: 365,
    },
    visited: {
        name: 'sd_visited',
        maxAgeDays: 365,
    },
} as const;

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }
    const prefix = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie.split('; ').find(entry => entry.startsWith(prefix));
    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
};

const setCookie = (name: string, value: string, maxAgeDays: number): void => {
    if (typeof document === 'undefined') {
        return;
    }
    const maxAge = Math.round(maxAgeDays * 24 * 60 * 60);
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${String(maxAge)}; SameSite=Lax${secure}`;
};

export const getSavedTheme = (): SavedTheme | null => {
    const value = getCookie(COOKIE_SETTINGS.theme.name);
    return value === 'dark' || value === 'light' ? value : null;
};

export const saveTheme = (theme: SavedTheme): void => {
    setCookie(COOKIE_SETTINGS.theme.name, theme, COOKIE_SETTINGS.theme.maxAgeDays);
};

export const hasVisitedBefore = (): boolean => (
    getCookie(COOKIE_SETTINGS.visited.name) === 'true'
);

export const markAsVisited = (): void => {
    setCookie(COOKIE_SETTINGS.visited.name, 'true', COOKIE_SETTINGS.visited.maxAgeDays);
};
