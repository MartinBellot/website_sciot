import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation',
  description: 'Mentions légales et conditions générales d\'utilisation du site Le Sciøt Cial Club.',
};

export default function CguPage() {
  return (
    <>
      {/* ── Page header ── */}
      <div
        className="py-10 px-4"
        style={{ background: 'linear-gradient(135deg, #8d4932 0%, #6b3a28 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-2">Légal</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Conditions Générales d&rsquo;Utilisation
          </h1>
          <p className="text-white/60 text-sm mt-2">En vigueur au 10/06/2024</p>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-sm max-w-none space-y-8 text-[var(--text)]">

          <Article title="Article 1 : Mentions légales">
            <p>
              Le site web &laquo;&nbsp;Le Sciøt Cial Club&nbsp;&raquo;, accessible à l&rsquo;adresse
              www.lesciotcialclub.com, est édité par la société LE SCIOT CIAL CLUB :
            </p>
            <ul>
              <li><strong>Dénomination sociale :</strong> LE SCIOT CIAL CLUB</li>
              <li><strong>Forme juridique :</strong> SARL</li>
              <li><strong>Adresse :</strong> 3 Route du Fort, 50340 Les Pieux (Sciotot)</li>
              <li><strong>Téléphone :</strong> 02 33 04 24 56</li>
              <li><strong>Email :</strong> lesciotcialclub@gmail.com</li>
              <li><strong>SIRET :</strong> 912 808 208 00018</li>
              <li><strong>Capital social :</strong> 1&nbsp;000,00&nbsp;€</li>
            </ul>
            <p>
              Le Directeur de la publication est Madame Maud LEBRUN.
              Le site est hébergé par Hostinger International Ltd, 61 Lordou Vironos Street,
              6023 Larnaca, Chypre.
            </p>
          </Article>

          <Article title="Article 2 : Accès au site">
            <p>
              L&rsquo;accès au site et son utilisation sont réservés à un usage strictement personnel.
              Vous vous engagez à ne pas utiliser ce site à des fins commerciales, politiques,
              publicitaires ou de sollicitation commerciale.
            </p>
          </Article>

          <Article title="Article 3 : Contenu et propriété intellectuelle">
            <p>
              Toutes les marques, photographies, textes, commentaires, illustrations, images, séquences
              vidéo, sons, ainsi que les applications informatiques présentes sur ce site sont protégés
              par les lois en vigueur au titre de la propriété intellectuelle. Ils sont la propriété de
              l&rsquo;Éditeur ou de ses partenaires.
            </p>
            <p>
              Toute reproduction ou utilisation, sans accord écrit préalable de l&rsquo;Éditeur, est
              strictement interdite.
            </p>
          </Article>

          <Article title="Article 4 : Gestion du site">
            <p>Pour la bonne gestion du site, l&rsquo;Éditeur pourra à tout moment :</p>
            <ul>
              <li>Suspendre ou limiter l&rsquo;accès à tout ou partie du site ;</li>
              <li>Supprimer toute information perturbant le fonctionnement ou enfreignant la loi ;</li>
              <li>Suspendre le site pour des mises à jour.</li>
            </ul>
          </Article>

          <Article title="Article 5 : Responsabilité">
            <p>
              La responsabilité de l&rsquo;Éditeur ne peut être engagée en cas de défaillance,
              panne ou interruption du site. Le matériel de connexion utilisé est sous l&rsquo;entière
              responsabilité de l&rsquo;utilisateur.
            </p>
          </Article>

          <Article title="Article 6 : Données personnelles">
            <p>
              Le site assure à l&rsquo;Utilisateur une collecte et un traitement d&rsquo;informations
              personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6 janvier
              1978 et au Règlement (UE) 2016/679 (RGPD).
            </p>
          </Article>

          <Article title="Article 7 : Droit applicable">
            <p>
              Les présentes conditions sont régies par la loi française et soumises à la compétence
              des tribunaux du siège social de l&rsquo;Éditeur.
            </p>
          </Article>
        </div>
      </main>
    </>
  );
}

// ─── Article component ────────────────────────────────────────────────────────
function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-l-4 border-primary/20 pl-5">
      <h2 className="text-base font-bold text-primary mb-3 normal-case tracking-normal">{title}</h2>
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed normal-case font-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
