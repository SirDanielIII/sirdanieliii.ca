import React from 'react';
import styled from 'styled-components';

export interface ProjectData {
    folder: string;
    title: string;
    version: string;
    description: string;
    tags: string[];
    colors: {
        light: { title: string; background: string; description: string };
        dark:  { title: string; background: string; description: string };
    };
    thumbnail?: string;
    type: 'link' | 'download';
    link?: string;
    download?: string;
    github?: string;
}

interface ProjectCardProps {
    project: ProjectData;
    isDarkMode: boolean;
    infoFlex?: number;
    imageFlex?: number;
}

/* ─── Layout ─────────────────────────────────────────────────────────────── */
const Card = styled.div<{ bg: string }>`
    display: flex;
    background: ${({ bg }) => bg};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    //max-width: 725px;

    &:hover { transform: translateY(-4px); }

    @media (max-width: 750px) {
        flex-direction: column;
        align-items: center; /* centre both panes */
        padding-bottom: 20px;
    }
    
    @media (max-width: 500px) {
        flex-direction: column;
        align-items: center; /* centre both panes */
        max-width: 450px;
        padding-bottom: 20px;
    }
`;

const Info = styled.div<{ flex: number }>`
    flex: ${({ flex }) => flex};
    min-width: 250px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;

    @media (max-width: 750px) {
        align-items: center;
        text-align: center;
    }
`;

const ImageOuter = styled.div<{ flex: number }>`
    flex: ${({ flex }) => flex};
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
        justify-content: center;
        width: 100%;
    }
`;

/* square that shrinks on small screens */
const ImageBox = styled.div`
    position: relative;
    width: clamp(140px, 45vw, 350px);
    aspect-ratio: 1 / 1;
    overflow: hidden;

    @media (max-width: 750px) {
        margin-top: 1rem;
        width: clamp(140px, 80vw, 300px);
    }
`;

const Thumbnail = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

/* ─── Typography ─────────────────────────────────────────────────────────── */
const Title = styled.h3<{ color: string }>`
    margin: 0;
    font-size: 2rem;
    color: ${({ color }) => color};
`;

const Description = styled.p<{ color: string }>`
    margin: 0;
    color: ${({ color }) => color};
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

/* ─── Tags & Buttons ─────────────────────────────────────────────────────── */
const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    @media (max-width: 750px) {
        justify-content: center;
    }
`;

const Tag = styled.span`
    background: ${({ theme }) => theme.colors.highlight5};
    color: #fff;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
`;

const Actions = styled.div`
    margin-top: auto;
    display: flex;
    gap: 1rem;

    @media (max-width: 750px) {
        justify-content: center;
    }
`;

const Button = styled.a`
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.highlight1};
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 6px;
    font-size: 1rem;
    transition: background 0.2s;

    &:hover { background: ${({ theme }) => theme.colors.highlight2}; }
`;

/* ─── Component ─────────────────────────────────────────────────────────── */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDarkMode, infoFlex = 2, imageFlex = 3 }) => {
    const mode = isDarkMode ? 'dark' : 'light';
    const { title, version, description, tags, thumbnail, type, link, download, github, colors } = project;

    const titleColor = mode === 'dark' ? colors.dark.title : colors.light.title;
    const bgColor    = mode === 'dark' ? colors.dark.background : colors.light.background;
    const descColor  = mode === 'dark' ? colors.dark.description : colors.light.description;

    return (
        <Card bg={bgColor}>
            <Info flex={infoFlex}>
                <Title color={titleColor}>{`${title} v${version}`}</Title>
                <Description color={descColor}>{description}</Description>
                <Tags>{tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
                <Actions>
                    {type === 'link' && link && <Button href={link} target="_blank" rel="noreferrer">Visit</Button>}
                    {type === 'download' && download && <Button href={`/projects/${project.folder}/${download}`} download>Download</Button>}
                    {github && <Button href={github} target="_blank" rel="noreferrer">GitHub</Button>}
                </Actions>
            </Info>

            <ImageOuter flex={imageFlex}>
                <ImageBox>
                    {thumbnail && <Thumbnail src={`/projects/${project.folder}/${thumbnail}`} alt={title} />}
                </ImageBox>
            </ImageOuter>
        </Card>
    );
};

export default ProjectCard;
