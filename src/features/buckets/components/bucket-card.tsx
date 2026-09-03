'use client';

import { ArrowRight, Pencil, Rocket, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AssetColor } from '@/data/asset-colors';
import { Funds } from '@/data/funds';
import { Investors } from '@/data/investors';
import { describeRule, matchInvestors } from '@/features/buckets/bucket-matching';
import type { Bucket } from '@/types/bucket.types';
import { formatInr } from '@/utils/format';
import { PortfolioStatusTone } from '@/utils/tone';

type BucketCardProps = {
  bucket: Bucket;
  onEdit: (bucket: Bucket) => void;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
};

export function BucketCard({ bucket, onEdit, onPublish, onDelete }: BucketCardProps): React.JSX.Element {
  const members = matchInvestors(bucket.rule, Investors);
  const funds = bucket.suggestedFundIds
    .map((id) => Funds.find((fund) => fund.id === id))
    .filter((fund): fund is (typeof Funds)[number] => fund !== undefined);
  const bookValue = members.reduce((sum, investor) => sum + investor.aum, 0);

  return (
    <article className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">{bucket.name}</h3>
        <Badge tone={PortfolioStatusTone[bucket.status]} dot>
          {bucket.status}
        </Badge>
      </div>

      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">{bucket.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {describeRule(bucket.rule).map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-line-strong bg-surface-sunken px-2 py-0.5 text-[11.5px] text-ink-soft"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-line pt-3">
        <p className="text-[11.5px] text-ink-muted">Matched investors</p>
        {members.length === 0 ? (
          <p className="mt-1.5 text-[12.5px] text-ink-muted">Nobody matches yet.</p>
        ) : (
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {members.slice(0, 4).map((investor) => (
                <Avatar
                  key={investor.id}
                  name={investor.name}
                  tone="violet"
                  className="size-6 text-[10px] ring-2 ring-white"
                />
              ))}
            </div>
            <span className="tabular text-[12.5px] text-ink-soft">
              <span className="font-semibold text-ink">{members.length}</span> investors ·{' '}
              {formatInr(bookValue)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 border-t border-line pt-3">
        <p className="text-[11.5px] text-ink-muted">Suggested funds</p>
        <ul className="mt-1.5 space-y-1">
          {funds.slice(0, 3).map((fund) => (
            <li key={fund.id} className="flex items-center gap-1.5 text-[12.5px] text-ink-soft">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: AssetColor[fund.assetClass] }} />
              <span className="truncate">{fund.name}</span>
            </li>
          ))}
          {funds.length === 0 ? <li className="text-[12.5px] text-ink-muted">None picked yet.</li> : null}
          {funds.length > 3 ? (
            <li className="text-[12px] text-ink-muted">+{funds.length - 3} more</li>
          ) : null}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3.5">
        <Link
          href={`/buckets/${bucket.id}`}
          className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-line-strong text-[13px] font-medium text-ink hover:bg-surface-sunken"
        >
          View members
          <ArrowRight className="size-3.5" />
        </Link>

        {bucket.status === 'Draft' ? (
          <button
            type="button"
            onClick={() => onPublish(bucket.id)}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-brand px-3 text-[13px] font-medium text-white hover:bg-brand-deep"
          >
            <Rocket className="size-3.5" />
            Publish
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => onEdit(bucket)}
          aria-label={`Edit ${bucket.name}`}
          className="inline-flex size-8 items-center justify-center rounded-md border border-line-strong text-ink-muted hover:bg-surface-sunken hover:text-ink"
        >
          <Pencil className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(bucket.id)}
          aria-label={`Delete ${bucket.name}`}
          className="inline-flex size-8 items-center justify-center rounded-md border border-line-strong text-ink-muted hover:border-danger/30 hover:bg-danger-soft hover:text-danger"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </article>
  );
}
