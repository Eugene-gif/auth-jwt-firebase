import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/auth-jwt-firebase",
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': resolve(__dirname, './src')
    }
  }
})
