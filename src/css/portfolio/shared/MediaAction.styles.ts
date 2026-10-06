import {css} from 'styled-components';

/** Shared geometry keeps watch buttons and adjacent links aligned. */
export const mediaAction = css`
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    min-height: 44px;
    border: 0;
    border-bottom: 1px solid transparent;
    padding: 0.5rem 0;
    font-size: 0.85rem;
`;
