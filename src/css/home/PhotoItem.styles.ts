import styled from 'styled-components';

export const PhotoButton = styled.button`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    &:focus-visible {
        outline: 2px solid ${({theme}) => theme.portfolio.photography.focus};
        outline-offset: 5px;
    }
    &:disabled { cursor: wait; }
`;

export const Thumb = styled.img`
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.15s ease;
    ${PhotoButton}:not(:disabled):hover & { transform: scale(1.03); }
    @media (prefers-reduced-motion: reduce) { transition: none; }
`;
