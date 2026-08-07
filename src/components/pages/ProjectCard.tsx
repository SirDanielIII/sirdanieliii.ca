import React from 'react';
import styled, {useTheme} from 'styled-components';
import downloadBlack from '../../assets/icons/download-black.svg';
import downloadWhite from '../../assets/icons/download-white.svg';
import githubBlack from '../../assets/icons/github-black.svg';
import githubWhite from '../../assets/icons/github-white.svg';
import linkBlack from '../../assets/icons/link-black.svg';
import linkWhite from '../../assets/icons/link-white.svg';

export interface ProjectActions {
    download?: string;
    github?: string;
    visit?: string;
}

export interface ProjectColorScheme {
    title: string;
    background: string;
    description: string;
    accent?: string;
    border?: string;
    tagBackground?: string;
    tagText?: string;
}

export interface ProjectData {
    folder: string;
    title: string;
    version?: string;
    description: string;
    tags: string[];
    lastUpdated?: string;
    thumbnail?: string;
    showThumbnailBackground?: boolean;
    actions?: ProjectActions;
    colors: {
        light: ProjectColorScheme;
        dark: ProjectColorScheme;
    };
}

interface ProjectCardProps {
    project: ProjectData;
}

interface CardPalette {
    title: string;
    background: string;
    description: string;
    accent: string;
    border: string;
    tagBackground: string;
    tagText: string;
}

const Card = styled.article<{ $palette: CardPalette }>`
    width: 100%;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 484 / 920;
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: clamp(3px, 0.3vw, 5px) solid ${({$palette}) => $palette.border};
    background: ${({$palette}) => $palette.background};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 22px 44px rgba(0, 0, 0, 0.24);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`;

const Artwork = styled.div<{ $background: string }>`
    position: relative;
    width: 76%;
    margin: clamp(1.25rem, 8.25cqw, 2.5rem) auto 0;
    flex: 0 0 auto;
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({$background}) => $background};

    @container (max-width: 19rem) {
        width: 68%;
        margin-top: 6cqw;
    }
`;

const ThumbnailImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ArtworkPlaceholder = styled.div<{ $color: string }>`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(3.25rem, 18cqw, 9rem);
    opacity: 0.75;
`;

const Content = styled.div`
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: clamp(0.7rem, 4.1cqw, 1.25rem) clamp(1.2rem, 8.25cqw, 2.5rem) clamp(0.65rem, 3.3cqw, 1rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-align: center;
`;

const Title = styled.h2<{ $color: string }>`
    max-width: 100%;
    color: ${({$color}) => $color};
    font-family: 'BRLNSR', sans-serif;
    font-size: clamp(1.35rem, 7.4cqw, 2.25rem);
    font-weight: 400;
    line-height: 1.1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-transform: uppercase;
`;

const Version = styled.p<{ $color: string }>`
    margin-top: clamp(0.15rem, 0.8cqw, 0.25rem);
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(1rem, 5.1cqw, 1.55rem);
    line-height: 1.25;
`;

const Description = styled.p<{ $color: string }>`
    width: 100%;
    margin-top: clamp(0.65rem, 4.1cqw, 1.25rem);
    color: ${({$color}) => $color};
    font-size: clamp(0.9rem, 4.1cqw, 1.25rem);
    line-height: 1.25;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    overflow-wrap: anywhere;
`;

const Tags = styled.ul`
    width: 100%;
    max-height: clamp(3.5rem, 17cqw, 5rem);
    margin-top: clamp(0.75rem, 5cqw, 1.5rem);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.4rem, 2.5cqw, 0.75rem);
    overflow: hidden;
    list-style: none;
`;

const Tag = styled.li<{ $background: string; $color: string }>`
    max-width: 100%;
    padding: clamp(0.3rem, 1.5cqw, 0.45rem) clamp(0.65rem, 3.3cqw, 1rem);
    border-radius: 9px;
    background: ${({$background}) => $background};
    color: ${({$color}) => $color};
    font-size: clamp(0.85rem, 3.5cqw, 1.05rem);
    line-height: 1.1;
    overflow-wrap: anywhere;
`;

const CardFooter = styled.footer`
    width: 100%;
    margin-top: auto;
    padding-top: clamp(0.75rem, 5cqw, 1.5rem);
    flex: 0 0 auto;
`;

const Actions = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.4rem, 2.5cqw, 0.75rem);
    list-style: none;
`;

const ActionItem = styled.li`
    flex: 1 1 clamp(3.75rem, 17cqw, 5rem);
    max-width: clamp(5.5rem, 25cqw, 7.75rem);
`;

const ActionLink = styled.a<{ $background: string; $border: string }>`
    min-height: clamp(3rem, 15.4cqw, 4.65rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({$border}) => $border};
    border-radius: clamp(14px, 4.1cqw, 20px);
    background: ${({$background}) => $background};
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-3px);
        filter: brightness(1.12);
        box-shadow: 5px 7px 8px rgba(0, 0, 0, 0.24);
    }

    &:focus-visible {
        outline: 3px solid ${({$border}) => $border};
        outline-offset: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }

