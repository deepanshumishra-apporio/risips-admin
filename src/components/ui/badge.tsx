import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warn' | 'danger' | 'violet';

const ToneClass: Record<BadgeTone, string> = {
  neutral: 'bg-surface-sunken text-ink-soft border-line-strong',
  brand: 'bg-brand-soft text-brand-deep border-brand/20',
  success: 'bg-success-soft text-success border-success/20',
  warn: 'bg-warn-soft text-warn border-warn/20',
  danger: 'bg-danger-soft text-danger border-danger/20',
  violet: 'bg-violet-soft text-violet border-violet/20',
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
};

export function Badge({ children, tone = 'neutral', dot = false, className }: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap',
        ToneClass[tone],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
