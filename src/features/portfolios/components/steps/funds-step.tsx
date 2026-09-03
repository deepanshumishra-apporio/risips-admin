'use client';

import { Check, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { SearchInput } from '@/components/ui/search-input';
import { Tabs } from '@/components/ui/tabs';
import { AssetColor } from '@/data/asset-colors';
import { Funds } from '@/data/funds';
import type { PortfolioDraftApi } from '@/features/portfolios/use-portfolio-draft';
import type { AssetClass } from '@/types/portfolio.types';
import { cn } from '@/utils/cn';

const FilterTabs = ['All', 'Equity', 'Debt', 'Gold'] as const;
type FilterTab = (typeof FilterTabs)[number];

/** Fund picker on the left, weighted basket on the right. Weights are held per
 *  fund because trail commission and RTA reporting land at scheme level. */
export function FundsStep({ draft, check, toggleFund, setFundWeight }: PortfolioDraftApi): React.JSX.Element {
  const [filter, setFilter] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');

  const visible = Funds.filter((fund) => {
    const matchesClass = filter === 'All' || fund.assetClass === filter;
    const matchesQuery =
      fund.name.toLowerCase().includes(query.toLowerCase()) ||
      fund.house.toLowerCase().includes(query.toLowerCase());

    return matchesClass && matchesQuery;
  });

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-xl border border-line bg-surface-sunken/60">
        <div className="space-y-2.5 border-b border-line p-3.5">
          <SearchInput value={query} onChange={setQuery} placeholder="Search fund or AMC" />
          <Tabs tabs={FilterTabs} active={filter} onChange={setFilter} size="sm" />
        </div>

        <ul className="scrollbar-thin max-h-[420px] divide-y divide-line overflow-y-auto">
          {visible.map((fund) => {
            const selected = draft.funds.some((entry) => entry.fundId === fund.id);

            return (
              <li key={fund.id}>
                <button
                  type="button"
                  onClick={() => toggleFund(fund)}
                  className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-surface"
                >
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-md border',
                      selected ? 'border-brand bg-brand text-white' : 'border-line-strong bg-surface',
                    )}
                  >
                    {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{fund.name}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-[12px] text-ink-muted">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: AssetColor[fund.assetClass] }}
                      />
                      {fund.category} · TER {fund.expenseRatio}%
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="tabular block text-[13px] font-semibold text-success">{fund.returns3y}%</span>
                    <span className="flex items-center justify-end gap-0.5 text-[11.5px] text-ink-muted">
                      <Star className="size-3 fill-amber text-amber" />
                      {fund.rating}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-3">
        <div className="space-y-2">
          {check.perClass.map((entry) => (
            <div
              key={entry.assetClass}
              className={cn(
                'flex items-center justify-between rounded-lg border px-3 py-2 text-[13px]',
                entry.target === 0
                  ? 'border-line bg-surface-sunken text-ink-muted'
                  : entry.matched
                    ? 'border-success/30 bg-success-soft text-success'
                    : 'border-warn/30 bg-warn-soft text-warn',
              )}
            >
              <span className="font-medium">{entry.assetClass} target {entry.target}%</span>
              <span className="tabular font-semibold">
                {entry.assigned}% assigned{entry.matched && entry.target > 0 ? ' ✓' : ''}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-line bg-surface">
          <p className="border-b border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink-soft">
            Selected funds ({draft.funds.length})
          </p>

          {draft.funds.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-ink-muted">
              Pick funds from the left to build the basket.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {draft.funds.map((fund) => (
                <li key={fund.fundId} className="flex items-center gap-3 px-4 py-2.5">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: AssetColor[fund.assetClass] }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-ink">{fund.name}</span>
                    <span className="block text-[11.5px] text-ink-muted">{fund.house}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={5}
                      value={fund.weight}
                      onChange={(event) => setFundWeight(fund.fundId, Number(event.target.value))}
                      className="tabular h-8 w-16 rounded-md border border-line-strong bg-surface px-2 text-right text-[13px] text-ink focus:border-brand focus:outline-none"
                    />
                    <span className="text-[12px] text-ink-muted">%</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFund({ ...fundToPicker(fund.fundId, fund.assetClass) })}
                    aria-label={`Remove ${fund.name}`}
                    className="shrink-0 rounded-md p-1 text-ink-muted hover:bg-danger-soft hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

/** Removal only needs the id; the picker signature takes a full fund. */
function fundToPicker(fundId: string, assetClass: AssetClass) {
  const fund = Funds.find((entry) => entry.id === fundId);

  return (
    fund ?? {
      id: fundId,
      name: '',
      house: '',
      assetClass,
      category: '',
      expenseRatio: 0,
      returns3y: 0,
      rating: 0,
    }
  );
}
