import React from 'react';
import PhotoItem from './PhotoItem';
import {Section, PhotoCol, TextCol} from '../../css/home/SidePhotoSection.styles';

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
