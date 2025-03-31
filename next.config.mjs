/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  compiler: {},
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;