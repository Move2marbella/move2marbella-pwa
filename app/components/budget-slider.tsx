"use client";

import { useMemo, useState } from "react";

type BudgetSliderProps = {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
};

const formatter = new Intl.NumberFormat("en-GB", {
  currency: "EUR",
  maximumFractionDigits: 0,
  style: "currency",
});

export function BudgetSlider({
  defaultValue,
  max,
  min,
  step,
}: BudgetSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const label = useMemo(() => formatter.format(value), [value]);

  return (
    <label className="grid min-w-0 gap-1 md:col-span-2">
      <span className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
        <span>Max price</span>
        <span className="whitespace-nowrap text-[#0f253d]">{label}</span>
      </span>
      <input type="hidden" name="max_price" value={value} />
      <input
        aria-label="Maximum property price"
        className="h-12 w-full min-w-0 accent-[#ba9456]"
        max={max}
        min={min}
        onChange={(event) => setValue(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
