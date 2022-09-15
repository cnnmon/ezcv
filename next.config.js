/* eslint-disable no-param-reassign */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['api.producthunt.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
