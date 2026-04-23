import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/django-admin/', '/admin-panel/', '/cgu'],
      },
    ],
    sitemap: 'https://www.lesciotcialclub.fr/sitemap.xml',
    host: 'https://www.lesciotcialclub.fr',
  };
}
