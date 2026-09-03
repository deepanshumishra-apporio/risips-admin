import { DonutChart } from '@/components/charts/donut-chart';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Table, Td } from '@/components/ui/table';
import { AssetColor } from '@/data/asset-colors';
import { allocationOf, gainOf } from '@/features/investors/investor-holdings';
import type { Holding } from '@/types/investor.types';
import { cn } from '@/utils/cn';
import { formatInr, formatPercent } from '@/utils/format';

const Headers = ['Fund', 'Units', 'NAV', 'Invested', 'Current', 'Gain'] as const;

type HoldingsPanelProps = {
  holdings: Holding[];
  portfolioName: string;
};

export function HoldingsPanel({ holdings, portfolioName }: HoldingsPanelProps): React.JSX.Element {
  const allocation = allocationOf(holdings);
  const total = holdings.reduce((sum, holding) => sum + holding.current, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title="Holdings"
          subtitle={`Positions across ${holdings.length} schemes, weighted by the ${portfolioName} basket.`}
        />
        <Table headers={Headers}>
          {holdings.map((holding) => {
            const gain = gainOf(holding);

            return (
              <tr key={holding.fundId} className="transition-colors hover:bg-surface-sunken">
                <Td>
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: AssetColor[holding.assetClass] }}
                    />
                    <span>
                      <span className="block text-[13.5px] font-medium text-ink">{holding.name}</span>
                      <span className="block text-[12px] text-ink-muted">
                        {holding.house} · {holding.assetClass}
                      </span>
                    </span>
                  </span>
                </Td>
                <Td className="tabular">{holding.units.toFixed(3)}</Td>
                <Td className="tabular">₹{holding.nav.toFixed(2)}</Td>
                <Td className="tabular">{formatInr(holding.invested)}</Td>
                <Td className="tabular font-semibold text-ink">{formatInr(holding.current)}</Td>
                <Td>
                  <span
                    className={cn('tabular font-semibold', gain.absolute >= 0 ? 'text-success' : 'text-danger')}
                  >
                    {gain.absolute >= 0 ? '+' : ''}
                    {formatInr(gain.absolute)}
                    <span className="ml-1.5 text-[12px] font-medium">
                      ({gain.percent >= 0 ? '+' : ''}
                      {formatPercent(gain.percent, 1)})
                    </span>
                  </span>
                </Td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Card>
        <CardHeader title="Actual allocation" subtitle="Where the money sits today, which can drift from target." />
        <CardBody className="flex flex-wrap items-center gap-8">
          <DonutChart
            size={148}
            slices={allocation.map((entry) => ({
              label: entry.assetClass,
              value: entry.value,
              color: AssetColor[entry.assetClass],
            }))}
            centerValue={formatInr(total)}
            centerLabel="current value"
          />

          <ul className="min-w-[220px] flex-1 space-y-2.5">
            {allocation.map((entry) => (
              <li key={entry.assetClass} className="flex items-center justify-between gap-4 text-[13px]">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: AssetColor[entry.assetClass] }}
                  />
                  {entry.assetClass}
                </span>
                <span className="tabular text-ink-muted">
                  {formatInr(entry.value)}
                  <span className="ml-2 font-semibold text-ink">{formatPercent(entry.share, 1)}</span>
                </span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
