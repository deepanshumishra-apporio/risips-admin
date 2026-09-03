'use client';

import { AlertTriangle, CheckCircle2 } from 'lucide-react';

import { DonutChart } from '@/components/charts/donut-chart';
import { WeightSlider } from '@/components/ui/weight-slider';
import { AssetClasses, AssetColor } from '@/data/asset-colors';
import type { PortfolioDraftApi } from '@/features/portfolios/use-portfolio-draft';
import { cn } from '@/utils/cn';

/** The allocation guardrail: the admin cannot publish a live portfolio whose
 *  three sliders do not add up to 100%. */
export function AllocationStep({ draft, check, setAssetWeight }: PortfolioDraftApi): React.JSX.Element {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
      <div className="space-y-6">
        <div className="space-y-5">
          {AssetClasses.map((assetClass) => (
            <WeightSlider
              key={assetClass}
              label={assetClass}
              value={draft.allocation[assetClass]}
              color={AssetColor[assetClass]}
              onChange={(value) => setAssetWeight(assetClass, value)}
            />
          ))}
        </div>

        <div
          className={cn(
            'flex items-start gap-2.5 rounded-xl border px-4 py-3',
            check.balanced ? 'border-success/25 bg-success-soft' : 'border-danger/25 bg-danger-soft',
          )}
        >
          {check.balanced ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
          ) : (
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger" />
          )}
          <div>
            <p className={cn('text-[13.5px] font-semibold', check.balanced ? 'text-success' : 'text-danger')}>
              Allocation totals {check.total}%
            </p>
            <p className="mt-0.5 text-[12.5px] text-ink-soft">
              {check.balanced
                ? 'Balanced. You can move on to fund selection.'
                : `Adjust the sliders by ${check.total > 100 ? '-' : '+'}${Math.abs(100 - check.total)}% before publishing.`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 lg:pt-2">
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
          {AssetClasses.map((assetClass) => (
            <li key={assetClass} className="flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-2 text-ink-soft">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: AssetColor[assetClass] }} />
                {assetClass}
              </span>
              <span className="tabular font-semibold text-ink">{draft.allocation[assetClass]}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
