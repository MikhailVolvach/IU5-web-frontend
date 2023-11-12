import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "ui": fileURLToPath(new URL("./src/components/ui", import.meta.url)),
      "layout": fileURLToPath(new URL("./src/components/layout", import.meta.url)),
      "config": fileURLToPath(new URL("./src/config", import.meta.url)),
      "pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "img": fileURLToPath(new URL("./src/assets/img", import.meta.url)),
      "svg": fileURLToPath(new URL("./src/assets/svg", import.meta.url)),
      "store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "src": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    watch: {
      usePolling: true,
    }
  }
})
