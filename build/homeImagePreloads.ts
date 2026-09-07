import {readFile} from 'node:fs/promises';
import {relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import type {HtmlTagDescriptor, Plugin} from 'vite';

// Read the existing image imports so changing a photo still takes only one edit.
export const homeImagePreloads = (): Plugin => ({
    name: 'home-image-preloads',
    transformIndexHtml: {
        order: 'pre',
        async handler() {
            const configUrl = new URL('../src/pages/home/homeSections.ts', import.meta.url);
            const source = ts.createSourceFile('homeSections.ts', await readFile(configUrl, 'utf8'), ts.ScriptTarget.Latest);
            const root = fileURLToPath(new URL('../', import.meta.url));
            const tags: HtmlTagDescriptor[] = [];

            for (const statement of source.statements) {
                if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
                const path = statement.moduleSpecifier.text;
                if (!/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path)) continue;
                const image = fileURLToPath(new URL(path, configUrl));
                tags.push({
                    tag: 'link',
                    attrs: {rel: 'preload', as: 'image', href: '/' + relative(root, image).replaceAll('\\', '/'), fetchpriority: 'high'},
                    injectTo: 'head',
                });
                if (tags.length === 2) break;
            }

            return tags;
        },
    },
});
