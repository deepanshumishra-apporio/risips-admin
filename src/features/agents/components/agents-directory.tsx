'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, SelectInput } from '@/components/ui/field';
import { FilterBar } from '@/components/ui/filter-bar';
import { SidePanel } from '@/components/ui/side-panel';
import { Tabs } from '@/components/ui/tabs';
import { Agents } from '@/data/agents';
import { AgentsTable } from '@/features/agents/components/agents-table';
import type { Agent } from '@/types/agent.types';
import { formatCount, formatDate, formatInr } from '@/utils/format';
import { AgentFlagTone, AgentStatusTone } from '@/utils/tone';

const StatusTabs = ['All', 'Active', 'Onboarding', 'Suspended'] as const;
type StatusTab = (typeof StatusTabs)[number];

const SortOptions = ['AUM', 'Customers', 'Name'] as const;
type SortOption = (typeof SortOptions)[number];

export function AgentsDirectory(): React.JSX.Element {
  const [status, setStatus] = useState<StatusTab>('All');
  const [sort, setSort] = useState<SortOption>('AUM');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Agent | null>(null);

  const visible = Agents.filter((agent) => {
    const matchesStatus = status === 'All' || agent.status === status;
    const haystack = `${agent.name} ${agent.code} ${agent.location}`.toLowerCase();

    return matchesStatus && haystack.includes(query.toLowerCase());
  }).sort((a, b) => {
    if (sort === 'Name') return a.name.localeCompare(b.name);
    if (sort === 'Customers') return b.customerCount - a.customerCount;

    return b.aum - a.aum;
  });

  return (
    <>
      <FilterBar
        label="Search agents by name, ARN or city"
        value={query}
        onChange={setQuery}
        placeholder="e.g. Rohit, ARN-118204, Pune"
      >
        <Tabs tabs={StatusTabs} active={status} onChange={setStatus} size="sm" />
        <SelectInput
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="h-9 w-36"
          aria-label="Sort agents"
        >
          {SortOptions.map((option) => (
            <option key={option} value={option}>
              Sort by {option}
            </option>
          ))}
        </SelectInput>
      </FilterBar>

      <Card>
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <p className="text-[12.5px] text-ink-muted">
            <span className="tabular font-semibold text-ink">{visible.length}</span> of {Agents.length} agents
          </p>
        </div>

        <AgentsTable agents={visible} onSelect={setSelected} />
      </Card>

      <SidePanel
        open={selected !== null}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.code} · ${selected.location}` : undefined}
        onClose={() => setSelected(null)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="danger">Suspend agent</Button>
            <Button variant="primary">Save changes</Button>
          </div>
        }
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge tone={AgentStatusTone[selected.status]} dot>
                {selected.status}
              </Badge>
              {selected.flags.map((flag) => (
                <Badge key={flag} tone={AgentFlagTone[flag]}>
                  {flag}
                </Badge>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-3">
              {[
                { label: 'AUM', value: formatInr(selected.aum) },
                { label: 'Customers', value: formatCount(selected.customerCount) },
                { label: 'Active SIPs', value: formatCount(selected.activeSips) },
                { label: 'Licence expiry', value: formatDate(selected.licenceExpiresAt) },
              ].map((entry) => (
                <div key={entry.label} className="rounded-md border border-line bg-surface-sunken px-3 py-2.5">
                  <dt className="text-[11.5px] text-ink-muted">{entry.label}</dt>
                  <dd className="tabular text-[14px] font-semibold text-ink">{entry.value}</dd>
                </div>
              ))}
            </dl>

            <div className="space-y-3">
              <Field label="Email">
                <SelectInput defaultValue={selected.email}>
                  <option>{selected.email}</option>
                </SelectInput>
              </Field>
              <Field label="Territory" hint="Drives phase-02 goal-mapping visits.">
                <SelectInput defaultValue={selected.location}>
                  <option>{selected.location}</option>
                  <option>Mumbai, MH</option>
                  <option>Bengaluru, KA</option>
                  <option>Delhi NCR</option>
                </SelectInput>
              </Field>
              <Field label="Role">
                <SelectInput defaultValue="Sub-broker">
                  <option>Sub-broker</option>
                  <option>Senior sub-broker</option>
                  <option>Regional lead</option>
                </SelectInput>
              </Field>
            </div>

            <p className="text-[12.5px] text-ink-muted">Joined {formatDate(selected.joinedAt)}</p>
          </div>
        ) : null}
      </SidePanel>
    </>
  );
}
