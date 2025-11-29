import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"], // добавляем домен для внешних картинок
  },
};

export default nextConfig;
