export default function ViewerNavigation({index, count, noun = 'image', onNavigate}: {
    index: number;
    count: number;
    noun?: string;
    onNavigate: (offset: number) => void;
}) {
    const label = noun[0].toUpperCase() + noun.slice(1);
    return <nav className="viewer-navigation" aria-label={`${label} navigation`}>
        <button type="button" aria-label={`Previous ${noun}`} disabled={count < 2} onClick={() => { onNavigate(-1); }}><span className="viewer-arrow viewer-arrow-left" aria-hidden="true" /></button>
        <span className="viewer-count"><span className="sr-only">{label} </span>{String(index + 1).padStart(2, '0')}<span aria-hidden="true"> / </span><span className="sr-only"> of </span>{count}</span>
        <button type="button" aria-label={`Next ${noun}`} disabled={count < 2} onClick={() => { onNavigate(1); }}><span className="viewer-arrow viewer-arrow-right" aria-hidden="true" /></button>
    </nav>;
}
