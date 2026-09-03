import type { Bucket } from '@/types/bucket.types';

export const Buckets: Bucket[] = [
  {
    id: 'bk-01',
    name: 'Long-horizon builders',
    description:
      'Aggressive profiles with a clean mandate history and a decade-plus horizon. They can hold through a drawdown, so the basket leans equity.',
    status: 'Live',
    rule: {
      riskProfiles: ['Aggressive'],
      sipHealth: ['Healthy'],
      incomeBrackets: [],
      minHorizonYears: 10,
      minAum: 0,
    },
    suggestedFundIds: ['f-02', 'f-04', 'f-01'],
    createdAt: '2026-07-14',
  },
  {
    id: 'bk-02',
    name: 'Steady income seekers',
    description:
      'Conservative profiles who told us predictability matters more than upside. Short-duration and corporate bond schemes, with a gold sleeve.',
    status: 'Live',
    rule: {
      riskProfiles: ['Conservative'],
      sipHealth: [],
      incomeBrackets: [],
      minHorizonYears: 0,
      minAum: 0,
    },
    suggestedFundIds: ['f-07', 'f-06', 'f-11'],
    createdAt: '2026-07-14',
  },
  {
    id: 'bk-03',
    name: 'At-risk mandates',
    description:
      'Behaviour bucket, not a personality one. Anyone whose SIP is bouncing or slipping — de-risk into liquid until the mandate is repaired.',
    status: 'Live',
    rule: {
      riskProfiles: [],
      sipHealth: ['Repeated Failure', 'Delayed'],
      incomeBrackets: [],
      minHorizonYears: 0,
      minAum: 0,
    },
    suggestedFundIds: ['f-09', 'f-07'],
    createdAt: '2026-08-02',
  },
  {
    id: 'bk-04',
    name: 'High-capacity accumulators',
    description:
      'Top income bands with a folio already above ₹10 L. Room for a concentrated core plus a mid-cap satellite.',
    status: 'Draft',
    rule: {
      riskProfiles: [],
      sipHealth: ['Healthy'],
      incomeBrackets: ['₹25 L – ₹50 L', 'Above ₹50 L'],
      minHorizonYears: 0,
      minAum: 1_000_000,
    },
    suggestedFundIds: ['f-01', 'f-03', 'f-02'],
    createdAt: '2026-08-28',
  },
];
