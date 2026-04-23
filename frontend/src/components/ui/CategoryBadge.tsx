import type { EventCategory } from '@/lib/types';

interface CategoryBadgeProps {
  category: EventCategory;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-[0.65rem] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-block font-bold uppercase tracking-wider rounded-full text-white ${sizeClasses}`}
      style={{ backgroundColor: category.color || '#8d4932' }}
    >
      {category.name}
    </span>
  );
}
