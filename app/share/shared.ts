import { notFound } from "next/navigation";

export type ShareListing = {
  slug: string;
  unbranded?: boolean;
  agent?: {
    avatar?: string | null;
    email?: string | null;
    name: string;
  };
  listing: {
    address?: string | null;
    bathrooms?: number | null;
    bedrooms?: number | null;
    builtArea?: number | null;
    condition?: string | null;
    description?: string | null;
    fieldNotes?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    orientation?: string | null;
    photos: Array<{ alt: string; url: string }>;
    plotArea?: number | null;
    price: string;
    propertyType?: string | null;
    reference?: string;
    resalesRef?: string | null;
    status: string;
    terraceSize?: number | null;
    title: string;
    view?: string | null;
  };
};

const agentCrmUrl = (
  process.env.AGENT_CRM_PUBLIC_API_URL ?? "https://agent.move2marbella.com"
).replace(/\/$/, "");

export async function getSharedListing(slug: string, unbranded = false) {
  const query = unbranded ? "?mode=unbranded" : "";
  const response = await fetch(`${agentCrmUrl}/api/public/listing-shares/${slug}${query}`, {
    cache: "no-store",
  });

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Unable to load shared listing.");
  return (await response.json()) as ShareListing;
}

export function factValue(value?: number | string | null, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  return `${value}${suffix}`;
}
