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
    max-width: 30.25rem;
    min-width: 0;
    height: 100%;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 5px solid ${({$palette}) => $palette.border};
    background: ${({$palette}) => $palette.background};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 22px 44px rgba(0, 0, 0, 0.24);
    }

    @media (max-width: 520px) {
        max-width: 20rem;
        border-width: 3px;
    }

    @media (min-width: 521px) and (max-width: 720px) {
        max-width: 24rem;
    }

    @media (min-width: 721px) and (max-width: 1120px) {
        max-width: 26rem;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`;

const Artwork = styled.div<{ $placeholder: string }>`
    position: relative;
    width: calc(100% - 5.5rem);
    margin: 2.5rem auto 0;
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({$placeholder}) => $placeholder};

    @media (max-width: 520px) {
        width: calc(100% - 3rem);
        margin-top: 1.5rem;
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
    font-size: clamp(5rem, 18vw, 9rem);
    opacity: 0.75;
`;

const Content = styled.div`
    flex: 1;
    min-width: 0;
    padding: 1.25rem 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 520px) {
        padding-inline: 1.25rem;
    }
`;

const Title = styled.h2<{ $color: string }>`
    max-width: 100%;
    color: ${({$color}) => $color};
    font-family: 'BRLNSR', sans-serif;
    font-size: clamp(1.9rem, 7vw, 2.25rem);
    font-weight: 400;
    line-height: 1.1;
    overflow-wrap: anywhere;
    text-transform: uppercase;
`;

const Version = styled.p<{ $color: string }>`
    margin-top: 0.25rem;
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: 1.55rem;
    line-height: 1.25;
`;

const Description = styled.p<{ $color: string }>`
    width: 100%;
    margin-top: 1.25rem;
    color: ${({$color}) => $color};
    font-size: 1.25rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
`;

const Tags = styled.ul`
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    list-style: none;
`;

const Tag = styled.li<{ $background: string; $color: string }>`
    max-width: 100%;
    padding: 0.45rem 1rem;
    border-radius: 9px;
    background: ${({$background}) => $background};
    color: ${({$color}) => $color};
    font-size: 1.05rem;
    line-height: 1.1;
    overflow-wrap: anywhere;

    @media (max-width: 520px) {
        padding: 0.4rem 0.75rem;
        font-size: 0.95rem;
    }
`;

const CardFooter = styled.footer`
    width: 100%;
    margin-top: auto;
    padding-top: 1.5rem;
`;

const Actions = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    list-style: none;

    @media (max-width: 520px) {
        gap: 0.5rem;
    }
`;

const ActionItem = styled.li`
    flex: 1 1 5rem;
    max-width: 7.75rem;

    @media (max-width: 520px) {
        flex-basis: 4.25rem;
    }
`;

const ActionLink = styled.a<{ $background: string; $border: string }>`
    min-height: 4.65rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({$border}) => $border};
    border-radius: 20px;
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

    @media (max-width: 520px) {
        min-height: 3.85rem;
        border-radius: 16px;
    }
`;

const ActionIcon = styled.img`
    width: 3.1rem;
    height: 3.1rem;
    object-fit: contain;

    @media (max-width: 520px) {
        width: 2.55rem;
        height: 2.55rem;
    }
`;

const LastUpdated = styled.p<{ $color: string }>`
    margin-top: 0.8rem;
    color: ${({$color}) => $color};
    font-family: 'BRLNSD', sans-serif;
    font-size: 1rem;
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

    return (
        <Card $palette={palette}>
            <Artwork $placeholder={palette.tagBackground}>
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
