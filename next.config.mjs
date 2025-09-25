/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, { dev }) => {
    // Optimize caching for large JSON files
    if (!dev) {
      config.cache = {
        ...config.cache,
        maxMemoryGenerations: 1,
      };
    }
    return config;
  }
}

export default nextConfig
