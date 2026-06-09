/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { ValuationLeadGate } from "../components/valuation-lead-gate";
import { buildValuation, type ValuationInput } from "../data/valuation";
import { SITE_URL } from "../lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Property valuation",
  description:
    "Estimate a Costa del Sol property value using Move2Marbella listings and public Notariado market benchmarks.",
};

export type ValuationSearchParams = {
  area?: string;
  bedrooms?: string;
  built_area?: string;
  condition?: string;
  municipality?: string;
  outdoor_space?: string;
  parking?: string;
  postal_code?: string;
  property_type?: string;
};

type ValuationPageProps = {
  searchParams: Promise<ValuationSearchParams>;
};

const propertyTypes = [
  "Apartment",
  "Penthouse",
  "Townhouse",
  "Villa",
  "Plot",
];

const municipalities = ["Marbella", "Estepona", "Benahavis", "Mijas", "Malaga"];

const formatEuro = new Intl.NumberFormat("en-GB", {
  currency: "EUR",
  maximumFractionDigits: 0,
  style: "currency",
});

const formatNumber = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 0,
});

function getNumber(value: string | undefined, fallback: number) {
  const number = Number(value);

  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function getInput(searchParams: ValuationSearchParams): ValuationInput {
  return {
    area: searchParams.area?.trim() || "Nueva Andalucia",
    bedrooms: searchParams.bedrooms ? getNumber(searchParams.bedrooms, 3) : 3,
    builtArea: getNumber(searchParams.built_area, 140),
    condition: searchParams.condition || "good",
    municipality: searchParams.municipality?.trim() || "Marbella",
    outdoorSpace: searchParams.outdoor_space || "terrace",
    parking: searchParams.parking || "garage",
    postalCode: searchParams.postal_code?.trim() || "29660",
    propertyType: searchParams.property_type || "Apartment",
  };
}

function hasUserInput(searchParams: ValuationSearchParams) {
  return Object.values(searchParams).some((value) => Boolean(value));
}

function formatWeight(weight: number) {
  return `${Math.round(weight * 100)}%`;
}

function getConfidenceLabel(confidence: "early" | "standard" | "strong") {
  if (confidence === "strong") {
    return "Strong";
  }

  if (confidence === "standard") {
    return "Standard";
  }

  return "Early signal";
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-[#0f253d]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-12 w-full rounded-md border border-[#d8d0c2] bg-white px-4 text-base text-[#171717] outline-none transition focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20"
    />
  );
}

export default async function ValuationPage({ searchParams }: ValuationPageProps) {
  const params = await searchParams;
  const input = getInput(params);
  const shouldShowResult = hasUserInput(params);
  const valuation = shouldShowResult ? await buildValuation(input) : null;

  return <ValuationContent input={input} valuation={valuation} />;
}

export async function ValuationContent({
  input,
  valuation,
}: {
  input: ValuationInput;
  valuation: Awaited<ReturnType<typeof buildValuation>> | null;
}) {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Move2Marbella Property Valuation",
          applicationCategory: "RealEstateApplication",
          url: `${SITE_URL}/valuation`,
        }}
      />

      <section className="relative overflow-hidden bg-[#0f253d] text-white">
        <img
          src="/move2marbella-panorama.jpg"
          alt="Marbella and the Costa del Sol"
          className="absolute inset-0 h-full w-full object-cover opacity-32"
        />
        <div className="absolute inset-0 bg-[#0f253d]/78" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="leading-tight">
              <img
                src="/m2m_logo_white_web.png"
                alt="Move2Marbella"
                className="h-auto w-44 sm:w-56"
              />
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f253d] shadow-sm"
            >
              Search properties
            </Link>
          </header>

          <div className="grid gap-10 pb-12 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#ba9456]">
                Seller intelligence
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Costa del Sol property valuation
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
                Combine Move2Marbella active listing comparables with public
                Notariado transaction benchmarks to estimate a realistic asking
                range before speaking with an owner.
              </p>
            </div>

            <form
              action="/valuation"
              className="grid gap-4 rounded-lg bg-[#f7f2ea] p-4 text-[#171717] shadow-2xl shadow-black/20 sm:grid-cols-2 sm:p-5"
            >
              <Field label="Municipality">
                <Select name="municipality" defaultValue={input.municipality}>
                  {municipalities.map((municipality) => (
                    <option key={municipality}>{municipality}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Area or urbanisation">
                <Input name="area" defaultValue={input.area} placeholder="Nueva Andalucia" />
              </Field>
              <Field label="Postal code">
                <Input
                  inputMode="numeric"
                  name="postal_code"
                  defaultValue={input.postalCode}
                  placeholder="29660"
                />
              </Field>
              <Field label="Property type">
                <Select name="property_type" defaultValue={input.propertyType}>
                  {propertyTypes.map((propertyType) => (
                    <option key={propertyType}>{propertyType}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Built area">
                <Input
                  inputMode="numeric"
                  min={20}
                  name="built_area"
                  type="number"
                  defaultValue={input.builtArea}
                />
              </Field>
              <Field label="Bedrooms">
                <Input
                  inputMode="numeric"
                  min={0}
                  name="bedrooms"
                  type="number"
                  defaultValue={input.bedrooms}
                />
              </Field>
              <Field label="Condition">
                <Select name="condition" defaultValue={input.condition}>
                  <option value="renovate">Needs renovation</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                  <option value="luxury">Luxury / turnkey</option>
                </Select>
              </Field>
              <Field label="Outdoor space">
                <Select name="outdoor_space" defaultValue={input.outdoorSpace}>
                  <option value="none">None</option>
                  <option value="terrace">Terrace</option>
                  <option value="garden">Garden</option>
                  <option value="pool">Private pool</option>
                </Select>
              </Field>
              <Field label="Parking">
                <Select name="parking" defaultValue={input.parking}>
                  <option value="none">No parking</option>
                  <option value="street">Street parking</option>
                  <option value="garage">Garage</option>
                  <option value="multiple">Multiple spaces</option>
                </Select>
              </Field>
              <div className="flex items-end">
                <button className="h-12 w-full rounded-md bg-[#ba9456] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#a37f43]">
                  Calculate estimate
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {valuation ? (
          <>
            <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ba9456]">
                    Indicative range
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#0f253d] sm:text-4xl">
                    {formatEuro.format(valuation.estimate.low)} -{" "}
                    {formatEuro.format(valuation.estimate.high)}
                  </h2>
                  <p className="mt-2 text-sm text-[#5c564d]">
                    Midpoint {formatEuro.format(valuation.estimate.mid)} at{" "}
                    {formatEuro.format(valuation.estimate.pricePerSquareMetre)} / m2
                  </p>
                </div>
                <span className="rounded-full bg-[#0f253d] px-4 py-2 text-sm font-semibold text-white">
                  {getConfidenceLabel(valuation.estimate.confidence)}
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Property"
                  value={`${input.builtArea} m2`}
                  detail={`${input.propertyType} in ${input.area}`}
                />
                <Metric
                  label="Confidence"
                  value={getConfidenceLabel(valuation.estimate.confidence)}
                  detail="Detailed source quality after contact"
                />
                <Metric
                  label="Report"
                  value="Ready"
                  detail="Benchmarks and comparables available"
                />
              </div>
            </div>

            <ValuationLeadGate
              estimateSummary={`${formatEuro.format(valuation.estimate.low)} - ${formatEuro.format(valuation.estimate.high)}`}
              propertySummary={`${input.propertyType}, ${input.builtArea} m2 in ${input.area}, ${input.municipality}`}
            >
              <div className="grid gap-8 lg:col-span-2 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-2xl font-semibold text-[#0f253d]">
                    Source breakdown
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Metric
                      label="Own listing comps"
                      value={String(valuation.sources.ownListings.count)}
                      detail={`Weight ${formatWeight(valuation.sources.ownListings.weight)}`}
                    />
                    <Metric
                      label="Notariado benchmark"
                      value={
                        valuation.sources.notariado.benchmark
                          ? formatEuro.format(
                              valuation.sources.notariado.benchmark
                                .pricePerSquareMetre,
                            )
                          : "No match"
                      }
                      detail={`Weight ${formatWeight(valuation.sources.notariado.weight)}`}
                    />
                    <Metric
                      label="Market benchmark"
                      value={
                        valuation.sources.realadvisor.averagePricePerSquareMetre
                          ? formatEuro.format(
                              valuation.sources.realadvisor
                                .averagePricePerSquareMetre,
                            )
                          : "Pending"
                      }
                      detail={`Weight ${formatWeight(valuation.sources.realadvisor.weight)}`}
                    />
                  </div>

                  <div className="mt-7 rounded-lg bg-[#f7f2ea] p-4">
                    <h3 className="text-lg font-semibold text-[#0f253d]">
                      Source logic
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5c564d]">
                      Own listings represent active asking prices. Notariado
                      gives a public transaction benchmark by postal code or
                      municipality. The RealAdvisor slot is currently a public
                      market benchmark and can be replaced with an approved data
                      feed later.
                    </p>
                  </div>
                </div>

                <aside className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-2xl font-semibold text-[#0f253d]">
                    Benchmark details
                  </h2>
                  <dl className="mt-5 grid gap-4 text-sm">
                    <Detail
                      label="Area"
                      value={`${input.area}, ${input.municipality}`}
                    />
                    <Detail
                      label="Property"
                      value={`${input.propertyType}, ${input.builtArea} m2`}
                    />
                    <Detail
                      label="Notariado area"
                      value={
                        valuation.sources.notariado.benchmark
                          ? `${valuation.sources.notariado.benchmark.label} (${valuation.sources.notariado.benchmark.geography})`
                          : "No public match"
                      }
                    />
                    <Detail
                      label="Transactions"
                      value={
                        valuation.sources.notariado.benchmark
                          ? formatNumber.format(
                              valuation.sources.notariado.benchmark.sales,
                            )
                          : "-"
                      }
                    />
                    <Detail
                      label="Adjustments"
                      value={`${Math.round(
                        (valuation.adjustments.condition +
                          valuation.adjustments.outdoorSpace +
                          valuation.adjustments.parking) *
                          100,
                      )}%`}
                    />
                  </dl>
                </aside>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-[#0f253d]">
                  Comparable listings
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {valuation.sources.ownListings.comparables.length ? (
                    valuation.sources.ownListings.comparables.map((property) => (
                      <Link
                        key={property.ref}
                        href={property.href}
                        className="rounded-lg border border-[#ded6c8] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ba9456]">
                          {property.ref}
                        </p>
                        <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold text-[#0f253d]">
                          {property.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#5c564d]">
                          {property.location}
                        </p>
                        <div className="mt-4 flex items-end justify-between gap-3">
                          <span className="text-lg font-semibold text-[#171717]">
                            {property.price}
                          </span>
                          <span className="text-sm text-[#5c564d]">
                            {formatEuro.format(property.pricePerSquareMetre)} / m2
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-lg border border-[#ded6c8] bg-white p-5 text-sm text-[#5c564d] md:col-span-2 xl:col-span-4">
                      No close active listing comparables were found for this
                      exact area/type/size combination yet. The estimate falls
                      back to public benchmarks until more matching listings are
                      available.
                    </p>
                  )}
                </div>
              </div>
            </ValuationLeadGate>
          </>
        ) : (
          <div className="rounded-lg border border-[#ded6c8] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#0f253d]">
              Ready for the first valuation
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c564d]">
              Fill in the form above to generate an indicative owner-facing
              range. The result will show the blend between active Move2Marbella
              listings, public Notariado transaction data and the external market
              benchmark slot.
            </p>
          </div>
        )}

        <p className="text-xs leading-5 text-[#6d6559] lg:col-span-2">
          This tool is a market estimate for lead qualification and seller
          conversations. It is not an official bank valuation or a regulated
          tasacion. Public benchmark use should remain targeted and cached rather
          than copied as a bulk dataset.
        </p>
      </section>
    </main>
  );
}

function Metric({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#ded6c8] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d6559]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#0f253d]">{value}</p>
      <p className="mt-1 text-sm text-[#5c564d]">{detail}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#ece5d8] pb-3">
      <dt className="text-[#6d6559]">{label}</dt>
      <dd className="text-right font-semibold text-[#0f253d]">{value}</dd>
    </div>
  );
}
