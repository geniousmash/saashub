/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/saashub',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

