import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "open-mind.fly.storage.tigris.dev",
        protocol: "https",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "open-mind.s3.amazonaws.com",
        protocol: "https",
        port: "",
      },
    ]
  }
};

export default nextConfig;
