import { cn } from '@/utils/cn';

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
};

export function ProgressBar({ value, color = 'var(--color-brand)', className }: ProgressBarProps): React.JSX.Element {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-line', className)}>
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}
