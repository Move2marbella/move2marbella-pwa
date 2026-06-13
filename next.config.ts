import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.resales-online.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
