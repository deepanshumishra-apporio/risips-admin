import type { AssetClass, RiskProfile, Allocation } from '@/types/portfolio.types';

/**
 * One colour per asset class, shared by the donut, the sliders and the stacked
 * lumpsum bars so a class reads the same everywhere in the portal.
 */
export const AssetColor: Record<AssetClass, string> = {
  Equity: '#0a71da',
  Debt: '#0d9488',
  Gold: '#f59e0b',
};

export const AssetClasses: readonly AssetClass[] = ['Equity', 'Debt', 'Gold'];

/** Splits seeded when the admin picks a risk profile in the curation wizard. */
export const RiskDefaultAllocation: Record<RiskProfile, Allocation> = {
  Conservative: { Equity: 25, Debt: 65, Gold: 10 },
  Moderate: { Equity: 55, Debt: 35, Gold: 10 },
  Aggressive: { Equity: 80, Debt: 12, Gold: 8 },
};
