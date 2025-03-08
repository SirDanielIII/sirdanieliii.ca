import React from 'react';
import styled from 'styled-components';
import SocialIcons from '../Components/SocialIcons';
import SectionCard from '../Components/SectionCard';
import SectionArticles from '../assets/images/section_card/section_articles.webp'
import SectionMerch from '../assets/images/section_card/section_merch.webp'
import SectionPortfolio from '../assets/images/section_card/section_portfolio.webp'
import SectionProjects from '../assets/images/section_card/section_projects.webp'
import AboutServerSection from "../Components/AboutServerSection.tsx";
import ServerPhoto from "../assets/images/homepage/SD_NAS_1.JPG"

const SD_NAS_1_Metadata = {
    type: 'JPG',
    size: '12.3 MB',
    dimensions: '6240x4160',
    cameraModel: 'FUJIFILM X-T4',
    fStop: 'f/1.4',
    exposureTime: '8sec.',
    isoSpeed: '1250',
    exposureBias: '0 step',
    focalLength: '33mm',
    maxAperture: '1',
    meteringMode: 'Pattern',
    flashMode: 'No flash',
    focal35: '50'
};

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


const Temp = styled.p`
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 10px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: red;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

const Temp2 = styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: white;

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
                <Temp2>All images, icons & logos used right now are currently placeholders!</Temp2>
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

            {/* About Server Section with Photo on Left */}
            <AboutServerSection align="left" photo={ServerPhoto} metadata={SD_NAS_1_Metadata} alt="Server"/>

        </MainContent>
    );
};

export default HomePage;
