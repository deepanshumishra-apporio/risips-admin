import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { ComplianceAlerts } from '@/data/compliance';
import type { AlertSeverity } from '@/types/compliance.types';

const SeverityTone: Record<AlertSeverity, BadgeTone> = {
  High: 'danger',
  Medium: 'warn',
  Low: 'neutral',
};

export function AlertsPanel(): React.JSX.Element {
  return (
    <Card className="h-full">
      <CardHeader
        title="Pending KYC & compliance alerts"
        subtitle="Investor KYC, mandate and SIP failures first."
        action={
          <Link
            href="/compliance"
            className="flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-deep"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        }
      />
      <ul className="divide-y divide-line">
        {ComplianceAlerts.slice(0, 5).map((alert) => (
          <li key={alert.id} className="flex items-start gap-3 px-5 py-3.5">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--color-danger)]" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[13.5px] font-semibold text-ink">{alert.subject}</p>
                <Badge tone="neutral">{alert.kind}</Badge>
                <Badge tone={SeverityTone[alert.severity]}>{alert.severity}</Badge>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{alert.detail}</p>
            </div>
            <span className="tabular shrink-0 text-[12px] text-ink-muted">{alert.ageInDays}d</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
