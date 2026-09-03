import { Download, Plus, UserPlus } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Agents } from '@/data/agents';
import { AlertsPanel } from '@/features/dashboard/components/alerts-panel';
import { AumOverview } from '@/features/dashboard/components/aum-overview';
import { FlaggedInvestors } from '@/features/dashboard/components/flagged-investors';
import { KpiRow } from '@/features/dashboard/components/kpi-row';
import { PortfolioBuckets } from '@/features/dashboard/components/portfolio-buckets';
import { AgentsTable } from '@/features/agents/components/agents-table';

export default function DashboardPage(): React.JSX.Element {
  const topAgents = [...Agents].sort((a, b) => b.aum - a.aum).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="SIP flows, agents and investors, and the compliance queue in one view."
        actions={
          <>
            <Button icon={<Download className="size-4" />}>Export</Button>
            <Button icon={<UserPlus className="size-4" />}>Add agent</Button>
            <Link
              href="/model-portfolios/new"
              className="inline-flex h-9.5 items-center gap-2 rounded-md bg-brand px-4 text-[13.5px] font-medium text-white hover:bg-brand-deep"
            >
              <Plus className="size-4" />
              New model portfolio
            </Link>
          </>
        }
      />

      <KpiRow />

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <AumOverview />
          </div>
          <AlertsPanel />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <PortfolioBuckets />
          <FlaggedInvestors />
        </div>

        <Card>
          <CardHeader
            title="Agents"
            subtitle="Ranked by book size. Location drives phase-02 goal-mapping visits."
            action={
              <Link href="/agents" className="text-[13px] font-medium text-brand hover:text-brand-deep">
                Manage agents
              </Link>
            }
          />
          <AgentsTable agents={topAgents} />
        </Card>
      </div>
    </>
  );
}
