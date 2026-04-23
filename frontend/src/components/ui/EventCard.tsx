import type { Event } from '@/lib/types';
import { formatDate, formatTime, formatPrice, categoryGradient } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { day, dayName, month } = formatDate(event.date);
  const startTime = formatTime(event.start_time);
  const doorsOpen = formatTime(event.doors_open);
  const price = formatPrice(event.price, event.is_free);
  const gradient = categoryGradient(event.category?.color);

  return (
    <article className="event-card bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* ── Image / Gradient cover ── */}
      <div className="relative h-52 overflow-hidden shrink-0">
        {event.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-center rounded-xl px-3 py-2 shadow-lg leading-none">
          <div className="text-2xl font-black">{day}</div>
          <div className="text-[0.6rem] uppercase tracking-[0.1em] opacity-90 mt-0.5">{dayName} {month}</div>
        </div>

        {/* Category badge */}
        {event.category && (
          <div className="absolute top-3 right-3">
            <CategoryBadge category={event.category} size="sm" />
          </div>
        )}

        {/* Status overlay for cancelled events */}
        {event.status === 'cancelled' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold uppercase tracking-widest text-sm bg-red-600 px-3 py-1 rounded">
              Annulé
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base uppercase tracking-wide leading-tight line-clamp-2">
          {event.title}
        </h3>

        {event.subtitle && (
          <p className="text-sm text-gray-500 mt-1 italic normal-case font-normal line-clamp-1">
            {event.subtitle}
          </p>
        )}

        {event.artist_name && event.artist_name !== event.title && (
          <p className="text-sm font-medium text-secondary mt-1">{event.artist_name}</p>
        )}

        {event.short_description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 normal-case font-normal flex-1">
            {event.short_description}
          </p>
        )}

        {/* ── Meta row ── */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 text-sm">
          {startTime && (
            <span className="flex items-center gap-1.5 text-gray-500">
              <ClockIcon />
              {startTime}
            </span>
          )}
          {doorsOpen && (
            <span className="text-gray-400 text-xs">
              Portes: {doorsOpen}
            </span>
          )}
          <span className="ml-auto font-bold text-primary text-base">{price}</span>
        </div>

        {/* ── CTA ── */}
        {event.ticket_url && (
          <Link
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-xs font-bold uppercase tracking-widest py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-sm"
          >
            Réserver
          </Link>
        )}
      </div>
    </article>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  );
}
