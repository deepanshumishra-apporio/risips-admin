import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type TableProps = {
  headers: readonly string[];
  children: ReactNode;
  /** Adds the leading select column; rows supply their own <SelectCell />. */
  selectable?: boolean;
  /** Adds the trailing overflow column; rows supply their own <MenuCell />. */
  withMenu?: boolean;
  className?: string;
};

export function Table({
  headers,
  children,
  selectable = false,
  withMenu = false,
  className,
}: TableProps): React.JSX.Element {
  return (
    <div className={cn('scrollbar-thin overflow-x-auto', className)}>
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-sunken">
            {selectable ? (
              <th className="w-10 px-4 py-2.5">
                <input type="checkbox" className="size-3.5 accent-[var(--color-brand)]" aria-label="Select all" />
              </th>
            ) : null}

            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2.5 text-[11.5px] font-semibold tracking-[0.04em] text-ink-muted uppercase whitespace-nowrap"
              >
                {header}
              </th>
            ))}

            {withMenu ? <th className="w-12 px-4 py-2.5" /> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }): React.JSX.Element {
  return <td className={cn('px-4 py-3 text-[13.5px] text-ink-soft align-middle', className)}>{children}</td>;
}

export function SelectCell({ label }: { label: string }): React.JSX.Element {
  return (
    <td className="px-4 py-3 align-middle">
      <input type="checkbox" aria-label={`Select ${label}`} className="size-3.5 accent-[var(--color-brand)]" />
    </td>
  );
}
