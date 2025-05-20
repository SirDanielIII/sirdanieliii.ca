// ───────────────────────────────────────────────────────────────
// src/components/PhotoItem.tsx
// ───────────────────────────────────────────────────────────────
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

/* ---------- styled bits ---------- */
const Thumb = styled.img`
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

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const FullImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
`;

/* ---------- component ---------- */
interface PhotoItemProps {
    src: string;
    alt?: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({src, alt = 'photo'}) => {
    const [open, setOpen] = useState(false);

    /* close on Esc */
    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', escHandler);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', escHandler);
        }
        return () => window.removeEventListener('keydown', escHandler);
    }, [open, escHandler]);

    return (
        <>
            <Thumb src={src} alt={alt} onClick={() => setOpen(true)}/>
            {open && (
                <Backdrop onClick={() => setOpen(false)}>
                    <FullImage
                        src={src}
                        alt={alt}
                        onClick={(e) => e.stopPropagation()} // keep click inside from closing
                    />
                </Backdrop>
            )}
        </>
    );
};

export default PhotoItem;
