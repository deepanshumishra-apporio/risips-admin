'use client';

import { ChevronsUpDown, CircleHelp, Sparkles, UserRound } from 'lucide-react';
import Link from 'next/link';

import { BrandMark } from '@/components/layout/brand-mark';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

/** Full-width chrome: account switcher on the rail, breadcrumb in the middle,
 *  assistance and profile on the right. */
export function Topbar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 flex h-[var(--shell-header)] items-center border-b border-line bg-surface">
      <div className="flex h-full w-[var(--shell-sidebar)] shrink-0 items-center gap-2.5 border-r border-line px-3">
        <Link href="/dashboard" aria-label="RiSips admin home">
          <BrandMark size={28} />
        </Link>

        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-sunken"
        >
          <span className="truncate text-[13.5px] font-semibold text-ink">RiSips</span>
          <ChevronsUpDown className="size-3.5 shrink-0 text-ink-muted" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-4 px-5">
        <Breadcrumbs />

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink sm:flex"
          >
            <Sparkles className="size-4 text-brand" strokeWidth={1.9} />
            Ask AI
          </button>

          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink sm:flex"
          >
            <CircleHelp className="size-4 text-ink-muted" strokeWidth={1.9} />
            Support
          </button>

          <button
            type="button"
            aria-label="Account menu"
            title="Simmi Puri · Super Admin"
            className="ml-1 flex size-8 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <UserRound className="size-4" strokeWidth={1.9} />
          </button>
        </div>
      </div>
    </header>
  );
}
