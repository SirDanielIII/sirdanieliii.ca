import type {ComponentType} from 'react';
import type {MDXProps} from 'mdx/types';

// Folder names under content/ match these IDs. Add a category here to extend the library.
export const guideCategories = {
    recipes: {label: 'Recipes', singular: 'Recipe'},
    tutorials: {label: 'Tutorials', singular: 'Tutorial'},
    blog: {label: 'Blog', singular: 'Post'},
    resources: {label: 'Resources', singular: 'Resource'},
} as const;

export type GuideCategory = keyof typeof guideCategories;

export interface GuideMetadata {
    title: string;
    description: string;
    tags?: string[];
    author?: string;
    time?: string;
    servings?: string;
    /** Lower numbers appear first; otherwise articles sort by title. */
    order?: number;
}

export interface Guide extends GuideMetadata {
    slug: string;
    category: GuideCategory;
    Content: ComponentType<MDXProps>;
    searchText: string;
}

export const isGuideCategory = (value: string): value is GuideCategory =>
    Object.prototype.hasOwnProperty.call(guideCategories, value);

function validateMetadata(value: unknown, file: string): asserts value is GuideMetadata {
    if (typeof value !== 'object' || value === null) throw new Error(`${file}: export a meta object.`);
    const meta = value as Record<string, unknown>;
    const valid = typeof meta.title === 'string' && meta.title.trim() !== ''
        && typeof meta.description === 'string' && meta.description.trim() !== ''
        && (meta.tags === undefined || (Array.isArray(meta.tags) && meta.tags.every((tag: unknown) => typeof tag === 'string')))
        && ['author', 'time', 'servings'].every(key => meta[key] === undefined || typeof meta[key] === 'string')
        && (meta.order === undefined || (typeof meta.order === 'number' && Number.isFinite(meta.order)));
    if (!valid) throw new Error(`${file}: check the guide metadata fields (see docs/guides.md).`);
}

// Vite compiles trusted local MDX at build time. The whole guides section is route-split
// from the home page; there is no Markdown compiler or content fetching in the browser.
const modules = import.meta.glob<{default: ComponentType<MDXProps>; meta?: unknown}>('./content/*/*.mdx', {eager: true});

export const guides: Guide[] = Object.entries(modules).map(([file, module]) => {
    const slug = file.replace('./content/', '').replace(/\.mdx$/, '');
    const [category, filename] = slug.split('/');
    if (!isGuideCategory(category) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(filename)) {
        throw new Error(`${file}: use a supported category folder and a lowercase-hyphenated filename.`);
    }
    validateMetadata(module.meta, file);
    return {
        ...module.meta,
        slug,
        category,
        Content: module.default,
        searchText: [module.meta.title, module.meta.description, ...(module.meta.tags ?? [])].join(' ').toLocaleLowerCase(),
    };
}).sort((a, b) => (a.order ?? 100) - (b.order ?? 100) || a.title.localeCompare(b.title));

export const guideCounts = Object.fromEntries(
    Object.keys(guideCategories).map(category => [category, guides.filter(guide => guide.category === category).length]),
);
