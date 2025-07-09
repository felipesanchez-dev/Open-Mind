import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "open-mind.fly.storage.tigris.dev",
        protocol: "https",
        port: "",
      }
    ]
  }
};

export default nextConfig;
