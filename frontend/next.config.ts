import type { NextConfig } from 'next';

// In dev: API_URL=http://127.0.0.1:8000 (via .env.local)
// In prod: API_URL=http://api:8000 (Docker internal network, set via build arg)
const apiUrl = process.env.API_URL ?? 'http://api:8000';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'api' },
      { protocol: 'https', hostname: 'lesciotcialclub.fr' },
      { protocol: 'https', hostname: 'www.lesciotcialclub.fr' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Sécurité & SEO
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        // Cache long sur les assets statiques (JS/CSS/images buildés)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Proxy API calls to Django (used by Client Components & browser)
      { source: '/api/:path*', destination: `${apiUrl}/api/:path*` },
      // Proxy media files
      { source: '/media/:path*', destination: `${apiUrl}/media/:path*` },
      // Proxy Django static files
      { source: '/static/:path*', destination: `${apiUrl}/static/:path*` },
      // Proxy admin panels
      { source: '/django-admin/:path*', destination: `${apiUrl}/django-admin/:path*` },
      { source: '/admin-panel/:path*', destination: `${apiUrl}/admin-panel/:path*` },
    ];
  },
};

export default nextConfig;
