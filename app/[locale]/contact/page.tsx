import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { TrackedWhatsAppLink } from "../../components/tracked-whatsapp-link";
import { getGeneralWhatsAppUrl } from "../../data/properties";
import { getLocale, locales } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return {
    title: "Contact Move2Marbella",
    description:
      "Contact Move2Marbella for Costa del Sol property search, valuations and buyer advisory.",
    alternates: {
      canonical: getLocalizedPath(locale, "/contact"),
      languages: getLanguageAlternates("/contact"),
    },
    robots: getPageRobots(),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  return (
    <ContentPageShell
      locale={locale}
      eyebrow="Contact"
      title="Tell us what you are looking for"
      body="Send a short brief and we will help you narrow the search, review areas or check whether a property price makes sense."
    >
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        <TrackedWhatsAppLink
          href={getGeneralWhatsAppUrl()}
          source="contact_page_whatsapp"
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            Fastest
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            WhatsApp
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            Send your buying brief, preferred areas or property reference.
          </p>
        </TrackedWhatsAppLink>
        <a
          href="mailto:info@movetomarbella.com"
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            Email
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            info@movetomarbella.com
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            Useful for detailed briefs, documents and relocation questions.
          </p>
        </a>
        <Link
          href={`/${locale}/valuation`}
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            Sellers
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            Property valuation
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            Estimate a realistic asking range before a seller conversation.
          </p>
        </Link>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
