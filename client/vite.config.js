import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is correct ("/" for root hosting or a subpath like "/mysimpleblogpage/" if needed)
  build: {
    outDir: "dist",
  },
});
