import type { RiskProfile } from '@/types/portfolio.types';

export type KycStatus = 'Verified' | 'Pending' | 'Rejected' | 'Re-KYC Due';

export type SipHealth = 'Healthy' | 'Delayed' | 'Repeated Failure' | 'Paused';

export type IncomeBracket =
  | 'Below ₹5 L'
  | '₹5 L – ₹10 L'
  | '₹10 L – ₹25 L'
  | '₹25 L – ₹50 L'
  | 'Above ₹50 L';

export type OtherInvestment =
  | 'Fixed Deposits'
  | 'Stocks'
  | 'PPF / EPF'
  | 'NPS'
  | 'Insurance / ULIP'
  | 'Gold'
  | 'None of these';

export type WealthProfile = {
  incomeBracket: IncomeBracket;
  ownsRealEstate: boolean;
  realEstateValueRange: string | null;
  otherInvestments: OtherInvestment[];
  dependents: number;
  investmentHorizonYears: number;
};

export type Investor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  agentName: string;
  kycStatus: KycStatus;
  sipHealth: SipHealth;
  portfolioName: string;
  riskProfile: RiskProfile;
  aum: number;
  monthlySip: number;
  joinedAt: string;
  wealthProfile: WealthProfile | null;
};
