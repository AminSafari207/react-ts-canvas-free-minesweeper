import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

const OUTPUT = path.resolve(__dirname, 'out')

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: OUTPUT,
    target: 'es2022',
    sourcemap: true,
  },
  server: {
    port: 5502,
    open: true,
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/icons/mine-01-256.png', 'assets/icons/mine-01-512.png'],
      manifest: {
        name: 'Canvas-Free Minesweeper',
        short_name: 'Minesweeper',
        description: 'A canvas-free Minesweeper built with React and TypeScript.',
        theme_color: '#b9b9b9',
        background_color: '#bbbbbb',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'assets/mine-01-256.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/mine-01-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => request.destination === 'font' || url.pathname.startsWith('/assets/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
})
