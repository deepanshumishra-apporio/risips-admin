import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { ModelPortfolios } from '@/data/portfolios';
import { PortfolioWizard } from '@/features/portfolios/components/portfolio-wizard';
import type { PortfolioDraft } from '@/types/portfolio.types';
import { formatDate } from '@/utils/format';
import { PortfolioStatusTone } from '@/utils/tone';

export function generateStaticParams(): { id: string }[] {
  return ModelPortfolios.map((portfolio) => ({ id: portfolio.id }));
}

type EditPortfolioPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const portfolio = ModelPortfolios.find((entry) => entry.id === id);

  if (!portfolio) notFound();

  const initial: PortfolioDraft = {
    name: portfolio.name,
    description: portfolio.description,
    riskProfile: portfolio.riskProfile,
    goalTag: portfolio.goalTag,
    allocation: portfolio.allocation,
    funds: portfolio.funds,
    minimumSip: portfolio.minimumSip,
  };

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
        title={portfolio.name}
        description={portfolio.description}
        actions={
          <>
            <Badge tone={PortfolioStatusTone[portfolio.status]} dot>
              {portfolio.status}
            </Badge>
            <span className="text-[12.5px] text-ink-muted">Updated {formatDate(portfolio.updatedAt)}</span>
          </>
        }
      />

      <PortfolioWizard initial={initial} mode="edit" />
    </>
  );
}
