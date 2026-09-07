import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import {Link} from 'react-router';
import {CalloutBox, TableScroll} from '../../css/guides/GuideArticle.styles';

export const Callout = ({title = 'Note', children}: {title?: string; children: ReactNode}) => (
    <CalloutBox role="note"><strong>{title}</strong>{children}</CalloutBox>
);

export const ArticleLink = ({href, children, ...props}: ComponentPropsWithoutRef<'a'>) => (
    href?.startsWith('/') && !href.startsWith('//') && !props.download
        ? <Link to={href} {...props}>{children}</Link>
        : <a href={href} {...props}>{children}</a>
);

export const Table = (props: ComponentPropsWithoutRef<'table'>) => <TableScroll><table {...props}/></TableScroll>;
