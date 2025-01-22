import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'vite-project',  // specify the folder containing index.html
  plugins: [react()],
})
