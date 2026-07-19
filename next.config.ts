import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "cdn.resales-online.com",
        protocol: "https",
      },
      {
        hostname: "jfxlxmrfdewoytbzfmce.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
