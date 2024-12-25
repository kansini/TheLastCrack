import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html')
            }
        }
    },
    server: {
        host: "0.0.0.0",
        port: 1987,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/variables.scss";`
            }
        }
    }
})
