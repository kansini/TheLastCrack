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
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html')
            },
            output: {
                manualChunks: {
                    vendor: ['vue', 'pinia'],
                    // echarts: ['echarts']
                },
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
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
