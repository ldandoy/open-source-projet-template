import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // <-- important pour l'image Docker prod légère
};

export default nextConfig;
