import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: '../httpdocs',
    emptyOutDir: true,
    assetsDir: 'assets'
  }
})
