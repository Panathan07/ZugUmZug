import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@hooks",
        replacement: resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/components"),
      },
      {
        find: "@assets",
        replacement: resolve(__dirname, "./src/assets"),
      },
      {
        find: "@pages",
        replacement: resolve(__dirname, "./src/pages"),
      },
      {
        find: "@customTypes",
        replacement: resolve(__dirname, "./src/custom-types"),
      },
    ],
  },
});
