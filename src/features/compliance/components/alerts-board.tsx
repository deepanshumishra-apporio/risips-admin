'use client';

import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { FilterBar } from '@/components/ui/filter-bar';
import { MenuCell } from '@/components/ui/row-menu';
import { StatStrip } from '@/components/ui/stat-strip';
import { SelectCell, Table, Td } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { ComplianceAlerts } from '@/data/compliance';
import type { AlertKind } from '@/types/compliance.types';
import { formatDate } from '@/utils/format';
import { SeverityTone } from '@/utils/tone';

const Headers = ['Subject', 'Alert', 'Severity', 'Detail', 'Raised', 'Action'] as const;
const KindTabs = ['All', 'Pending KYC', 'Mandate Pending', 'SIP Failure', 'Agent Licence'] as const;
type KindTab = (typeof KindTabs)[number];

export function AlertsBoard(): React.JSX.Element {
  const [kind, setKind] = useState<KindTab>('All');
  const [query, setQuery] = useState('');

  const visible = ComplianceAlerts.filter((alert) => {
    const matchesKind = kind === 'All' || alert.kind === (kind as AlertKind);
    const haystack = `${alert.subject} ${alert.detail}`.toLowerCase();

    return matchesKind && haystack.includes(query.toLowerCase());
  });

  const high = ComplianceAlerts.filter((alert) => alert.severity === 'High').length;
  const ageing = ComplianceAlerts.filter((alert) => alert.ageInDays > 7).length;

  return (
    <>
      <StatStrip
        className="mb-5"
        items={[
          { label: 'Open alerts', value: String(ComplianceAlerts.length), caption: 'across the queue' },
          {
            label: 'High severity',
            value: String(high),
            hint: 'Blocks the next debit cycle if unresolved.',
            caption: 'needs action today',
          },
          { label: 'Ageing over 7 days', value: String(ageing), caption: 'breaching internal SLA' },
          { label: 'Median time to close', value: '2.4 d', caption: 'last 30 days' },
        ]}
      />

      <FilterBar
        label="Search the compliance queue"
        value={query}
        onChange={setQuery}
        placeholder="Investor or agent name"
      >
        <Tabs tabs={KindTabs} active={kind} onChange={setKind} size="sm" />
      </FilterBar>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            icon={<ShieldCheck className="size-5" />}
            title="Nothing pending here"
            description="No alerts match this filter. The queue is clear for now."
          />
        ) : (
          <Table headers={Headers} selectable withMenu>
            {visible.map((alert) => (
              <tr key={alert.id} className="transition-colors hover:bg-surface-sunken">
                <SelectCell label={alert.subject} />

                <Td>
                  <span className="block text-[13.5px] font-semibold text-ink">{alert.subject}</span>
                  <span className="block text-[12px] text-ink-muted">{alert.subjectType}</span>
                </Td>
                <Td>
                  <Badge tone="neutral">{alert.kind}</Badge>
                </Td>
                <Td>
                  <Badge tone={SeverityTone[alert.severity]} dot>
                    {alert.severity}
                  </Badge>
                </Td>
                <Td className="max-w-[320px] text-[12.5px] leading-relaxed">{alert.detail}</Td>
                <Td className="tabular whitespace-nowrap">
                  {formatDate(alert.raisedAt)}
                  <span className="ml-1.5 text-[12px] text-ink-muted">({alert.ageInDays}d)</span>
                </Td>
                <Td>
                  <Button size="sm">Resolve</Button>
                </Td>

                <MenuCell
                  label={alert.subject}
                  items={[
                    { label: 'Open subject' },
                    { label: 'Nudge investor' },
                    { label: 'Assign to sub-admin' },
                    { label: 'Dismiss alert', tone: 'danger' },
                  ]}
                />
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </>
  );
}
