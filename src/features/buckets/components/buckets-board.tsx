'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { StatStrip } from '@/components/ui/stat-strip';
import { Buckets as SeedBuckets } from '@/data/buckets';
import { Investors } from '@/data/investors';
import { matchesRule } from '@/features/buckets/bucket-matching';
import { BucketBuilder } from '@/features/buckets/components/bucket-builder';
import { BucketCard } from '@/features/buckets/components/bucket-card';
import type { Bucket } from '@/types/bucket.types';
import { formatCount } from '@/utils/format';

export function BucketsBoard(): React.JSX.Element {
  const [buckets, setBuckets] = useState<Bucket[]>(SeedBuckets);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editing, setEditing] = useState<Bucket | null>(null);

  const live = buckets.filter((bucket) => bucket.status === 'Live');
  const bucketed = Investors.filter((investor) =>
    live.some((bucket) => matchesRule(investor, bucket.rule)),
  ).length;

  const openCreate = (): void => {
    setEditing(null);
    setBuilderOpen(true);
  };

  const openEdit = (bucket: Bucket): void => {
    setEditing(bucket);
    setBuilderOpen(true);
  };

  const save = (bucket: Bucket): void => {
    setBuckets((current) => {
      const exists = current.some((entry) => entry.id === bucket.id);

      return exists ? current.map((entry) => (entry.id === bucket.id ? bucket : entry)) : [...current, bucket];
    });
    setBuilderOpen(false);
    setEditing(null);
  };

  const publish = (id: string): void => {
    setBuckets((current) =>
      current.map((bucket) => (bucket.id === id ? { ...bucket, status: 'Live' } : bucket)),
    );
  };

  const remove = (id: string): void => {
    setBuckets((current) => current.filter((bucket) => bucket.id !== id));
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] leading-tight font-semibold tracking-[-0.015em] text-ink">Buckets</h1>
          <p className="mt-1 max-w-2xl text-[13px] text-ink-muted">
            Group investors by personality and behaviour. Anyone who satisfies a bucket&apos;s conditions lands in
            it automatically and gets its fund suggestions.
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="size-4" />} onClick={openCreate}>
          New bucket
        </Button>
      </div>

      <StatStrip
        className="mb-5"
        items={[
          { label: 'Buckets', value: formatCount(buckets.length), caption: `${live.length} live` },
          {
            label: 'Investors bucketed',
            hint: 'Matched by at least one live bucket.',
            value: formatCount(bucketed),
            caption: `of ${Investors.length} on the platform`,
          },
          {
            label: 'Unbucketed',
            value: formatCount(Investors.length - bucketed),
            caption: 'need a profile or a wider rule',
          },
          {
            label: 'Coverage',
            value: `${Math.round((bucketed / Investors.length) * 100)}%`,
            caption: 'of the book',
          },
        ]}
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {buckets.map((bucket) => (
          <BucketCard
            key={bucket.id}
            bucket={bucket}
            onEdit={openEdit}
            onPublish={publish}
            onDelete={remove}
          />
        ))}

        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-line-strong text-ink-muted transition-colors hover:border-brand hover:bg-brand-soft/40 hover:text-brand-deep"
        >
          <Plus className="size-5" />
          <span className="text-[13.5px] font-medium">Add another bucket</span>
        </button>
      </div>

      {builderOpen ? (
        <BucketBuilder
          key={editing?.id ?? 'new'}
          open={builderOpen}
          bucket={editing}
          onClose={() => {
            setBuilderOpen(false);
            setEditing(null);
          }}
          onSave={save}
        />
      ) : null}
    </>
  );
}
