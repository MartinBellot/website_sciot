'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SocialLink } from '@/lib/types';

// ─── SVG brand icon paths ─────────────────────────────────────────────────────
const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  tiktok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  spotify:
    'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  soundcloud:
    'M0 13.252c0 2.046 1.672 3.752 3.709 3.752.247 0 .487-.025.721-.075V9.51A6.78 6.78 0 000 13.252zm10.312 3.677h.006c2.035 0 3.682-1.659 3.682-3.677 0-2.023-1.651-3.682-3.688-3.682a3.7 3.7 0 00-1.938.549v6.83c.619.135 1.21.121 1.938-.02zm2.563-7.359a5.282 5.282 0 00-1.034 3.15v4.184h1.034V9.57zm2.286-.024c0-.918-.195-1.795-.543-2.59V17.004h.543V13.252zm4.615 0c0 2.924-2.358 5.298-5.273 5.298a5.28 5.28 0 01-2.093-.431V8.386a5.283 5.283 0 012.093-.43c2.915 0 5.273 2.372 5.273 5.271z',
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.26 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z',
};

function SocialIcon({ platform, className = 'w-5 h-5' }: { platform: string; className?: string }) {
  const path = SOCIAL_PATHS[platform];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/programmation', label: 'Programmation' },
  { href: '/menu', label: 'Menu' },
  { href: '/jouerausciot', label: 'Jouer ici' },
  { href: 'https://lesciotcialclub.kalisport.com', label: 'Boutique', external: true },
];

// ─── Component ────────────────────────────────────────────────────────────────
interface HeaderProps {
  socialLinks: SocialLink[];
  siteName: string;
}

export default function Header({ socialLinks, siteName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => setIsOpen(false), [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap: focus first link in panel
      panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 glass-bar transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-widest text-primary hover:text-secondary transition-colors uppercase shrink-0"
          >
            <span aria-hidden="true" className="text-accent text-2xl font-black leading-none">Ø</span>
            <span className="hidden xs:inline">{siteName}</span>
            <span className="xs:hidden">Le Sci<strong>ø</strong>t</span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm transition-colors text-[var(--text)] hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-[var(--text)] hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop social icons ── */}
          {socialLinks.length > 0 && (
            <div className="hidden lg:flex items-center gap-3" aria-label="Réseaux sociaux">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors"
                  aria-label={link.platform}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          )}

          {/* ── Hamburger ── */}
          <button
            className="lg:hidden relative z-[60] p-2 -mr-1 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
          >
            <span className="sr-only">{isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigation"
          className={`absolute right-0 top-0 h-full w-4/5 max-w-xs flex flex-col glass-bar shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel header */}
          <div
            className="flex items-center justify-between px-5 border-b border-primary/10 shrink-0"
            style={{ height: 'var(--navbar-height)' }}
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/50">
              Navigation
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-1 text-primary rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Fermer le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav
            className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1"
            aria-label="Menu mobile"
          >
            {NAV_LINKS.map((link, i) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-4 py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all duration-200 text-[var(--text)] hover:bg-primary/5 hover:text-primary active:bg-primary/15"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors bg-primary/20 group-hover:bg-primary/60" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-4 px-4 py-4 rounded-xl font-bold uppercase tracking-widest text-base transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary border-l-[3px] border-primary'
                      : 'text-[var(--text)] hover:bg-primary/5 hover:text-primary active:bg-primary/15'
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      isActive(link.href) ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary/60'
                    }`}
                  />
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="px-5 py-5 border-t border-primary/10 shrink-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-3">
                Nous suivre
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-xl text-primary hover:text-secondary hover:bg-primary/10 active:bg-primary/20 transition-all"
                    aria-label={link.platform}
                  >
                    <SocialIcon platform={link.platform} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Bottom safe area spacer */}
          <div className="shrink-0 h-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </div>
    </>
  );
}
