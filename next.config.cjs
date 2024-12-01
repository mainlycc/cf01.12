/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // jeśli używasz obrazów z zewnętrznych źródeł, dodaj:
  images: {
    domains: ['twoja-domena.com'],
  },
}

module.exports = nextConfig