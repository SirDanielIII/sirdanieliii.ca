import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import ProjectCard, {ProjectData} from '../components/pages/ProjectCard.tsx';

const PageContainer = styled.main`
    flex: 1;
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    padding: 7.5rem 1.5rem 6rem;

    @media (max-width: 720px) {
        padding: 6.5rem 0.875rem 4rem;
    }
`;

const FormControl = styled.label`
    position: relative;
    width: min(100%, 50rem);
    margin: 0 auto 2.75rem;
    display: block;
`;

const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.85em 1em;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.text};
    background: transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 1.2rem;

    &::placeholder {
        color: ${({theme}) => theme.colors.text};
        opacity: 0.55;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.16);
    }
`;

const InputBorder = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(
        90deg,
        ${({theme}) => theme.colors.highlight1} 0%,
        ${({theme}) => theme.colors.highlight2} 65%,
        ${({theme}) => theme.colors.highlight3} 100%
    );
    transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);

    ${SearchInput}:focus + & {
        width: 100%;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    gap: 2rem;

    @media (max-width: 1120px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 720px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 1.5rem;
    }
`;

const MessagePanel = styled.div`
    width: min(100%, 42rem);
    margin: 2rem auto 0;
    padding: 2rem;
    border: 2px solid ${({theme}) => theme.colors.highlight3};
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};
    text-align: center;
`;

const MessageTitle = styled.h2`
    color: ${({theme}) => theme.colors.highlight3};
    font-size: 1.8rem;
    font-weight: 400;
`;

const MessageCopy = styled.p`
    margin-top: 0.6rem;
    font-size: 1.05rem;
    line-height: 1.45;
    opacity: 0.8;
`;

const RetryButton = styled.button`
    margin-top: 1.25rem;
    padding: 0.65rem 1.2rem;
    border: 2px solid ${({theme}) => theme.colors.highlight2};
    border-radius: 8px;
    color: ${({theme}) => theme.colors.highlight2};

    &:hover {
        background: ${({theme}) => theme.colors.highlight2};
        color: ${({theme}) => theme.colors.background1};
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight1};
        outline-offset: 3px;
    }
`;

const bounce = keyframes`
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-0.45rem);
        opacity: 1;
    }
`;

const skeletonPulse = keyframes`
    0%, 100% { opacity: 0.38; }
    50% { opacity: 0.72; }
`;

const LoadingState = styled.section`
    width: 100%;
`;

const LoadingMessage = styled.div`
    margin-bottom: 2rem;
    color: ${({theme}) => theme.colors.text};
    text-align: center;
`;

const LoadingTitle = styled.h2`
    color: ${({theme}) => theme.colors.highlight2};
    font-size: clamp(1.7rem, 5vw, 2.4rem);
    font-weight: 400;
    letter-spacing: 0.04em;
`;

const LoadingCopy = styled.p`
    margin-top: 0.45rem;
    font-size: 1.05rem;
    opacity: 0.7;
`;

const LoadingDots = styled.span`
    display: inline-flex;
    gap: 0.35rem;
    margin-left: 0.35rem;

    span {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        background: currentColor;
        animation: ${bounce} 1.15s infinite ease-in-out;
    }

    span:nth-child(2) {
        animation-delay: 0.14s;
    }

    span:nth-child(3) {
        animation-delay: 0.28s;
    }

    @media (prefers-reduced-motion: reduce) {
        span {
            animation: none;
            opacity: 0.75;
        }
    }
`;

const SkeletonGrid = styled(Grid)`
    @media (max-width: 720px) {
        & > :nth-child(n + 2) {
            display: none;
        }
    }
`;

const SkeletonCard = styled.div`
    width: 100%;
    max-width: 30.25rem;
    min-height: 49rem;
    margin-inline: auto;
    border: 5px solid ${({theme}) => theme.colors.sectionCard};
    background: ${({theme}) => theme.colors.background2};
    overflow: hidden;
`;

const SkeletonBlock = styled.div`
    background: ${({theme}) => theme.colors.sectionCard};
    animation: ${skeletonPulse} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.55;
    }
`;

const SkeletonArtwork = styled(SkeletonBlock)`
    width: calc(100% - 5.5rem);
    margin: 2.5rem auto 0;
    aspect-ratio: 1;

    @media (max-width: 520px) {
        width: calc(100% - 3rem);
        margin-top: 1.5rem;
    }
`;

const SkeletonContent = styled.div`
    padding: 1.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
`;

const SkeletonLine = styled(SkeletonBlock)<{ $width: string; $height?: string }>`
    width: ${({$width}) => $width};
    height: ${({$height}) => $height ?? '1.15rem'};
    border-radius: 0.3rem;
`;

const SkeletonTags = styled.div`
    width: 100%;
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
    gap: 0.65rem;
`;

const SkeletonTag = styled(SkeletonBlock)`
    width: 5.5rem;
    height: 2.1rem;
    border-radius: 9px;
`;

const SkeletonActions = styled.div`
    width: 100%;
    margin-top: 1.1rem;
    display: flex;
    justify-content: center;
    gap: 0.75rem;
`;

const SkeletonAction = styled(SkeletonBlock)`
    flex: 1;
    max-width: 7.75rem;
    height: 4.65rem;
    border-radius: 20px;
`;

interface ProjectsPageProps {
    isDarkMode: boolean;
}

const ProjectSkeleton: React.FC = () => (
    <SkeletonCard>
        <SkeletonArtwork/>
        <SkeletonContent>
            <SkeletonLine $width="62%" $height="2.25rem"/>
            <SkeletonLine $width="25%" $height="1.5rem"/>
            <SkeletonLine $width="94%"/>
            <SkeletonLine $width="82%"/>
            <SkeletonLine $width="56%"/>
            <SkeletonTags>
                <SkeletonTag/>
                <SkeletonTag/>
                <SkeletonTag/>
            </SkeletonTags>
            <SkeletonActions>
                <SkeletonAction/>
                <SkeletonAction/>
                <SkeletonAction/>
            </SkeletonActions>
        </SkeletonContent>
    </SkeletonCard>
);

const ProjectsPage: React.FC<ProjectsPageProps> = ({isDarkMode}) => {
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
                        : `The project server returned status ${response.status}.`;
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
        return () => controller.abort();
    }, [requestNumber]);

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        if (!normalizedQuery) {
            return projects;
        }

        return projects.filter(project => [
            project.title,
            project.description,
            ...(project.tags ?? []),
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
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
                    </SkeletonGrid>
                </LoadingState>
            )}

            {!loading && error && (
                <MessagePanel role="alert">
                    <MessageTitle>THE PROJECTS GOT LOST.</MessageTitle>
                    <MessageCopy>{error}</MessageCopy>
                    <RetryButton type="button" onClick={() => setRequestNumber(value => value + 1)}>
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
                        <ProjectCard key={project.folder} project={project} isDarkMode={isDarkMode}/>
                    ))}
                </Grid>
            )}
        </PageContainer>
    );
};

export default ProjectsPage;
