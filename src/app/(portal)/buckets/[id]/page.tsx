import { ArrowLeft, Send, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { MenuCell } from '@/components/ui/row-menu';
import { StatStrip } from '@/components/ui/stat-strip';
import { SelectCell, Table, Td } from '@/components/ui/table';
import { AssetColor } from '@/data/asset-colors';
import { Buckets } from '@/data/buckets';
import { Funds } from '@/data/funds';
import { Investors } from '@/data/investors';
import { describeRule, matchInvestors } from '@/features/buckets/bucket-matching';
import { formatCount, formatInr } from '@/utils/format';
import { PortfolioStatusTone, RiskTone, SipTone } from '@/utils/tone';

const Headers = ['Investor', 'Personality', 'Behaviour', 'AUM', 'Monthly SIP', 'Agent'] as const;

export function generateStaticParams(): { id: string }[] {
  return Buckets.map((bucket) => ({ id: bucket.id }));
}

type BucketPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BucketPage({ params }: BucketPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const bucket = Buckets.find((entry) => entry.id === id);

  if (!bucket) notFound();

  const members = matchInvestors(bucket.rule, Investors);
  const funds = bucket.suggestedFundIds
    .map((fundId) => Funds.find((fund) => fund.id === fundId))
    .filter((fund): fund is (typeof Funds)[number] => fund !== undefined);

  const bookValue = members.reduce((sum, investor) => sum + investor.aum, 0);
  const sipBook = members.reduce((sum, investor) => sum + investor.monthlySip, 0);

  return (
    <>
      <Link
        href="/buckets"
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-3.5" />
        Buckets
      </Link>

      <PageHeader
        title={bucket.name}
        description={bucket.description}
        actions={
          <>
            <Badge tone={PortfolioStatusTone[bucket.status]} dot>
              {bucket.status}
            </Badge>
            <Button variant="primary" icon={<Send className="size-4" />}>
              Push suggestions
            </Button>
          </>
        }
      />

      <StatStrip
        className="mb-5"
        items={[
          {
            label: 'Members',
            hint: 'Investors who satisfy every condition right now.',
            value: formatCount(members.length),
            caption: `of ${Investors.length} on the platform`,
          },
          { label: 'Combined AUM', value: formatInr(bookValue) },
          { label: 'Monthly SIP book', value: formatInr(sipBook, { compact: false }) },
          { label: 'Suggested funds', value: formatCount(funds.length) },
        ]}
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-[12.5px] text-ink-muted">Matches when:</span>
        {describeRule(bucket.rule).map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-line-strong bg-surface-sunken px-2 py-1 text-[12px] text-ink-soft"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader
            title="Members"
            subtitle="Placed here automatically — no manual tagging."
            action={<span className="tabular text-[12.5px] text-ink-muted">{members.length} investors</span>}
          />

          {members.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-ink-muted">
              No investor satisfies this rule yet.
            </p>
          ) : (
            <Table headers={Headers} selectable withMenu>
              {members.map((investor) => (
                <tr key={investor.id} className="group transition-colors hover:bg-surface-sunken">
                  <SelectCell label={investor.name} />

                  <Td>
                    <Link href={`/investors/${investor.id}`} className="flex items-center gap-2.5">
                      <Avatar name={investor.name} tone="violet" />
                      <span>
                        <span className="block text-[13.5px] font-semibold text-ink group-hover:text-brand">
                          {investor.name}
                        </span>
                        <span className="block text-[12px] text-ink-muted">{investor.city}</span>
                      </span>
                    </Link>
                  </Td>
                  <Td>
                    <Badge tone={RiskTone[investor.riskProfile]}>{investor.riskProfile}</Badge>
                  </Td>
                  <Td>
                    <Badge tone={SipTone[investor.sipHealth]} dot>
                      {investor.sipHealth}
                    </Badge>
                  </Td>
                  <Td className="tabular font-semibold text-ink">{formatInr(investor.aum)}</Td>
                  <Td className="tabular">{formatInr(investor.monthlySip, { compact: false })}</Td>
                  <Td>{investor.agentName}</Td>

                  <MenuCell
                    label={investor.name}
                    items={[
                      { label: 'Open profile' },
                      { label: 'Push suggestion now' },
                      { label: 'Schedule review' },
                      { label: 'Exclude from bucket', tone: 'danger' },
                    ]}
                  />
                </tr>
              ))}
            </Table>
          )}
        </Card>

        <Card className="h-fit">
          <CardHeader title="Suggested funds" subtitle="What these members see recommended in the app." />

          <ul className="divide-y divide-line">
            {funds.map((fund) => (
              <li key={fund.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-medium text-ink">{fund.name}</p>
                  <span className="tabular shrink-0 text-[13px] font-semibold text-success">{fund.returns3y}%</span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-ink-muted">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: AssetColor[fund.assetClass] }}
                  />
                  {fund.category} · {fund.house} · TER {fund.expenseRatio}%
                  <span className="ml-auto flex items-center gap-0.5">
                    <Star className="size-3 fill-amber text-amber" />
                    {fund.rating}
                  </span>
                </p>
              </li>
            ))}

            {funds.length === 0 ? (
              <li className="px-4 py-6 text-center text-[13px] text-ink-muted">No funds attached yet.</li>
            ) : null}
          </ul>
        </Card>
      </div>
    </>
  );
}
