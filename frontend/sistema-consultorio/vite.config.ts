import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:3000', // Redirige las solicitudes al backend
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
