import { Info } from 'lucide-react';

import { cn } from '@/utils/cn';
import { formatDelta } from '@/utils/format';

export type StatStripItem = {
  label: string;
  value: string;
  hint?: string;
  delta?: number;
  caption?: string;
};

type StatStripProps = {
  items: StatStripItem[];
  className?: string;
};

/**
 * Borderless summary rail. Metrics sit inline under the page title rather than
 * in cards, so the numbers read as properties of the screen you are on.
 */
export function StatStrip({ items, className }: StatStripProps): React.JSX.Element {
  return (
    <dl className={cn('flex flex-wrap gap-x-12 gap-y-5 border-b border-line pb-5', className)}>
      {items.map((item) => (
        <div key={item.label} className="min-w-[132px]">
          <dt className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
            {item.label}
            {item.hint ? <Info className="size-3.5 text-ink-muted/70" aria-label={item.hint} /> : null}
          </dt>
          <dd className="mt-1.5 flex items-baseline gap-2">
            <span className="tabular text-[19px] leading-none font-semibold tracking-[-0.01em] text-ink">
              {item.value}
            </span>
            {item.delta !== undefined ? (
              <span
                className={cn(
                  'tabular text-[12px] font-semibold',
                  item.delta >= 0 ? 'text-success' : 'text-danger',
                )}
              >
                {formatDelta(item.delta)}
              </span>
            ) : null}
          </dd>
          {item.caption ? <p className="mt-1 text-[11.5px] text-ink-muted">{item.caption}</p> : null}
        </div>
      ))}
    </dl>
  );
}
