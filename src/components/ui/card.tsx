import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps): React.JSX.Element {
  return (
    <section
      className={cn(
        'rounded-[var(--radius-card)] border border-line bg-surface',
        className,
      )}
    >
      {children}
    </section>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
};

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps): React.JSX.Element {
  return (
    <header className={cn('flex items-start justify-between gap-4 border-b border-line px-4 py-3', className)}>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-[13px] text-ink-muted">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

export function CardBody({ children, className }: CardProps): React.JSX.Element {
  return <div className={cn('p-4', className)}>{children}</div>;
}
