import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { MenuCell } from '@/components/ui/row-menu';
import { Table, Td } from '@/components/ui/table';
import type { Transaction, TransactionKind, TransactionStatus } from '@/types/investor.types';
import { formatDate, formatInr } from '@/utils/format';

const Headers = ['Date', 'Type', 'Fund', 'Folio', 'Amount', 'Status'] as const;

const StatusTone: Record<TransactionStatus, BadgeTone> = {
  Completed: 'success',
  Pending: 'warn',
  Failed: 'danger',
};

const KindTone: Record<TransactionKind, BadgeTone> = {
  SIP: 'brand',
  Lumpsum: 'violet',
  Redemption: 'neutral',
  Switch: 'neutral',
};

type TransactionsPanelProps = {
  transactions: Transaction[];
};

export function TransactionsPanel({ transactions }: TransactionsPanelProps): React.JSX.Element {
  const failed = transactions.filter((entry) => entry.status === 'Failed').length;

  return (
    <Card>
      <CardHeader
        title="Transactions"
        subtitle="Every debit, purchase and redemption on the account."
        action={
          failed > 0 ? (
            <Badge tone="danger" dot>
              {failed} failed
            </Badge>
          ) : (
            <span className="tabular text-[12.5px] text-ink-muted">{transactions.length} entries</span>
          )
        }
      />

      <Table headers={Headers} withMenu>
        {transactions.map((entry) => (
          <tr key={entry.id} className="transition-colors hover:bg-surface-sunken">
            <Td className="tabular whitespace-nowrap">{formatDate(entry.date)}</Td>
            <Td>
              <Badge tone={KindTone[entry.kind]}>{entry.kind}</Badge>
            </Td>
            <Td className="text-[13px] text-ink">{entry.fundName}</Td>
            <Td className="tabular text-[12.5px]">{entry.folio}</Td>
            <Td className="tabular font-semibold text-ink">{formatInr(entry.amount, { compact: false })}</Td>
            <Td>
              <Badge tone={StatusTone[entry.status]} dot>
                {entry.status}
              </Badge>
            </Td>

            <MenuCell
              label={`${entry.kind} on ${formatDate(entry.date)}`}
              items={[
                { label: 'View statement' },
                { label: 'Download receipt' },
                entry.status === 'Failed' ? { label: 'Retry debit' } : { label: 'Copy folio' },
              ]}
            />
          </tr>
        ))}
      </Table>
    </Card>
  );
}
