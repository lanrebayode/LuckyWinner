/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    PRIVATEKEY: process.env.PRIVATE_KEY,
  },
};

module.exports = nextConfig;
