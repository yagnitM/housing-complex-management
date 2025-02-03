import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite uses the root directory

  // Set the base for your project if needed (if you're using a specific path or custom domain for deployment)
  base: '/',

  build: {
    outDir: 'dist', // Specify the output directory for build files
    rollupOptions: {
      input: '/src/main.jsx', // Specify main.jsx as the entry point
    },
  },

  // Optional: Server configuration if needed for development
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000, // Port for the development server
  },
})
