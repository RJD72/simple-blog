import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects", // Path to the redirects file
          dest: ".", // Copy to the root of the build output
        },
      ],
    }),
  ],
});
