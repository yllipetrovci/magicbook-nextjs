import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com;
              style-src 'self' 'unsafe-inline' https://sandbox-cdn.paddle.com https://*.paddle.com;
              style-src-elem 'self' 'unsafe-inline' https://sandbox-cdn.paddle.com https://*.paddle.com;
              frame-src https://sandbox-buy.paddle.com https://*.paddle.com;
              frame-ancestors 'self' http://localhost https://sandbox-buy.paddle.com;
              connect-src 'self' https://*.paddle.com;
              img-src 'self' data: https:;
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
