import {useLayoutEffect, useRef} from 'react';
import {NavigationType, useLocation, useNavigationType} from 'react-router';

interface Position { x: number; y: number }
interface Positions {
    entries: Partial<Record<string, Position>>;
    pages: Partial<Record<string, Position>>;
}

const storageKey = 'sirdanieliii.scroll-positions.v1';
const scrollKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);
const windowPosition = (): Position => ({x: window.scrollX, y: window.scrollY});

function validPositions(value: unknown): Positions['pages'] {
    if (typeof value !== 'object' || value === null) return {};
    return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, Position] => {
        const position: unknown = entry[1];
        return typeof position === 'object' && position !== null && 'x' in position && 'y' in position
            && typeof position.x === 'number' && typeof position.y === 'number'
            && Number.isFinite(position.x) && Number.isFinite(position.y) && position.x >= 0 && position.y >= 0;
    }));
}

function readPositions(): Positions {
    try {
        const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
        if (typeof saved === 'object' && saved !== null && 'entries' in saved && 'pages' in saved) {
            return {entries: validPositions(saved.entries), pages: validPositions(saved.pages)};
        }
    } catch { /* Session storage can be unavailable; in-memory navigation still works. */ }
    return {entries: {}, pages: {}};
}

function persistPositions(positions: Positions) {
    // Bound tab-local history storage without changing any portfolio content order.
    positions.entries = Object.fromEntries(Object.entries(positions.entries).slice(-100));
    positions.pages = Object.fromEntries(Object.entries(positions.pages).slice(-100));
    try { sessionStorage.setItem(storageKey, JSON.stringify(positions)); }
    catch { /* Private browsing/storage limits must not interrupt navigation. */ }
}

/** Restore visited pages, refreshes and history entries, including asynchronously loaded content. */
export default function ScrollRestoration() {
    const {pathname, search, hash, key} = useLocation();
    const navigationType = useNavigationType();
    const positions = useRef<Positions | null>(null);
    const previous = useRef<{pathname: string; hash: string; position: Position} | null>(null);

    useLayoutEffect(() => {
        const previousMode = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        return () => { window.history.scrollRestoration = previousMode; };
    }, []);

    useLayoutEffect(() => {
        const saved = positions.current ??= readPositions();
        // Header links and collection links use both trailing-slash forms of the same routes.
        const pagePath = pathname.replace(/\/+$/, '') || '/';
        const url = pagePath + search + hash;
        const entryKey = key + ':' + url;
        const last = previous.current;
        const samePage = last?.pathname === pagePath;
        const newAnchor = Boolean(hash && hash !== last?.hash);
        const target = saved.entries[entryKey]
            ?? ((!last || !samePage) && (!newAnchor || navigationType === NavigationType.Pop || !last)
                ? saved.pages[url] ?? (!hash ? saved.pages[pagePath] : undefined) : undefined)
            ?? (samePage && !newAnchor ? last.position : undefined);
        const current = {pathname: pagePath, hash, position: target ?? windowPosition()};
        previous.current = current;
        let restoring = true;
        let frame = 0;
        let persistTimer: number | undefined;
        let anchor: string | null = null;
        if (!target && hash) {
            try { anchor = decodeURIComponent(hash.slice(1)); }
            catch { /* Ignore malformed anchors. */ }
        }

        const remember = () => {
            if (!restoring) current.position = windowPosition();
            saved.entries[entryKey] = current.position;
            saved.pages[url] = current.position;
            saved.pages[pagePath] = current.position;
            persistTimer ??= window.setTimeout(() => {
                persistTimer = undefined;
                persistPositions(saved);
            }, 150);
        };
        const saveBeforeExit = () => { remember(); persistPositions(saved); };
        const finish = () => {
            restoring = false;
            observer.disconnect();
            resizeObserver.disconnect();
            window.clearTimeout(deadline);
            remember();
        };
        const attempt = () => {
            frame = 0;
            if (!restoring) return;
            if (anchor) {
                const element = document.getElementById(anchor);
                if (!element) return;
                element.scrollIntoView({block: 'start', behavior: 'instant'});
                finish();
                return;
            }
            const position = target ?? {x: 0, y: 0};
            window.scrollTo({left: position.x, top: position.y, behavior: 'instant'});
            // Keep the requested position while a lazy route or API-backed gallery is shorter.
            if (document.documentElement.scrollHeight - window.innerHeight >= position.y - 1) finish();
        };
        const schedule = () => {
            if (restoring && !frame) frame = window.requestAnimationFrame(attempt);
        };
        const stopOnIntent = (event: Event) => {
            if (event instanceof KeyboardEvent && !scrollKeys.has(event.key)) return;
            if (restoring) finish();
        };
        const observer = new MutationObserver(schedule);
        const resizeObserver = new ResizeObserver(schedule);
        observer.observe(document.getElementById('root') ?? document.body, {childList: true, subtree: true});
        resizeObserver.observe(document.documentElement);
        const deadline = window.setTimeout(finish, 10000);
        window.addEventListener('scroll', remember, {passive: true});
        window.addEventListener('pagehide', saveBeforeExit);
        window.addEventListener('click', remember, true);
        window.addEventListener('load', schedule, true);
        window.addEventListener('wheel', stopOnIntent, {passive: true});
        window.addEventListener('touchstart', stopOnIntent, {passive: true});
        window.addEventListener('keydown', stopOnIntent);
        attempt();

        return () => {
            // Scroll events/click capture retain the outgoing position before React replaces its DOM.
            saved.entries[entryKey] = current.position;
            saved.pages[url] = current.position;
            saved.pages[pagePath] = current.position;
            persistPositions(saved);
            observer.disconnect();
            resizeObserver.disconnect();
            window.cancelAnimationFrame(frame);
            window.clearTimeout(deadline);
            window.clearTimeout(persistTimer);
            window.removeEventListener('scroll', remember);
            window.removeEventListener('pagehide', saveBeforeExit);
            window.removeEventListener('click', remember, true);
            window.removeEventListener('load', schedule, true);
            window.removeEventListener('wheel', stopOnIntent);
            window.removeEventListener('touchstart', stopOnIntent);
            window.removeEventListener('keydown', stopOnIntent);
        };
    }, [pathname, search, hash, key, navigationType]);

    return null;
}
