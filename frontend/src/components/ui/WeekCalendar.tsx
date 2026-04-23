import type { Event } from '@/lib/types';
import { getWeekDays, isToday, isSameDay, parseLocalDate, formatTime } from '@/lib/utils';

interface WeekCalendarProps {
  events: Event[];
}

const DAY_LABELS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

export default function WeekCalendar({ events }: WeekCalendarProps) {
  const weekDays = getWeekDays();

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {weekDays.map((day, i) => {
        const dayEvents = events.filter((ev) =>
          isSameDay(parseLocalDate(ev.date), day)
        );
        const today = isToday(day);

        return (
          <div
            key={i}
            className={`rounded-xl overflow-hidden border-2 transition-colors ${
              dayEvents.length > 0
                ? 'border-primary/50'
                : 'border-transparent'
            }`}
          >
            {/* Day header */}
            <div
              className={`text-center py-1.5 px-1 border-b ${
                today
                  ? 'bg-primary text-white border-primary'
                  : 'bg-cream/60 text-[var(--text)] border-black/5'
              }`}
            >
              <div className="text-[0.55rem] font-bold uppercase tracking-widest opacity-75">
                {DAY_LABELS[i]}
              </div>
              <div className="text-lg sm:text-xl font-black leading-tight">
                {day.getDate()}
              </div>
            </div>

            {/* Events */}
            <div className="bg-white p-1 flex flex-col gap-0.5 min-h-[60px]">
              {dayEvents.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-gray-200 text-[0.55rem]">—</span>
                </div>
              ) : (
                dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded px-1 py-0.5 text-white leading-tight"
                    style={{ backgroundColor: ev.category?.color ?? 'var(--primary)' }}
                    title={`${ev.title}${ev.start_time ? ' · ' + formatTime(ev.start_time) : ''}`}
                  >
                    <div className="text-[0.6rem] font-bold truncate">{ev.title}</div>
                    {ev.start_time && (
                      <div className="text-[0.55rem] opacity-80">{formatTime(ev.start_time)}</div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
