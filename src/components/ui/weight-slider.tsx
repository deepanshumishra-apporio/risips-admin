'use client';

import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

type WeightSliderProps = {
  label: string;
  value: number;
  color: string;
  onChange: (value: number) => void;
  className?: string;
};

/** Live-updating allocation slider. Percentages only — the guardrail that the
 *  three classes must total 100 lives in the parent, not here. */
export function WeightSlider({ label, value, color, onChange, className }: WeightSliderProps): React.JSX.Element {
  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, ${color} ${value}%, var(--color-line) ${value}%)`,
    accentColor: color,
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="tabular w-14 rounded-md border border-line-strong bg-surface-sunken py-0.5 text-center text-[13px] font-semibold text-ink">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={trackStyle}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
      />
    </div>
  );
}
