import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_headers",
          dest: ".",
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist", // Default build output directory
  },
  base: "/", // Update if hosting under a subdirectory (e.g., "/my-app/")
});
