import type { Event } from './types';

const DAYS = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'] as const;
const MONTHS_SHORT = [
  'JANV', 'FÉV', 'MARS', 'AVR', 'MAI', 'JUIN',
  'JUIL', 'AOÛT', 'SEPT', 'OCT', 'NOV', 'DÉC',
] as const;
const MONTHS_LONG = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
] as const;

export function parseLocalDate(dateString: string): Date {
  // Add T00:00:00 to force local timezone interpretation (avoid UTC offset issues)
  return new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
}

export function formatDate(dateString: string) {
  const d = parseLocalDate(dateString);
  return {
    day: d.getDate(),
    dayName: DAYS[d.getDay()],
    month: MONTHS_SHORT[d.getMonth()],
    monthLong: MONTHS_LONG[d.getMonth()],
    year: d.getFullYear(),
    short: `${DAYS[d.getDay()]}. ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}.`,
  };
}

export function formatTime(t?: string): string {
  if (!t) return '';
  return t.substring(0, 5).replace(':', 'h');
}

export function formatPrice(price?: string, isFree?: boolean): string {
  if (isFree) return 'Gratuit';
  if (!price) return '';
  const n = parseFloat(price);
  return isNaN(n) ? price : `${n % 1 === 0 ? n : n.toFixed(2)}€`;
}

export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns the 7 days of the current week (Mon → Sun). */
export function getWeekDays(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dow = today.getDay(); // 0=Sun
  const diff = dow === 0 ? -6 : 1 - dow; // offset to Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

/** Groups events by "Mois Année" label. */
export function groupByMonth(events: Event[]): Record<string, Event[]> {
  return events.reduce<Record<string, Event[]>>((acc, ev) => {
    const d = parseLocalDate(ev.date);
    const key = `${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
    (acc[key] ??= []).push(ev);
    return acc;
  }, {});
}

/** Darkens a hex color by a given amount (0-255). */
export function darkenHex(hex: string, amount = 30): string {
  const h = hex.replace('#', '');
  const r = Math.max(0, parseInt(h.slice(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(h.slice(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(h.slice(4, 6), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/** Returns a CSS gradient string from a category color. */
export function categoryGradient(color?: string): string {
  const base = color ?? '#8d4932';
  return `linear-gradient(135deg, ${base}, ${darkenHex(base, 40)})`;
}
