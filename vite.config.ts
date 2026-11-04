import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Each page builds alone so the home keeps its own CSS order in a single file.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: "./",
  build: {
    emptyOutDir: mode !== "sac",
    rollupOptions: { input: mode === "sac" ? "sac/index.html" : "index.html" },
  },
}));
