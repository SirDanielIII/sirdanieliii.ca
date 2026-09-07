import React from 'react';
import type {AppTheme} from '../../css/theme';
import {Page, Title, Message} from '../../css/feedback/ComingSoonPage.styles';

interface ComingSoonPageProps {
    title: string;
    accent: keyof AppTheme['colors'];
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({title, accent}) => (
    <Page>
        <Title $accent={accent}>{title}</Title>
        <Message>&#128296; This page is under construction.</Message>
    </Page>
);

export default ComingSoonPage;
