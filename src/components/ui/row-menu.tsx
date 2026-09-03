'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

export type RowMenuItem = {
  label: string;
  tone?: 'default' | 'danger';
  onSelect?: () => void;
};

type RowMenuProps = {
  label: string;
  items: RowMenuItem[];
};

/** Trailing overflow menu on a table row. */
export function RowMenu({ label, items }: RowMenuProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          open ? 'bg-surface-sunken text-ink' : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
        )}
      >
        <MoreHorizontal className="size-4" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <ul className="absolute top-8 right-0 z-50 w-44 overflow-hidden rounded-lg border border-line bg-surface py-1 shadow-[0_8px_24px_rgba(11,21,36,0.12)]">
            {items.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full px-3 py-1.5 text-left text-[13px] transition-colors hover:bg-surface-sunken',
                    item.tone === 'danger' ? 'text-danger' : 'text-ink-soft',
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export function MenuCell({ label, items }: RowMenuProps): React.JSX.Element {
  return (
    <td className="px-4 py-3 align-middle">
      <RowMenu label={label} items={items} />
    </td>
  );
}
