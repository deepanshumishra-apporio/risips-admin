export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export type PortfolioStatus = 'Live' | 'Draft';

export type GoalTag =
  | 'Retirement'
  | 'Child Education'
  | 'Wealth Creation'
  | 'Steady Income'
  | 'Tax Saving'
  | 'Emergency Corpus';

export type AssetClass = 'Equity' | 'Debt' | 'Gold';

/** Target split per asset class. The three weights must sum to 100. */
export type Allocation = Record<AssetClass, number>;

export type Fund = {
  id: string;
  name: string;
  house: string;
  assetClass: AssetClass;
  category: string;
  expenseRatio: number;
  returns3y: number;
  rating: number;
};

/** A fund inside a portfolio basket, weighted at the individual-fund level
 *  because trail commission and RTA reporting land per scheme, not per class. */
export type PortfolioFund = {
  fundId: string;
  name: string;
  house: string;
  assetClass: AssetClass;
  weight: number;
};

export type ModelPortfolio = {
  id: string;
  name: string;
  description: string;
  riskProfile: RiskProfile;
  goalTag: GoalTag;
  status: PortfolioStatus;
  allocation: Allocation;
  funds: PortfolioFund[];
  minimumSip: number;
  investorCount: number;
  aum: number;
  updatedAt: string;
};

export type WizardStepId = 'basics' | 'goal-risk' | 'allocation' | 'funds' | 'review';

/** The in-progress portfolio held by the curation wizard. */
export type PortfolioDraft = {
  name: string;
  description: string;
  riskProfile: RiskProfile;
  goalTag: GoalTag;
  allocation: Allocation;
  funds: PortfolioFund[];
  minimumSip: number;
};
