'use client';

import { useState } from 'react';

import { AreaChart } from '@/components/charts/area-chart';
import { ChartLegend } from '@/components/charts/legend';
import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs } from '@/components/ui/tabs';
import { AssetClasses, AssetColor } from '@/data/asset-colors';
import { LumpsumBreakdown, SipFlowSeries } from '@/data/dashboard';
import type { DateRangePreset } from '@/types/chart.types';

const FlowTabs = ['SIPs', 'Lumpsum'] as const;
type FlowTab = (typeof FlowTabs)[number];

export function AumOverview(): React.JSX.Element {
  const [tab, setTab] = useState<FlowTab>('SIPs');
  const [range, setRange] = useState<DateRangePreset>('Monthly');

  const sipSeries = SipFlowSeries[range];
  const lumpsumSeries = LumpsumBreakdown[range];

  const sipTotal = sipSeries.reduce((sum, point) => sum + point.value, 0);
  const lumpsumTotals = AssetClasses.map((assetClass) => ({
    assetClass,
    value: lumpsumSeries.reduce(
      (sum, point) => sum + (point.segments.find((segment) => segment.key === assetClass)?.value ?? 0),
      0,
    ),
  }));
  const lumpsumTotal = lumpsumTotals.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card>
      <CardHeader
        title="AUM Overview"
        subtitle="Fund flow across the selected period, in ₹ lakh."
        action={<Tabs tabs={FlowTabs} active={tab} onChange={setTab} />}
      />
      <CardBody className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DateRangePicker value={range} onChange={setRange} />
          <p className="text-[13px] text-ink-muted">
            Period total{' '}
            <span className="tabular font-semibold text-ink">
              ₹{(tab === 'SIPs' ? sipTotal : lumpsumTotal).toLocaleString('en-IN')} L
            </span>
          </p>
        </div>

        {tab === 'SIPs' ? (
          <>
            <AreaChart data={sipSeries} valueFormatter={(value) => `₹${value} L`} />
            <ChartLegend items={[{ label: 'SIP inflow', color: AssetColor.Equity }]} />
          </>
        ) : (
          <>
            <StackedBarChart data={lumpsumSeries} colors={AssetColor} />
            <ChartLegend
              items={lumpsumTotals.map((entry) => ({
                label: entry.assetClass,
                color: AssetColor[entry.assetClass],
                value: `₹${entry.value.toLocaleString('en-IN')} L`,
              }))}
            />
          </>
        )}
      </CardBody>
    </Card>
  );
}
