import type {KeyboardEvent, MouseEvent} from 'react';
import {useModalDialog} from './useModalDialog';

/** Shared image-dialog lifecycle and navigation; each section owns its layout and URL. */
export function useImageViewer({opener, onClose, onNavigate, fallbackSelectors}: {
    opener: HTMLElement | null;
    onClose: () => void;
    onNavigate: (offset: number) => void;
    fallbackSelectors: string[];
}) {
    const modal = useModalDialog(opener, onClose, fallbackSelectors);
    const dismiss = () => { modal.ref.current?.close(); };
    return {
        dismiss,
        dialogProps: {
            ...modal,
            onClick: (event: MouseEvent<HTMLDialogElement>) => {
                if (event.target === event.currentTarget) dismiss();
            },
            onKeyDown: (event: KeyboardEvent<HTMLDialogElement>) => {
                // Zoom/pan keys are handled by ViewerImage. Keep metadata scrolling and shortcuts intact.
                if (event.altKey || event.ctrlKey || event.metaKey
                    || (event.target as HTMLElement).matches('.viewer-sidebar')
                    || (event.target as HTMLElement).closest('.viewer-metadata, input, textarea, select, [contenteditable="true"]')) return;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    onNavigate(event.key === 'ArrowLeft' ? -1 : 1);
                }
            },
        },
    };
}
