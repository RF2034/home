/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.microcms-assets.io"], // microCMSの画像ドメインを追加
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://platform.twitter.com https://cdn.iframe.ly;
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://images.microcms-assets.io https://pbs.twimg.com data:;
              frame-src https://open.spotify.com https://www.youtube.com https://embed.nicovideo.jp https://platform.twitter.com;
              connect-src 'self' https://vitals.vercel-insights.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
