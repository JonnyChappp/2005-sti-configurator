import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/2005-sti-configurator/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: { input: { main: "index.html", print: "print.html" } },
  },
  server: { port: 5173, strictPort: true },
});
