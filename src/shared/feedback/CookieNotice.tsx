import React from 'react';
import {Notice, Message, DismissButton} from '../../css/feedback/CookieNotice.styles';

interface CookieNoticeProps {
    onDismiss: () => void;
}

const CookieNotice: React.FC<CookieNoticeProps> = ({onDismiss}) => (
    <Notice role="status" aria-live="polite">
        <Message>
            This site uses cookies to remember your colour theme, this notice, and portfolio access.
        </Message>
        <DismissButton type="button" onClick={onDismiss} aria-label="Dismiss cookie notice">
            GOT IT
        </DismissButton>
    </Notice>
);

export default CookieNotice;
