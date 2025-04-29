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

/* ─────────── Styled Components ─────────── */
const Card = styled.div<{ bg: string }>`
    display: flex;
    background: ${({ bg }) => bg};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;

    &:hover { transform: translateY(-4px); }

    @media (max-width: 600px) { flex-direction: column; }
`;

const Info = styled.div<{ flex: number }>`
    flex: ${({ flex }) => flex};
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 450px;          /* always narrower than image */
    overflow: hidden;
`;

/* Square image that touches card edges */
const ImageOuter = styled.div<{ flex: number }>`
    flex: ${({ flex }) => flex};
    display: flex;
    max-width: 600px;
`;

const ImageBox = styled.div`
    position: relative;
    /*  - never larger than 350 px
        - scales down with the viewport (≈ 30 vw)
        - never smaller than 200 px so it’s still readable         */
    width: clamp(200px, 30vw, 350px);
    aspect-ratio: 1 / 1;   /* perfect square */
    overflow: hidden;
`;

const Thumbnail = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

/* Title includes version inline, so they never separate */
const Title = styled.h3<{ color: string }>`
    margin: 0;
    font-size: 2rem;
    color: ${({ color }) => color};
`;

/* clamp description to 3 lines */
const Description = styled.p<{ color: string }>`
    margin: 0;
    color: ${({ color }) => color};
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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

/* ─────────── Component ─────────── */
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
                    {type === 'link' && link && (
                        <Button href={link} target="_blank" rel="noreferrer">Visit</Button>
                    )}
                    {type === 'download' && download && (
                        <Button href={`/projects/${project.folder}/${download}`} download>Download</Button>
                    )}
                    {github && (
                        <Button href={github} target="_blank" rel="noreferrer">GitHub</Button>
                    )}
                </Actions>
            </Info>

            <ImageOuter flex={imageFlex}>
                <ImageBox>
                    {thumbnail && (
                        <Thumbnail src={`/projects/${project.folder}/${thumbnail}`} alt={title} />
                    )}
                </ImageBox>
            </ImageOuter>
        </Card>
    );
};

export default ProjectCard;