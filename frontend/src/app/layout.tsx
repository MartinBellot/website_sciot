import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteConfig, getSocialLinks } from '@/lib/api';

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lesciotcialclub.fr'),
  title: {
    default: 'Le Sciøt Cial Club — Bar, Concerts & Soirées en Cotentin',
    template: '%s | Le Sciøt Cial Club',
  },
  description:
    'Bar & concerts au bord de l\'eau à Les Pieux, Cotentin. Concerts live, DJ sets, soirées à thème, cuisine de saison. Entrée libre.',
  keywords: [
    'Sciøt Cial Club',
    'Sciotot',
    'bar Cotentin',
    'concerts Normandie',
    'Les Pieux',
    'soirées thème',
    'DJ sets Cotentin',
    'musique live Normandie',
    'bar restaurant Les Pieux',
    'sortir Cotentin',
    'événements Manche',
    'bar bord de mer Normandie',
  ],
  authors: [{ name: 'Le Sciøt Cial Club', url: 'https://www.lesciotcialclub.fr' }],
  creator: 'Le Sciøt Cial Club',
  publisher: 'Le Sciøt Cial Club',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'Le Sciøt Cial Club',
    locale: 'fr_FR',
    type: 'website',
    url: 'https://www.lesciotcialclub.fr',
    title: 'Le Sciøt Cial Club — Bar, Concerts & Soirées en Cotentin',
    description:
      'Bar & concerts au bord de l\'eau à Les Pieux, Cotentin. Concerts live, DJ sets, soirées à thème, cuisine de saison. Entrée libre.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Le Sciøt Cial Club — Bar & Concerts en Cotentin, Normandie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Sciøt Cial Club — Bar, Concerts & Soirées en Cotentin',
    description:
      'Bar & concerts au bord de l\'eau à Les Pieux, Cotentin. Entrée libre.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://www.lesciotcialclub.fr',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [config, socialLinks] = await Promise.all([getSiteConfig(), getSocialLinks()]);

  return (
    <html lang="fr" className={jost.variable}>
      <body className="font-jost flex flex-col min-h-screen">
        <Header socialLinks={socialLinks} siteName={config?.site_name ?? 'Le Sciøt Cial Club'} />
        <main className="flex-1" style={{ paddingTop: 'var(--navbar-height)' }}>
          {children}
        </main>
        <Footer config={config} socialLinks={socialLinks} />
      </body>
    </html>
  );
}
