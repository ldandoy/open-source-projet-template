import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // <-- important pour l'image Docker prod légère

  // Force hot reload in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
