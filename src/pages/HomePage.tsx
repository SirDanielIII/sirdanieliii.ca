import React from 'react';
import styled from 'styled-components';
import SectionCard from '../components/pages/SectionCard.tsx';
import SectionGuides from '../assets/images/section_card/section_guides.webp'
import SectionMerch from '../assets/images/section_card/section_merch.webp'
import SectionPortfolio from '../assets/images/section_card/section_portfolio.webp'
import SectionProjects from '../assets/images/section_card/section_projects.webp'
import AboutServerSection from "../components/pages/AboutServerSection.tsx";
import ServerPhoto from "../assets/images/homepage/SD_NAS_1.JPG"
import youtubeIcon from "../assets/icons/youtube.svg";
import githubIcon from "../assets/icons/github.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import tiktokIcon from "../assets/icons/tiktok.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import emailIcon from "../assets/icons/gmail.svg";

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

const IconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const IconLink = styled.a`
    display: inline-flex;
        //background: ${({theme}) => theme.colors.highlight2};
    border-radius: 50%;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.2s ease;
    filter: invert(1);

    img {
        width: 60%;
        height: 60%;
        object-fit: contain;
        transition: filter .18s ease;
    }

    &:hover {
        transform: translateY(-3px);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        transform: scale(.8);
        transition: opacity .25s ease, transform .25s ease;
        pointer-events: none;
    }

    &:hover::after {
        opacity: 1;
        transform: scale(1);
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
    max-width: 1500px;
    margin: 40px auto;
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 20px;
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
                <IconsWrapper>
                    <IconLink href="https://www.youtube.ca/@SirDanielIII?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube"/>
                    </IconLink>
                    <IconLink href="https://github.com/SirDanielIII/" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub"/>
                    </IconLink>
                    <IconLink href="https://www.instagram.com/sirdaniel_dathird/" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram"/>
                    </IconLink>
                    <IconLink href="https://www.tiktok.com/@sirdaniel_dathird/" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokIcon} alt="TikTok"/>
                    </IconLink>
                    <IconLink href="https://www.linkedin.com/in/danielzhuo-sd/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn"/>
                    </IconLink>
                    <IconLink href="mailto:sirdanieldathird@gmail.com">
                        <img src={emailIcon} alt="Email"/>
                    </IconLink>
                </IconsWrapper>
            </AboutMeSection>

            <Sections>
                <SectionsGrid>
                    <SectionCard title="PROJECTS" to="/projects" backgroundImage={SectionProjects}/>
                    <SectionCard title="PORTFOLIO" to="/portfolio" backgroundImage={SectionPortfolio}/>
                    <SectionCard title="MERCH" to="/merch" backgroundImage={SectionMerch}/>
                    <SectionCard title="GUIDES" to="/guides" backgroundImage={SectionGuides}/>
                </SectionsGrid>
            </Sections>

            <AboutServerSection align="left" src={ServerPhoto}/>

        </MainContent>
    );
};

export default HomePage;
