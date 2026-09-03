'use client';

import { Layers, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { EmptyState } from '@/components/ui/empty-state';
import { FilterBar } from '@/components/ui/filter-bar';
import { Tabs } from '@/components/ui/tabs';
import { ModelPortfolios } from '@/data/portfolios';
import { PortfolioCard } from '@/features/portfolios/components/portfolio-card';
import type { ModelPortfolio, RiskProfile } from '@/types/portfolio.types';
import { formatCount } from '@/utils/format';

const ProfileTypes: RiskProfile[] = ['Conservative', 'Moderate', 'Aggressive'];
const StatusTabs = ['All', 'Live', 'Draft'] as const;
type StatusTab = (typeof StatusTabs)[number];

/** The curation surface: ready-made baskets grouped by the risk profile they
 *  serve, each publishable or removable in place. */
export function PortfolioLibrary(): React.JSX.Element {
  const [portfolios, setPortfolios] = useState<ModelPortfolio[]>(ModelPortfolios);
  const [status, setStatus] = useState<StatusTab>('All');
  const [query, setQuery] = useState('');

  const publish = (id: string): void => {
    setPortfolios((current) =>
      current.map((portfolio) => (portfolio.id === id ? { ...portfolio, status: 'Live' } : portfolio)),
    );
  };

  const remove = (id: string): void => {
    setPortfolios((current) => current.filter((portfolio) => portfolio.id !== id));
  };

  const visible = portfolios.filter((portfolio) => {
    const matchesStatus = status === 'All' || portfolio.status === status;
    const haystack = `${portfolio.name} ${portfolio.goalTag} ${portfolio.description}`.toLowerCase();

    return matchesStatus && haystack.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-5">
      <FilterBar
        label="Search portfolios by name or goal"
        value={query}
        onChange={setQuery}
        placeholder="e.g. Retirement, Balanced Growth"
      >
        <Tabs tabs={StatusTabs} active={status} onChange={setStatus} size="sm" />
      </FilterBar>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Layers className="size-5" />}
          title="No portfolios match"
          description="Adjust the filters, or create a new basket for this risk profile."
        />
      ) : (
        ProfileTypes.map((profile) => {
          const bucket = visible.filter((portfolio) => portfolio.riskProfile === profile);
          if (bucket.length === 0) return null;

          const investors = bucket.reduce((sum, portfolio) => sum + portfolio.investorCount, 0);

          return (
            <section key={profile}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                  {profile}
                  <span className="tabular rounded-full bg-surface-sunken px-2 py-0.5 text-[11.5px] font-medium text-ink-muted">
                    {bucket.length} portfolios · {formatCount(investors)} investors
                  </span>
                </h2>
                <Link
                  href="/model-portfolios/new"
                  className="flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-deep"
                >
                  <Plus className="size-3.5" />
                  Add more
                </Link>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                {bucket.map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    onPublish={publish}
                    onDelete={remove}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
