import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseURL = process.env.BACKEND_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    target: baseURL, // 백엔드 API의 주소로 변경
    changeOrigin: true,
    port: 5174 // 원하는 포트 번호로 설정
  }

})
