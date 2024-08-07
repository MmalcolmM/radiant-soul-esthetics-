import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom'],
          'chakra-vendors': ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion']
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // Adjust chunk size limit
  },
  server: {
    port: 3071,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3072',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
