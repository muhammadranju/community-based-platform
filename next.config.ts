import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - allowedDevOrigins might be missing from types in this version
  allowedDevOrigins: ["10.10.7.101"],
};

export default nextConfig;
