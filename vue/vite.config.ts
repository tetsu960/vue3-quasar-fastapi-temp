import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../public'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: false,
      }
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/quasar-variables.sass', import.meta.url)
      )
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})