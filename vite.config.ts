import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx({remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug]})},
        react({include: /\.(jsx|js|mdx|tsx|ts)$/}),
    ],
    assetsInclude: ['**/*.JPG'], server: {
        proxy: {
            '/media': {
                target: 'https://sirdanieliii.ca',
                changeOrigin: true,
            },
            '/scripts': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
})
