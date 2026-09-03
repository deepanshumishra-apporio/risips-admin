'use client';

import { Search } from 'lucide-react';
import type { ReactNode } from 'react';

type FilterBarProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Controls rendered on the right of the bar — tabs, sorts, toggles. */
  children?: ReactNode;
};

/**
 * Labelled search plus trailing controls, matching the console pattern where
 * the query is a first-class field rather than a floating input.
 */
export function FilterBar({ label, value, onChange, placeholder, children }: FilterBarProps): React.JSX.Element {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
      <div>
        <label className="mb-1.5 block text-[12.5px] text-ink-soft" htmlFor="filter-bar-query">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            id="filter-bar-query"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-9 w-full max-w-[340px] min-w-[220px] rounded-md border border-line-strong bg-surface px-3 text-[13.5px] text-ink placeholder:text-ink-muted focus:border-brand focus:ring-3 focus:ring-brand/12 focus:outline-none"
          />
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-3 text-[13.5px] font-medium text-ink transition-colors hover:bg-surface-sunken"
          >
            <Search className="size-4 text-ink-muted" />
            Search
          </button>
        </div>
      </div>

      {children ? <div className="flex flex-wrap items-center gap-2 pb-0.5">{children}</div> : null}
    </div>
  );
}
