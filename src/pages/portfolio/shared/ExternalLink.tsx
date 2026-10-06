import type {ReactNode} from 'react';

export default function ExternalLink({href, children}: {href: string; children: ReactNode}) {
    return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
        {children}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
    </a>;
}
