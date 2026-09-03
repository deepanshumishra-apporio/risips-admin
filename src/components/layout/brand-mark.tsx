import { cn } from '@/utils/cn';

/**
 * The mark, taken from the mobile app's construction figures rather than
 * redrawn (see mobile-app/src/components/brand-mark.tsx).
 *
 * One unbroken stroke that turns four times, folds inward, and stops — it never
 * closes. The point sits in the corner the line left open, exactly on the left
 * and bottom axes. Everything derives from the stroke width, so the only
 * correct way to resize it is to scale the vector.
 */
const MarkGeometry = {
  size: 166,
  path: 'M14 106 L14 14 L152 14 L152 152 L64 152 L64 64',
  strokeWidth: 28,
  point: { x: 14, y: 152, radius: 14 },
} as const;

/** Ink on paper, or paper on ink — those are the two. */
type MarkTone = 'brand' | 'inverse';

const ToneColors: Record<MarkTone, { stroke: string; point: string }> = {
  brand: { stroke: 'var(--color-brand)', point: 'var(--color-mark-point)' },
  inverse: { stroke: '#ffffff', point: 'var(--color-mark-point-inverse)' },
};

type BrandMarkProps = {
  size?: number;
  tone?: MarkTone;
  className?: string;
};

export function BrandMark({ size = 28, tone = 'brand', className }: BrandMarkProps): React.JSX.Element {
  const colors = ToneColors[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${MarkGeometry.size} ${MarkGeometry.size}`}
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d={MarkGeometry.path}
        stroke={colors.stroke}
        strokeWidth={MarkGeometry.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx={MarkGeometry.point.x}
        cy={MarkGeometry.point.y}
        r={MarkGeometry.point.radius}
        fill={colors.point}
      />
    </svg>
  );
}

type BrandLockupProps = {
  tone?: MarkTone;
  className?: string;
};

export function BrandLockup({ tone = 'brand', className }: BrandLockupProps): React.JSX.Element {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <BrandMark size={30} tone={tone} />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-[-0.01em]">RiSips</span>
        <span className="block text-[10.5px] tracking-[0.09em] uppercase opacity-60">Admin Portal</span>
      </span>
    </span>
  );
}
