import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import {homeImagePreloads} from './build/homeImagePreloads.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx({remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug]})},
        react({include: /\.(jsx|js|mdx|tsx|ts)$/}),
        homeImagePreloads(),
    ],
    assetsInclude: ['**/*.JPG'], server: {
        proxy: {
            '/scripts': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
})
