import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Ignore the eslint check
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
