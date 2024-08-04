import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3071', // Ensure this matches your server port
        secure: false,
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:3071', // Ensure this matches your server port
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches where your server expects the build output
    emptyOutDir: true,
  }
});
