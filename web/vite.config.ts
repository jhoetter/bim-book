import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 2101,
    watch: {
      // Watch docs/ outside the Vite root so HMR fires on markdown edits
      ignored: (path: string) => path.includes('node_modules') || path.includes('.git'),
    },
  },
  // Make sure Vite can resolve and serve files from the docs directory
  resolve: {
    alias: {
      '@docs': resolve(__dirname, '../docs'),
    },
  },
})
