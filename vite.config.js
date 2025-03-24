import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  basePath: '/Personal-Portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'], // Separate React dependencies
          'three-vendor': ['three'], // Separate Three.js
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase the limit to avoid warnings
  }
}
)
