/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
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
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          //rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
