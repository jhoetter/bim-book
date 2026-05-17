import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 2100,
    proxy: {
      '/api': 'http://localhost:51741',
    },
    watch: {
      ignored: (path: string) => path.includes('node_modules') || path.includes('.git'),
    },
  },
  resolve: {
    alias: {
      '@docs': resolve(__dirname, '../docs'),
      'bim-icons': resolve('/Users/jhoetter/repos/bim-icons/src/index.ts'),
    },
  },
})
