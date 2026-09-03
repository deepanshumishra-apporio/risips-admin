import { Download } from 'lucide-react';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { AlertsBoard } from '@/features/compliance/components/alerts-board';

export default function CompliancePage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Compliance"
        description="Pending KYC, mandate authorisations, SIP failures and agent licence expiries in one queue."
        actions={<Button icon={<Download className="size-4" />}>Export queue</Button>}
      />
      <AlertsBoard />
    </>
  );
}
