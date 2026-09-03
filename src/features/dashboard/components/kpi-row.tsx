import { StatStrip } from '@/components/ui/stat-strip';
import { DashboardKpis } from '@/data/dashboard';
import { formatCount, formatInr } from '@/utils/format';

export function KpiRow(): React.JSX.Element {
  return (
    <StatStrip
      items={[
        {
          label: 'Assets under management',
          hint: 'Live folio value across every mapped investor.',
          value: formatInr(DashboardKpis.aum),
          delta: DashboardKpis.aumDelta,
          caption: 'vs last quarter',
        },
        {
          label: 'Active SIPs',
          hint: 'Mandates debiting in the current cycle.',
          value: formatCount(DashboardKpis.activeSips),
          delta: DashboardKpis.activeSipsDelta,
          caption: `${formatInr(DashboardKpis.monthlySipBook)} monthly book`,
        },
        {
          label: 'Investors',
          value: formatCount(DashboardKpis.investors),
          delta: DashboardKpis.investorsDelta,
          caption: 'onboarded to date',
        },
        {
          label: 'Agents',
          value: formatCount(DashboardKpis.agents),
          delta: DashboardKpis.agentsDelta,
          caption: 'sub-brokers active',
        },
        {
          label: 'Compliance alerts',
          hint: 'Open items across KYC, mandates and licences.',
          value: formatCount(DashboardKpis.openAlerts),
          delta: DashboardKpis.openAlertsDelta,
          caption: '2 high severity',
        },
      ]}
    />
  );
}
