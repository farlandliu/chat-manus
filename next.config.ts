import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // 禁用静态生成，使用服务端渲染
  output: 'standalone',
};

export default nextConfig;
