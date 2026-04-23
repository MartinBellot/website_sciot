import type { Metadata } from 'next';
import Link from 'next/link';
import { getWeekEvents, getUpcomingEvents, getEventCategories } from '@/lib/api';
import ProgrammationClient from '@/components/ui/ProgrammationClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Programmation — Concerts & Événements',
  description:
    'Agenda complet des concerts, DJ sets et soirées à thème du Sciøt Cial Club à Les Pieux, Cotentin. Entrée libre pour la plupart des événements.',
  alternates: {
    canonical: 'https://www.lesciotcialclub.fr/programmation',
  },
  openGraph: {
    title: 'Programmation — Concerts & Événements | Le Sciøt Cial Club',
    description:
      'Agenda complet des concerts, DJ sets et soirées à thème du Sciøt Cial Club à Les Pieux, Cotentin. Entrée libre.',
    url: 'https://www.lesciotcialclub.fr/programmation',
    type: 'website',
  },
};

export const revalidate = 300; // 5 min — événements mis à jour fréquemment

export default async function ProgrammationPage() {
  const [weekEvents, allEvents, categories] = await Promise.all([
    getWeekEvents(),
    getUpcomingEvents(100),
    getEventCategories(),
  ]);

  const eventJsonLd = allEvents.slice(0, 10).map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description ?? `${event.title} au Sciøt Cial Club`,
    startDate: event.start_time ? `${event.date}T${event.start_time}` : event.date,
    endDate: event.end_time ? `${event.date}T${event.end_time}` : undefined,
    eventStatus:
      event.status === 'cancelled'
        ? 'https://schema.org/EventCancelled'
        : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: event.is_free,
    offers: {
      '@type': 'Offer',
      price: event.is_free ? 0 : parseFloat(event.price ?? '0'),
      priceCurrency: 'EUR',
      url: event.ticket_url ?? 'https://www.lesciotcialclub.fr/programmation',
      availability: 'https://schema.org/InStock',
    },
    location: {
      '@type': 'Place',
      name: 'Le Sciøt Cial Club',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3 Route du Fort',
        addressLocality: 'Les Pieux',
        postalCode: '50340',
        addressRegion: 'Normandie',
        addressCountry: 'FR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Le Sciøt Cial Club',
      url: 'https://www.lesciotcialclub.fr',
    },
    image: event.image
      ? `https://www.lesciotcialclub.fr${event.image}`
      : 'https://www.lesciotcialclub.fr/opengraph-image',
  }));

  return (
    <>
      {eventJsonLd.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* ── Hero ── */}
      <section
        className="wave-container relative flex items-end min-h-[280px] sm:min-h-[320px]"
        style={{ background: 'linear-gradient(135deg, #8d4932 0%, #4d2a1c 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-2">Le Sciøt Cial Club</p>
              <h1 className="text-4xl sm:text-5xl font-black text-white">Programmation</h1>
              <p className="text-white/70 text-base mt-3 normal-case font-light max-w-xl leading-relaxed">
                Concerts, DJ sets, soirées à thème…&nbsp;Découvrez tous nos événements.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center text-white shrink-0">
              <div className="text-2xl font-black">{allEvents.length}</div>
              <div className="text-xs uppercase tracking-widest opacity-75 mt-0.5">
                événement{allEvents.length !== 1 ? 's' : ''}
              </div>
              <div className="text-[0.6rem] text-white/50 mt-1 uppercase tracking-wide">à venir</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free entry badge ── */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-primary">
          <svg className="w-4 h-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span className="font-semibold">Tous nos événements sont gratuits !</span>
          <span className="text-primary/60 ml-1">Bienvenue à toutes et à tous.</span>
        </div>
      </div>

      {/* ── Interactive content (client) ── */}
      <ProgrammationClient
        weekEvents={weekEvents}
        allEvents={allEvents}
        categories={categories}
      />

      {/* ── CTA section ── */}
      <section
        className="wave-container py-16 text-center"
        style={{ background: 'linear-gradient(135deg, #8d4932 0%, #6b3a28 100%)' }}
      >
        <div className="max-w-xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-black text-white mb-3">Vous êtes musicien·ne ?</h2>
          <p className="text-white/70 mb-6 normal-case font-light">
            Proposez votre candidature et venez jouer sur notre scène !
          </p>
          <Link
            href="/jouerausciot"
            className="inline-block px-8 py-3.5 bg-white text-primary font-bold uppercase tracking-widest text-sm hover:bg-cream transition-colors shadow-lg"
          >
            Candidater
          </Link>
        </div>
      </section>
    </>
  );
}
