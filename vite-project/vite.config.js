import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite uses the root directory
  build: {
    outDir: 'dist', // Specify the output directory for build files
  },
})
