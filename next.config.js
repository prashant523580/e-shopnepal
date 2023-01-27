/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  reactStrictMode: true,
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: false,
  runtimeCaching,
  disable:process.env.NODE_ENV === 'development'
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["static-01.daraz.com.np","m.media-amazon.com","dummyimage.com","tailwindui.com","localhost"]
  }, 
  experimental: {
    // nextScriptWorkers: true,
  },
}
module.exports = withPWA({})
module.exports = nextConfig
