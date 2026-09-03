import type { StackedPoint } from '@/types/chart.types';

type StackedBarChartProps = {
  data: StackedPoint[];
  colors: Record<string, string>;
  height?: number;
};

const Width = 640;

/** Lumpsum breakdown — each bar splits into its asset-class segments. */
export function StackedBarChart({ data, colors, height = 220 }: StackedBarChartProps): React.JSX.Element {
  const totals = data.map((point) => point.segments.reduce((sum, segment) => sum + segment.value, 0));
  const max = Math.max(...totals) * 1.15;
  const plotHeight = height - 34;
  const slot = Width / data.length;
  const barWidth = Math.min(38, slot * 0.5);

  return (
    <svg viewBox={`0 0 ${Width} ${height}`} className="w-full" role="img" aria-label="Lumpsum breakdown">
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
        <line
          key={ratio}
          x1={0}
          x2={Width}
          y1={6 + ratio * (plotHeight - 12)}
          y2={6 + ratio * (plotHeight - 12)}
          stroke="var(--color-line)"
          strokeDasharray="3 5"
        />
      ))}

      {data.map((point, index) => {
        const x = index * slot + (slot - barWidth) / 2;
        let cursor = plotHeight;

        return (
          <g key={point.label}>
            {point.segments.map((segment) => {
              const segmentHeight = (segment.value / max) * (plotHeight - 12);
              cursor -= segmentHeight;

              return (
                <rect
                  key={segment.key}
                  x={x}
                  y={cursor}
                  width={barWidth}
                  height={Math.max(0, segmentHeight - 1)}
                  rx={3}
                  fill={colors[segment.key]}
                />
              );
            })}
            <text
              x={x + barWidth / 2}
              y={height - 8}
              textAnchor="middle"
              className="fill-[var(--color-ink-muted)] text-[11px]"
            >
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
