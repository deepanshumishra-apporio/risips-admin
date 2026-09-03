import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { Investors } from '@/data/investors';
import { formatInr } from '@/utils/format';
import { SipTone } from '@/utils/tone';

/** Investors tagged for repeated SIP failure or delay — the list an admin
 *  works through before the next debit cycle. */
export function FlaggedInvestors(): React.JSX.Element {
  const flagged = Investors.filter(
    (investor) => investor.sipHealth === 'Repeated Failure' || investor.sipHealth === 'Delayed',
  );

  return (
    <Card className="h-full">
      <CardHeader
        title="Tagged investors"
        subtitle="Repeated SIP failure or delay in the current cycle"
        action={
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-danger">
            <AlertTriangle className="size-3.5" />
            {flagged.length}
          </span>
        }
      />
      <ul className="divide-y divide-line">
        {flagged.map((investor) => (
          <li key={investor.id}>
            <Link
              href={`/investors/${investor.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-surface-sunken"
            >
              <Avatar name={investor.name} tone="neutral" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">{investor.name}</p>
                <p className="mt-0.5 text-[12px] text-ink-muted">
                  {investor.portfolioName} · {investor.agentName}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge tone={SipTone[investor.sipHealth]}>{investor.sipHealth}</Badge>
                <span className="tabular text-[12px] text-ink-muted">
                  {formatInr(investor.monthlySip, { compact: false })}/mo
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
