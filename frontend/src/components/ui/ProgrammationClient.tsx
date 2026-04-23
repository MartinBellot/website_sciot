'use client';

import { useState, useMemo } from 'react';
import type { Event, EventCategory } from '@/lib/types';
import EventCard from './EventCard';
import WeekCalendar from './WeekCalendar';
import { groupByMonth } from '@/lib/utils';

interface ProgrammationClientProps {
  weekEvents: Event[];
  allEvents: Event[];
  categories: EventCategory[];
}

export default function ProgrammationClient({
  weekEvents,
  allEvents,
  categories,
}: ProgrammationClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>('all');

  const filtered = useMemo(
    () =>
      activeSlug === 'all'
        ? allEvents
        : allEvents.filter((e) => e.category?.slug === activeSlug),
    [allEvents, activeSlug]
  );

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);
  const monthEntries = Object.entries(grouped);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Week calendar ── */}
      <div className="mb-10">
        <SectionHeading icon={<CalendarWeekIcon />} title="Cette semaine" />
        {weekEvents.length > 0 ? (
          <WeekCalendar events={weekEvents} />
        ) : (
          <p className="text-gray-400 text-sm italic mt-2">Aucun événement cette semaine.</p>
        )}
      </div>

      {/* ── Category filters ── */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtres par catégorie">
          <FilterButton
            label="Tous"
            active={activeSlug === 'all'}
            color="#8d4932"
            onClick={() => setActiveSlug('all')}
          />
          {categories.map((cat) => (
            <FilterButton
              key={cat.slug}
              label={cat.name}
              active={activeSlug === cat.slug}
              color={cat.color}
              onClick={() => setActiveSlug(cat.slug)}
            />
          ))}
        </div>
      )}

      {/* ── Events grid by month ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">🎵</p>
          <p className="font-bold uppercase tracking-widest text-sm">Aucun événement dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {monthEntries.map(([month, events]) => (
            <section key={month} className="scroll-mt-nav" id={`month-${month}`}>
              {/* Month header */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black text-primary uppercase tracking-wider shrink-0">
                  {month}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                <span className="text-xs text-gray-400 font-medium">{events.length} événement{events.length > 1 ? 's' : ''}</span>
              </div>

              {/* Event cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterButton({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border-2 transition-all duration-200 ${
        active ? 'text-white shadow-md scale-105' : 'bg-transparent hover:scale-105'
      }`}
      style={
        active
          ? { backgroundColor: color, borderColor: color }
          : { borderColor: color, color: color }
      }
    >
      {label}
    </button>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-primary">{icon}</span>
      <h2 className="text-lg font-black uppercase tracking-wider">{title}</h2>
      <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
    </div>
  );
}

function CalendarWeekIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
