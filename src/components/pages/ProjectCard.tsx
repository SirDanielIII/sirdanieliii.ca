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
        dark: { title: string; background: string; description: string };
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
    /** percent width of the thumbnail on desktop (0‑1). default 0.4 */
    thumbRatio?: number;
}

/* ─── Layout & Responsiveness ─────────────────────────────────────────── */
const Card = styled.article<{ bg: string }>`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: ${({bg}) => bg};
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.18s ease, box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }

    @media (min-width: 640px) {
        flex-direction: row;
    }
`;

const Thumb = styled.div<{ ratio: number }>`
    position: relative;
    flex: 0 0 100%;
    width: 100%;
    aspect-ratio: 16 / 9;

    @media (min-width: 640px) {
        flex: 0 0 ${({ratio}) => ratio * 100}%;
        width: ${({ratio}) => ratio * 100}%;
        aspect-ratio: auto;
    }
`;

const ThumbnailImg = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;

    @media (min-width: 640px) {
        padding: 2rem;
    }
`;

/* ─── Typography ─────────────────────────────────────────────────────── */
const Title = styled.h3<{ color: string }>`
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({color}) => color};
`;

const Description = styled.p<{ color: string }>`
    margin: 0;
    line-height: 1.5;
    color: ${({color}) => color};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

/* ─── Tags & Actions ─────────────────────────────────────────────────── */
const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Tag = styled.li`
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    background: ${({theme}) => theme.colors.highlight5};
    color: #fff;
    font-size: 0.8rem;
`;

const Actions = styled.div`
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

const Button = styled.a`
    padding: 0.55rem 1.2rem;
    border: 1px solid ${({theme}) => theme.colors.highlight1};
    background: transparent;
    color: ${({theme}) => theme.colors.highlight1};
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.18s ease, color 0.18s ease;

    &:hover {
        background: ${({theme}) => theme.colors.highlight1};
        color: #fff;
    }
`;

/* ─── Component ─────────────────────────────────────────────────────── */
const ProjectCard: React.FC<ProjectCardProps> = ({project, isDarkMode, thumbRatio = 0.4}) => {
    const mode = isDarkMode ? 'dark' : 'light';
    const {title, version, description, tags, thumbnail, type, link, download, github, colors} = project;

    const titleColor = mode === 'dark' ? colors.dark.title : colors.light.title;
    const bgColor = mode === 'dark' ? colors.dark.background : colors.light.background;
    const descColor = mode === 'dark' ? colors.dark.description : colors.light.description;

    return (
        <Card bg={bgColor}>
            {thumbnail && (
                <Thumb ratio={thumbRatio}>
                    <ThumbnailImg src={`/projects/${project.folder}/${thumbnail}`} alt={title}/>
                </Thumb>
            )}

            <Content>
                <Title color={titleColor}>{`${title} v${version}`}</Title>
                <Description color={descColor}>{description}</Description>
                <Tags>{tags.map((t) => (<Tag key={t}>{t}</Tag>))}</Tags>
                <Actions>
                    {type === 'link' && link && (
                        <Button href={link} target="_blank" rel="noopener noreferrer">Visit</Button>
                    )}
                    {type === 'download' && download && (
                        <Button href={`/projects/${project.folder}/${download}`} download>Download</Button>
                    )}
                    {github && (
                        <Button href={github} target="_blank" rel="noopener noreferrer">GitHub</Button>
                    )}
                </Actions>
            </Content>
        </Card>
    );
};

export default ProjectCard;
