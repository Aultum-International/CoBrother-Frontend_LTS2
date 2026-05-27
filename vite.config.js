import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  define: {
    global: 'window',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://backend.cobrother.com',
        changeOrigin: true,
      },
      '/oauth2': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://backend.cobrother.com',
        changeOrigin: true,
      },
    },
  },
})