'use client';

import { Search } from 'lucide-react';

import { cn } from '@/utils/cn';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchInput({ value, onChange, placeholder = 'Search', className }: SearchInputProps): React.JSX.Element {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-line-strong bg-surface pr-3 pl-9 text-[13.5px] text-ink placeholder:text-ink-muted focus:border-brand focus:ring-3 focus:ring-brand/12 focus:outline-none"
      />
    </div>
  );
}
