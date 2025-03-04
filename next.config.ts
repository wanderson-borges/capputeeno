import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Habilitando styled-components nativamente
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
