import type { Metadata } from 'next';
import { getFullMenu } from '@/lib/api';
import MenuClient from '@/components/ui/MenuClient';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Notre carte : cuisine simple et gourmande à base de produits locaux et de saison, avec boissons et formules.',
};

// Menu doesn't change often — revalidate every hour
export const revalidate = 3600;

export default async function MenuPage() {
  const menu = await getFullMenu();

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-end min-h-[260px] sm:min-h-[300px]"
        style={{ background: 'linear-gradient(135deg, #8d4932 0%, #16213e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-2">À table</p>
              <h1 className="text-4xl sm:text-5xl font-black text-white">Notre Menu</h1>
              <p className="text-white/70 text-base mt-3 normal-case font-light max-w-xl leading-relaxed">
                Cuisine simple et gourmande, produits locaux et de saison.
                Notre carte évolue au fil des saisons.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center text-white shrink-0">
              <svg className="w-8 h-8 mx-auto mb-1 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-sm font-bold">Service continu</div>
              <div className="text-xs text-white/60 mt-0.5">12h – 22h</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive menu ── */}
      <MenuClient menu={menu} />
    </>
  );
}
