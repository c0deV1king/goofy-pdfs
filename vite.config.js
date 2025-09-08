import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "renderer"),
  base: "",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  server: { port: 5173, strictPort: true },
});
