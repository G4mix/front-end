/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    tsconfigPath: "./tsconfig.next.json"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ],
  }
};

module.exports = nextConfig;
