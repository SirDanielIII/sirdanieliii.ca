// src/components/AboutServerSection.tsx
import React from 'react';
import styled from 'styled-components';
import PhotoItem, {PhotoMetadata} from './PhotoItem';

interface AboutServerSectionProps {
    align?: 'left' | 'right';
    photo: string;
    metadata: PhotoMetadata;
}

const SectionWrapper = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background1};
    padding: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 20px; /* controls the space between photo and text */

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

/**
 * PhotoContainer does NOT stretch; it just wraps the PhotoItem
 * and has a max-width so it won't expand too large.
 */
const PhotoContainer = styled.div<{ align: 'left' | 'right' }>`
    flex-shrink: 0;
    max-width: 400px;
    display: flex;
    justify-content: ${({align}) => (align === 'left' ? 'flex-start' : 'flex-end')};

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const TextContainer = styled.div`
    /* No fixed width, so it can shrink or grow as needed. */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    padding-left: 40px;
`;

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
    max-width: 700px; /* optional: limit text width if you like */

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

const AboutServerSection: React.FC<AboutServerSectionProps> = ({
                                                                   align = 'left',
                                                                   photo,
                                                                   metadata,
                                                               }) => {
    return (
        <SectionWrapper>
            {align === 'left' && (
                <PhotoContainer align={align}>
                    <PhotoItem photo={photo} metadata={metadata}/>
                </PhotoContainer>
            )}
            <TextContainer>
                <Title>About My Server</Title>
                <Desc>
                    SD_NAS is a custom-built Network-Attached Storage (NAS) server I assembled in November 2021. It currently runs Ubuntu 24.10 (Kernel 6.13.9) and serves as the
                    backbone for my self-hosted infrastructure—including this website, personal tools, game services, and various Dockerized services like Nextcloud & Jellyfin.
                </Desc>
                <Desc>
                    If my house were on fire and I could choose only one thing to save, it would be this computer lol.
                </Desc>

            </TextContainer>
            {align === 'right' && (
                <PhotoContainer align={align}>
                    <PhotoItem photo={photo} metadata={metadata}/>
                </PhotoContainer>
            )}
        </SectionWrapper>
    );
};

export default AboutServerSection;
