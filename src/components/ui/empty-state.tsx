import type { ReactNode } from 'react';

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="mb-1 flex size-11 items-center justify-center rounded-full bg-surface-sunken text-ink-muted">
        {icon}
      </span>
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <p className="max-w-sm text-[13px] text-ink-muted">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
