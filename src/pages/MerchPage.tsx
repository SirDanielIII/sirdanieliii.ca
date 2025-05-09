import React from 'react';
import styled from 'styled-components';

const MerchContainer = styled.div`
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

const MerchTitle = styled.h1`
    font-size: 3rem;
    color: ${({theme}) => theme.colors.highlight4};
    margin-bottom: 1rem;
    font-family: ${({theme}) => theme.fonts.demi};
`;

const MerchMessage = styled.p`
    font-size: 1.25rem;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`;

const MerchPage: React.FC = () => (
    <MerchContainer>
        <MerchTitle>MERCH</MerchTitle>
        <MerchMessage>🔨 This page is under construction.</MerchMessage>
    </MerchContainer>
);

export default MerchPage;