import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Thumb, Backdrop, FullImage} from '../../css/home/PhotoItem.styles';

const blockedScrollKeys = new Set([
    'ArrowDown',
    'ArrowUp',
    'End',
    'Home',
    'PageDown',
    'PageUp',
    ' ',
    'Tab',
]);

/* ---------- component ---------- */
interface PhotoItemProps {
    src: string;
    alt?: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({src, alt = 'photo'}) => {
    const [open, setOpen] = useState(false);
    const savedScrollPosition = useRef({x: 0, y: 0});

    /* close on Esc */
    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false);
            return;
        }

        if (blockedScrollKeys.has(e.key)) {
            e.preventDefault();
        }
    }, []);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const {x: scrollX, y: scrollY} = savedScrollPosition.current;

        const preventWheel = (event: WheelEvent) => {
            event.preventDefault();
        };

        const preventTouchMove = (event: TouchEvent) => {
            event.preventDefault();
        };

        const preservePosition = () => {
            if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
                window.scrollTo(scrollX, scrollY);
            }
        };

        window.addEventListener('keydown', escHandler);
        window.addEventListener('wheel', preventWheel, {passive: false});
        window.addEventListener('touchmove', preventTouchMove, {passive: false});
        window.addEventListener('scroll', preservePosition, {passive: true});

        return () => {
            window.removeEventListener('keydown', escHandler);
            window.removeEventListener('wheel', preventWheel);
            window.removeEventListener('touchmove', preventTouchMove);
            window.removeEventListener('scroll', preservePosition);
            window.scrollTo(scrollX, scrollY);
        };
    }, [open, escHandler]);

    return (
        <>
            <Thumb src={src} alt={alt} onClick={() => {
                savedScrollPosition.current = {
                    x: window.scrollX,
                    y: window.scrollY,
                };
                setOpen(true);
            }}/>
            {open && (
                <Backdrop onClick={() => {
                    setOpen(false);
                }}>
                    <FullImage
                        src={src}
                        alt={alt}
                        onClick={(e) => {
                            e.stopPropagation();
                        }} // keep click inside from closing
                    />
                </Backdrop>
            )}
        </>
    );
};

export default PhotoItem;
