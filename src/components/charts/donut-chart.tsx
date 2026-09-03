import type { DonutSlice } from '@/types/chart.types';

type DonutChartProps = {
  slices: DonutSlice[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
};

const Thickness = 18;

/** Allocation donut used in the wizard review step and portfolio cards. */
export function DonutChart({ slices, size = 168, centerLabel, centerValue }: DonutChartProps): React.JSX.Element {
  const radius = (size - Thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Asset allocation">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {slices.map((slice) => {
          const length = (slice.value / total) * circumference;
          const dash = `${Math.max(0, length - 2)} ${circumference - Math.max(0, length - 2)}`;
          const element = (
            <circle
              key={slice.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={Thickness}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += length;
          return element;
        })}
      </g>

      {centerValue ? (
        <text
          x={size / 2}
          y={size / 2 - 2}
          textAnchor="middle"
          className="fill-[var(--color-ink)] text-[19px] font-semibold"
        >
          {centerValue}
        </text>
      ) : null}
      {centerLabel ? (
        <text x={size / 2} y={size / 2 + 16} textAnchor="middle" className="fill-[var(--color-ink-muted)] text-[11px]">
          {centerLabel}
        </text>
      ) : null}
    </svg>
  );
}
