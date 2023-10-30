/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.next.json"
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
