import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ModelPortfolios } from '@/data/portfolios';
import type { RiskProfile } from '@/types/portfolio.types';
import { formatCount, formatInr } from '@/utils/format';

const RiskColor: Record<RiskProfile, string> = {
  Conservative: 'var(--color-teal)',
  Moderate: 'var(--color-brand)',
  Aggressive: 'var(--color-violet)',
};

/** Investors bucketed by the model portfolio they sit in, with navigation
 *  through to the curation screen for that bucket. */
export function PortfolioBuckets(): React.JSX.Element {
  const live = ModelPortfolios.filter((portfolio) => portfolio.status === 'Live');
  const totalInvestors = live.reduce((sum, portfolio) => sum + portfolio.investorCount, 0);

  return (
    <Card className="h-full">
      <CardHeader
        title="Model portfolio buckets"
        subtitle={`${formatCount(totalInvestors)} investors across ${live.length} live portfolios`}
        action={
          <Link
            href="/model-portfolios"
            className="text-[13px] font-medium text-brand hover:text-brand-deep"
          >
            Curate
          </Link>
        }
      />
      <ul className="divide-y divide-line">
        {live.map((portfolio) => {
          const share = (portfolio.investorCount / totalInvestors) * 100;

          return (
            <li key={portfolio.id}>
              <Link
                href={`/model-portfolios/${portfolio.id}`}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-sunken"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{portfolio.name}</p>
                    <Badge tone="neutral">{portfolio.riskProfile}</Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <ProgressBar value={share} color={RiskColor[portfolio.riskProfile]} className="max-w-[180px]" />
                    <span className="tabular text-[12px] text-ink-muted">
                      {formatCount(portfolio.investorCount)} investors · {formatInr(portfolio.aum)}
                    </span>
                  </div>
                </div>
                <ChevronRight className="size-4 shrink-0 text-ink-muted" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
