import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gamix-public.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
