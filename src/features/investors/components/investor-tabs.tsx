'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

export type InvestorTab = {
  label: string;
  count?: number;
  content: ReactNode;
};

type InvestorTabsProps = {
  tabs: InvestorTab[];
};

/** In-page tabs for the investor record. The panels are rendered on the server
 *  and handed in, so switching costs nothing. */
export function InvestorTabs({ tabs }: InvestorTabsProps): React.JSX.Element {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              '-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors',
              index === active
                ? 'border-brand text-ink'
                : 'border-transparent text-ink-muted hover:border-line-strong hover:text-ink',
            )}
          >
            {tab.label}
            {tab.count !== undefined ? (
              <span
                className={cn(
                  'tabular rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
                  index === active ? 'bg-brand-soft text-brand-deep' : 'bg-surface-sunken text-ink-muted',
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {tabs[active]?.content}
    </div>
  );
}
