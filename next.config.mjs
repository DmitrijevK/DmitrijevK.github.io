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
  // Настройки для GitHub Pages (github.io домен)
  output: 'export',
  trailingSlash: true,
  // Убираем basePath и assetPrefix для github.io домена
}

export default nextConfig
