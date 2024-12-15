import React from 'react';
import styled from 'styled-components';

import youtubeIcon from '../assets/icons/youtube.png';
import githubIcon from '../assets/icons/github.png';
import instagramIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import emailIcon from '../assets/icons/gmail.png';

const IconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const IconLink = styled.a`
    display: inline-flex;
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 60%;
        height: 60%;
        object-fit: contain;
    }
`;

const SocialIcons: React.FC = () => {
    return (
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
    );
};

export default SocialIcons;
