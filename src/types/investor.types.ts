import type { AssetClass, RiskProfile } from '@/types/portfolio.types';

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

/** A position in one scheme, derived from the investor's model portfolio. */
export type Holding = {
  fundId: string;
  name: string;
  house: string;
  assetClass: AssetClass;
  units: number;
  nav: number;
  invested: number;
  current: number;
};

export type TransactionKind = 'SIP' | 'Lumpsum' | 'Redemption' | 'Switch';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export type Transaction = {
  id: string;
  date: string;
  kind: TransactionKind;
  fundName: string;
  amount: number;
  status: TransactionStatus;
  folio: string;
};

export type MandateStatus = 'Active' | 'Pending' | 'Failed' | 'Cancelled';

export type Mandate = {
  reference: string;
  type: 'e-NACH' | 'UPI Autopay';
  status: MandateStatus;
  maxAmount: number;
  /** Day of the month the debit is attempted. */
  sipDate: number;
  registeredAt: string;
};

export type BankAccount = {
  bank: string;
  accountMasked: string;
  ifsc: string;
  type: 'Savings' | 'Current';
};

export type Nominee = {
  name: string;
  relationship: string;
  share: number;
};

export type DocumentStatus = 'Verified' | 'Pending' | 'Rejected' | 'Expired';

export type KycDocument = {
  label: string;
  identifier: string;
  status: DocumentStatus;
  updatedAt: string;
};

/** Everything about an investor that is not on the directory row. */
export type InvestorDetail = {
  pan: string;
  folios: string[];
  /** Cost basis. Current value is the investor's `aum`. */
  invested: number;
  xirr: number;
  mandate: Mandate;
  bank: BankAccount;
  /** Null when the nominee declaration is still outstanding. */
  nominee: Nominee | null;
  documents: KycDocument[];
  transactions: Transaction[];
};
