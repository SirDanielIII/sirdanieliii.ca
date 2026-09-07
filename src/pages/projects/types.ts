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
