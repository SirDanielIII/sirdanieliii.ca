import {useEffect, useRef} from 'react';
import {merch, type MerchDialogOptions, type MerchItem} from './merch';
import {PurchaseDialog, DialogProduct, Punchline, DialogNote, CloseButton} from '../../css/merch/MerchDialog.styles';

interface MerchDialogProps {
    item: MerchItem;
    onClose: () => void;
}

const MerchDialog = ({item, onClose}: MerchDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogOptions: MerchDialogOptions = {
        ...merch.dialog,
        ...item.dialog,
    };
    const dialogProduct = dialogOptions.productName ?? item.name;
    const dialogTitle = dialogOptions.title;
    const dialogMessage = dialogOptions.message;
    const dialogNote = dialogOptions.showNote ? dialogOptions.note : '';
    const dialogCloseLabel = (dialogOptions.closeLabel ?? 'Close').trim() || 'Close';
    const dialogDescriptionIds = [
        dialogMessage ? 'merch-dialog-message' : '',
        dialogNote ? 'merch-dialog-note' : '',
    ].filter(Boolean).join(' ') || undefined;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [item]);

    return (
        <PurchaseDialog
            ref={dialogRef}
            aria-labelledby={dialogTitle ? 'merch-dialog-title' : undefined}
            aria-label={dialogTitle ? undefined : item.name}
            aria-describedby={dialogDescriptionIds}
            onClose={() => {
                // Strict Mode can close and reopen the dialog before a queued close event fires.
                if (!dialogRef.current?.open) onClose();
            }}
            onClick={event => {
                if (event.target !== event.currentTarget) return;
                const {left, right, top, bottom} = event.currentTarget.getBoundingClientRect();
                if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                    event.currentTarget.close();
                }
            }}
        >
            {dialogOptions.showProductName && dialogProduct && <DialogProduct>{dialogProduct}</DialogProduct>}
            {dialogTitle && <h2 id="merch-dialog-title">{dialogTitle}</h2>}
            {dialogMessage && <Punchline id="merch-dialog-message">{dialogMessage}</Punchline>}
            {dialogNote && <DialogNote id="merch-dialog-note">{dialogNote}</DialogNote>}
            <CloseButton type="button" autoFocus onClick={() => { dialogRef.current?.close(); }}>
                {dialogCloseLabel}
            </CloseButton>
        </PurchaseDialog>
    );
};

export default MerchDialog;
