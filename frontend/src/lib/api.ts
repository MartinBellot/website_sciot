import type {
  SiteConfig,
  SocialLink,
  Event,
  EventCategory,
  FullMenu,
  CarouselSlide,
  HeroBanner,
} from './types';

/**
 * Server Components call Django directly via API_URL (env var).
 * Client Components use relative /api/* paths which Next.js proxies via rewrites.
 */
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser: use relative URL — Next.js rewrites forward to Django
    return '';
  }
  // Node/SSR: call Django container directly
  return process.env.API_URL ?? 'http://api:8000';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function apiFetch<T>(path: string, revalidate = 300): Promise<T | null> {
  const url = `${getBaseUrl()}/api${path}`;
  // In development, skip the data cache so every request is fresh.
  // In production, use ISR revalidation.
  const cacheOpts: RequestInit =
    process.env.NODE_ENV === 'development'
      ? { cache: 'no-store' }
      : ({ next: { revalidate } } as RequestInit);
  try {
    const res = await fetch(url, cacheOpts);
    if (!res.ok) return null;
    const data = await res.json();
    // Unwrap DRF paginated responses { count, next, previous, results: [...] }
    if (
      data !== null &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      'results' in data &&
      Array.isArray((data as { results: unknown }).results)
    ) {
      return (data as { results: T }).results;
    }
    return data as T;
  } catch {
    return null;
  }
}

// ─── Config ──────────────────────────────────────────────────────────────────
export const getSiteConfig = (): Promise<SiteConfig | null> =>
  apiFetch<SiteConfig>('/config/', 3600);

export const getSocialLinks = (): Promise<SocialLink[]> =>
  apiFetch<SocialLink[]>('/social-links/', 3600).then((d) => d ?? []);

// ─── Events ──────────────────────────────────────────────────────────────────
export const getWeekEvents = (): Promise<Event[]> =>
  apiFetch<Event[]>('/events/week/', 1800).then((d) => d ?? []);

export const getUpcomingEvents = (limit = 50): Promise<Event[]> =>
  apiFetch<Event[]>(`/events/upcoming/?limit=${limit}`, 1800).then((d) => d ?? []);

export const getEventCategories = (): Promise<EventCategory[]> =>
  apiFetch<EventCategory[]>('/events/categories/', 3600).then((d) => d ?? []);

// ─── Menu ─────────────────────────────────────────────────────────────────────
export const getFullMenu = (): Promise<FullMenu | null> =>
  apiFetch<FullMenu>('/menu/full/', 3600);

// ─── Media ───────────────────────────────────────────────────────────────────
export const getCarouselSlides = (): Promise<CarouselSlide[]> =>
  apiFetch<CarouselSlide[]>('/media/carousel/', 3600).then((d) => d ?? []);

// Hero banner comes from a paginated list endpoint → take the first active item
export const getHeroBanner = async (): Promise<HeroBanner | null> => {
  const items = await apiFetch<HeroBanner[]>('/media/hero/', 3600);
  if (!items) return null;
  return Array.isArray(items) ? (items[0] ?? null) : (items as unknown as HeroBanner);
};

// ─── Contact (client-side only) ───────────────────────────────────────────────
export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: JSON.stringify(err) };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
