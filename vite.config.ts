import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    //tailwindcss()        
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "NhGridComp",
      fileName: (format) => `nh-grid-comp.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "nh-grid-comp.[ext]", // ✅ CSS 파일을 "nh-grid-comp.css"로 저장
      },
    },
  },
  css: {
    postcss: "src/postcss.config.js", // ✅ PostCSS 설정을 추가하여 처리
  },
  
});
