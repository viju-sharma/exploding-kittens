import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/

const target = "http://localhost:4444/api"
export default defineConfig({
  plugins: [react(), eslint()],server: {
    proxy: {
      "/api": {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
