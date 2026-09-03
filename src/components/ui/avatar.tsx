import { cn } from '@/utils/cn';
import { initialsOf } from '@/utils/format';

type AvatarProps = {
  name: string;
  tone?: 'brand' | 'violet' | 'teal' | 'neutral';
  className?: string;
};

const ToneClass = {
  brand: 'bg-brand-soft text-brand-deep',
  violet: 'bg-violet-soft text-violet',
  teal: 'bg-teal/10 text-teal',
  neutral: 'bg-surface-sunken text-ink-soft',
} as const;

export function Avatar({ name, tone = 'brand', className }: AvatarProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold',
        ToneClass[tone],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
