import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ReviewMeetings } from '@/data/compliance';
import { Investors } from '@/data/investors';
import { ProfileAssignment } from '@/features/investors/components/profile-assignment';
import { WealthProfileForm } from '@/features/investors/components/wealth-profile-form';
import { formatDate, formatInr } from '@/utils/format';
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

  if (!investor) notFound();

  const meetings = ReviewMeetings.filter((meeting) => meeting.investorId === investor.id);

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
        description={`Onboarded ${formatDate(investor.joinedAt)} · Serviced by ${investor.agentName}`}
        actions={
          <>
            <Badge tone={KycTone[investor.kycStatus]}>{investor.kycStatus}</Badge>
            <Badge tone={SipTone[investor.sipHealth]} dot>
              {investor.sipHealth}
            </Badge>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <ProfileAssignment
            currentProfileName={investor.portfolioName}
            currentRisk={investor.riskProfile}
          />
          <WealthProfileForm initial={investor.wealthProfile} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={investor.name} tone="violet" className="size-11 text-[14px]" />
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-semibold text-ink">{investor.name}</p>
                  <p className="text-[12.5px] text-ink-muted">{investor.riskProfile} profile</p>
                </div>
              </div>

              <ul className="space-y-2 border-t border-line pt-3.5">
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <Mail className="size-3.5 text-ink-muted" />
                  {investor.email}
                </li>
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <Phone className="size-3.5 text-ink-muted" />
                  {investor.phone}
                </li>
                <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <MapPin className="size-3.5 text-ink-muted" />
                  {investor.city}
                </li>
              </ul>

              <dl className="grid grid-cols-2 gap-3 border-t border-line pt-3.5">
                <div>
                  <dt className="text-[11.5px] text-ink-muted">Portfolio value</dt>
                  <dd className="tabular text-[15px] font-semibold text-ink">{formatInr(investor.aum)}</dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-ink-muted">Monthly SIP</dt>
                  <dd className="tabular text-[15px] font-semibold text-ink">
                    {formatInr(investor.monthlySip, { compact: false })}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Review meetings" subtitle="Notes that drive profile changes" />
            {meetings.length === 0 ? (
              <p className="px-5 py-6 text-[13px] text-ink-muted">No review meetings captured yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {meetings.map((meeting) => (
                  <li key={meeting.id} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink">{formatDate(meeting.meetingDate)}</p>
                      <Badge tone="neutral">{meeting.mode}</Badge>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">{meeting.notes}</p>
                    <p className="mt-2 text-[12px] text-ink-soft">
                      {meeting.currentProfile} → <span className="font-semibold">{meeting.recommendedProfile}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
