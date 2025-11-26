import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: false, // Disable CSS splitting to prevent caching issues
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Aggressive code splitting for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core'
            }
            if (id.includes('framer-motion')) {
              return 'animations'
            }
            if (id.includes('@react-three')) {
              return 'three-js'
            }
            if (id.includes('react-router')) {
              return 'routing'
            }
            return 'vendor'
          }
          // Split large components
          if (id.includes('components/Results')) return 'results'
          if (id.includes('components/Services')) return 'services'
          if (id.includes('components/Comparison')) return 'comparison'
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name)) {
            return `assets/media/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    chunkSizeWarningLimit: 300,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@react-three/fiber', '@react-three/drei']
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
})
