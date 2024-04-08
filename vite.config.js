import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  proxy: {
    '/auth': {
      target: 'http://localhost:9192',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/auth/, ''),
    },
    '/rooms': {
      target: 'http://localhost:9192',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/rooms/, ''),
    },
  } // 추가된 닫는 괄호
})
