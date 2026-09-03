import { AlertTriangle, Banknote, FileCheck2, UserRoundCheck } from 'lucide-react';

import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Table, Td } from '@/components/ui/table';
import type { DocumentStatus, InvestorDetail, MandateStatus } from '@/types/investor.types';
import { formatDate, formatInr } from '@/utils/format';

const DocumentTone: Record<DocumentStatus, BadgeTone> = {
  Verified: 'success',
  Pending: 'warn',
  Rejected: 'danger',
  Expired: 'danger',
};

const MandateTone: Record<MandateStatus, BadgeTone> = {
  Active: 'success',
  Pending: 'warn',
  Failed: 'danger',
  Cancelled: 'neutral',
};

type CompliancePanelProps = {
  detail: InvestorDetail;
};

export function CompliancePanel({ detail }: CompliancePanelProps): React.JSX.Element {
  const { mandate, bank, nominee, documents } = detail;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="SIP mandate"
            subtitle={mandate.type}
            action={
              <Badge tone={MandateTone[mandate.status]} dot>
                {mandate.status}
              </Badge>
            }
          />
          <CardBody className="space-y-3">
            <dl className="grid grid-cols-2 gap-3">
              {[
                { label: 'Reference', value: mandate.reference },
                { label: 'Debit date', value: `${mandate.sipDate} of every month` },
                { label: 'Mandate cap', value: formatInr(mandate.maxAmount, { compact: false }) },
                { label: 'Registered', value: formatDate(mandate.registeredAt) },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[11.5px] text-ink-muted">{row.label}</dt>
                  <dd className="tabular text-[13px] font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            {mandate.status !== 'Active' ? (
              <div className="flex items-start gap-2 rounded-md border border-warn/30 bg-warn-soft px-3 py-2">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warn" />
                <p className="text-[12.5px] text-ink-soft">
                  Debits will not go through until the mandate is re-registered with the bank.
                </p>
              </div>
            ) : null}

            <Button size="sm" icon={<Banknote className="size-3.5" />}>
              Re-register mandate
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Bank and nominee" subtitle="Payout account and succession declaration" />
          <CardBody className="space-y-4">
            <dl className="grid grid-cols-2 gap-3">
              {[
                { label: 'Bank', value: bank.bank },
                { label: 'Account', value: bank.accountMasked },
                { label: 'IFSC', value: bank.ifsc },
                { label: 'Type', value: bank.type },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[11.5px] text-ink-muted">{row.label}</dt>
                  <dd className="tabular text-[13px] font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-line pt-3">
              {nominee === null ? (
                <div className="flex items-start gap-2 rounded-md border border-danger/25 bg-danger-soft px-3 py-2">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-danger" />
                  <p className="text-[12.5px] text-ink-soft">
                    No nominee on record. The declaration is mandatory before the next purchase.
                  </p>
                </div>
              ) : (
                <p className="flex items-center gap-2 text-[13px] text-ink">
                  <UserRoundCheck className="size-4 text-success" />
                  {nominee.name}
                  <span className="text-ink-muted">
                    {nominee.relationship} · {nominee.share}%
                  </span>
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="KYC documents"
          subtitle="What the registrar holds against this PAN."
          action={
            <Button size="sm" icon={<FileCheck2 className="size-3.5" />}>
              Request re-upload
            </Button>
          }
        />
        <Table headers={['Document', 'Identifier', 'Status', 'Last updated']}>
          {documents.map((document) => (
            <tr key={document.label} className="transition-colors hover:bg-surface-sunken">
              <Td className="text-[13px] font-medium text-ink">{document.label}</Td>
              <Td className="tabular">{document.identifier}</Td>
              <Td>
                <Badge tone={DocumentTone[document.status]} dot>
                  {document.status}
                </Badge>
              </Td>
              <Td className="tabular">{formatDate(document.updatedAt)}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
