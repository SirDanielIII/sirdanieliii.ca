import React from 'react';
import styled from 'styled-components';
import SocialIcons from '../Components/SocialIcons';
import SectionCard from '../Components/SectionCard';
import SectionArticles from '../assets/images/section_card/section_articles.webp'
import SectionMerch from '../assets/images/section_card/section_merch.webp'
import SectionPortfolio from '../assets/images/section_card/section_portfolio.webp'
import SectionProjects from '../assets/images/section_card/section_projects.webp'


const MainContent = styled.main`
    margin-top: 80px; /* Space for fixed header */
`;

const AboutMeSection = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background1};
    padding: 60px 20px;
    text-align: center;
`;

const AboutMeTitle = styled.h1`
    font-size: 64px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.highlight1};
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

const Sections = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background2};
    padding: 10px 10px;
    text-align: center;
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

const AboutServerSection = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background1};
    padding: 60px 20px;
    text-align: center;
`;

const AboutServerTitle = styled.h2`
    font-size: 48px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.highlight2};
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 36px;
    }
`;

const AboutServerDesc = styled.p`
    font-size: 22px;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 600px) {
        font-size: 18px;
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
                <Temp>WEBSITE CURRENTLY UNDER CONSTRUCTION 🔨</Temp>
                <SocialIcons/>
            </AboutMeSection>

            <Sections>
                <SectionsGrid>
                    <SectionCard title="PROJECTS" to="/projects" backgroundImage={SectionProjects}/>
                    <SectionCard title="PORTFOLIO" to="/portfolio" backgroundImage={SectionPortfolio}/>
                    <SectionCard title="MERCH" to="/merch" backgroundImage={SectionMerch}/>
                    <SectionCard title="ARTICLES" to="/articles" backgroundImage={SectionArticles}/>
                </SectionsGrid>
            </Sections>

            <AboutServerSection>
                <AboutServerTitle>What is this hosted on?</AboutServerTitle>
                <AboutServerDesc>
                    My server go brrrr.
                </AboutServerDesc>
            </AboutServerSection>
        </MainContent>
    );
};

export default HomePage;
