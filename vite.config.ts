
// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()]
  
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger')
      plugins.push(componentTagger())
    } catch (error) {
      console.warn('Could not load lovable-tagger:', error)
    }
  }
  
  return {
    plugins,
    server: {
      host: "::",
      port: 8080,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
