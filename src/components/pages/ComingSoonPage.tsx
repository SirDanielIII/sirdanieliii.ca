import React from 'react';
import styled from 'styled-components';
import type {AppTheme} from '../../styles/theme';

const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 50rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Title = styled.h1<{ $accent: keyof AppTheme['colors'] }>`
    margin-bottom: 1rem;
    color: ${({theme, $accent}) => theme.colors[$accent]};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: 3rem;
`;

const Message = styled.p`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 1.25rem;
`;

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
