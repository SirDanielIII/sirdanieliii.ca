import React from 'react';
import styled from 'styled-components';
import SocialIcons from '../Components/SocialIcons';
import SectionCard from '../Components/SectionCard';

const MainContent = styled.main`
    margin-top: 80px; /* Space for fixed header */
`;

const AboutMeSection = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.primaryBg};
    padding: 60px 20px;
    text-align: center;
`;

const AboutMeTitle = styled.h1`
    font-size: 64px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.textHighlight};
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 48px;
    }
`;

const AboutMeDesc = styled.p`
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

const SectionsGrid = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    max-width: 1200px;
    margin: 40px auto;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const Temp = styled.p`
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: red;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;
const HomePage: React.FC = () => {
    return (
        <MainContent>
            <AboutMeSection>
                <AboutMeTitle>ABOUT ME</AboutMeTitle>
                <AboutMeDesc>
                    I am a person who has no clue what they're doing at all times.
                </AboutMeDesc>
                <Temp>
                    WEBSITE CURRENTLY UNDER CONSTRUCTION 🔨
                </Temp>
                <SocialIcons/>
            </AboutMeSection>

            <SectionsGrid>
                <SectionCard title="PROJECTS" to="/projects" backgroundImage="https://via.placeholder.com/600x400?text=Projects"/>
                <SectionCard title="PORTFOLIO" to="/portfolio" backgroundImage="https://via.placeholder.com/600x400?text=Portfolio"/>
                <SectionCard title="MERCH" to="/merch" backgroundImage="https://via.placeholder.com/600x400?text=Merch"/>
                <SectionCard title="ARTICLES" to="/articles" backgroundImage="https://via.placeholder.com/600x400?text=Articles"/>
            </SectionsGrid>
        </MainContent>
    );
};


export default HomePage;
