// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/data/:path*", // browser will call https://your-app.vercel.app/data/...
        // destination: "http://134.122.66.91:8080/data/:path*", // server-side forward
        destination: "http://localhost:8080/data/:path*", // server-side forward
      },
    ];
  },
};

export default nextConfig;
