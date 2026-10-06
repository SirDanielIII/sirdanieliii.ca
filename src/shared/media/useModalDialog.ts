import {useEffect, useRef, type MouseEvent} from 'react';

/** Native focus containment, Escape, scroll lock and focus return for portfolio viewers. */
export function useModalDialog(opener: HTMLElement | null, onClose: () => void, fallbackSelectors: string[] = []) {
    const dialog = useRef<HTMLDialogElement>(null);
    const openingTarget = useRef({opener, fallbackSelectors});

    useEffect(() => {
        const element = dialog.current;
        const target = openingTarget.current;
        const scrollRoot = document.documentElement;
        const previousOverflow = scrollRoot.style.overflow;
        const pathname = window.location.pathname;
        const position = {x: window.scrollX, y: window.scrollY};
        const restorePosition = () => {
            if (window.location.pathname === pathname) {
                window.scrollTo({left: position.x, top: position.y, behavior: 'instant'});
            }
        };
        const rememberPosition = () => {
            // Restoration after a refresh can finish after the dialog has mounted.
            if (element?.open) { position.x = window.scrollX; position.y = window.scrollY; }
        };
        element?.showModal();
        element?.querySelector<HTMLButtonElement>('[data-viewer-close]')?.focus({preventScroll: true});
        // Lock the root. Body overflow clips this site's 100%-height body and clamps deep scrolls.
        scrollRoot.style.overflow = 'hidden';
        restorePosition();
        window.addEventListener('scroll', rememberPosition, {passive: true});
        element?.addEventListener('close', restorePosition);
        return () => {
            window.removeEventListener('scroll', rememberPosition);
            element?.removeEventListener('close', restorePosition);
            element?.close();
            scrollRoot.style.overflow = previousOverflow;
            const returnTarget = target.opener?.isConnected ? target.opener
                : target.fallbackSelectors.map(selector => document.querySelector<HTMLElement>(selector)).find(Boolean);
            returnTarget?.focus({preventScroll: true});
            restorePosition();
        };
    }, []);

    return {
        ref: dialog,
        onClose: () => {
            // Ignore the queued cleanup event when Strict Mode has already reopened it.
            if (!dialog.current?.open) onClose();
        },
        onClick: (event: MouseEvent<HTMLDialogElement>) => {
            if (event.target !== event.currentTarget) return;
            const {left, right, top, bottom} = event.currentTarget.getBoundingClientRect();
            if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                event.currentTarget.close();
            }
        },
    };
}
