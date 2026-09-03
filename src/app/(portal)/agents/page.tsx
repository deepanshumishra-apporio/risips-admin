import { Download, UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { PageTabs } from '@/components/ui/page-tabs';
import { AgentsDirectory } from '@/features/agents/components/agents-directory';
import { TeamTabs } from '@/features/agents/team-tabs';

export default function AgentsPage(): React.JSX.Element {
  return (
    <>
      <PageTabs tabs={TeamTabs} />

      <PageHeader
        title="Agents"
        description="Sub-brokers on the platform, their book size and the compliance flags against them."
        actions={
          <>
            <Button icon={<Download className="size-4" />}>Export</Button>
            <Button variant="primary" icon={<UserPlus className="size-4" />}>
              Add agent
            </Button>
          </>
        }
      />

      <AgentsDirectory />
    </>
  );
}
