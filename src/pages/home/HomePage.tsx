import React from 'react';
import SectionCard from './SectionCard';
import {homeSections} from './homeSections';
import AboutServerSection from './AboutServerSection';
import ServerPhoto from '../../assets/images/homepage/SD_NAS_1.webp';
import youtubeIcon from '../../assets/icons/youtube.svg';
import githubIcon from '../../assets/icons/github.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';
import linkedinIcon from '../../assets/icons/linkedin.svg';
import emailIcon from '../../assets/icons/gmail.svg';
import {
    MainContent,
    AboutMeSection,
    AboutMeTitle,
    AboutMeDesc,
    IconsWrapper,
    IconLink,
    Sections,
    SectionsGrid,
} from '../../css/home/HomePage.styles';

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
