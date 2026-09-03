import { Funds } from '@/data/funds';
import { ModelPortfolios } from '@/data/portfolios';
import type { Holding, Investor, InvestorDetail } from '@/types/investor.types';
import type { AssetClass } from '@/types/portfolio.types';

/**
 * Positions are derived, not stored: the investor sits in a model portfolio, so
 * their folio splits by that portfolio's fund weights. Cost basis splits the
 * same way, which keeps every holding's gain consistent with the account total.
 */
export function holdingsFor(investor: Investor, detail: InvestorDetail): Holding[] {
  const portfolio = ModelPortfolios.find((entry) => entry.name === investor.portfolioName);

  if (portfolio === undefined) return [];

  const positions = portfolio.funds.map((entry) => {
    const fund = Funds.find((candidate) => candidate.id === entry.fundId);

    return { entry, nav: fund?.nav ?? 0, returns3y: fund?.returns3y ?? 0 };
  });

  /**
   * Cost basis is not the current split. A scheme that ran harder bought its
   * current value with less money, so weight each fund's basis down by its own
   * three-year return before normalising — the parts still add up to the
   * account's invested total, but the per-fund gains diverge the way real
   * positions do.
   */
  const bases = positions.map(({ entry, returns3y }) => entry.weight / (1 + returns3y / 100));
  const basisTotal = bases.reduce((sum, basis) => sum + basis, 0);

  return positions.map(({ entry, nav }, index) => {
    const current = investor.aum * (entry.weight / 100);

    return {
      fundId: entry.fundId,
      name: entry.name,
      house: entry.house,
      assetClass: entry.assetClass,
      units: nav > 0 ? current / nav : 0,
      nav,
      invested: basisTotal > 0 ? detail.invested * (bases[index] / basisTotal) : 0,
      current,
    };
  });
}

export function gainOf(holding: Holding): { absolute: number; percent: number } {
  const absolute = holding.current - holding.invested;

  return {
    absolute,
    percent: holding.invested > 0 ? (absolute / holding.invested) * 100 : 0,
  };
}

/** Actual split by asset class, which can drift from the portfolio's target. */
export function allocationOf(holdings: Holding[]): { assetClass: AssetClass; value: number; share: number }[] {
  const total = holdings.reduce((sum, holding) => sum + holding.current, 0);
  const classes: AssetClass[] = ['Equity', 'Debt', 'Gold'];

  return classes.map((assetClass) => {
    const value = holdings
      .filter((holding) => holding.assetClass === assetClass)
      .reduce((sum, holding) => sum + holding.current, 0);

    return { assetClass, value, share: total > 0 ? (value / total) * 100 : 0 };
  });
}
