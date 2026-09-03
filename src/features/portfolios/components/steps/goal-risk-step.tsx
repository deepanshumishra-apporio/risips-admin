'use client';

import { Chip } from '@/components/ui/chip';
import type { PortfolioDraftApi } from '@/features/portfolios/use-portfolio-draft';
import type { GoalTag, RiskProfile } from '@/types/portfolio.types';
import { cn } from '@/utils/cn';

const RiskOptions: { profile: RiskProfile; blurb: string }[] = [
  { profile: 'Conservative', blurb: 'Capital protection first. Debt-heavy, shallow drawdowns.' },
  { profile: 'Moderate', blurb: 'Growth with a debt cushion. The post-counselling default.' },
  { profile: 'Aggressive', blurb: 'Long horizons, higher volatility tolerated for return.' },
];

const GoalTags: GoalTag[] = [
  'Retirement',
  'Child Education',
  'Wealth Creation',
  'Steady Income',
  'Tax Saving',
  'Emergency Corpus',
];

/** Risk and goal stay two separate choices: risk drives the fund mix, goal
 *  drives the client conversation, and one goal can span risk appetites. */
export function GoalRiskStep({ draft, update, setRiskProfile }: PortfolioDraftApi): React.JSX.Element {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-[13px] font-medium text-ink-soft">Risk profile</p>
        <p className="mt-0.5 mb-3 text-[12.5px] text-ink-muted">
          Changing this re-seeds the allocation on the next step.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {RiskOptions.map((option) => {
            const active = draft.riskProfile === option.profile;

            return (
              <button
                key={option.profile}
                type="button"
                onClick={() => setRiskProfile(option.profile)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors',
                  active
                    ? 'border-brand bg-brand-soft ring-3 ring-brand/12'
                    : 'border-line-strong bg-surface hover:border-brand/40',
                )}
              >
                <span className={cn('block text-[14px] font-semibold', active ? 'text-brand-deep' : 'text-ink')}>
                  {option.profile}
                </span>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-muted">{option.blurb}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[13px] font-medium text-ink-soft">Goal tag</p>
        <p className="mt-0.5 mb-3 text-[12.5px] text-ink-muted">
          Captured during counselling. It sits under the portfolio name everywhere it appears.
        </p>

        <div className="flex flex-wrap gap-2">
          {GoalTags.map((goal) => (
            <Chip
              key={goal}
              label={goal}
              selected={draft.goalTag === goal}
              onClick={() => update('goalTag', goal)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
