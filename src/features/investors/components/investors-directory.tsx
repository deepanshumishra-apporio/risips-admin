'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FilterBar } from '@/components/ui/filter-bar';
import { MenuCell } from '@/components/ui/row-menu';
import { SelectCell, Table, Td } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { Investors } from '@/data/investors';
import { formatInr } from '@/utils/format';
import { KycTone, SipTone } from '@/utils/tone';

const Headers = ['Investor', 'Portfolio', 'AUM', 'Monthly SIP', 'KYC', 'SIP status', 'Agent'] as const;
const FilterTabs = ['All', 'Pending KYC', 'SIP issues'] as const;
type FilterTab = (typeof FilterTabs)[number];

export function InvestorsDirectory(): React.JSX.Element {
  const [filter, setFilter] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');

  const visible = Investors.filter((investor) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Pending KYC' && investor.kycStatus !== 'Verified') ||
      (filter === 'SIP issues' && investor.sipHealth !== 'Healthy');

    const haystack = `${investor.name} ${investor.email} ${investor.city} ${investor.agentName}`.toLowerCase();

    return matchesFilter && haystack.includes(query.toLowerCase());
  });

  return (
    <>
      <FilterBar
        label="Search investors by name, email, city or agent"
        value={query}
        onChange={setQuery}
        placeholder="e.g. Ananya, Mumbai, Rohit"
      >
        <Tabs tabs={FilterTabs} active={filter} onChange={setFilter} size="sm" />
      </FilterBar>

      <Card>
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <p className="text-[12.5px] text-ink-muted">
            <span className="tabular font-semibold text-ink">{visible.length}</span> of {Investors.length} investors
          </p>
        </div>

        <Table headers={Headers} selectable withMenu>
          {visible.map((investor) => (
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
                <span className="block text-[13px] font-medium text-ink">{investor.portfolioName}</span>
                <span className="block text-[12px] text-ink-muted">{investor.riskProfile}</span>
              </Td>
              <Td className="tabular font-semibold text-ink">{formatInr(investor.aum)}</Td>
              <Td className="tabular">{formatInr(investor.monthlySip, { compact: false })}</Td>
              <Td>
                <Badge tone={KycTone[investor.kycStatus]}>{investor.kycStatus}</Badge>
              </Td>
              <Td>
                <Badge tone={SipTone[investor.sipHealth]} dot>
                  {investor.sipHealth}
                </Badge>
              </Td>
              <Td>{investor.agentName}</Td>

              <MenuCell
                label={investor.name}
                items={[
                  { label: 'Open profile' },
                  { label: 'Change portfolio' },
                  { label: 'Schedule review' },
                  { label: 'Pause SIP', tone: 'danger' },
                ]}
              />
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
