// Run against npm run dev with an installed Chrome DevTools CLI:
// node tools/portfolio/test_viewers.mjs /path/to/chrome-devtools.js [page-id]
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const [cli, page = '1'] = process.argv.slice(2);
assert.ok(cli, 'Pass the Chrome DevTools CLI JavaScript entry point.');
const browser = (...args) => JSON.parse(execFileSync(process.execPath, [cli, ...args, '--output-format', 'json'], {encoding: 'utf8'}));

async function checkViewer(photo) {
    const checks = [];
    const check = (condition, label) => {
        if (!condition) throw new Error(label);
        checks.push(label);
    };
    const waitFor = async predicate => {
        for (let i = 0; i < 400; i++) {
            if (predicate()) return;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        throw new Error(`Timed out after ${checks.at(-1) ?? 'opening'}; URL: ${location.href}`);
    };
    const openerSelector = photo ? '#photo-gallery button' : '#film-street_drugs_3 .gallery-button';
    await waitFor(() => document.querySelector(openerSelector));
    const opener = document.querySelector(openerSelector);
    opener.scrollIntoView();
    opener.click();
    const dialog = () => document.querySelector('dialog[open]');
    const viewport = () => dialog()?.querySelector('.viewer-image-viewport');
    const image = () => viewport()?.querySelector('img');
    const ready = () => image()?.getAttribute('data-loading') === 'false';
    const zoomed = () => dialog().querySelector('.viewer-image').dataset.zoomed === 'true';
    const key = value => viewport().dispatchEvent(new KeyboardEvent('keydown', {key: value, bubbles: true, cancelable: true}));
    await waitFor(ready);
    check(Boolean(dialog().querySelector('.viewer-sidebar')) === photo, 'section-specific sidebar');
    check(document.activeElement.matches('[data-viewer-close]'), 'initial close-button focus');
    check(document.documentElement.style.overflow === 'hidden', 'background scroll lock');
    const initialUrl = location.href;
    const initialSrc = image().src;
    const rect = image().getBoundingClientRect();
    image().dispatchEvent(new MouseEvent('dblclick', {bubbles: true, clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2}));
    await waitFor(zoomed);
    check(image().style.transform.includes('scale(1.5)'), 'double-click zoom');
    viewport().focus();
    const transform = image().style.transform;
    key(rect.width * 1.5 > viewport().clientWidth ? 'ArrowRight' : 'ArrowDown');
    await new Promise(resolve => setTimeout(resolve, 50));
    check(location.href === initialUrl, 'zoomed arrows do not navigate');
    check(image().style.transform !== transform, 'zoomed arrows pan');
    key('0');
    await waitFor(() => !zoomed());
    viewport().dispatchEvent(new WheelEvent('wheel', {deltaY: -100, clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2, bubbles: true, cancelable: true}));
    await waitFor(zoomed);
    check(true, 'wheel zoom');
    key('0');
    await waitFor(() => !zoomed());
    key('ArrowRight');
    await waitFor(() => image()?.src !== initialSrc && ready());
    check(!zoomed(), 'navigation resets zoom');
    const nextUrl = location.href;
    check(nextUrl !== initialUrl, 'fitted arrows update URL');
    if (photo) {
        const sidebar = dialog().querySelector('.viewer-sidebar');
        sidebar.focus();
        sidebar.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
        await new Promise(resolve => setTimeout(resolve, 50));
        check(location.href === nextUrl, 'sidebar keys preserve photo selection');
    }
    const swipe = () => {
        const target = viewport();
        const start = new Touch({identifier: 1, target, clientX: 100, clientY: 100});
        const end = new Touch({identifier: 1, target, clientX: 240, clientY: 100});
        target.dispatchEvent(new TouchEvent('touchstart', {touches: [start], changedTouches: [start], bubbles: true}));
        target.dispatchEvent(new TouchEvent('touchend', {touches: [], changedTouches: [end], bubbles: true}));
    };
    viewport().focus();
    key('+');
    await waitFor(zoomed);
    swipe();
    await new Promise(resolve => setTimeout(resolve, 50));
    check(location.href === nextUrl, 'zoomed swipe does not navigate');
    key('0');
    await waitFor(() => !zoomed());
    swipe();
    await waitFor(() => location.href === initialUrl && ready());
    check(true, 'fitted swipe navigates');
    image().click();
    check(Boolean(dialog()), 'image click stays open');
    await new Promise(resolve => setTimeout(resolve, 100));
    image().dispatchEvent(new Event('error'));
    await waitFor(() => dialog().querySelector('.viewer-error button'));
    check(true, 'image error state');
    dialog().querySelector('.viewer-error button').click();
    await waitFor(ready);
    check(true, 'image retry recovers');
    viewport().dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
    viewport().click();
    await waitFor(() => !document.querySelector('dialog'));
    await waitFor(() => document.activeElement === opener);
    check(true, 'outside-image click closes and restores focus');
    check(document.documentElement.style.overflow !== 'hidden', 'scroll unlock');
    opener.click();
    await waitFor(ready);
    history.back();
    await waitFor(() => !document.querySelector('dialog'));
    check(true, 'Back closes viewer session');
    check(document.documentElement.scrollWidth <= innerWidth, 'no horizontal overflow');
    return {passed: checks.length, checks};
}

let total = 0;
for (const viewport of ['1440x1000x1', '390x844x1,mobile,touch']) {
    browser('emulate', page, '--viewport', viewport);
    for (const photo of [false, true]) {
        browser('navigate_page', page, '--url', `http://localhost:5173/portfolio/${photo ? 'photography' : 'short-films'}/`);
        const result = browser('evaluate_script', `() => (${checkViewer.toString()})(${photo})`, '--pageId', page);
        const match = result.message?.match(/```json\n([\s\S]*?)\n```/);
        assert.ok(match, JSON.stringify(result));
        const report = JSON.parse(match[1]);
        assert.ok(report.passed > 0, JSON.stringify(report));
        total += report.passed;
        console.log(`${photo ? 'Photography' : 'Short films'} at ${viewport}: ${report.passed} checks passed`);
    }
}
browser('emulate', page, '--viewport', '1440x1000x1');
browser('navigate_page', page, '--url', 'http://localhost:5173/portfolio/short-films/');
console.log(`${total} viewer checks passed.`);
