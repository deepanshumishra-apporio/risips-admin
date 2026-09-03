'use client';

import { Check } from 'lucide-react';

import { cn } from '@/utils/cn';

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Multi-select chip — goal tags, other investments, quick filters. */
export function Chip({ label, selected = false, onClick, className }: ChipProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors',
        selected
          ? 'border-brand bg-brand-soft text-brand-deep'
          : 'border-line-strong bg-surface text-ink-soft hover:border-brand/40 hover:text-ink',
        className,
      )}
    >
      {selected ? <Check className="size-3.5" strokeWidth={2.5} /> : null}
      {label}
    </button>
  );
}
