/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for file uploads
  experimental: {
    serverComponentsExternalPackages: ['googleapis', 'google-spreadsheet']
  },
  // Images configuration
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig 