'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Field, SelectInput, TextInput } from '@/components/ui/field';
import type { IncomeBracket, OtherInvestment, WealthProfile } from '@/types/investor.types';
import { cn } from '@/utils/cn';

const IncomeBrackets: IncomeBracket[] = [
  'Below ₹5 L',
  '₹5 L – ₹10 L',
  '₹10 L – ₹25 L',
  '₹25 L – ₹50 L',
  'Above ₹50 L',
];

const RealEstateRanges = ['Below ₹50 L', '₹50 L – ₹1 Cr', '₹1 Cr – ₹2 Cr', 'Above ₹2 Cr'];

const InvestmentOptions: OtherInvestment[] = [
  'Fixed Deposits',
  'Stocks',
  'PPF / EPF',
  'NPS',
  'Insurance / ULIP',
  'Gold',
  'None of these',
];

const BlankProfile: WealthProfile = {
  incomeBracket: '₹10 L – ₹25 L',
  ownsRealEstate: false,
  realEstateValueRange: null,
  otherInvestments: [],
  dependents: 0,
  investmentHorizonYears: 10,
};

type WealthProfileFormProps = {
  initial: WealthProfile | null;
};

/**
 * Step 02 of profiling — optional, but it sharpens the portfolio match.
 * Income is captured as a bracket rather than an exact figure, and real estate
 * is a yes/no gate so the "no" case stays short.
 */
export function WealthProfileForm({ initial }: WealthProfileFormProps): React.JSX.Element {
  const [profile, setProfile] = useState<WealthProfile>(initial ?? BlankProfile);

  const toggleInvestment = (option: OtherInvestment): void => {
    setProfile((current) => {
      if (option === 'None of these') {
        return { ...current, otherInvestments: ['None of these'] };
      }

      const without = current.otherInvestments.filter((entry) => entry !== 'None of these');
      const next = without.includes(option)
        ? without.filter((entry) => entry !== option)
        : [...without, option];

      return { ...current, otherInvestments: next };
    });
  };

  return (
    <Card>
      <CardHeader
        title="Wealth profile"
        subtitle="Optional, but it sharpens the portfolio match. Captured during counselling or at a review meeting."
      />
      <CardBody className="space-y-6">
        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">Annual income</p>
          <div className="flex flex-wrap gap-2">
            {IncomeBrackets.map((bracket) => (
              <Chip
                key={bracket}
                label={bracket}
                selected={profile.incomeBracket === bracket}
                onClick={() => setProfile((current) => ({ ...current, incomeBracket: bracket }))}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">Do they own real estate?</p>
          <div className="flex gap-2">
            {[true, false].map((owns) => (
              <button
                key={String(owns)}
                type="button"
                onClick={() =>
                  setProfile((current) => ({
                    ...current,
                    ownsRealEstate: owns,
                    realEstateValueRange: owns ? (current.realEstateValueRange ?? RealEstateRanges[1]) : null,
                  }))
                }
                className={cn(
                  'h-9 w-20 rounded-lg border text-[13px] font-medium transition-colors',
                  profile.ownsRealEstate === owns
                    ? 'border-brand bg-brand-soft text-brand-deep'
                    : 'border-line-strong bg-surface text-ink-soft hover:border-brand/40',
                )}
              >
                {owns ? 'Yes' : 'No'}
              </button>
            ))}
          </div>

          {profile.ownsRealEstate ? (
            <Field label="Approximate value" className="mt-3 max-w-xs">
              <SelectInput
                value={profile.realEstateValueRange ?? ''}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, realEstateValueRange: event.target.value }))
                }
              >
                {RealEstateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </SelectInput>
            </Field>
          ) : null}
        </div>

        <div>
          <p className="mb-2.5 text-[13px] font-medium text-ink-soft">Other investments</p>
          <div className="flex flex-wrap gap-2">
            {InvestmentOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={profile.otherInvestments.includes(option)}
                onClick={() => toggleInvestment(option)}
              />
            ))}
          </div>
        </div>

        <div className="grid max-w-md gap-4 sm:grid-cols-2">
          <Field label="Dependents">
            <TextInput
              type="number"
              min={0}
              value={profile.dependents}
              onChange={(event) => setProfile((current) => ({ ...current, dependents: Number(event.target.value) }))}
            />
          </Field>
          <Field label="Horizon (years)">
            <TextInput
              type="number"
              min={1}
              value={profile.investmentHorizonYears}
              onChange={(event) =>
                setProfile((current) => ({ ...current, investmentHorizonYears: Number(event.target.value) }))
              }
            />
          </Field>
        </div>
      </CardBody>

      <footer className="flex items-center justify-end gap-2 border-t border-line px-5 py-3.5">
        <Button>Save draft</Button>
        <Button variant="primary">Save wealth profile</Button>
      </footer>
    </Card>
  );
}
