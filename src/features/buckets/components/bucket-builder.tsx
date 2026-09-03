'use client';

import { Check, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Field, TextArea, TextInput } from '@/components/ui/field';
import { SidePanel } from '@/components/ui/side-panel';
import { AssetColor } from '@/data/asset-colors';
import { Funds } from '@/data/funds';
import { Investors } from '@/data/investors';
import { matchInvestors } from '@/features/buckets/bucket-matching';
import type { Bucket, BucketRule } from '@/types/bucket.types';
import { EmptyRule } from '@/types/bucket.types';
import type { IncomeBracket, SipHealth } from '@/types/investor.types';
import type { RiskProfile } from '@/types/portfolio.types';
import { cn } from '@/utils/cn';

const RiskOptions: RiskProfile[] = ['Conservative', 'Moderate', 'Aggressive'];
const BehaviourOptions: SipHealth[] = ['Healthy', 'Delayed', 'Repeated Failure', 'Paused'];
const IncomeOptions: IncomeBracket[] = [
  'Below ₹5 L',
  '₹5 L – ₹10 L',
  '₹10 L – ₹25 L',
  '₹25 L – ₹50 L',
  'Above ₹50 L',
];

type BucketBuilderProps = {
  open: boolean;
  /** Passed when editing; omitted when creating a new bucket. */
  bucket: Bucket | null;
  onClose: () => void;
  onSave: (bucket: Bucket, status: Bucket['status']) => void;
};

/** Toggles a value in a rule list — the "any" case is simply an empty list. */
function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
}

export function BucketBuilder({ open, bucket, onClose, onSave }: BucketBuilderProps): React.JSX.Element {
  const [name, setName] = useState(bucket?.name ?? '');
  const [description, setDescription] = useState(bucket?.description ?? '');
  const [rule, setRule] = useState<BucketRule>(bucket?.rule ?? EmptyRule);
  const [fundIds, setFundIds] = useState<string[]>(bucket?.suggestedFundIds ?? []);

  const matched = useMemo(() => matchInvestors(rule, Investors), [rule]);
  const patch = (next: Partial<BucketRule>): void => setRule((current) => ({ ...current, ...next }));

  const save = (status: Bucket['status']): void => {
    onSave(
      {
        id: bucket?.id ?? `bk-${Date.now()}`,
        name: name.trim() || 'Untitled bucket',
        description: description.trim(),
        status,
        rule,
        suggestedFundIds: fundIds,
        createdAt: bucket?.createdAt ?? new Date().toISOString().slice(0, 10),
      },
      status,
    );
  };

  return (
    <SidePanel
      open={open}
      title={bucket ? `Edit ${bucket.name}` : 'New bucket'}
      subtitle="Narrow on personality and behaviour, then pick what this group gets suggested."
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
            <Users className="size-3.5" />
            <span className="tabular font-semibold text-ink">{matched.length}</span> match now
          </span>
          <div className="flex items-center gap-2">
            <Button onClick={() => save('Draft')}>Save draft</Button>
            <Button variant="primary" onClick={() => save('Live')} disabled={fundIds.length === 0}>
              Publish bucket
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <Field label="Bucket name" required>
          <TextInput
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Long-horizon builders"
          />
        </Field>

        <Field label="What this group is" hint="The sentence an agent would use to explain the grouping.">
          <TextArea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            placeholder="Aggressive profiles with a clean mandate history and a decade-plus horizon."
          />
        </Field>

        <section>
          <p className="text-[13px] font-medium text-ink-soft">Personality</p>
          <p className="mt-0.5 mb-2 text-[12px] text-ink-muted">Risk profile set during counselling.</p>
          <div className="flex flex-wrap gap-2">
            {RiskOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={rule.riskProfiles.includes(option)}
                onClick={() => patch({ riskProfiles: toggle(rule.riskProfiles, option) })}
              />
            ))}
          </div>
        </section>

        <section>
          <p className="text-[13px] font-medium text-ink-soft">Behaviour</p>
          <p className="mt-0.5 mb-2 text-[12px] text-ink-muted">How the mandate has actually run.</p>
          <div className="flex flex-wrap gap-2">
            {BehaviourOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={rule.sipHealth.includes(option)}
                onClick={() => patch({ sipHealth: toggle(rule.sipHealth, option) })}
              />
            ))}
          </div>
        </section>

        <section>
          <p className="text-[13px] font-medium text-ink-soft">Capacity</p>
          <p className="mt-0.5 mb-2 text-[12px] text-ink-muted">Income band from the wealth profile.</p>
          <div className="flex flex-wrap gap-2">
            {IncomeOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={rule.incomeBrackets.includes(option)}
                onClick={() => patch({ incomeBrackets: toggle(rule.incomeBrackets, option) })}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Minimum horizon (years)" hint="0 to ignore">
            <TextInput
              type="number"
              min={0}
              value={rule.minHorizonYears}
              onChange={(event) => patch({ minHorizonYears: Number(event.target.value) })}
            />
          </Field>
          <Field label="Minimum AUM (₹)" hint="0 to ignore">
            <TextInput
              type="number"
              min={0}
              step={100000}
              value={rule.minAum}
              onChange={(event) => patch({ minAum: Number(event.target.value) })}
            />
          </Field>
        </div>

        <section>
          <p className="text-[13px] font-medium text-ink-soft">Suggested funds</p>
          <p className="mt-0.5 mb-2 text-[12px] text-ink-muted">
            What everyone in this bucket gets recommended in the app.
          </p>
          <ul className="scrollbar-thin max-h-56 divide-y divide-line overflow-y-auto rounded-md border border-line">
            {Funds.map((fund) => {
              const selected = fundIds.includes(fund.id);

              return (
                <li key={fund.id}>
                  <button
                    type="button"
                    onClick={() => setFundIds((current) => toggle(current, fund.id))}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-surface-sunken"
                  >
                    <span
                      className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded border',
                        selected ? 'border-brand bg-brand text-white' : 'border-line-strong',
                      )}
                    >
                      {selected ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-ink">{fund.name}</span>
                      <span className="flex items-center gap-1.5 text-[11.5px] text-ink-muted">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: AssetColor[fund.assetClass] }}
                        />
                        {fund.category}
                      </span>
                    </span>
                    <span className="tabular shrink-0 text-[12px] font-semibold text-success">
                      {fund.returns3y}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-md border border-line bg-surface-sunken p-3">
          <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
            Matches right now · <span className="tabular text-ink">{matched.length}</span> of {Investors.length}
          </p>
          {matched.length === 0 ? (
            <p className="text-[12.5px] text-ink-muted">
              No investor satisfies every condition. Widen a dimension to catch someone.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {matched.map((investor) => (
                <li key={investor.id} className="flex items-center gap-2">
                  <Avatar name={investor.name} tone="neutral" className="size-6 text-[10px]" />
                  <span className="text-[12.5px] text-ink">{investor.name}</span>
                  <span className="text-[11.5px] text-ink-muted">
                    {investor.riskProfile} · {investor.sipHealth}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </SidePanel>
  );
}
