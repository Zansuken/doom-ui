import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["src", "lib"], rollupTypes: true }),
  ],
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "doom-ui",
      fileName: "doom-ui",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
