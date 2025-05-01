import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;

    text-align: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: ${({theme}) => theme.colors.highlight3};
    margin-bottom: 1rem;
    font-family: ${({theme}) => theme.fonts.demi};
`;

const Message = styled.p`
    font-size: 1.25rem;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`;

const PortfolioPage: React.FC = () => (
    <Container>
        <Title>PORTFOLIO</Title>
        <Message>🔨 This page is under construction.</Message>
    </Container>
);

export default PortfolioPage;