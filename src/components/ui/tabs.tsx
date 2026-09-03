'use client';

import { cn } from '@/utils/cn';

type TabsProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  size?: 'sm' | 'md';
  className?: string;
};

/** Segmented control used for AUM Overview (SIPs / Lumpsum) and the wizard. */
export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  size = 'md',
  className,
}: TabsProps<T>): React.JSX.Element {
  return (
    <div className={cn('inline-flex rounded-lg border border-line bg-surface-sunken p-0.5', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            'rounded-[7px] font-medium transition-colors',
            size === 'sm' ? 'px-2.5 py-1 text-[12.5px]' : 'px-3.5 py-1.5 text-[13px]',
            active === tab
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(11,21,36,0.08)]'
              : 'text-ink-muted hover:text-ink-soft',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
