'use client';

import { useCallback, useMemo, useState } from 'react';

import { AssetClasses, RiskDefaultAllocation } from '@/data/asset-colors';
import type {
  AssetClass,
  Fund,
  PortfolioDraft,
  PortfolioFund,
  RiskProfile,
} from '@/types/portfolio.types';

export const EmptyDraft: PortfolioDraft = {
  name: '',
  description: '',
  riskProfile: 'Moderate',
  goalTag: 'Wealth Creation',
  allocation: RiskDefaultAllocation.Moderate,
  funds: [],
  minimumSip: 5000,
};

export type AllocationCheck = {
  /** Total across the three asset classes; the wizard blocks publish unless 100. */
  total: number;
  balanced: boolean;
  /** Fund weights actually assigned per class, against the class target. */
  perClass: { assetClass: AssetClass; target: number; assigned: number; matched: boolean }[];
  fundsMatched: boolean;
};

export type PortfolioDraftApi = {
  draft: PortfolioDraft;
  check: AllocationCheck;
  update: <K extends keyof PortfolioDraft>(key: K, value: PortfolioDraft[K]) => void;
  setRiskProfile: (profile: RiskProfile) => void;
  setAssetWeight: (assetClass: AssetClass, weight: number) => void;
  toggleFund: (fund: Fund) => void;
  setFundWeight: (fundId: string, weight: number) => void;
};

/**
 * Holds the wizard's working copy. The allocation set on the risk step is a
 * constraint the fund step has to satisfy — fund weights per class must add up
 * to the class target, so a published basket cannot drift from what was
 * promised in the allocation step.
 */
export function usePortfolioDraft(initial: PortfolioDraft = EmptyDraft): PortfolioDraftApi {
  const [draft, setDraft] = useState<PortfolioDraft>(initial);

  const update = useCallback(<K extends keyof PortfolioDraft>(key: K, value: PortfolioDraft[K]): void => {
    setDraft((current) => ({ ...current, [key]: value }));
  }, []);

  const setRiskProfile = useCallback((profile: RiskProfile): void => {
    setDraft((current) => ({ ...current, riskProfile: profile, allocation: RiskDefaultAllocation[profile] }));
  }, []);

  const setAssetWeight = useCallback((assetClass: AssetClass, weight: number): void => {
    setDraft((current) => ({ ...current, allocation: { ...current.allocation, [assetClass]: weight } }));
  }, []);

  const toggleFund = useCallback((fund: Fund): void => {
    setDraft((current) => {
      const exists = current.funds.some((entry) => entry.fundId === fund.id);

      if (exists) {
        return { ...current, funds: current.funds.filter((entry) => entry.fundId !== fund.id) };
      }

      const added: PortfolioFund = {
        fundId: fund.id,
        name: fund.name,
        house: fund.house,
        assetClass: fund.assetClass,
        weight: 0,
      };

      return { ...current, funds: [...current.funds, added] };
    });
  }, []);

  const setFundWeight = useCallback((fundId: string, weight: number): void => {
    setDraft((current) => ({
      ...current,
      funds: current.funds.map((entry) => (entry.fundId === fundId ? { ...entry, weight } : entry)),
    }));
  }, []);

  const check = useMemo<AllocationCheck>(() => {
    const total = AssetClasses.reduce((sum, assetClass) => sum + draft.allocation[assetClass], 0);

    const perClass = AssetClasses.map((assetClass) => {
      const target = draft.allocation[assetClass];
      const assigned = draft.funds
        .filter((fund) => fund.assetClass === assetClass)
        .reduce((sum, fund) => sum + fund.weight, 0);

      return { assetClass, target, assigned, matched: target === assigned };
    });

    return {
      total,
      balanced: total === 100,
      perClass,
      fundsMatched: perClass.every((entry) => entry.matched) && draft.funds.length > 0,
    };
  }, [draft.allocation, draft.funds]);

  return { draft, check, update, setRiskProfile, setAssetWeight, toggleFund, setFundWeight };
}
