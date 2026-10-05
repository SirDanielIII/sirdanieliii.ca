

export type PortfolioMedium = 'photography' | 'videography' | 'short-films';

export interface PortfolioPalette {
    accent: string;
    accentHover: string;
    accentSubtle: string;
    onAccent: string;
    border: string;
    controlBorder: string;
    focus: string;
    surface: string;
    muted: string;
}

// Viewer surfaces follow the site mode; each medium still supplies its own accents.
export interface PortfolioViewerTheme {
    surface: string;
    sidebarSurface: string;
    backdrop: string;
    shadow: string;
    closeHoverSurface: string;
}

export interface AppTheme {
    mode: 'light' | 'dark';
    colors: {
        background1: string;
        background2: string;
        text: string;
        highlight1: string;
        highlight2: string;
        highlight3: string;
        highlight4: string;
        highlight5: string;
        sectionCard: string;
        header: string;
        footer: string;
        themeButton: string;
    };
    fonts: {
        regular: string;
        demi: string;
        bold: string;
    };
    portfolio: Record<PortfolioMedium, PortfolioPalette>;
    portfolioViewer: PortfolioViewerTheme;
    // The overview keeps the site's shared neutral treatment; collection pages select a palette.
    portfolioBase: Pick<PortfolioPalette, 'accent' | 'muted' | 'border' | 'surface'>;
}

// Edit the medium palettes here; they share semantic tokens and the existing ThemeProvider.
// Photography uses green, Videography blue, and Short Films violet in both site modes.
export const lightTheme: AppTheme = {
    mode: 'light' as const,
    colors: {
        background1: '#F7F7F7',
        background2: '#FFFFFF',
        text: '#000000',
        highlight1: '#f50057',
        highlight2: '#38C4E7',
        highlight3: '#AA9EEA',
        highlight4: '#3FD49A',
        highlight5: '#E9C683',
        sectionCard: '#F2F2F2',
        header: '#FFFFFF',
        footer: '#FFFFFF',
        themeButton: '#282828',
    },
    fonts: {
        regular: "'BRLNSR', sans-serif",
        demi: "'BRLNSD', sans-serif",
        bold: "'BRLNSB', sans-serif",
    },
    portfolio: {
        photography: {
            accent: '#22674e', accentHover: '#164b38', accentSubtle: '#e4f0e9', onAccent: '#ffffff',
            border: '#cedcd4', controlBorder: '#567566', focus: '#22674e', surface: '#ecf1ee', muted: '#54645b',
        },
        videography: {
            accent: '#11677d', accentHover: '#0c4b5c', accentSubtle: '#e3eff4', onAccent: '#ffffff',
            border: '#ccdae1', controlBorder: '#57727e', focus: '#11677d', surface: '#ebf1f4', muted: '#53626b',
        },
        'short-films': {
            accent: '#705397', accentHover: '#50346f', accentSubtle: '#eee7f5', onAccent: '#ffffff',
            border: '#dad2e3', controlBorder: '#7a688b', focus: '#705397', surface: '#f0ecf4', muted: '#66616d',
        },
    },
    portfolioBase: {
        accent: '#705397', muted: '#66616d', border: '#dad5df', surface: '#efecf2',
    },
    portfolioViewer: {
        surface: '#ffffff', sidebarSurface: '#ffffff', backdrop: '#000000ee',
        shadow: '0 16px 64px #14231c26',
        // A subtle red tint gives Close the same restrained hover treatment as category filters.
        closeHoverSurface: '#fde5ed',
    },
};

export const darkTheme: AppTheme = {
    mode: 'dark' as const,
    colors: {
        background1: '#121212',
        background2: '#141414',
        text: '#D9D9D9',
        highlight1: '#f50057',
        highlight2: '#38C4E7',
        highlight3: '#AA9EEA',
        highlight4: '#3FD49A',
        highlight5: '#E9C683',
        sectionCard: '#2F334D',
        header: '#121212',
        footer: '#000000',
        themeButton: '#FFFFFF',
    },
    fonts: {
        regular: "'BRLNSR', sans-serif",
        demi: "'BRLNSD', sans-serif",
        bold: "'BRLNSB', sans-serif",
    },
    portfolio: {
        photography: {
            accent: '#80cbb4', accentHover: '#a4dfcc', accentSubtle: '#20392f', onAccent: '#10271e',
            border: '#344c40', controlBorder: '#688f7e', focus: '#9cdec7', surface: '#1b2420', muted: '#a6b8ae',
        },
        videography: {
            accent: '#73cfe5', accentHover: '#a2e2f2', accentSubtle: '#19313b', onAccent: '#102630',
            border: '#304a57', controlBorder: '#648b9b', focus: '#9bdff0', surface: '#19242b', muted: '#a5b5c0',
        },
        'short-films': {
            accent: '#c4b3ef', accentHover: '#ddd0ff', accentSubtle: '#30253d', onAccent: '#241a31',
            border: '#493b56', controlBorder: '#8b7b9d', focus: '#dbcaff', surface: '#241e2b', muted: '#b5aabb',
        },
    },
    portfolioBase: {
        accent: '#c4b3ef', muted: '#aaa5b1', border: '#343039', surface: '#1d1b20',
    },
    portfolioViewer: {
        surface: '#141414', sidebarSurface: '#141414', backdrop: '#000000ee',
        shadow: '0 16px 64px #00000052',
        closeHoverSurface: '#2b141c',
    },
};
