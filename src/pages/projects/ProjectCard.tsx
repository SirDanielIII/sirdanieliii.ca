import type {ProjectData} from './types';

import React from 'react';

import {useTheme} from 'styled-components';

import downloadBlack from '../../assets/icons/download-black.svg';

import downloadWhite from '../../assets/icons/download-white.svg';

import githubBlack from '../../assets/icons/github-black.svg';

import githubWhite from '../../assets/icons/github-white.svg';

import linkBlack from '../../assets/icons/link-black.svg';

import linkWhite from '../../assets/icons/link-white.svg';

import {
    type CardPalette,
    Card,
    Artwork,
    ThumbnailImg,
    ArtworkPlaceholder,
    Content,
    Title,
    Version,
    Description,
    Tags,
    Tag,
    CardFooter,
    Actions,
    ActionItem,
    ActionLink,
    ActionIcon,
    LastUpdated,
} from '../../css/projects/ProjectCard.styles';

interface ProjectCardProps {
    project: ProjectData;
}

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
