/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Для GitHub Pages - если будет база путь, раскомментируйте следующую строку
  // basePath: '/your-repo-name',
  // trailingSlash: true,
}

export default nextConfig
