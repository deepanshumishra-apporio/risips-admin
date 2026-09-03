import type { IncomeBracket, SipHealth } from '@/types/investor.types';
import type { PortfolioStatus, RiskProfile } from '@/types/portfolio.types';

/**
 * The criteria a bucket matches on. An empty list means "any" for that
 * dimension, so a bucket narrows only on what the admin actually chose.
 */
export type BucketRule = {
  /** Personality — the risk profile assigned during counselling. */
  riskProfiles: RiskProfile[];
  /** Behaviour — how their mandate has actually performed. */
  sipHealth: SipHealth[];
  /** Capacity — income band captured on the wealth profile. */
  incomeBrackets: IncomeBracket[];
  /** Intent — minimum stated horizon in years. 0 disables the check. */
  minHorizonYears: number;
  /** Minimum folio value in rupees. 0 disables the check. */
  minAum: number;
};

export type Bucket = {
  id: string;
  name: string;
  description: string;
  status: PortfolioStatus;
  rule: BucketRule;
  /** The schemes suggested to everyone who lands in this bucket. */
  suggestedFundIds: string[];
  createdAt: string;
};

export const EmptyRule: BucketRule = {
  riskProfiles: [],
  sipHealth: [],
  incomeBrackets: [],
  minHorizonYears: 0,
  minAum: 0,
};
