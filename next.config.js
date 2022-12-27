/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["static-01.daraz.com.np","m.media-amazon.com","dummyimage.com"]
  }
}

module.exports = nextConfig
