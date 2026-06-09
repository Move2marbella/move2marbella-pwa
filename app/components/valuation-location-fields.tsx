"use client";

import { useMemo, useState } from "react";
import type { ValuationMunicipalityOption } from "../valuation/page";

type ValuationLocationFieldsProps = {
  areaLabel: string;
  municipalityLabel: string;
  options: ValuationMunicipalityOption[];
  postalCode: string;
  selectedArea: string;
  selectedMunicipality: string;
};

export function ValuationLocationFields({
  areaLabel,
  municipalityLabel,
  options,
  postalCode,
  selectedArea,
  selectedMunicipality,
}: ValuationLocationFieldsProps) {
  const [municipality, setMunicipality] = useState(selectedMunicipality);
  const currentMunicipality =
    options.find((option) => option.value === municipality) ?? options[0];
  const [area, setArea] = useState(
    currentMunicipality?.areas.some((option) => option.value === selectedArea)
      ? selectedArea
      : (currentMunicipality?.areas[0]?.value ?? ""),
  );
  const currentArea = useMemo(
    () =>
      currentMunicipality?.areas.find((option) => option.value === area) ??
      currentMunicipality?.areas[0],
    [area, currentMunicipality],
  );

  function changeMunicipality(value: string) {
    const nextMunicipality =
      options.find((option) => option.value === value) ?? options[0];

    setMunicipality(nextMunicipality.value);
    setArea(nextMunicipality.areas[0]?.value ?? "");
  }

  return (
    <>
      <label className="space-y-2 text-sm font-semibold text-[#0f253d]">
        <span>{municipalityLabel}</span>
        <select
          name="municipality"
          value={municipality}
          onChange={(event) => changeMunicipality(event.target.value)}
          className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-semibold text-[#0f253d]">
        <span>{areaLabel}</span>
        <select
          name="area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
        >
          {currentMunicipality?.areas.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <input
        type="hidden"
        name="postal_code"
        value={currentArea?.postalCode ?? postalCode}
      />
    </>
  );
}
