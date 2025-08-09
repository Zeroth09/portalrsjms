/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable larger body size for file uploads
  serverRuntimeConfig: {
    // Increase body size limit to 100MB
    bodySizeLimit: '100mb'
  },
  // Public runtime config
  publicRuntimeConfig: {
    maxFileSize: '100mb'
  },
  // Increase API body size limit
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
}

module.exports = nextConfig 