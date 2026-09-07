import {useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router';
import type {MDXComponents} from 'mdx/types';
import {guides, guideCategories, type Guide} from './guides';
import {Callout, ArticleLink, Table} from './mdxComponents';
import {ActionButton, EmptyState} from '../../css/guides/GuidesPage.styles';
import {
    ArticlePage, BackLink, ArticleIntro, ArticleMeta, ArticleLayout, Prose,
    ArticleSidebar, Related, PrintStyles,
} from '../../css/guides/GuideArticle.styles';

// Components available in every MDX article without repeating imports.
const mdxComponents: MDXComponents = {Callout, a: ArticleLink, table: Table};

const ArticleContent = ({guide}: {guide: Guide}) => {
    const article = useRef<HTMLElement>(null);
    const [headings, setHeadings] = useState<{id: string; title: string}[]>([]);
    const Content = guide.Content;
    const related = guides.filter(other => other.category === guide.category && other.slug !== guide.slug).slice(0, 2);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${guide.title} | Sir Daniel III`;
        setHeadings(Array.from(article.current?.querySelectorAll('h2[id]') ?? []).map(heading => ({
            id: heading.id,
            title: heading.textContent,
        })));
        return () => { document.title = previousTitle; };
    }, [guide]);

    useEffect(() => {
        // The article and mobile contents list mount after the browser first sees the URL.
        if (headings.length === 0 || !window.location.hash) return;
        let id: string;
        try { id = decodeURIComponent(window.location.hash.slice(1)); }
        catch { return; }
        const target = document.getElementById(id);
        if (target && article.current?.contains(target)) target.scrollIntoView();
    }, [headings]);

    return (
        <ArticlePage>
            <PrintStyles/>
            <BackLink to="/guides/" data-print-hidden>← All guides</BackLink>
            <ArticleIntro>
                <span>{guideCategories[guide.category].singular}</span>
                <h1>{guide.title}</h1>
                <p>{guide.description}</p>
                <ArticleMeta aria-label="Guide details">
                    {guide.author && <li>From {guide.author}</li>}
                    {guide.time && <li>{guide.time}</li>}
                    {guide.servings && <li>{guide.servings}</li>}
                </ArticleMeta>
            </ArticleIntro>
            <ArticleLayout>
                <Prose ref={article}><Content components={mdxComponents}/></Prose>
                <ArticleSidebar data-print-hidden>
                    <ActionButton type="button" onClick={() => { window.print(); }}>Print {guideCategories[guide.category].singular.toLowerCase()}</ActionButton>
                    {headings.length > 0 && (
                        <nav aria-label="On this page">
                            <h2>On this page</h2>
                            <ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
                        </nav>
                    )}
                </ArticleSidebar>
            </ArticleLayout>
            {related.length > 0 && (
                <Related data-print-hidden>
                    <h2>More {guideCategories[guide.category].label.toLowerCase()}</h2>
                    {related.map(other => <Link key={other.slug} to={`/guides/${other.slug}`}>{other.title} ↗</Link>)}
                </Related>
            )}
        </ArticlePage>
    );
};

const GuideArticle = () => {
    const slug = (useParams()['*'] ?? '').replace(/\/$/, '');
    const guide = guides.find(entry => entry.slug === slug);
    if (!guide) return (
        <ArticlePage>
            <BackLink to="/guides/">← All guides</BackLink>
            <EmptyState><h1>Guide not found.</h1><p>This link may have moved, or the guide hasn’t been published yet.</p></EmptyState>
        </ArticlePage>
    );
    return <ArticleContent key={guide.slug} guide={guide}/>;
};

export default GuideArticle;
