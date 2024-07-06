/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@contexts": "/src/contexts",
      "@layouts": "/src/layouts",
      "@screens": "/src/screens",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/", // process.env.PROXY_TARGET ?? 
        changeOrigin: true,
        secure: false,
        ws: true,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
