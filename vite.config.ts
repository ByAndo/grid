import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ 빌드 결과를 저장할 폴더
    emptyOutDir: true, // ✅ 빌드 시 기존 `dist/` 삭제

    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // ✅ 패키지의 진입점
      name: "NhGridComp",
      formats: ["es", "cjs"], // ✅ ESM + CommonJS 번들 생성
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"), // ✅ 파일명 설정
    },
    rollupOptions: {
      output: {
        assetFileNames: "nh-grid-comp.[ext]", // ✅ CSS 파일을 "nh-grid-comp.css"로 저장
      },
      external: ["react", "react-dom"], // ✅ React, ReactDOM 외부 모듈 처리
    },
  },
});
