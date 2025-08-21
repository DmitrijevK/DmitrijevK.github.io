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
  // Для репозитория DmitrijevK.github.io не нужны basePath и assetPrefix
}

export default nextConfig
