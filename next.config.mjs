/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*"], // すべてのドメインからの画像を許可
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' *;
              style-src 'self' 'unsafe-inline' *;
              img-src 'self' data: https: blob: *;
              frame-src *;
              connect-src 'self' *;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
