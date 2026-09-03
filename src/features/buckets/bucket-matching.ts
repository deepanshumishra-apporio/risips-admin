import type { Bucket, BucketRule } from '@/types/bucket.types';
import type { Investor } from '@/types/investor.types';

/**
 * A bucket is a rule, not a list. Every dimension is an AND, and an empty
 * dimension means "any" — so an investor lands in a bucket the moment their
 * profile and behaviour satisfy everything the admin narrowed on.
 */
export function matchesRule(investor: Investor, rule: BucketRule): boolean {
  if (rule.riskProfiles.length > 0 && !rule.riskProfiles.includes(investor.riskProfile)) {
    return false;
  }

  if (rule.sipHealth.length > 0 && !rule.sipHealth.includes(investor.sipHealth)) {
    return false;
  }

  if (rule.minAum > 0 && investor.aum < rule.minAum) {
    return false;
  }

  const profile = investor.wealthProfile;

  if (rule.incomeBrackets.length > 0) {
    if (profile === null || !rule.incomeBrackets.includes(profile.incomeBracket)) return false;
  }

  if (rule.minHorizonYears > 0) {
    if (profile === null || profile.investmentHorizonYears < rule.minHorizonYears) return false;
  }

  return true;
}

export function matchInvestors(rule: BucketRule, investors: Investor[]): Investor[] {
  return investors.filter((investor) => matchesRule(investor, rule));
}

/** Buckets an investor currently satisfies — an investor can sit in several. */
export function bucketsFor(investor: Investor, buckets: Bucket[]): Bucket[] {
  return buckets.filter((bucket) => matchesRule(investor, bucket.rule));
}

/** Human-readable rule chips, used on the card and in the builder preview. */
export function describeRule(rule: BucketRule): string[] {
  const chips: string[] = [];

  if (rule.riskProfiles.length > 0) chips.push(rule.riskProfiles.join(' or '));
  if (rule.sipHealth.length > 0) chips.push(`SIP ${rule.sipHealth.join(' or ').toLowerCase()}`);
  if (rule.incomeBrackets.length > 0) chips.push(`Income ${rule.incomeBrackets.join(' / ')}`);
  if (rule.minHorizonYears > 0) chips.push(`Horizon ${rule.minHorizonYears}y+`);
  if (rule.minAum > 0) chips.push(`AUM ₹${(rule.minAum / 100_000).toFixed(0)} L+`);

  return chips.length > 0 ? chips : ['Every investor'];
}
