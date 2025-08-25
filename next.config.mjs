/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '192.168.56.1'
  ],
}

export default nextConfig
