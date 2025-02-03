import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Root directory
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: '/src/main.jsx', // Explicit entry point
    },
  },
  base: '/', // Ensure assets are correctly referenced at root
});
