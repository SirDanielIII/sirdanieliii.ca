// src/pages/GuidesPage.tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1; /* fill the available vertical space */
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center; /* vertical centering */
    align-items: center; /* horizontal centering */
    text-align: center;
    padding: 0 20px; /* just some side padding */
`;

const Title = styled.h1`
    font-size: 3rem;
    color: ${({theme}) => theme.colors.highlight5};
    margin-bottom: 1rem;
    font-family: ${({theme}) => theme.fonts.demi};
`;

const Message = styled.p`
    font-size: 1.25rem;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`;

const GuidesPage: React.FC = () => (
    <Container>
        <Title>GUIDES</Title>
        <Message>🔨 This page is under construction.</Message>
    </Container>
);

export default GuidesPage;
