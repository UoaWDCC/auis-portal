/// <reference types="vitest" />
/// <reference types = "vite/client" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["text", "json", "html"],
    },
  },
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
});
