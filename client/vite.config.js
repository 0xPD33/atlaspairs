import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    rollupOptions: {
      external: ["react-dom", "react-router-dom"],
    },
  },
  plugins: [react()],
});
