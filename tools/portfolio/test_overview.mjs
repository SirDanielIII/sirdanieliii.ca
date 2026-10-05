import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {isPortfolioContent} from '../../src/pages/portfolio/portfolio.ts';

const content = JSON.parse(readFileSync(new URL('../../public/portfolio/portfolio.json', import.meta.url), 'utf8'));

test('accepts the authored content without changing its order or values', () => {
    const candidate = structuredClone(content);
    candidate.collections.reverse();
    const before = structuredClone(candidate);
    assert.equal(isPortfolioContent(candidate), true);
    assert.deepEqual(candidate, before);
});

test('rejects missing or incorrectly typed nested content', () => {
    for (const value of [null, [], {}, 'content', {...content, portfolio: null}, {...content, portfolioSpotlight: []}, {...content, collections: {}}]) {
        assert.equal(isPortfolioContent(value), false);
    }
    for (const field of ['name', 'about', 'email']) {
        assert.equal(isPortfolioContent({...content, portfolio: {...content.portfolio, [field]: {text: 'invalid'}}}), false);
    }
});

test('rejects invalid image dimensions, sources, positions, and spotlight alt text', () => {
    for (const change of [
        {width: 0}, {height: -1}, {width: 1.5}, {height: Infinity}, {width: '1024'},
        {image: ''}, {image: null}, {position: ''}, {position: {}}, {alt: undefined}, {alt: 1},
    ]) {
        const candidate = structuredClone(content);
        candidate.portfolioSpotlight.primary = {...candidate.portfolioSpotlight.primary, ...change};
        assert.equal(isPortfolioContent(candidate), false);
    }
});

test('rejects invalid collection records and duplicate or unsupported route IDs', () => {
    for (const change of [{id: 'unknown'}, {title: {}}, {label: []}, {description: null}, {width: -1}, {alt: 1}]) {
        const candidate = structuredClone(content);
        Object.assign(candidate.collections[0], change);
        assert.equal(isPortfolioContent(candidate), false);
    }
    const duplicate = structuredClone(content);
    duplicate.collections.push(duplicate.collections[0]);
    assert.equal(isPortfolioContent(duplicate), false);
    assert.equal(isPortfolioContent({...content, collections: [null]}), false);
});

test('allows omitted collection alt text, empty copy, and a subset of collections', () => {
    const candidate = structuredClone(content);
    candidate.portfolio.about = '';
    candidate.collections = [candidate.collections[0]];
    candidate.collections[0].description = '';
    delete candidate.collections[0].alt;
    assert.equal(isPortfolioContent(candidate), true);
});
