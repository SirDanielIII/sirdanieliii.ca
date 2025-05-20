import React from 'react';
import styled from 'styled-components';
import SidePhotoSection from "../body/SidePhotoSection.tsx";

const Title = styled.h2`
    font-size: 48px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.highlight2};
    margin-bottom: 10px;

    @media (max-width: 600px) {
        font-size: 36px;
    }
`;

const Desc = styled.p`
    font-size: 22px;
    line-height: 1.6;
    margin-bottom: 20px;
    max-width: 800px;
    color: ${({theme}) => theme.colors.text};

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

interface AboutServerSectionProps {
    src: string;
    align?: 'left' | 'right';
}

const AboutServerSection: React.FC<AboutServerSectionProps> = ({
                                                                   src,
                                                                   align = 'left',
                                                               }) => (
    <SidePhotoSection
        imgSrc={src}
        imgAlt="SD_NAS server"
        align={align}
        photoMaxWidth={520}
    >
        <Title>About My Server</Title>

        <Desc>
            SD_NAS is my homelab server that's really just a normal custom built PC that I built during November 2021.
            It mainly functions as my Network Attached Storage (NAS), but it
            also does a lot of other things, including running this website, other websites,
            game servers, and other various Dockerized applications such as Nextcloud & Jellyfin.
        </Desc>

        <Desc>
            Even during a natural disaster, I'm running in to save this computer since it has all of my data that sadly I cannot replace with money :(
        </Desc>
    </SidePhotoSection>
);

export default AboutServerSection;
