import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tento súbor je iba pre Lovable náhľad (Next.js build nepoužíva Vite)
export default defineConfig({
  plugins: [react()],
  server: { port: 8080 },
})
