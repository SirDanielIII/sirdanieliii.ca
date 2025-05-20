import React, {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import ProjectCard, {ProjectData} from '../components/pages/ProjectCard.tsx';

const PageContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 100px 20px;
`;

const FormControl = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
`;

const InputAlt = styled.input`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
    font-size: 1.2rem;
    background-color: transparent;
    width: 100%;
    padding-inline: 1em;
    padding-block: 0.8em;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.text};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
    }
`;

const InputBorderAlt = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg,
    ${({theme}) => theme.colors.highlight1} 0%,
    ${({theme}) => theme.colors.highlight2} 65%,
    ${({theme}) => theme.colors.highlight3} 100%);
    transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);

    ${InputAlt}:focus + & {
        width: 100%;
    }
`;

/* Two cards share a row once 500‑px columns fit. */
const Grid = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(650px, 1fr));
`;

const Message = styled.p<{ color?: string }>`
    text-align: center;
    color: ${({color, theme}) => color || theme.colors.text};
    margin-top: 2rem;
`;

interface ProjectsPageProps {
    isDarkMode: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({isDarkMode}) => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filtered, setFiltered] = useState<ProjectData[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/scripts/list_projects.php')
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return res.json();
            })
            .then((data: ProjectData[]) => {
                setProjects(data);
                setFiltered(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!query) {
            setFiltered(projects);
            return;
        }
        const q = query.toLowerCase();
        setFiltered(projects.filter(p =>
            p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
        ));
    }, [query, projects]);

    return (
        <PageContainer>
            <FormControl>
                <InputAlt type="text" placeholder="Search projects..." value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} required/>
                <InputBorderAlt/>
            </FormControl>

            {loading && <Message>Loading projects...</Message>}
            {error && <Message color="red">Error: {error}</Message>}
            {!loading && !error && filtered.length === 0 && <Message>No projects found.</Message>}
            {!loading && !error && filtered.length > 0 && (
                <Grid>
                    {filtered.map(p => (
                        <ProjectCard key={p.folder} project={p} isDarkMode={isDarkMode} thumbRatio={0.4}/>
                    ))}
                </Grid>
            )}
        </PageContainer>
    );
};

export default ProjectsPage;