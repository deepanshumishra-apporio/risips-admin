import { ArrowLeft, Mail, MapPin, Phone, Send, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatStrip } from '@/components/ui/stat-strip';
import { ReviewMeetings } from '@/data/compliance';
import { InvestorDetails } from '@/data/investor-details';
import { Investors } from '@/data/investors';
import { CompliancePanel } from '@/features/investors/components/compliance-panel';
import { HoldingsPanel } from '@/features/investors/components/holdings-panel';
import { InvestorBuckets } from '@/features/investors/components/investor-buckets';
import { InvestorTabs } from '@/features/investors/components/investor-tabs';
import { MeetingsPanel } from '@/features/investors/components/meetings-panel';
import { ProfileAssignment } from '@/features/investors/components/profile-assignment';
import { TransactionsPanel } from '@/features/investors/components/transactions-panel';
import { WealthProfileForm } from '@/features/investors/components/wealth-profile-form';
import { holdingsFor } from '@/features/investors/investor-holdings';
import { formatDate, formatInr, formatPercent } from '@/utils/format';
import { KycTone, SipTone } from '@/utils/tone';

export function generateStaticParams(): { id: string }[] {
  return Investors.map((investor) => ({ id: investor.id }));
}

type InvestorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InvestorPage({ params }: InvestorPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const investor = Investors.find((entry) => entry.id === id);
  const detail = investor ? InvestorDetails[investor.id] : undefined;

  if (!investor || !detail) notFound();

  const meetings = ReviewMeetings.filter((meeting) => meeting.investorId === investor.id);
  const holdings = holdingsFor(investor, detail);
  const gain = investor.aum - detail.invested;
  const openDocuments = detail.documents.filter((document) => document.status !== 'Verified').length;

  return (
    <>
      <Link
        href="/investors"
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-3.5" />
        Investors
      </Link>

      <PageHeader
        title={investor.name}
        description={`${investor.city} · Onboarded ${formatDate(investor.joinedAt)} · Serviced by ${investor.agentName}`}
        actions={
          <>
            <Badge tone={KycTone[investor.kycStatus]}>{investor.kycStatus}</Badge>
            <Badge tone={SipTone[investor.sipHealth]} dot>
              {investor.sipHealth}
            </Badge>
            <Button icon={<Send className="size-4" />}>Message</Button>
            <Button variant="primary" icon={<UserRoundCog className="size-4" />}>
              Edit investor
            </Button>
          </>
        }
      />

      <StatStrip
        className="mb-5"
        items={[
          { label: 'Portfolio value', value: formatInr(investor.aum), caption: 'across all folios' },
          { label: 'Invested', value: formatInr(detail.invested), caption: 'cost basis' },
          {
            label: 'Unrealised gain',
            value: `${gain >= 0 ? '+' : ''}${formatInr(gain)}`,
            caption: `${formatPercent((gain / detail.invested) * 100, 1)} absolute`,
          },
          { label: 'XIRR', hint: 'Annualised, net of expenses.', value: formatPercent(detail.xirr, 1) },
          {
            label: 'Monthly SIP',
            value: formatInr(investor.monthlySip, { compact: false }),
            caption: `debits on the ${detail.mandate.sipDate}`,
          },
          { label: 'Folios', value: String(detail.folios.length), caption: detail.pan },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <InvestorTabs
          tabs={[
            {
              label: 'Profile',
              content: (
                <div className="space-y-4">
                  <ProfileAssignment
                    currentProfileName={investor.portfolioName}
                    currentRisk={investor.riskProfile}
                  />
                  <WealthProfileForm initial={investor.wealthProfile} />
                </div>
              ),
            },
            {
              label: 'Holdings',
              count: holdings.length,
              content: <HoldingsPanel holdings={holdings} portfolioName={investor.portfolioName} />,
            },
            {
              label: 'Transactions',
              count: detail.transactions.length,
              content: <TransactionsPanel transactions={detail.transactions} />,
            },
            {
              label: 'KYC & mandate',
              count: openDocuments > 0 ? openDocuments : undefined,
              content: <CompliancePanel detail={detail} />,
            },
            {
              label: 'Meetings',
              count: meetings.length,
              content: <MeetingsPanel meetings={meetings} />,
            },
          ]}
        />

        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={investor.name} tone="violet" className="size-11 text-[14px]" />
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-semibold text-ink">{investor.name}</p>
                  <p className="text-[12.5px] text-ink-muted">
                    {investor.riskProfile} · {investor.portfolioName}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 border-t border-line pt-3.5">
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <Mail className="size-3.5 shrink-0 text-ink-muted" />
                  <span className="truncate">{investor.email}</span>
                </li>
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <Phone className="size-3.5 shrink-0 text-ink-muted" />
                  {investor.phone}
                </li>
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <MapPin className="size-3.5 shrink-0 text-ink-muted" />
                  {investor.city}
                </li>
              </ul>

              <dl className="space-y-2 border-t border-line pt-3.5">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[12.5px] text-ink-muted">PAN</dt>
                  <dd className="tabular text-[13px] font-medium text-ink">{detail.pan}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-[12.5px] text-ink-muted">Folios</dt>
                  <dd className="tabular text-right text-[13px] font-medium text-ink">
                    {detail.folios.map((folio) => (
                      <span key={folio} className="block">
                        {folio}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[12.5px] text-ink-muted">Bank</dt>
                  <dd className="text-right text-[13px] font-medium text-ink">
                    {detail.bank.bank}
                    <span className="tabular block text-[11.5px] font-normal text-ink-muted">
                      {detail.bank.accountMasked}
                    </span>
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <InvestorBuckets investor={investor} />

          <Card>
            <CardHeader title="Servicing agent" subtitle="Point of contact for this investor" />
            <CardBody className="flex items-center gap-3">
              <Avatar name={investor.agentName} />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-ink">{investor.agentName}</p>
                <Link href="/agents" className="text-[12.5px] text-brand hover:text-brand-deep">
                  View agent
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
