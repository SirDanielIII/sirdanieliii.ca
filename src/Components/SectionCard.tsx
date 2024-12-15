import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

interface CardProps {
    backgroundImage?: string;
}

const CardLink = styled(Link)<CardProps>`
    background: ${({backgroundImage, theme}) => backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : theme.colors.cardBg};
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    text-align: center;
    color: ${({theme}) => theme.colors.textLight};
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.02);
    }
`;

const Title = styled.h2`
    font-size: 30px;
    letter-spacing: 3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
`;

interface SectionCardProps {
    title: string;
    to: string;
    backgroundImage?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({title, to, backgroundImage}) => (
    <CardLink to={to} backgroundImage={backgroundImage}>
        <Title>{title}</Title>
    </CardLink>
);

export default SectionCard;
