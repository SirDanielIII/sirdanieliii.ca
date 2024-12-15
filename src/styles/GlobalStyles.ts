import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
        background: ${({theme}) => theme.colors.primaryBg};
        color: ${({theme}) => theme.colors.textLight};
        font-family: ${({theme}) => theme.fonts.primary};
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
