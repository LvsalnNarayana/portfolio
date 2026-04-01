import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,     // ← this fixes most WSL2 / VM issues
    },
  },
  plugins: [react()],
})
