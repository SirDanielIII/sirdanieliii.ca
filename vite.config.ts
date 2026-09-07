import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {homeImagePreloads} from './build/homeImagePreloads.ts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), homeImagePreloads()],
    assetsInclude: ['**/*.JPG'], server: {
        fs: {
            // Vite serves source files too; keep server-only configuration and PDFs private.
            deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/private/**'],
        },
        proxy: {
            '/scripts': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
})
