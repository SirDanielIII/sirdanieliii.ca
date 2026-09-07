import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        /* Declare runtime merch overrides for the editor. Initial preserves var() fallbacks. */
        --merch-card-background: initial;
        --merch-card-text: initial;
        --merch-card-badgeBackground: initial;
        --merch-card-badgeText: initial;
        --merch-card-price: initial;
        --merch-card-buttonBackground: initial;
        --merch-card-buttonText: initial;
    }

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        /* Keep centered content from shifting when a route does not need a scrollbar. */
        overflow-y: scroll;
        scrollbar-gutter: stable;
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
