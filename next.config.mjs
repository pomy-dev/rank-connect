/** @type {import('next').NextConfig} */
const nextConfig = {
  // The app is commonly opened from a phone on the local network during development.
  allowedDevOrigins: ['192.168.18.172'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
