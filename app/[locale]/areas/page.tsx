import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type AreasPageProps = {
  params: Promise<{ locale: string }>;
};

const areaGuides = [
  {
    area: "Benahavis",
    vibe:
      "A picturesque Andalusian mountain village inland between Marbella and Estepona, surrounded by natural parkland and river valleys.",
    property:
      "A prime target for luxury real estate buyers seeking privacy, mountain views and exclusive residential zones.",
    lifestyle:
      "Quiet, nature-focused living with hiking, golf access and traditional village culture, including authentic flamenco evenings.",
  },
  {
    area: "Elviria",
    vibe:
      "A vibrant Marbella East coastal community with quick access to Marbella town centre.",
    property:
      "Popular with buyers looking for tranquil, high-end beachside homes and family-friendly residential settings outside the city centre.",
    lifestyle:
      "Known for golden sandy beaches and luxury lifestyle anchors such as Nikki Beach, beach clubs and premium coastal dining.",
  },
  {
    area: "Estepona",
    vibe:
      "A lively coastal town west of Marbella with an authentic Spanish old town, fishing port, flower-lined streets and distinct zones such as the New Golden Mile, Centro and West Estepona.",
    property:
      "Strong value compared with more established hotspots, with modern residential hubs such as Las Mesas benefiting from infrastructure investment.",
    lifestyle:
      "Family-friendly, with international schools, healthcare, golf, marina life, beach promenade and beaches such as Playa del Cristo.",
  },
  {
    area: "Golden Mile",
    vibe:
      "A prestigious stretch connecting Marbella town centre with Puerto Banus, globally associated with exclusivity and prestige.",
    property:
      "One of the Costa del Sol's highest-value addresses, focused on luxury villas, beachside estates, branded residences and prime apartments.",
    lifestyle:
      "Close to Marbella Club, Puente Romano, beach restaurants, fine dining, designer services and quick access to both Marbella and Puerto Banus.",
  },
  {
    area: "Marbella",
    vibe:
      "A highly walkable urban centre combining the Casco Antiguo, Moorish walls, Plaza de los Naranjos, beaches and city services.",
    property:
      "Dense and varied market with older character properties suitable for refurbishment, plus frontline beach apartments and central lock-up-and-leave homes.",
    lifestyle:
      "Offers a long Paseo Maritimo, semi-urban beaches such as El Cable and La Venus, shopping on Ricardo Soriano and healthcare including Quironsalud and Hospital Ochoa.",
  },
  {
    area: "Mijas Costa",
    vibe:
      "A diverse municipality split between coastal zones such as Mijas Costa and La Cala, and Mijas Pueblo, a white-washed mountain village above the coast.",
    property:
      "Popular with tourists and expats, offering residential urbanisations, golf valley properties and coastal homes.",
    lifestyle:
      "Mixes history and leisure with traditional architecture, AquaMijas, hiking routes and a contemporary art museum with works linked to Picasso and Dali.",
  },
  {
    area: "La Quinta",
    vibe:
      "An exclusive residential and golfing enclave inland within the broader Benahavis municipality.",
    property:
      "Sought-after by buyers looking for premium hill properties above the coast, often with golf, mountain and sea views.",
    lifestyle:
      "Quiet, residential and golf-oriented, with easy access back down to Nueva Andalucia, Puerto Banus and Marbella.",
  },
  {
    area: "La Zagaleta",
    vibe:
      "A private, ultra-luxury estate area within Benahavis and one of the most exclusive addresses on the Costa del Sol.",
    property:
      "Focused on premier luxury villas, large plots, privacy, security and high-end mountain living.",
    lifestyle:
      "Designed for privacy, space and discretion, with gated access, golf, nature and panoramic surroundings.",
  },
  {
    area: "Puerto Banus",
    vibe:
      "A world-famous luxury marina west of the Golden Mile, known as a high-energy destination for yachts, celebrities and affluent visitors.",
    property:
      "Dominated by high-end waterfront apartments and penthouses, with strong rental appeal due to its global holiday profile.",
    lifestyle:
      "Designer shopping, nightlife, beach clubs, marina restaurants and luxury brands such as Louis Vuitton, Dior and Rolex.",
  },
  {
    area: "Nueva Andalucia",
    vibe:
      "A tranquil, family-friendly district just north of Puerto Banus, bounded by the Guadaiza and Verde rivers and known as Golf Valley.",
    property:
      "Highly diverse market, from apartments to ultra-luxury villas and branded developments, attracting both lifestyle and investment buyers.",
    lifestyle:
      "Home to Aloha, Los Naranjos and Las Brisas golf courses, Aloha College, The American College in Spain, Turtle Lake and restaurants such as Breathe, Vovem Grill and Cortes Garden.",
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AreasPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return {
    title: "Costa del Sol area guides",
    description:
      "Compact Move2Marbella area guides for Marbella, Estepona, Benahavis and the Costa del Sol property market.",
    alternates: {
      canonical: getLocalizedPath(locale, "/areas"),
      languages: getLanguageAlternates("/areas"),
    },
    robots: getPageRobots(),
  };
}

export default async function AreasPage({ params }: AreasPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return (
    <ContentPageShell
      locale={locale}
      eyebrow="Area guides"
      title="Where to buy on the Costa del Sol"
      body="Choose the right area before choosing the property. These compact guides compare lifestyle, property logic and buyer fit across Marbella, Estepona, Benahavis and the wider Costa del Sol."
    >
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {areaGuides.map((guide) => (
            <article
              id={guide.area.toLowerCase().replaceAll(" ", "-")}
              key={guide.area}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
                Costa del Sol
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{guide.area}</h2>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    Location & vibe
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.vibe}
                  </p>
                </div>
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    Property & investment
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.property}
                  </p>
                </div>
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    Amenities & lifestyle
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.lifestyle}
                  </p>
                </div>
              </div>
              <Link
                href={`/${locale}`}
                className="mt-4 inline-flex rounded-full border border-[#0f253d] px-4 py-2 text-sm font-semibold text-[#0f253d]"
              >
                View properties
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
