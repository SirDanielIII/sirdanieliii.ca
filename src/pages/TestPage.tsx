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


const GuidesPage: React.FC = () => (
    <Container>
        <p>Fortnite</p>
    </Container>
);

export default GuidesPage;
