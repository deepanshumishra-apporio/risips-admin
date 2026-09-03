import { PageHeader } from '@/components/layout/page-header';
import { ReviewMeetingsBoard } from '@/features/meetings/components/review-meetings-board';

export default function ReviewMeetingsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Review meetings"
        description="Admins and agents conduct reviews — in person in phase 01 — and capture the notes that update an investor's curated portfolio."
      />
      <ReviewMeetingsBoard />
    </>
  );
}
