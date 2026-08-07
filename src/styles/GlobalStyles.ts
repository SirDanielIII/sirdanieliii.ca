import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
