import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5502,
    open: true,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
})
