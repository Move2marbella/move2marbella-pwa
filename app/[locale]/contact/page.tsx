import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { TrackedWhatsAppLink } from "../../components/tracked-whatsapp-link";
import { getGeneralWhatsAppUrl } from "../../data/properties";
import { getLocale, getLocaleBasePath, locales, type Locale } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

const contactContent: Record<
  Locale,
  {
    body: string;
    cards: {
      emailBody: string;
      emailEyebrow: string;
      sellersBody: string;
      sellersEyebrow: string;
      sellersTitle: string;
      whatsappBody: string;
      whatsappEyebrow: string;
    };
    eyebrow: string;
    metaDescription: string;
    title: string;
  }
> = {
  en: {
    body: "Send a short brief and we will help you narrow the search, review areas or check whether a property price makes sense.",
    cards: {
      emailBody: "Useful for detailed briefs, documents and relocation questions.",
      emailEyebrow: "Email",
      sellersBody: "Estimate a realistic asking range before a seller conversation.",
      sellersEyebrow: "Sellers",
      sellersTitle: "Property valuation",
      whatsappBody: "Send your buying brief, preferred areas or property reference.",
      whatsappEyebrow: "Fastest",
    },
    eyebrow: "Contact",
    metaDescription:
      "Contact Move2Marbella for Costa del Sol property search, valuations and buyer advisory.",
    title: "Tell us what you are looking for",
  },
  es: {
    body: "Envia un breve resumen y te ayudaremos a acotar la busqueda, revisar zonas o comprobar si el precio de una vivienda tiene sentido.",
    cards: {
      emailBody: "Útil para briefs detallados, documentos y preguntas de relocation.",
      emailEyebrow: "Email",
      sellersBody: "Estima un rango realista antes de hablar con un propietario.",
      sellersEyebrow: "Propietarios",
      sellersTitle: "Tasacion de vivienda",
      whatsappBody: "Envia tu brief de compra, zonas preferidas o referencia de propiedad.",
      whatsappEyebrow: "Más rápido",
    },
    eyebrow: "Contacto",
    metaDescription:
      "Contacta con Move2Marbella para busqueda de propiedades, tasaciónes y asesoramiento comprador en la Costa del Sol.",
    title: "Cuentanos que estas buscando",
  },
  fr: {
    body: "Envoyez un bref cahier des charges et nous vous aiderons a affiner la recherche, comparer les secteurs ou verifier si un prix est coherent.",
    cards: {
      emailBody: "Utile pour les briefs detailles, documents et questions de relocation.",
      emailEyebrow: "Email",
      sellersBody: "Estimez une fourchette realiste avant une discussion avec un vendeur.",
      sellersEyebrow: "Vendeurs",
      sellersTitle: "Estimation immobilière",
      whatsappBody: "Envoyez votre brief d'achat, vos secteurs preferes ou une reference de bien.",
      whatsappEyebrow: "Le plus rapide",
    },
    eyebrow: "Contact",
    metaDescription:
      "Contactez Move2Marbella pour recherche immobilière, estimation et conseil acheteur sur la Costa del Sol.",
    title: "Dites-nous ce que vous recherchez",
  },
  de: {
    body: "Senden Sie uns kurz, was Sie suchen. Wir helfen bei der Eingrenzung, Lagebewertung oder Preisprufung einer Immobilie.",
    cards: {
      emailBody: "Gut für detaillierte Suchprofile, Dokumente und Relocation-Fragen.",
      emailEyebrow: "E-Mail",
      sellersBody: "Ermitteln Sie eine realistische Preisspanne vor dem Eigentumergesprach.",
      sellersEyebrow: "Verkäufer",
      sellersTitle: "Immobilienbewertung",
      whatsappBody: "Senden Sie Ihr Suchprofil, bevorzugte Lagen oder eine Immobilienreferenz.",
      whatsappEyebrow: "Am schnellsten",
    },
    eyebrow: "Kontakt",
    metaDescription:
      "Kontaktieren Sie Move2Marbella für Immobiliensuche, Bewertung und Käuferberatung an der Costa del Sol.",
    title: "Sagen Sie uns, wonach Sie suchen",
  },
  ru: {
    body: "Отправьте короткое описание запроса, и мы поможем сузить поиск, сравнить районы или проверить, насколько цена объекта логична.",
    cards: {
      emailBody: "Удобно для подробных запросов, документов и вопросов переезда.",
      emailEyebrow: "Email",
      sellersBody: "Оцените реалистичный диапазон цены перед разговором с собственником.",
      sellersEyebrow: "Продавцам",
      sellersTitle: "Оценка недвижимости",
      whatsappBody: "Отправьте ваш запрос, желаемые районы или референс объекта.",
      whatsappEyebrow: "Быстрее всего",
    },
    eyebrow: "Контакт",
    metaDescription:
      "Свяжитесь с Move2Marbella для поиска недвижимости, оценки и консультации покупателя на Costa del Sol.",
    title: "Расскажите, что вы ищете",
  },
  pl: {
    body: "Wyślij krótki opis, a pomożemy zawęzić poszukiwania, porównać lokalizacje lub sprawdzić, czy cena nieruchomości ma sens.",
    cards: {
      emailBody: "Dobre do szczegolowych briefow, dokumentow i pytan relokacyjnych.",
      emailEyebrow: "Email",
      sellersBody: "Oszacuj realistyczny zakres ceny przed rozmowa ze sprzedajacym.",
      sellersEyebrow: "Sprzedajacy",
      sellersTitle: "Wycena nieruchomości",
      whatsappBody: "Wyślij brief zakupu, preferowane okolice lub numer referencyjny nieruchomości.",
      whatsappEyebrow: "Najszybciej",
    },
    eyebrow: "Kontakt",
    metaDescription:
      "Skontaktuj się z Move2Marbella w sprawie wyszukiwania nieruchomości, wyceny i doradztwa kupującego na Costa del Sol.",
    title: "Napisz, czego szukasz",
  },
  hu: {
    body: "Írd meg röviden, mit keresel, és segítünk szűkíteni a keresést, átnézni a környékeket vagy ellenőrizni, hogy egy ár reális-e.",
    cards: {
      emailBody: "Részletes keresési igényhez, dokumentumokhoz és költözési kérdésekhez praktikus.",
      emailEyebrow: "Email",
      sellersBody: "Becsülj reális ársávot, mielőtt tulajdonossal beszélsz.",
      sellersEyebrow: "Eladók",
      sellersTitle: "Ingatlan értékbecslés",
      whatsappBody: "Küldd el, mit keresel, melyik környék érdekel, vagy az ingatlan referenciáját.",
      whatsappEyebrow: "Leggyorsabb",
    },
    eyebrow: "Kapcsolat",
    metaDescription:
      "Kapcsolat a Move2Marbella csapatával Costa del Sol ingatlankereséshez, értékbecsléshez és vevői tanácsadáshoz.",
    title: "Írd meg, mit keresel",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = contactContent[locale];

  return {
    title: page.title,
    description: page.metaDescription,
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
  const page = contactContent[locale];
  const basePath = getLocaleBasePath(locale);

  return (
    <ContentPageShell
      locale={locale}
      languagePath="/contact"
      eyebrow={page.eyebrow}
      title={page.title}
      body={page.body}
    >
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        <TrackedWhatsAppLink
          href={getGeneralWhatsAppUrl()}
          source="contact_page_whatsapp"
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            {page.cards.whatsappEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            WhatsApp
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            {page.cards.whatsappBody}
          </p>
        </TrackedWhatsAppLink>
        <a
          href="mailto:info@movetomarbella.com"
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            {page.cards.emailEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            info@movetomarbella.com
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            {page.cards.emailBody}
          </p>
        </a>
        <Link
          href={`${basePath}/valuation`}
          className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
            {page.cards.sellersEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            {page.cards.sellersTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4b4740]">
            {page.cards.sellersBody}
          </p>
        </Link>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
