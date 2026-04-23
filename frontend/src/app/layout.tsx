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
  title: {
    default: 'Le Sciøt Cial Club',
    template: '%s | Le Sciøt Cial Club',
  },
  description:
    'Le Sciøt Cial Club — Concerts, DJ sets et soirées à thème en Cotentin, Normandie. Bar & restauration sur place.',
  keywords: ['Sciøt', 'club', 'concerts', 'bar', 'Cotentin', 'Normandie', 'Les Pieux', 'Sciotot'],
  openGraph: {
    siteName: 'Le Sciøt Cial Club',
    locale: 'fr_FR',
    type: 'website',
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
