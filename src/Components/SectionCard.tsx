import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

interface CardProps {
    backgroundImage?: string;
}

const CardLink = styled(Link)<CardProps>`
    position: relative;
    overflow: hidden;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    text-align: center;
    color: ${({theme}) => theme.colors.text};
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }
`;

const Background = styled.div<{ backgroundImage?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({backgroundImage, theme}) =>
    backgroundImage
        ? `url(${backgroundImage}) center/cover no-repeat`
        : theme.colors.sectionCard};
    filter: blur(2px);
    z-index: 0;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3); /* Dark overlay */
    }
`;

interface TitleProps {
    textColor?: string;
}

const Title = styled.h2<TitleProps>`
    font-size: 30px;
    letter-spacing: 3px;
    /* Drop shadow added to text */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    /* Use the provided textColor, or fallback to theme color */
    color: ${({textColor, theme}) => textColor || theme.colors.text};
    position: relative;
    z-index: 1;
`;

interface SectionCardProps {
    title: string;
    to: string;
    backgroundImage?: string;
    textColor?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({title, to, backgroundImage, textColor}) => (
    <CardLink to={to} backgroundImage={backgroundImage}>
        <Background backgroundImage={backgroundImage}/>
        <Title textColor={textColor}>{title}</Title>
    </CardLink>
);

export default SectionCard;
