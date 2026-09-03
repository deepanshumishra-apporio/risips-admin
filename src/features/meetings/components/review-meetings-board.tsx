'use client';

import { CalendarPlus, MapPin, Phone, Video } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Field, SelectInput, TextArea, TextInput } from '@/components/ui/field';
import { SidePanel } from '@/components/ui/side-panel';
import { Tabs } from '@/components/ui/tabs';
import { ReviewMeetings } from '@/data/compliance';
import { Investors } from '@/data/investors';
import type { ReviewMeeting } from '@/types/compliance.types';
import { formatDate } from '@/utils/format';

const StatusTabs = ['All', 'Scheduled', 'Captured', 'Profile Updated'] as const;
type StatusTab = (typeof StatusTabs)[number];

const StatusTone: Record<ReviewMeeting['status'], BadgeTone> = {
  Scheduled: 'brand',
  Captured: 'warn',
  'Profile Updated': 'success',
};

const ModeIcon = {
  'In-person': MapPin,
  Video,
  Phone,
} as const;

const Profiles = ['Conservative', 'Moderate', 'Aggressive'];

/** Review meetings are conducted in person in phase 01; the notes captured here
 *  are what the admin uses to move an investor to a different basket. */
export function ReviewMeetingsBoard(): React.JSX.Element {
  const [status, setStatus] = useState<StatusTab>('All');
  const [captureOpen, setCaptureOpen] = useState(false);

  const visible = ReviewMeetings.filter((meeting) => status === 'All' || meeting.status === status);

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tabs tabs={StatusTabs} active={status} onChange={setStatus} />
          <Button variant="primary" icon={<CalendarPlus className="size-4" />} onClick={() => setCaptureOpen(true)}>
            Capture meeting
          </Button>
        </div>

        <Card>
          <CardHeader
            title="Meeting log"
            subtitle="Date, mode and the notes that justify a profile change."
            action={<span className="text-[12.5px] text-ink-muted">{visible.length} meetings</span>}
          />

          <ul className="divide-y divide-line">
            {visible.map((meeting) => {
              const Icon = ModeIcon[meeting.mode];
              const changed = meeting.currentProfile !== meeting.recommendedProfile;

              return (
                <li key={meeting.id} className="flex flex-wrap items-start gap-4 px-5 py-4">
                  <Avatar name={meeting.investorName} tone="violet" />

                  <div className="min-w-[220px] flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{meeting.investorName}</p>
                      <Badge tone={StatusTone[meeting.status]} dot>
                        {meeting.status}
                      </Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-2 text-[12px] text-ink-muted">
                      <Icon className="size-3.5" />
                      {meeting.mode} · {formatDate(meeting.meetingDate)} · {meeting.conductedBy}
                    </p>
                    <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-ink-soft">{meeting.notes}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone="neutral">{meeting.currentProfile}</Badge>
                    {changed ? (
                      <>
                        <span className="text-ink-muted">→</span>
                        <Badge tone="brand">{meeting.recommendedProfile}</Badge>
                      </>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <SidePanel
        open={captureOpen}
        title="Capture review meeting"
        subtitle="Notes here feed the investor's curated portfolio type."
        onClose={() => setCaptureOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button onClick={() => setCaptureOpen(false)}>Cancel</Button>
            <Button variant="primary">Save notes</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Investor" required>
            <SelectInput defaultValue={Investors[0]?.name}>
              {Investors.map((investor) => (
                <option key={investor.id} value={investor.name}>
                  {investor.name}
                </option>
              ))}
            </SelectInput>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Meeting date" required>
              <TextInput type="date" defaultValue="2026-09-03" />
            </Field>
            <Field label="Mode">
              <SelectInput defaultValue="In-person">
                <option>In-person</option>
                <option>Video</option>
                <option>Phone</option>
              </SelectInput>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Current profile">
              <SelectInput defaultValue="Moderate">
                {Profiles.map((profile) => (
                  <option key={profile}>{profile}</option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Recommended profile">
              <SelectInput defaultValue="Moderate">
                {Profiles.map((profile) => (
                  <option key={profile}>{profile}</option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <Field label="Notes" hint="What changed for the investor, and what the basket should do about it.">
            <TextArea rows={6} placeholder="Income, horizon, liquidity needs, comfort with drawdown..." />
          </Field>
        </div>
      </SidePanel>
    </>
  );
}
