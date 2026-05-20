'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { FullMenu } from '@/lib/types';
import DietaryBadges from './DietaryBadges';
import { formatPrice } from '@/lib/utils';

// ─── Nav section definitions ──────────────────────────────────────────────────
const SECTIONS = [
  { id: 'formules', label: 'Formules', icon: '✦' },
  { id: 'plats', label: 'La Carte', icon: '◆' },
  { id: 'boissons', label: 'Boissons', icon: '◇' },
] as const;

interface MenuClientProps {
  menu: FullMenu | null;
  showPrices?: boolean;
}

export default function MenuClient({ menu, showPrices = false }: MenuClientProps) {
  const [activeSection, setActiveSection] = useState<string>('formules');
  const navRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '68');
    const navH = navRef.current?.offsetHeight ?? 48;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-4xl mb-4">🍽️</p>
        <p className="font-bold uppercase tracking-widest text-sm">Menu indisponible pour le moment.</p>
        <p className="text-xs mt-2">Merci de réessayer ultérieurement.</p>
      </div>
    );
  }

  const hasSpecials = menu.special_menus.length > 0;
  const hasFood = menu.food_categories.some((c) => c.items.length > 0);
  const hasDrinks = menu.drink_categories.some((c) => c.drinks.length > 0);

  return (
    <>
      {/* ── Sticky sub-nav ── */}
      <div
        ref={navRef}
        className="glass-bar border-b border-primary/15 sticky z-40"
        style={{ top: 'var(--navbar-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-thin">
            {SECTIONS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider whitespace-nowrap border transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'text-primary border-primary/30 hover:border-primary hover:bg-primary/5'
                }`}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">

        {/* FORMULES */}
        {hasSpecials && (
          <section id="section-formules" className="scroll-mt-nav">
            <SectionDivider icon="✦" title="Nos Formules" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.special_menus.map((special) => (
                <SpecialCard key={special.id} special={special} showPrices={showPrices} />
              ))}
            </div>
          </section>
        )}

        {/* LA CARTE */}
        {hasFood && (
          <section id="section-plats" className="scroll-mt-nav">
            <SectionDivider icon="◆" title="La Carte" />
            <div className="flex flex-col gap-6">
              {menu.food_categories
                .filter((c) => c.items.length > 0)
                .map((cat) => (
                  <FoodCategoryBlock key={cat.id} category={cat} showPrices={showPrices} />
                ))}
            </div>
          </section>
        )}

        {/* BOISSONS */}
        {hasDrinks && (
          <section id="section-boissons" className="scroll-mt-nav">
            <SectionDivider icon="◇" title="Nos Boissons" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.drink_categories
                .filter((c) => c.drinks.length > 0)
                .map((cat) => (
                  <DrinkCategoryBlock key={cat.id} category={cat} showPrices={showPrices} />
                ))}
            </div>
          </section>
        )}

        {/* Allergen note */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-center">
          <span className="font-bold text-primary">Allergènes : </span>
          Merci de signaler vos allergies à notre équipe.
          &nbsp;
          <span className="inline-flex gap-1.5 flex-wrap justify-center mt-1">
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-semibold">Végétarien</span>
            <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded font-semibold">Végan</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-semibold">Sans gluten</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-semibold">Épicé</span>
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionDivider({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="section-divider">
      <h2 className="text-2xl font-black uppercase tracking-wide flex items-center gap-2">
        <span className="text-primary" aria-hidden="true">{icon}</span>
        {title}
      </h2>
    </div>
  );
}

function SpecialCard({ special, showPrices }: { special: FullMenu['special_menus'][number]; showPrices: boolean }) {
  const lines = special.content?.split('\n').filter(Boolean) ?? [];
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-primary shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="bg-primary text-white text-center px-5 pt-6 pb-5">
        {showPrices && (
          <div className="text-4xl font-black leading-none">
            {formatPrice(special.price)}
          </div>
        )}
        <div className="mt-2 font-bold text-sm uppercase tracking-widest opacity-90">
          {special.name}
        </div>
        {special.available_hours && (
          <div className="text-white/70 text-xs mt-1">{special.available_hours}</div>
        )}
      </div>
      {/* Body */}
      <div className="p-5">
        {special.description && (
          <p className="text-sm text-gray-500 mb-3 italic normal-case font-normal">{special.description}</p>
        )}
        <ul className="space-y-1.5">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {special.available_days && (
          <p className="text-xs text-gray-400 mt-3 uppercase tracking-wide">{special.available_days}</p>
        )}
      </div>
    </div>
  );
}

function FoodCategoryBlock({ category, showPrices }: { category: FullMenu['food_categories'][number]; showPrices: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-primary px-5 py-3">
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">{category.name}</h3>
      </div>
      <div className="bg-white divide-y divide-black/5">
        {category.items
          .filter((item) => item.is_available)
          .map((item) => (
            <div key={item.id} className="menu-item-row px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm uppercase tracking-wide">{item.name}</span>
                    {item.is_featured && (
                      <span className="text-[0.6rem] bg-accent text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">
                        ★ Coup de cœur
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-0.5 normal-case font-normal">{item.description}</p>
                  )}
                  <DietaryBadges
                    isVegetarian={item.is_vegetarian}
                    isVegan={item.is_vegan}
                    isGlutenFree={item.is_gluten_free}
                    isSpicy={item.is_spicy}
                  />
                </div>
                {showPrices && (
                  <span className="text-lg font-black text-primary shrink-0 pt-0.5">
                    {formatPrice(item.price)}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function DrinkCategoryBlock({ category, showPrices }: { category: FullMenu['drink_categories'][number]; showPrices: boolean }) {
  // Pick a color cycle for drink categories
  const colors = ['#8d4932', '#6caab9', '#b88a68', '#6b3a28', '#4d97aa'];
  const color = colors[category.id % colors.length];

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-3" style={{ backgroundColor: color }}>
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">{category.name}</h3>
      </div>
      <div className="bg-white p-4 divide-y divide-dashed divide-black/8">
        {category.drinks
          .filter((d) => d.is_available)
          .map((drink) => (
            <div key={drink.id} className="py-2.5 flex items-baseline gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold">{drink.name}</span>
                {drink.region && (
                  <span className="text-xs text-gray-400 ml-1.5">— {drink.region}</span>
                )}
                {drink.year && (
                  <span className="text-xs text-gray-400 ml-1">{drink.year}</span>
                )}
              </div>
              {drink.volume && (
                <span className="text-xs text-gray-400 shrink-0">{drink.volume}</span>
              )}
              {showPrices && (
                <span className="text-sm font-black text-primary shrink-0 ml-auto">
                  {formatPrice(drink.price)}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
