import {css} from 'styled-components';

export const monochromeIcon = css`
    filter: ${({theme}) => theme.mode === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)'};
`;
