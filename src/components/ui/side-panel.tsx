'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type SidePanelProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
};

/** Right-hand drawer used for agent / investor detail and note capture. */
export function SidePanel({
  open,
  title,
  subtitle,
  onClose,
  footer,
  children,
}: SidePanelProps): React.JSX.Element | null {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="flex-1 bg-navy/35 backdrop-blur-[2px]"
      />
      <aside className="scrollbar-thin flex w-full max-w-[460px] flex-col overflow-y-auto border-l border-line bg-surface shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface px-5 py-4">
          <div>
            <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-[13px] text-ink-muted">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="flex-1 px-5 py-5">{children}</div>
        {footer ? (
          <footer className="sticky bottom-0 border-t border-line bg-surface px-5 py-3.5">{footer}</footer>
        ) : null}
      </aside>
    </div>
  );
}
