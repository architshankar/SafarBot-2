// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      devTarget: 'es2022',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias to handle imports from src
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip'
          ],
          'utils': [
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate'
          ]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));

