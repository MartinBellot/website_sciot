import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig, getWeekEvents, getCarouselSlides, getHeroBanner } from '@/lib/api';
import { formatDate, formatTime } from '@/lib/utils';
import Carousel from '@/components/ui/Carousel';
import CategoryBadge from '@/components/ui/CategoryBadge';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Le Sciøt Cial Club — Bar, Concerts & Soirées à Les Pieux, Cotentin',
  description:
    'Bar & concerts au bord de l\'eau à Les Pieux, Sciotot, Cotentin. Concerts live, DJ sets, soirées à thème, cuisine de saison. Entrée libre.',
  alternates: {
    canonical: 'https://www.lesciotcialclub.fr',
  },
  openGraph: {
    title: 'Le Sciøt Cial Club — Bar, Concerts & Soirées à Les Pieux',
    description:
      'Bar & concerts au bord de l\'eau à Les Pieux, Sciotot. Concerts live, DJ sets, soirées à thème, cuisine de saison. Entrée libre.',
    url: 'https://www.lesciotcialclub.fr',
    type: 'website',
  },
};

// Revalidate every 30 minutes
export const revalidate = 1800;

export default async function HomePage() {
  const [config, weekEvents, slides, hero] = await Promise.all([
    getSiteConfig(),
    getWeekEvents(),
    getCarouselSlides(),
    getHeroBanner(),
  ]);

  const mapsUrl =
    config?.google_maps_embed_url ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.326880004943!2d-1.854209523490772!3d49.59152287148281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ced56dc03e387%3A0x2289c6e049f7907c!2s3%20Rte%20du%20Fort%2C%2050340%20Les%20Pieux!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr';

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'FoodEstablishment', 'BarOrPub'],
          name: 'Le Sciøt Cial Club',
          alternateName: ['Sciøt Cial Club', 'Le Sciot Cial Club', 'Sciotot'],
          url: 'https://www.lesciotcialclub.fr',
          telephone: '+33233042456',
          email: 'lesciotcialclub@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '3 Route du Fort',
            addressLocality: 'Les Pieux',
            postalCode: '50340',
            addressRegion: 'Normandie',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 49.5915229,
            longitude: -1.8542095,
          },
          hasMap: 'https://maps.google.com/?q=3+Route+du+Fort+50340+Les+Pieux',
          servesCuisine: ['Française', 'Cuisine locale', 'Normande'],
          menu: 'https://www.lesciotcialclub.fr/menu',
          priceRange: '€€',
          currenciesAccepted: 'EUR',
          paymentAccepted: 'Cash, Carte bancaire',
          description:
            'Bar & concerts au bord de l\'eau à Les Pieux, Sciotot, Cotentin. Concerts live, DJ sets, soirées à thème, cuisine de saison. Entrée libre.',
          image: 'https://www.lesciotcialclub.fr/opengraph-image',
          logo: 'https://www.lesciotcialclub.fr/opengraph-image',
          sameAs: [
            'https://www.instagram.com/lesciotcialclub',
            'https://www.facebook.com/lesciotcialclub',
          ],
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex items-center justify-center min-h-[55vh] bg-black">
        {/* Background image */}
        {hero?.background_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.background_image}
            alt="Bannière"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
            style={{ filter: 'blur(6px)', transform: 'scale(1.08)' }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/ressources/542230372_763789346415345_4832126966196685008_n.jpg"
            alt="Bannière Club"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            style={{ filter: 'blur(8px)', transform: 'scale(1.1)' }}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 opacity-90">
            — Sciotot · Cotentin · Normandie —
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] text-balance">
            {hero?.title ?? 'Bienvenue au Club'}
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light normal-case leading-relaxed">
            {hero?.subtitle ??
              'Le Sciøt Cial Club, c\'est Maud & Kiwi et leur super équipe. Un lieu de partage au bord de l\'eau, entre concerts, bonne cuisine et l\'esprit du Cotentin.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-lg hover:shadow-xl"
            >
              Découvrir le menu
            </Link>
            <Link
              href="/programmation"
              className="inline-block px-8 py-3.5 border-2 border-white/70 hover:border-white text-white font-bold uppercase tracking-widest text-sm transition-colors"
            >
              La programmation
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WEEK EVENTS + CAROUSEL
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
        {/* ── Left: Cette Semaine ── */}
        <div
          className="wave-container p-8 xl:p-12 flex flex-col"
          style={{ background: 'linear-gradient(135deg, #8d4932 0%, #6b3a28 100%)' }}
        >
          <div className="mb-6">
            <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-1">Programme</p>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">Cette semaine</h2>
            <div className="w-12 h-0.5 bg-white/30 mt-2" />
          </div>

          <div className="flex flex-col divide-y divide-white/10 flex-1">
            {weekEvents.length === 0 ? (
              <p className="text-white/50 italic text-sm py-8 text-center normal-case font-normal">
                Aucun événement cette semaine — restez connectés !
              </p>
            ) : (
              weekEvents.map((event) => {
                const { day, dayName, month } = formatDate(event.date);
                const time = formatTime(event.start_time);
                return (
                  <div key={event.id} className="py-4 flex items-center gap-4 group">
                    {/* Date */}
                    <div className="text-center text-white min-w-[52px] shrink-0">
                      <div className="text-3xl font-black leading-none">{day}</div>
                      <div className="text-[0.6rem] uppercase tracking-[0.12em] opacity-60 mt-0.5">
                        {dayName} {month}
                      </div>
                    </div>
                    {/* Separator */}
                    <div className="w-px h-10 bg-white/20 shrink-0" />
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm uppercase tracking-wide truncate">
                        {event.title}
                      </div>
                      {time && (
                        <div className="text-white/55 text-xs mt-0.5">{time}</div>
                      )}
                    </div>
                    {/* Category */}
                    {event.category && (
                      <div className="shrink-0">
                        <CategoryBadge category={event.category} size="sm" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/programmation"
              className="inline-block w-full text-center border-2 border-white/50 hover:border-white text-white text-xs font-bold uppercase tracking-widest py-3 transition-colors"
            >
              Accéder à la programmation complète →
            </Link>
          </div>
        </div>

        {/* ── Right: Carousel + Spirit ── */}
        <div className="flex flex-col">
          {/* Carousel */}
          <Carousel slides={slides} className="h-72 lg:h-96 xl:h-[440px]" />

          {/* Spirit section */}
          <div className="p-8 xl:p-10 bg-cream flex-1 flex flex-col justify-center">
            <p className="text-primary/60 text-xs uppercase tracking-[0.3em] mb-2">Qui sommes-nous ?</p>
            <h2 className="text-2xl font-black text-primary uppercase tracking-wide mb-4">
              L&rsquo;Esprit du Club
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 normal-case font-normal">
              Une expérience sensorielle au bord de l&rsquo;eau. Le Sciøt Cial Club, c&rsquo;est un lieu
              de vie et de partage au cœur du Cotentin normand — cuisine locale, musiques vivantes,
              et une équipe qui vous accueille comme à la maison.
            </p>
            <Link
              href="/jouerausciot"
              className="inline-block self-start px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Jouer ici
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAP
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-[5fr_1fr]">
        {/* Map */}
        <div className="relative" style={{ minHeight: '400px' }}>
          <iframe
            src={mapsUrl}
            className="w-full h-full absolute inset-0"
            style={{ minHeight: '400px', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation du Sciøt Cial Club"
          />
        </div>

        {/* Address widget */}
        <div
          className="wave-container wave-top flex items-center justify-center text-center p-6"
          style={{ background: 'linear-gradient(135deg, #7a3f2b 0%, #4d2a1c 100%)', minHeight: '300px' }}
        >
          <div>
            <svg
              className="w-8 h-8 text-white/70 mx-auto mb-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">
              Rejoignez-nous
            </h4>
            <div className="w-8 h-px bg-white/30 mx-auto mb-4" />
            <address className="not-italic text-white/70 text-xs uppercase tracking-wide leading-relaxed mb-5">
              3 Route du Fort<br />
              50340 Les Pieux<br />
              (Sciotot)
            </address>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=3+route+du+fort+50340+les+pieux"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/50 hover:border-white text-white text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors"
            >
              Y aller →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
