interface DietaryBadgesProps {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  size?: 'sm' | 'md';
}

const BADGES = [
  { key: 'isVegetarian', label: 'Végétarien', bg: 'bg-green-500' },
  { key: 'isVegan',      label: 'Végan',      bg: 'bg-yellow-400 !text-gray-900' },
  { key: 'isGlutenFree', label: 'Sans gluten', bg: 'bg-blue-500' },
  { key: 'isSpicy',      label: 'Épicé',       bg: 'bg-red-500' },
] as const;

export default function DietaryBadges({
  isVegetarian,
  isVegan,
  isGlutenFree,
  isSpicy,
  size = 'sm',
}: DietaryBadgesProps) {
  const flags: Record<string, boolean | undefined> = { isVegetarian, isVegan, isGlutenFree, isSpicy };
  const active = BADGES.filter((b) => flags[b.key]);
  if (active.length === 0) return null;

  const sizeClass = size === 'sm' ? 'text-[0.6rem] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {active.map((b) => (
        <span
          key={b.key}
          className={`inline-block font-semibold rounded uppercase tracking-wide text-white ${b.bg} ${sizeClass}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}
