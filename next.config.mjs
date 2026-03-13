/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      // Badges Google Play localisés (SVG)
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/steverichey/google-play-badge-svg/master/img/**' },
    ],
  },
};

export default nextConfig;
