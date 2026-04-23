import type { Metadata } from 'next';
import ArtistForm from '@/components/forms/ArtistForm';

export const metadata: Metadata = {
  title: 'Jouer ici',
  description:
    'Tu as un projet musical ? Envoie ta candidature pour jouer sur la scène du Sciøt Cial Club.',
};

export default function JouerPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center min-h-[30vh] bg-black overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ressources/542230372_763789346415345_4832126966196685008_n.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ filter: 'blur(4px)' }}
        />
        <div className="relative z-10 text-center px-4 py-14">
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 opacity-90">
            — La Scène du Sciøt —
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Toi aussi,<br className="sm:hidden" /> joue au club
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-center text-lg leading-relaxed text-gray-600 mb-12 normal-case font-normal">
            Tu as un projet musical et tu veux fouler les planches du Sciøt ?<br />
            Remplis ce formulaire et <strong className="text-primary font-bold">Maud & Kiwi</strong> reviendront
            vers toi si le feeling passe !
          </p>

          {/* ── Form card ── */}
          <div className="bg-white shadow-sm border border-black/5 p-8 sm:p-10">
            <ArtistForm />
          </div>

          {/* ── Note ── */}
          <p className="text-center text-xs text-gray-400 mt-6 normal-case font-normal">
            Les candidatures sont étudiées avec attention.&nbsp;
            Merci de joindre un lien d&rsquo;écoute pour nous permettre de vous écouter.
          </p>
        </div>
      </section>
    </>
  );
}
