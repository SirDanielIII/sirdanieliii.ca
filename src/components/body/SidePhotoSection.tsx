import React from 'react';
import styled from 'styled-components';
import PhotoItem from '../body/PhotoItem'; // adjust path if needed

/* ---------- props ---------- */
export interface SidePhotoSectionProps {
    imgSrc: string;
    imgAlt?: string;
    align?: 'left' | 'right';          // photo on which side (default: 'left')
    photoMaxWidth?: number | string;   // default: 400
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
    align-items: stretch; /* equal column heights */
    gap: 20px;

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
    }
`;

const PhotoCol = styled.div<{ $align: 'left' | 'right'; $max: string }>`
    flex: 0 0 ${({$max}) => $max};
    max-width: ${({$max}) => $max};

    display: flex;
    justify-content: ${({$align}) =>
            $align === 'left' ? 'flex-start' : 'flex-end'};
    align-items: center;

    @media (max-width: 1100px) {
        flex: 0 1 auto;
        width: 100%;
        justify-content: center;
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
                                                               background,
                                                               padding = '30px',
                                                               children,
                                                           }) => {
    const maxW =
        `${photoMaxWidth}px`;

    const Photo = (
        <PhotoCol $align={align} $max={maxW}>
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
