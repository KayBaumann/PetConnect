import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',  // <- GANZ WICHTIG für dein Plesk Deployment!
  build: {
    outDir: 'httpdocs',
    emptyOutDir: true
  }
})
