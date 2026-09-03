export type DateRangePreset = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Custom';

export type SeriesPoint = {
  label: string;
  value: number;
};

export type StackedPoint = {
  label: string;
  segments: { key: string; value: number }[];
};

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
};
