import {useEffect, useMemo, useRef} from 'react';
import {useSearchParams} from 'react-router';
import {guides, guideCategories, guideCounts, isGuideCategory} from './guides';
import {
    Page, Intro, LibraryTools, Search, CategoryList, CategoryButton, ResultCount,
    Grid, GuideLink, CardCategory, Tags, CardFooter, EmptyState, ActionButton,
} from '../../css/guides/GuidesPage.styles';

const GuidesPage = () => {
    const [params, setParams] = useSearchParams();
    const query = params.get('q') ?? '';
    const searchInput = useRef<HTMLInputElement>(null);
    const requestedCategory = params.get('category') ?? '';
    const category = isGuideCategory(requestedCategory) ? requestedCategory : 'all';
    const filtered = useMemo(() => guides.filter(guide =>
        (category === 'all' || guide.category === category)
        && guide.searchText.includes(query.trim().toLocaleLowerCase()),
    ), [category, query]);

    // URL navigation can be deferred by the router. Let the input retain keystrokes
    // while focused, and synchronize it for external navigation/reset when unfocused.
    useEffect(() => {
        if (searchInput.current && document.activeElement !== searchInput.current) {
            searchInput.current.value = query;
        }
    }, [query]);

    const updateFilter = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (value && value !== 'all') next.set(key, value);
        else next.delete(key);
        setParams(next, {replace: true});
    };

    return (
        <Page>
            <Intro>
                <h1>GUIDES</h1>
                <p>Family recipes, things I’ve figured out, and whatever else is worth sharing.</p>
                <p>⚠️ ALL RECIPES ARE CURRENTLY WIP!!! THEY ARE NOT ACCURATE.</p>
            </Intro>
            <LibraryTools>
                <CategoryList role="group" aria-label="Filter guides by category">
                    <CategoryButton type="button" aria-pressed={category === 'all'} onClick={() => { updateFilter('category', 'all'); }}>
                        All <span>{guides.length}</span>
                    </CategoryButton>
                    {Object.entries(guideCategories).map(([id, value]) => (
                        <CategoryButton key={id} type="button" aria-pressed={category === id} onClick={() => { updateFilter('category', id); }}>
                            {value.label} <span>{guideCounts[id]}</span>
                        </CategoryButton>
                    ))}
                </CategoryList>
                <Search>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>
                    <input ref={searchInput} type="search" aria-label="Search guides" placeholder="Search guides…" defaultValue={query} onChange={event => { updateFilter('q', event.target.value); }}/>
                </Search>
            </LibraryTools>
            <ResultCount role="status">{filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}{category === 'all' ? ' to explore' : ` in ${guideCategories[category].label.toLowerCase()}`}</ResultCount>
            {filtered.length ? (
                <Grid>
                    {filtered.map(guide => (
                        <GuideLink key={guide.slug} to={`/guides/${guide.slug}`} aria-labelledby={`guide-${guide.slug.replace('/', '-')}`}>
                            <CardCategory>
                                {guideCategories[guide.category].singular}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4V4Zm16 0h-4a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h3V4Z"/></svg>
                            </CardCategory>
                            <h2 id={`guide-${guide.slug.replace('/', '-')}`}>{guide.title}</h2>
                            <p>{guide.description}</p>
                            {guide.tags?.length ? <Tags aria-label="Tags">{guide.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</Tags> : null}
                            <CardFooter>
                                <span>{guide.time ?? guide.author ?? 'From my notes'}</span>
                                <span>Read {guideCategories[guide.category].singular.toLowerCase()} ↗</span>
                            </CardFooter>
                        </GuideLink>
                    ))}
                </Grid>
            ) : (
                <EmptyState>
                    <h2>{query.trim() ? 'Nothing matched that search.' : 'More things to share soon.'}</h2>
                    <p>{query.trim() ? 'Try another title, topic, or tag.' : 'There aren’t any entries in this category yet. Have a look at the rest of the collection.'}</p>
                    <ActionButton type="button" onClick={() => { setParams({}); }}>Show all guides</ActionButton>
                </EmptyState>
            )}
        </Page>
    );
};

export default GuidesPage;
