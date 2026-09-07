import styled from 'styled-components';

/* ---------- styled bits ---------- */
export const Thumb = styled.img`
    /* fill PhotoContainer’s full height while keeping aspect‑ratio */
    height: 100%;
    width: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* show entire image, no cropping */

    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const FullImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
`;
