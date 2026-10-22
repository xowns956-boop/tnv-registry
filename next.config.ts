import type { NextConfig } from "next";

// GitHub Pages 배포 때만 정적 내보내기(out/) + 저장소 이름 경로(BASE_PATH)를 쓴다.
// 로컬 개발(npm run dev)은 그대로.
const isPages = process.env.PAGES === "1";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      // docs/ai/index.html 로 내보내야 Pages에서 /docs/ai 가 열린다
      trailingSlash: true,
      basePath: process.env.BASE_PATH || "",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
