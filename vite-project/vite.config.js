import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for a React project
export default defineConfig({
  plugins: [react()],
  root: '.', // Root directory of your project

  build: {
    outDir: 'dist', // Output directory for build files
    rollupOptions: {
      input: '/src/main.jsx', // Set main.jsx as the entry module (for React)
    },
  },

  // Optional: If deploying to a subpath, you can configure base like this:
  base: '/', // Ensure assets are correctly referenced at root
});
