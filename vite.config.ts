import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {svgSpritemap} from 'vite-plugin-svg-spritemap';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mock-web/',
  envDir: './env',
  envPrefix: 'APP_',
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://localhost:3001',
        changeOrigin: true,
        ws: true,
      }
    },
    cors: true,
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    svgSpritemap({
      pattern: 'src/assets/svgIcons/*.svg',
      filename: 'svgIcons.svg',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'), 
        require('autoprefixer'),
      ],
    },
  },
  optimizeDeps: {
    include: ['tailwindcss', 'autoprefixer'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
