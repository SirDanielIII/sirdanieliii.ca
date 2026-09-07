

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
}

export const lightTheme = {
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
    }
};

export const darkTheme = {
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
    }
};
