import { Download, UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { InvestorsDirectory } from '@/features/investors/components/investors-directory';

export default function InvestorsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Investors"
        description="Every customer on the platform, with KYC state and SIP health surfaced before the next debit cycle."
        actions={
          <>
            <Button icon={<Download className="size-4" />}>Export</Button>
            <Button variant="primary" icon={<UserPlus className="size-4" />}>
              Add investor
            </Button>
          </>
        }
      />
      <InvestorsDirectory />
    </>
  );
}
