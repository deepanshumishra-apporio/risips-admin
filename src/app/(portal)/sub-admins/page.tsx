import { PageHeader } from '@/components/layout/page-header';
import { PageTabs } from '@/components/ui/page-tabs';
import { SubAdminsManager } from '@/features/agents/components/sub-admins-manager';
import { TeamTabs } from '@/features/agents/team-tabs';

export default function SubAdminsPage(): React.JSX.Element {
  return (
    <>
      <PageTabs tabs={TeamTabs} />

      <PageHeader
        title="Sub-admins"
        description="Delegate compliance, operations and curation work without handing over the super-admin account."
      />

      <SubAdminsManager />
    </>
  );
}
