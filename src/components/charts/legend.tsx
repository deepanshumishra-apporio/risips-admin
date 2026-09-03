type LegendItem = {
  label: string;
  color: string;
  value?: string;
};

type ChartLegendProps = {
  items: LegendItem[];
};

export function ChartLegend({ items }: ChartLegendProps): React.JSX.Element {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-[12.5px] text-ink-soft">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
          {item.value ? <span className="tabular font-semibold text-ink">{item.value}</span> : null}
        </li>
      ))}
    </ul>
  );
}
