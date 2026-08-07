import React from 'react';
import styled from 'styled-components';
import PhotoItem from './PhotoItem';

/* ---------- props ---------- */
export interface SidePhotoSectionProps {
    imgSrc: string;
    imgAlt?: string;
    align?: 'left' | 'right';          // photo on which side (default: 'left')
    photoMaxWidth?: number | string;   // default: 400
    photoAspectRatio?: string;
    background?: string;               // fallback → theme.colors.background1
    padding?: string;                  // default: '30px'
    children: React.ReactNode;         // *your* JSX goes here
}

/* ---------- layout primitives ---------- */
const Section = styled.section<{ $bg?: string; $pad: string }>`
    width: 100%;
    background: ${({$bg, theme}) => $bg ?? theme.colors.background1};
    padding: ${({$pad}) => $pad};

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
    }
`;

const PhotoCol = styled.div<{ $max: string; $aspectRatio: string }>`
    flex: 0 0 ${({$max}) => $max};
    width: 100%;
    max-width: ${({$max}) => $max};
    aspect-ratio: ${({$aspectRatio}) => $aspectRatio};

    @media (max-width: 1100px) {
        flex: 0 1 auto;
    }
`;

const TextCol = styled.div`
    flex: 0 1 700px;
    max-width: 700px;

    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 40px;

    @media (max-width: 1100px) {
        flex: 0 1 100%;
        padding: 20px 0 0;
        text-align: center;
        align-items: center;
        max-width: none;
    }
`;

/* ---------- component ---------- */
const SidePhotoSection: React.FC<SidePhotoSectionProps> = ({
    imgSrc,
    imgAlt = '',
    align = 'left',
    photoMaxWidth = 400,
    photoAspectRatio = 'auto',
    background,
    padding = '30px',
    children,
}) => {
    const maxWidth = typeof photoMaxWidth === 'number'
        ? `${String(photoMaxWidth)}px`
        : photoMaxWidth;

    const Photo = (
        <PhotoCol $max={maxWidth} $aspectRatio={photoAspectRatio}>
            <PhotoItem src={imgSrc} alt={imgAlt}/>
        </PhotoCol>
    );

    return (
        <Section $bg={background} $pad={padding}>
            {align === 'left' && Photo}
            <TextCol>{children}</TextCol>
            {align === 'right' && Photo}
        </Section>
    );
};

export default SidePhotoSection;
