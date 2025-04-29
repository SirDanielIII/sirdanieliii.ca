import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.JPG'], server: {
        proxy: {
            '/scripts': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/scripts/, '/scripts'),
            },
        },
    },
})
