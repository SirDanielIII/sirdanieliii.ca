import {useCallback, useEffect, useRef, useState} from 'react';

export interface ViewerImageSource {
    src: string;
    alt: string;
    width?: number | null;
    height?: number | null;
}

interface ImageView {
    zoom: number;
    x: number;
    y: number;
}

/** Full originals only. No EXIF/sidecar requests; the surrounding viewer supplies its copy. */
export default function ViewerImage({image, noun = 'image', onDismiss}: {
    image: ViewerImageSource;
    noun?: string;
    onDismiss?: () => void;
}) {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [attempt, setAttempt] = useState(0);
    const [view, setView] = useState<ImageView>({zoom: 1, x: 0, y: 0});
    const [natural, setNatural] = useState({width: image.width ?? 0, height: image.height ?? 0});
    const [size, setSize] = useState({width: 0, height: 0});
    const viewport = useRef<HTMLDivElement>(null);
    const drag = useRef<{x: number; y: number; offsetX: number; offsetY: number} | null>(null);
    const dragged = useRef(false);

    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            setSize({width: entry.contentRect.width, height: entry.contentRect.height});
        });
        observer.observe(element);
        return () => { observer.disconnect(); };
    }, []);

    const fit = natural.width && natural.height ? Math.min(size.width / natural.width, size.height / natural.height) : 0;
    const width = natural.width * fit;
    const height = natural.height * fit;
    const clampView = useCallback((next: ImageView): ImageView => {
        if (next.zoom <= 1) return {zoom: 1, x: 0, y: 0};
        const zoom = Math.min(4, next.zoom);
        // An axis smaller than the viewport stays centered; a larger axis can
        // move only until its edge meets the viewport's edge.
        const maxX = Math.max(0, (width * zoom - size.width) / 2);
        const maxY = Math.max(0, (height * zoom - size.height) / 2);
        return {
            zoom,
            x: Math.max(-maxX, Math.min(maxX, next.x)),
            y: Math.max(-maxY, Math.min(maxY, next.y)),
        };
    }, [width, height, size.width, size.height]);
    // Reapply bounds during render too, so resizing cannot expose an empty edge.
    const currentView = clampView(view);

    const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
        const element = viewport.current;
        if (!element || status !== 'ready') return;
        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        drag.current = null;
        setView(stored => {
            const previous = clampView(stored);
            const zoom = Math.max(1, Math.min(4, previous.zoom * factor));
            const ratio = zoom / previous.zoom;
            // Keep the image point under the cursor unless an edge bound intervenes.
            return clampView({zoom, x: x - (x - previous.x) * ratio, y: y - (y - previous.y) * ratio});
        });
    }, [status, clampView]);

    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
            const delta = Math.max(-300, Math.min(300, event.deltaY * unit));
            zoomAt(event.clientX, event.clientY, Math.exp(-delta * 0.002));
        };
        // React's delegated wheel listeners are passive; image zoom must suppress scrolling.
        element.addEventListener('wheel', onWheel, {passive: false});
        return () => { element.removeEventListener('wheel', onWheel); };
    }, [zoomAt]);

    const picture = <>
            {status !== 'error' && <img
                key={attempt}
                src={image.src}
                alt={image.alt}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                data-loading={status === 'loading'}
                aria-hidden={status === 'loading' ? true : undefined}
                decoding="async"
                fetchPriority="high"
                draggable={onDismiss ? false : undefined}
                style={onDismiss && fit ? {
                    width, height,
                    transform: `translate(-50%, -50%) translate(${String(currentView.x)}px, ${String(currentView.y)}px) scale(${String(currentView.zoom)})`,
                } : undefined}
                onDoubleClick={onDismiss ? event => {
                    if (dragged.current || status !== 'ready') return;
                    if (currentView.zoom > 1) {
                        drag.current = null;
                        setView({zoom: 1, x: 0, y: 0});
                    } else {
                        zoomAt(event.clientX, event.clientY, 1.5);
                    }
                } : undefined}
                onPointerDown={onDismiss ? event => {
                    dragged.current = false;
                    if (event.button !== 0 || status !== 'ready' || currentView.zoom === 1) return;
                    drag.current = {x: event.clientX, y: event.clientY, offsetX: currentView.x, offsetY: currentView.y};
                    event.currentTarget.setPointerCapture(event.pointerId);
                } : undefined}
                onPointerMove={onDismiss ? event => {
                    const start = drag.current;
                    if (!start) return;
                    const dx = event.clientX - start.x;
                    const dy = event.clientY - start.y;
                    if (Math.hypot(dx, dy) > 4) dragged.current = true;
                    if (dragged.current) {
                        setView(previous => clampView({...previous, x: start.offsetX + dx, y: start.offsetY + dy}));
                    }
                } : undefined}
                onPointerUp={() => { drag.current = null; }}
                onPointerCancel={() => { drag.current = null; dragged.current = true; }}
                onLostPointerCapture={() => { drag.current = null; }}
                onLoad={event => {
                    const element = event.currentTarget;
                    void element.decode().then(
                        () => {
                            if (element.isConnected) {
                                setNatural({width: element.naturalWidth, height: element.naturalHeight});
                                setStatus('ready');
                            }
                        },
                        () => { if (element.isConnected) setStatus('error'); },
                    );
                }}
                onError={() => { setStatus('error'); }}
            />}
            {status === 'loading' && <>
                <span className="viewer-placeholder" aria-hidden="true" />
                <span className="viewer-loading" role="status">Loading {noun}…</span>
            </>}
            {status === 'error' && <div className="viewer-error">
                <p role="status">The full {noun} could not be loaded.</p>
                <button type="button" onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>Try again</button>
            </div>}
    </>;
    return (
        <div className={`viewer-image${onDismiss ? ' viewer-zoomable' : ''}`} aria-busy={status === 'loading'} data-zoomed={currentView.zoom > 1}>
            {onDismiss ?
                <div className="viewer-image-viewport" ref={viewport} tabIndex={status === 'ready' ? 0 : undefined}
                    role="region" aria-label="Photograph; double-click to toggle fit and 150% zoom, scroll to zoom, drag while zoomed to pan. Use plus and minus to zoom, or zero to fit."
                    onKeyDown={event => {
                        if (event.altKey || event.ctrlKey || event.metaKey) return;
                        if (['+', '=', '-'].includes(event.key)) {
                            event.preventDefault();
                            event.stopPropagation();
                            const rect = event.currentTarget.getBoundingClientRect();
                            zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, event.key === '-' ? 0.8 : 1.25);
                        } else if (event.key === '0') {
                            event.preventDefault();
                            drag.current = null;
                            setView({zoom: 1, x: 0, y: 0});
                        } else if (currentView.zoom > 1 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                            event.preventDefault();
                            event.stopPropagation();
                            setView(stored => {
                                const previous = clampView(stored);
                                return clampView({
                                    ...previous,
                                    x: previous.x + (event.key === 'ArrowLeft' ? 40 : event.key === 'ArrowRight' ? -40 : 0),
                                    y: previous.y + (event.key === 'ArrowUp' ? 40 : event.key === 'ArrowDown' ? -40 : 0),
                                });
                            });
                        }
                    }}
                    onClick={event => {
                        if (event.target === event.currentTarget) onDismiss();
                    }}>
                    {picture}
                </div>
            : picture}
        </div>
    );
}
