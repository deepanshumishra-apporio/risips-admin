'use client';

import { AlertTriangle, CheckCircle2 } from 'lucide-react';

import { DonutChart } from '@/components/charts/donut-chart';
import { Badge } from '@/components/ui/badge';
import { AssetClasses, AssetColor } from '@/data/asset-colors';
import type { PortfolioDraftApi } from '@/features/portfolios/use-portfolio-draft';
import { cn } from '@/utils/cn';
import { formatInr } from '@/utils/format';
import { RiskTone } from '@/utils/tone';

export function ReviewStep({ draft, check }: PortfolioDraftApi): React.JSX.Element {
  const ready = check.balanced && check.fundsMatched && draft.name.trim().length > 0;

  return (
    <div className="space-y-5">
      <div
        className={cn(
          'flex items-start gap-2.5 rounded-xl border px-4 py-3',
          ready ? 'border-success/25 bg-success-soft' : 'border-warn/30 bg-warn-soft',
        )}
      >
        {ready ? (
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
        ) : (
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" />
        )}
        <div>
          <p className={cn('text-[13.5px] font-semibold', ready ? 'text-success' : 'text-warn')}>
            {ready ? 'Ready to publish' : 'Not ready to publish'}
          </p>
          <p className="mt-0.5 text-[12.5px] text-ink-soft">
            {ready
              ? 'Allocation totals 100% and every fund weight matches its class target.'
              : 'Give the portfolio a name, balance the allocation to 100% and match each class target before publishing. You can still save it as a draft.'}
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-5">
          <div>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
              {draft.name || 'Untitled portfolio'}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone={RiskTone[draft.riskProfile]}>{draft.riskProfile}</Badge>
              <Badge tone="neutral">{draft.goalTag}</Badge>
              <Badge tone="brand">Min SIP {formatInr(draft.minimumSip, { compact: false })}</Badge>
            </div>
            <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-ink-muted">
              {draft.description || 'No description added yet.'}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-sunken">
                  <th className="px-4 py-2 text-[11.5px] font-semibold tracking-[0.04em] text-ink-muted uppercase">
                    Fund
                  </th>
                  <th className="px-4 py-2 text-[11.5px] font-semibold tracking-[0.04em] text-ink-muted uppercase">
                    Class
                  </th>
                  <th className="px-4 py-2 text-right text-[11.5px] font-semibold tracking-[0.04em] text-ink-muted uppercase">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {draft.funds.map((fund) => (
                  <tr key={fund.fundId}>
                    <td className="px-4 py-2.5">
                      <span className="block text-[13px] font-medium text-ink">{fund.name}</span>
                      <span className="block text-[11.5px] text-ink-muted">{fund.house}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-1.5 text-[12.5px] text-ink-soft">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: AssetColor[fund.assetClass] }}
                        />
                        {fund.assetClass}
                      </span>
                    </td>
                    <td className="tabular px-4 py-2.5 text-right text-[13px] font-semibold text-ink">
                      {fund.weight}%
                    </td>
                  </tr>
                ))}
                {draft.funds.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-[13px] text-ink-muted">
                      No funds selected.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <DonutChart
            slices={AssetClasses.map((assetClass) => ({
              label: assetClass,
              value: draft.allocation[assetClass],
              color: AssetColor[assetClass],
            }))}
            centerValue={`${check.total}%`}
            centerLabel="allocated"
          />
          <ul className="w-full space-y-1.5">
            {check.perClass.map((entry) => (
              <li key={entry.assetClass} className="flex items-center justify-between text-[12.5px]">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: AssetColor[entry.assetClass] }}
                  />
                  {entry.assetClass}
                </span>
                <span className={cn('tabular font-semibold', entry.matched ? 'text-success' : 'text-warn')}>
                  {entry.assigned}/{entry.target}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
