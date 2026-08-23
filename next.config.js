/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allows production builds to successfully complete even if there are lint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensures build succeeds on CI while types are settling
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
