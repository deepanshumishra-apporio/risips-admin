/** Indian-notation money, compacted to Cr / L so table columns stay narrow. */
export function formatInr(amount: number, opts?: { compact?: boolean }): string {
  const compact = opts?.compact ?? true;

  if (compact && Math.abs(amount) >= 10_000_000) {
    return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (compact && Math.abs(amount) >= 100_000) {
    return `₹${(amount / 100_000).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

/** Signed percentage, used for period-on-period deltas on the KPI tiles. */
export function formatDelta(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatCount(value: number): string {
  return value.toLocaleString('en-IN');
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function initialsOf(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
