import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'BRLNSR'; // Berlin Sans FB Regular
        src: url('/fonts/BRLNSR.TTF') format('truetype');
    }

    @font-face {
        font-family: 'BRLNSD'; // Berlin Sans FB Demi
        src: url('/fonts/BRLNSD.TTF') format('truetype');
    }

    @font-face {
        font-family: 'BRLNSB'; // Berlin Sans FB Bold
        src: url('/fonts/BRLNSB.TTF') format('truetype');
    }

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
        background: ${({theme}) => theme.colors.background1};
        color: ${({theme}) => theme.colors.text};
        font-family: ${({theme}) => theme.fonts.regular};
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        font: inherit;
        cursor: pointer;
        background: none;
    }
`;
