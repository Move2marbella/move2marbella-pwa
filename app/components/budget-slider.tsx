"use client";

import { useMemo, useState } from "react";

type BudgetSliderProps = {
  defaultValue: number;
  label?: string;
};

const formatter = new Intl.NumberFormat("en-GB", {
  currency: "EUR",
  maximumFractionDigits: 0,
  style: "currency",
});

const budgetSteps = [
  ...Array.from({ length: 9 }, (_, index) => 200000 + index * 100000),
  ...Array.from({ length: 5 }, (_, index) => 1200000 + index * 200000),
  ...Array.from({ length: 37 }, (_, index) => 2500000 + index * 500000),
];

function getClosestStepIndex(value: number) {
  return budgetSteps.reduce((closestIndex, stepValue, index) => {
    const currentDistance = Math.abs(stepValue - value);
    const closestDistance = Math.abs(budgetSteps[closestIndex] - value);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
}

export function BudgetSlider({
  defaultValue,
  label = "Max price",
}: BudgetSliderProps) {
  const [stepIndex, setStepIndex] = useState(() =>
    getClosestStepIndex(defaultValue),
  );
  const value = budgetSteps[stepIndex];
  const priceLabel = useMemo(() => formatter.format(value), [value]);

  return (
    <label className="grid min-w-0 gap-1 md:col-span-2">
      <span className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
        <span>{label}</span>
        <span className="whitespace-nowrap text-[#0f253d]">{priceLabel}</span>
      </span>
      <input type="hidden" name="max_price" value={value} />
      <input
        aria-label="Maximum property price"
        className="budget-slider h-12 w-full min-w-0"
        max={budgetSteps.length - 1}
        min={0}
        onChange={(event) => setStepIndex(Number(event.target.value))}
        step={1}
        type="range"
        value={stepIndex}
      />
    </label>
  );
}
