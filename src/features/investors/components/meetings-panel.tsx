import { CalendarPlus, MapPin, Phone, Video } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import type { ReviewMeeting } from '@/types/compliance.types';
import { formatDate } from '@/utils/format';

const ModeIcon = {
  'In-person': MapPin,
  Video,
  Phone,
} as const;

type MeetingsPanelProps = {
  meetings: ReviewMeeting[];
};

export function MeetingsPanel({ meetings }: MeetingsPanelProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        title="Review meetings"
        subtitle="The conversations that justify a change of profile."
        action={
          <Button size="sm" icon={<CalendarPlus className="size-3.5" />}>
            Capture meeting
          </Button>
        }
      />

      {meetings.length === 0 ? (
        <EmptyState
          icon={<CalendarPlus className="size-5" />}
          title="No meetings captured"
          description="Review notes recorded here feed the investor's curated portfolio type."
        />
      ) : (
        <ul className="divide-y divide-line">
          {meetings.map((meeting) => {
            const Icon = ModeIcon[meeting.mode];
            const changed = meeting.currentProfile !== meeting.recommendedProfile;

            return (
              <li key={meeting.id} className="px-4 py-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-semibold text-ink">{formatDate(meeting.meetingDate)}</p>
                  <Badge tone="neutral">
                    <Icon className="size-3" />
                    {meeting.mode}
                  </Badge>
                  <span className="text-[12px] text-ink-muted">{meeting.conductedBy}</span>

                  <span className="ml-auto flex items-center gap-1.5">
                    <Badge tone="neutral">{meeting.currentProfile}</Badge>
                    {changed ? (
                      <>
                        <span className="text-ink-muted">→</span>
                        <Badge tone="brand">{meeting.recommendedProfile}</Badge>
                      </>
                    ) : null}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{meeting.notes}</p>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
