import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/layout/page-header';
import { PortfolioWizard } from '@/features/portfolios/components/portfolio-wizard';

export default function NewModelPortfolioPage(): React.JSX.Element {
  return (
    <>
      <Link
        href="/model-portfolios"
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="size-3.5" />
        Model portfolios
      </Link>

      <PageHeader
        title="New model portfolio"
        description="Five steps: name it, tag the goal and risk, set the allocation, pick the funds, then review and publish."
      />

      <PortfolioWizard />
    </>
  );
}
