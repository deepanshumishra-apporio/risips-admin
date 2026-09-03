'use client';

import { CalendarDays } from 'lucide-react';

import type { DateRangePreset } from '@/types/chart.types';
import { cn } from '@/utils/cn';

const Presets: readonly DateRangePreset[] = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'];

type DateRangePickerProps = {
  value: DateRangePreset;
  onChange: (preset: DateRangePreset) => void;
  className?: string;
};

/** Fund-flow range control. "Custom" reveals the two date inputs inline. */
export function DateRangePicker({ value, onChange, className }: DateRangePickerProps): React.JSX.Element {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div className="inline-flex rounded-lg border border-line bg-surface-sunken p-0.5">
        {Presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={cn(
              'rounded-[7px] px-2.5 py-1 text-[12.5px] font-medium transition-colors',
              value === preset
                ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(11,21,36,0.08)]'
                : 'text-ink-muted hover:text-ink-soft',
            )}
          >
            {preset}
          </button>
        ))}
      </div>

      {value === 'Custom' ? (
        <div className="flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-2.5 py-1">
          <CalendarDays className="size-4 text-ink-muted" />
          <input
            type="date"
            defaultValue="2026-04-01"
            className="tabular bg-transparent text-[12.5px] text-ink outline-none"
          />
          <span className="text-ink-muted">to</span>
          <input
            type="date"
            defaultValue="2026-09-03"
            className="tabular bg-transparent text-[12.5px] text-ink outline-none"
          />
        </div>
      ) : null}
    </div>
  );
}
