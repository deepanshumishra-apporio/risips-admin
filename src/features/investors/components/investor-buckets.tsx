import { Boxes } from 'lucide-react';
import Link from 'next/link';

import { Card, CardHeader } from '@/components/ui/card';
import { AssetColor } from '@/data/asset-colors';
import { Buckets } from '@/data/buckets';
import { Funds } from '@/data/funds';
import { bucketsFor } from '@/features/buckets/bucket-matching';
import type { Investor } from '@/types/investor.types';

type InvestorBucketsProps = {
  investor: Investor;
};

/** Which rule-based buckets this investor currently falls into, and what each
 *  of them is suggesting to them. */
export function InvestorBuckets({ investor }: InvestorBucketsProps): React.JSX.Element {
  const matched = bucketsFor(investor, Buckets).filter((bucket) => bucket.status === 'Live');

  return (
    <Card>
      <CardHeader
        title="Buckets"
        subtitle="Matched automatically on personality and behaviour"
        action={
          <Link href="/buckets" className="text-[13px] font-medium text-brand hover:text-brand-deep">
            Manage
          </Link>
        }
      />

      {matched.length === 0 ? (
        <p className="px-4 py-6 text-center text-[13px] text-ink-muted">
          No live bucket matches this investor yet.
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {matched.map((bucket) => {
            const funds = bucket.suggestedFundIds
              .map((id) => Funds.find((fund) => fund.id === id))
              .filter((fund): fund is (typeof Funds)[number] => fund !== undefined);

            return (
              <li key={bucket.id} className="px-4 py-3">
                <Link href={`/buckets/${bucket.id}`} className="group flex items-center gap-2">
                  <Boxes className="size-3.5 shrink-0 text-ink-muted" />
                  <span className="text-[13px] font-semibold text-ink group-hover:text-brand">{bucket.name}</span>
                </Link>

                <ul className="mt-1.5 space-y-1 pl-5.5">
                  {funds.map((fund) => (
                    <li key={fund.id} className="flex items-center gap-1.5 text-[12px] text-ink-muted">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: AssetColor[fund.assetClass] }}
                      />
                      <span className="truncate">{fund.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
