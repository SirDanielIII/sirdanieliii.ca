import React from 'react';
import styled from 'styled-components';
import SectionCard from '../components/pages/SectionCard.tsx';
import {homeSections} from '../data/homeSections';
import AboutServerSection from "../components/pages/AboutServerSection.tsx";
import ServerPhoto from "../assets/images/homepage/SD_NAS_1.webp"
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
    max-width: 800px;
    margin: 0 auto 40px;
    font-size: 24px;
    line-height: 1.5;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

const IconsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const IconLink = styled.a`
    display: inline-flex;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    transition: transform 0.2s ease;

    img {
        width: 60%;
        height: 60%;
        object-fit: contain;
        transition: filter .18s ease;
        filter: ${({theme}) => theme.mode === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)'};
    }

    &:hover {
        transform: translateY(-3px);
    }
`;

const Sections = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background2};
    padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
`;

const SectionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.25rem, 2.5vw, 2rem);
    max-width: 1240px;
    margin: 0 auto;

    @media (max-width: 700px) {
        grid-template-columns: minmax(0, 1fr);
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

            <Sections aria-label="Explore the site">
                <SectionsGrid>
                    {homeSections.map((section, index) => (
                        <SectionCard key={section.id} section={section} eager={index < 2}/>
                    ))}
                </SectionsGrid>
            </Sections>

            <AboutServerSection align="left" src={ServerPhoto}/>

        </MainContent>
    );
};

export default HomePage;
