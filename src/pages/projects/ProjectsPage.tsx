import ProjectSkeleton from './ProjectSkeleton';

import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';

import ProjectCard from './ProjectCard';
import type {ProjectData} from './types';

import {
    PageContainer,
    FormControl,
    VisuallyHidden,
    SearchInput,
    InputBorder,
    Grid,
    MessagePanel,
    MessageTitle,
    MessageCopy,
    RetryButton,
    LoadingState,
    LoadingMessage,
    LoadingTitle,
    LoadingCopy,
    LoadingDots,
    SkeletonGrid,
} from '../../css/projects/ProjectsPage.styles';

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [requestNumber, setRequestNumber] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const loadProjects = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/scripts/list_projects.php', {
                    headers: {Accept: 'application/json'},
                    signal: controller.signal,
                });
                const data: unknown = await response.json();

                if (!response.ok) {
                    const serverMessage = typeof data === 'object' && data !== null && 'error' in data
                        ? String(data.error)
                        : `The project server returned status ${String(response.status)}.`;
                    throw new Error(serverMessage);
                }

                if (!Array.isArray(data)) {
                    throw new Error('The project server returned an unexpected response.');
                }

                setProjects(data as ProjectData[]);
            } catch (loadError) {
                if (loadError instanceof DOMException && loadError.name === 'AbortError') {
                    return;
                }

                setError(loadError instanceof Error ? loadError.message : 'An unknown error occurred.');
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        void loadProjects();
        return () => {
            controller.abort();
        };
    }, [requestNumber]);

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        if (!normalizedQuery) {
            return projects;
        }

        return projects.filter(project => [
            project.title,
            project.description,
            ...project.tags,
        ].some(value => value.toLocaleLowerCase().includes(normalizedQuery)));
    }, [projects, query]);

    return (
        <PageContainer>
            <FormControl>
                <VisuallyHidden>Search projects</VisuallyHidden>
                <SearchInput
                    type="search"
                    placeholder="Search projects..."
                    value={query}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setQuery(event.target.value);
                    }}
                />
                <InputBorder/>
            </FormControl>

            {loading && (
                <LoadingState role="status" aria-live="polite" aria-label="Loading projects">
                    <LoadingMessage>
                        <LoadingTitle>
                            ROUNDING UP THE PROJECTS
                            <LoadingDots aria-hidden="true"><span/><span/><span/></LoadingDots>
                        </LoadingTitle>
                        <LoadingCopy>This can take a moment while the project files wake up.</LoadingCopy>
                    </LoadingMessage>
                    <SkeletonGrid aria-hidden="true">
                        <ProjectSkeleton/>
                        <ProjectSkeleton/>
                        <ProjectSkeleton/>
                        <ProjectSkeleton/>
                    </SkeletonGrid>
                </LoadingState>
            )}

            {!loading && error && (
                <MessagePanel role="alert">
                    <MessageTitle>THE PROJECTS GOT LOST.</MessageTitle>
                    <MessageCopy>{error}</MessageCopy>
                    <RetryButton type="button" onClick={() => {
                        setRequestNumber(value => value + 1);
                    }}>
                        TRY AGAIN
                    </RetryButton>
                </MessagePanel>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
                <MessagePanel>
                    <MessageTitle>NO PROJECTS FOUND.</MessageTitle>
                    <MessageCopy>Try a different title, description, or tag.</MessageCopy>
                </MessagePanel>
            )}

            {!loading && !error && filteredProjects.length > 0 && (
                <Grid>
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.folder} project={project}/>
                    ))}
                </Grid>
            )}
        </PageContainer>
    );
};

export default ProjectsPage;
