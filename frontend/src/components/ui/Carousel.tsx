'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CarouselSlide } from '@/lib/types';

// ─── Fallback slides when API returns nothing ────────────────────────────────
const FALLBACK_SLIDES: CarouselSlide[] = [
  { id: 1, image: '/ressources/484509130_630001383127476_2751106827163972482_n.jpg', order: 1, interval: 5000 },
  { id: 2, image: '/ressources/484870281_630918263035788_2045101471280712088_n.jpg', order: 2, interval: 5000 },
  { id: 3, image: '/ressources/604719571_852260364234909_7465889495457283485_n.jpg', order: 3, interval: 5000 },
];

interface CarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

export default function Carousel({ slides, className = '' }: CarouselProps) {
  const items = slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

  // Auto-advance
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const interval = items[current]?.interval ?? 5000;
    const timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [current, paused, items, next]);

  if (items.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Galerie photos"
    >
      {/* Slides */}
      {items.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={i !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title ?? `Photo ${i + 1}`}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Caption */}
          {(slide.title || slide.subtitle) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              {slide.title && (
                <p className="text-white font-bold text-sm uppercase tracking-wide">{slide.title}</p>
              )}
              {slide.subtitle && (
                <p className="text-white/80 text-xs mt-0.5">{slide.subtitle}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Controls — only shown when more than 1 slide */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
            aria-label="Slide précédente"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
            aria-label="Slide suivante"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`Aller à la slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