`;

const ActionIcon = styled.img`
    width: clamp(2rem, 10.25cqw, 3.1rem);
    height: clamp(2rem, 10.25cqw, 3.1rem);
    object-fit: contain;
`;

const LastUpdated = styled.p<{ $color: string }>`
    margin-top: clamp(0.5rem, 2.65cqw, 0.8rem);
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: clamp(0.75rem, 3.3cqw, 1rem);
    line-height: 1.25;
`;

const isAbsoluteUrl = (value: string) => /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(value);

const projectAssetUrl = (folder: string, asset: string) => {
    if (isAbsoluteUrl(asset)) {
        return asset;
    }

    const encodedFolder = encodeURIComponent(folder);
    const encodedAsset = asset.split('/').map(encodeURIComponent).join('/');
    return `/projects/${encodedFolder}/${encodedAsset}`;
};

const formatVersion = (version: string) => /^v/i.test(version) ? version : `v${version}`;

const formatDate = (date?: string) => {
    if (!date) {
        return null;
    }

    const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    return isoDate ? `${isoDate[2]}/${isoDate[3]}/${isoDate[1]}` : date;
};

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
    const theme = useTheme();
    const isDarkMode = theme.mode === 'dark';
    const scheme = isDarkMode ? project.colors.dark : project.colors.light;
    const palette: CardPalette = {
        title: scheme.title,
        background: scheme.background,
        description: scheme.description,
        accent: scheme.accent ?? scheme.title,
        border: scheme.border ?? scheme.title,
        tagBackground: scheme.tagBackground ?? (isDarkMode ? '#78819E' : '#D9DFE8'),
        tagText: scheme.tagText ?? '#11131A',
    };

    const actionBackgrounds = isDarkMode
        ? {download: '#2E4452', github: '#24292E', visit: '#2E4452'}
        : {download: '#DCE8ED', github: '#E4E7EA', visit: '#DCE8ED'};
    const iconSet = isDarkMode
        ? {download: downloadWhite, github: githubWhite, visit: linkWhite}
        : {download: downloadBlack, github: githubBlack, visit: linkBlack};
    const updatedDate = formatDate(project.lastUpdated);
    const actions = project.actions ?? {};
    const hasActions = [actions.download, actions.github, actions.visit].some(Boolean);
    const artworkBackground = project.thumbnail && project.showThumbnailBackground === false
        ? 'transparent'
        : palette.tagBackground;

    return (
        <Card $palette={palette}>
            <Artwork $background={artworkBackground}>
                {project.thumbnail ? (
                    <ThumbnailImg
                        src={projectAssetUrl(project.folder, project.thumbnail)}
                        alt={`${project.title} project artwork`}
                        loading="lazy"
                    />
                ) : (
                    <ArtworkPlaceholder $color={palette.title} aria-hidden="true">
                        {project.title.charAt(0).toUpperCase()}
                    </ArtworkPlaceholder>
                )}
            </Artwork>

            <Content>
                <Title $color={palette.title}>{project.title}</Title>
                {project.version && (
                    <Version $color={palette.accent}>{formatVersion(project.version)}</Version>
                )}
                <Description $color={palette.description}>{project.description}</Description>

                {project.tags.length > 0 && (
                    <Tags aria-label="Project tags">
                        {project.tags.map((tag, index) => (
                            <Tag
                                key={`${tag}-${String(index)}`}
                                $background={palette.tagBackground}
                                $color={palette.tagText}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </Tags>
                )}

                {(hasActions || updatedDate) && (
                    <CardFooter>
                        {hasActions && (
                            <Actions aria-label={`${project.title} links`}>
                                {actions.download && (
                                    <ActionItem>
                                        <ActionLink
                                            href={projectAssetUrl(project.folder, actions.download)}
                                            download
                                            aria-label={`Download ${project.title}`}
                                            title={`Download ${project.title}`}
                                            $background={actionBackgrounds.download}
                                            $border={palette.border}
                                        >
                                            <ActionIcon src={iconSet.download} alt="" aria-hidden="true"/>
                                        </ActionLink>
                                    </ActionItem>
                                )}
                                {actions.github && (
                                    <ActionItem>
                                        <ActionLink
                                            href={actions.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${project.title} on GitHub`}
                                            title={`View ${project.title} on GitHub`}
                                            $background={actionBackgrounds.github}
                                            $border={palette.border}
                                        >
                                            <ActionIcon src={iconSet.github} alt="" aria-hidden="true"/>
                                        </ActionLink>
                                    </ActionItem>
                                )}
                                {actions.visit && (
                                    <ActionItem>
                                        <ActionLink
                                            href={actions.visit}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${project.title}`}
                                            title={`Visit ${project.title}`}
                                            $background={actionBackgrounds.visit}
                                            $border={palette.border}
                                        >
                                            <ActionIcon src={iconSet.visit} alt="" aria-hidden="true"/>
                                        </ActionLink>
                                    </ActionItem>
                                )}
                            </Actions>
                        )}
                        {updatedDate && (
                            <LastUpdated $color={palette.accent}>Last updated {updatedDate}</LastUpdated>
                        )}
                    </CardFooter>
                )}
            </Content>
        </Card>
    );
};

export default ProjectCard;
