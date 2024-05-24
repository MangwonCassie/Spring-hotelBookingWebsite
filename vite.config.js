import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 원하는 포트 번호로 설정
    proxy: {
      '/api': {
        target: 'https://river-hotel-91f9caaa3277.herokuapp.com/', // 백엔드 API의 주소로 변경
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // '/api'를 제거하여 백엔드 서버에 맞게 경로 재작성
      }
    }
  }

})
