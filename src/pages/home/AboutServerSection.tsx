import React from 'react';
import SidePhotoSection from './SidePhotoSection';
import {Title, Desc} from '../../css/home/AboutServerSection.styles';

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
        photoAspectRatio="3 / 2"
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
