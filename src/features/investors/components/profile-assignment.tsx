'use client';

import { Check, Rocket, Save } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AssetClasses, AssetColor } from '@/data/asset-colors';
import { ModelPortfolios } from '@/data/portfolios';
import type { RiskProfile } from '@/types/portfolio.types';
import { cn } from '@/utils/cn';
import { RiskTone } from '@/utils/tone';

const ProfileTypes: RiskProfile[] = ['Conservative', 'Moderate', 'Aggressive'];

type ProfileAssignmentProps = {
  currentProfileName: string;
  currentRisk: RiskProfile;
};

/**
 * The user-level curation control: change the profile type, then pick which
 * live basket the investor sits in. Changes stay a suggestion until published.
 */
export function ProfileAssignment({ currentProfileName, currentRisk }: ProfileAssignmentProps): React.JSX.Element {
  const [risk, setRisk] = useState<RiskProfile>(currentRisk);
  const [selected, setSelected] = useState(currentProfileName);

  const dirty = risk !== currentRisk || selected !== currentProfileName;
  const options = ModelPortfolios.filter(
    (portfolio) => portfolio.riskProfile === risk && portfolio.status === 'Live',
  );

  return (
    <Card>
      <CardHeader
        title="Curated model portfolio"
        subtitle="Edit the profile type after a review meeting, then map the investor to a live basket."
        action={
          <Badge tone={dirty ? 'warn' : 'success'} dot>
            {dirty ? 'Draft change' : 'Live'}
          </Badge>
        }
      />

      <CardBody className="space-y-5">
        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">Profile type</p>
          <div className="flex flex-wrap gap-2">
            {ProfileTypes.map((profile) => (
              <button
                key={profile}
                type="button"
                onClick={() => setRisk(profile)}
                className={cn(
                  'h-9 rounded-lg border px-4 text-[13px] font-medium transition-colors',
                  risk === profile
                    ? 'border-brand bg-brand-soft text-brand-deep'
                    : 'border-line-strong bg-surface text-ink-soft hover:border-brand/40',
                )}
              >
                {profile}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">Available baskets</p>
          <ul className="space-y-2">
            {options.map((portfolio) => {
              const active = selected === portfolio.name;

              return (
                <li key={portfolio.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(portfolio.name)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                      active ? 'border-brand bg-brand-soft' : 'border-line-strong bg-surface hover:border-brand/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full border',
                        active ? 'border-brand bg-brand text-white' : 'border-line-strong',
                      )}
                    >
                      {active ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold text-ink">{portfolio.name}</span>
                      <span className="block text-[12px] text-ink-muted">{portfolio.goalTag}</span>
                    </span>

                    <span className="flex shrink-0 items-center gap-3">
                      <span className="hidden items-center gap-1.5 sm:flex">
                        {AssetClasses.map((assetClass) => (
                          <span key={assetClass} className="tabular text-[11.5px] text-ink-muted">
                            <span
                              className="mr-1 inline-block size-2 rounded-full align-middle"
                              style={{ backgroundColor: AssetColor[assetClass] }}
                            />
                            {portfolio.allocation[assetClass]}%
                          </span>
                        ))}
                      </span>
                      <Badge tone={RiskTone[portfolio.riskProfile]}>{portfolio.riskProfile}</Badge>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </CardBody>

      <footer className="flex items-center justify-between gap-2 border-t border-line px-5 py-3.5">
        <p className="text-[12.5px] text-ink-muted">
          {dirty ? `Pending: ${currentRisk} → ${risk}` : 'No pending changes'}
        </p>
        <div className="flex items-center gap-2">
          <Button icon={<Save className="size-4" />} disabled={!dirty}>
            Save draft
          </Button>
          <Button variant="primary" icon={<Rocket className="size-4" />} disabled={!dirty}>
            Publish to investor
          </Button>
        </div>
      </footer>
    </Card>
  );
}
