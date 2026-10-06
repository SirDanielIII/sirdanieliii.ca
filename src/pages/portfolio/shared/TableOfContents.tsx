import {SectionIndex} from '../../../css/portfolio/shared/TableOfContents.styles';

interface ContentsItem {
    id: string;
    label: string;
    children?: {id: string; label: string}[];
}

export default function TableOfContents({label, items, layout = 'sections'}: {label: string; items: ContentsItem[]; layout?: 'sections' | 'films'}) {
    if (items.length === 0) return null;
    return <SectionIndex aria-label={label} data-layout={layout}>
        <p>On this page</p>
        <ol>{items.map(item => <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
            {!!item.children?.length && <ol>{item.children.map(child => <li key={child.id}>
                <a href={`#${child.id}`}>{child.label}</a>
            </li>)}</ol>}
        </li>)}</ol>
    </SectionIndex>;
}
