import type { DateRangePreset, SeriesPoint, StackedPoint } from '@/types/chart.types';

/** SIP inflow series, keyed by the fund-flow range the admin selects. */
export const SipFlowSeries: Record<DateRangePreset, SeriesPoint[]> = {
  Daily: [
    { label: 'Mon', value: 42 },
    { label: 'Tue', value: 51 },
    { label: 'Wed', value: 47 },
    { label: 'Thu', value: 63 },
    { label: 'Fri', value: 71 },
    { label: 'Sat', value: 38 },
    { label: 'Sun', value: 24 },
  ],
  Weekly: [
    { label: 'W1', value: 268 },
    { label: 'W2', value: 291 },
    { label: 'W3', value: 274 },
    { label: 'W4', value: 336 },
    { label: 'W5', value: 352 },
    { label: 'W6', value: 341 },
  ],
  Monthly: [
    { label: 'Apr', value: 1180 },
    { label: 'May', value: 1264 },
    { label: 'Jun', value: 1218 },
    { label: 'Jul', value: 1392 },
    { label: 'Aug', value: 1470 },
    { label: 'Sep', value: 1536 },
  ],
  Yearly: [
    { label: '2022', value: 6120 },
    { label: '2023', value: 8940 },
    { label: '2024', value: 11_260 },
    { label: '2025', value: 14_080 },
    { label: '2026', value: 16_940 },
  ],
  Custom: [
    { label: 'Apr', value: 1180 },
    { label: 'May', value: 1264 },
    { label: 'Jun', value: 1218 },
    { label: 'Jul', value: 1392 },
    { label: 'Aug', value: 1470 },
    { label: 'Sep', value: 1536 },
  ],
};

/** Lumpsum inflow split by asset class, for the breakdown tab. */
export const LumpsumBreakdown: Record<DateRangePreset, StackedPoint[]> = {
  Daily: buildBreakdown(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [64, 38, 12]),
  Weekly: buildBreakdown(['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], [220, 132, 44]),
  Monthly: buildBreakdown(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], [880, 520, 180]),
  Yearly: buildBreakdown(['2022', '2023', '2024', '2025', '2026'], [4200, 2600, 900]),
  Custom: buildBreakdown(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], [880, 520, 180]),
};

function buildBreakdown(labels: string[], base: [number, number, number]): StackedPoint[] {
  const drift = [0.86, 0.95, 1, 1.08, 1.16, 1.22];

  return labels.map((label, index) => {
    const factor = drift[index % drift.length];

    return {
      label,
      segments: [
        { key: 'Equity', value: Math.round(base[0] * factor) },
        { key: 'Debt', value: Math.round(base[1] * factor) },
        { key: 'Gold', value: Math.round(base[2] * factor) },
      ],
    };
  });
}

export const DashboardKpis = {
  aum: 1_842_600_000,
  aumDelta: 8.4,
  activeSips: 4_186,
  activeSipsDelta: 5.1,
  investors: 3_942,
  investorsDelta: 6.7,
  agents: 46,
  agentsDelta: 2.2,
  openAlerts: 6,
  openAlertsDelta: -12.5,
  monthlySipBook: 74_200_000,
};
