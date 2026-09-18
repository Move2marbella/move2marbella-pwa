import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { TrackedWhatsAppLink } from "../../components/tracked-whatsapp-link";
import { getGeneralWhatsAppUrl } from "../../data/property-links";
import { getLocale, getLocaleBasePath, locales, type Locale } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";
import { getEditablePageContent } from "../../lib/editable-copy";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

type TeamMember = {
  bio: string;
  company: string;
  image?: string;
  initials: string;
  name: string;
  role: string;
};

const teamContent: Record<
  Locale,
  {
    body: string;
    eyebrow: string;
    members: TeamMember[];
    title: string;
  }
> = {
  en: {
    body: "You speak with a small local team that combines buyer advisory, rentals, administration and on-the-ground coordination.",
    eyebrow: "Team",
    title: "Meet the Move2Marbella team",
    members: [
      {
        bio: "Buyer-side strategy, market comparison and decision support for Costa del Sol property decisions.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Founder & Strategic Director",
      },
      {
        bio: "Local leadership and client coordination across Move2Marbella searches and buyer conversations.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Property search support, shortlist coordination and client communication during the buying process.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Senior Consultant",
      },
      {
        bio: "Rental coordination and practical support for owners, guests and rental-ready properties.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Rental Manager",
      },
      {
        bio: "Office administration, follow-up and process coordination so client requests move clearly.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Client support and local coordination for property enquiries, viewings and next steps.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Client Coordinator",
      },
    ],
  },
  es: {
    body: "Hablas con un pequeño equipo local que combina asesoramiento al comprador, alquileres, administración y coordinación sobre el terreno.",
    eyebrow: "Equipo",
    title: "Conoce al equipo de Move2Marbella",
    members: [
      {
        bio: "Estrategia para compradores, comparación de mercado y apoyo en decisiones inmobiliarias en la Costa del Sol.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Fundador y Director Estratégico",
      },
      {
        bio: "Dirección local y coordinación de clientes en búsquedas y conversaciones de compra.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Apoyo en la búsqueda, coordinación de preselecciones y comunicación con clientes durante la compra.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Consultora Senior",
      },
      {
        bio: "Coordinación de alquileres y apoyo práctico para propietarios, huéspedes e inmuebles listos para alquilar.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Responsable de Alquileres",
      },
      {
        bio: "Administración de oficina, seguimiento y coordinación de procesos para que cada solicitud avance con claridad.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Apoyo al cliente y coordinación local para consultas, visitas y próximos pasos.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Coordinadora de Clientes",
      },
    ],
  },
  fr: {
    body: "Vous échangez avec une petite équipe locale qui réunit conseil acheteur, locations, administration et coordination sur place.",
    eyebrow: "Équipe",
    title: "Rencontrez l'équipe Move2Marbella",
    members: [
      {
        bio: "Stratégie côté acheteur, comparaison de marché et aide à la décision immobilière sur la Costa del Sol.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Fondateur et Directeur Stratégique",
      },
      {
        bio: "Leadership local et coordination client pour les recherches et les échanges d'achat.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Aide à la recherche, coordination des sélections et communication client pendant le processus d'achat.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Consultante Senior",
      },
      {
        bio: "Coordination locative et soutien pratique pour propriétaires, invités et biens prêts à louer.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Responsable Locations",
      },
      {
        bio: "Administration, suivi et coordination des processus pour faire avancer clairement chaque demande.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Support client et coordination locale pour les demandes, visites et prochaines étapes.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Coordinatrice Client",
      },
    ],
  },
  de: {
    body: "Sie sprechen mit einem kleinen lokalen Team für Käuferberatung, Vermietung, Administration und Koordination vor Ort.",
    eyebrow: "Team",
    title: "Lernen Sie das Move2Marbella Team kennen",
    members: [
      {
        bio: "Käuferstrategie, Marktvergleich und Entscheidungsunterstützung für Immobilien an der Costa del Sol.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Gründer und Strategischer Direktor",
      },
      {
        bio: "Lokale Leitung und Kundenkoordination bei Suchprozessen und Käufergesprächen.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Unterstützung bei Immobiliensuche, Shortlist-Koordination und Kundenkommunikation im Kaufprozess.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Senior Consultant",
      },
      {
        bio: "Vermietungskoordination und praktische Unterstützung für Eigentümer, Gäste und vermietungsbereite Immobilien.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Rental Manager",
      },
      {
        bio: "Büroadministration, Nachverfolgung und Prozesskoordination für klare nächste Schritte.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Kundenbetreuung und lokale Koordination für Anfragen, Besichtigungen und nächste Schritte.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Kundenkoordinatorin",
      },
    ],
  },
  ru: {
    body: "Вы общаетесь с небольшой локальной командой: консультации покупателям, аренда, администрирование и координация на месте.",
    eyebrow: "Команда",
    title: "Познакомьтесь с командой Move2Marbella",
    members: [
      {
        bio: "Стратегия для покупателей, сравнение рынка и поддержка решений по недвижимости на Costa del Sol.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Основатель и Стратегический Директор",
      },
      {
        bio: "Локальное руководство и координация клиентов по поиску и переговорам о покупке.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Поддержка поиска, координация короткого списка и коммуникация с клиентами в процессе покупки.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Старший Консультант",
      },
      {
        bio: "Координация аренды и практическая поддержка собственников, гостей и объектов для аренды.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Менеджер по Аренде",
      },
      {
        bio: "Офисное администрирование, контроль задач и координация процессов для понятных следующих шагов.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Поддержка клиентов и локальная координация по запросам, просмотрам и следующим шагам.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Координатор Клиентов",
      },
    ],
  },
  pl: {
    body: "Rozmawiasz z małym lokalnym zespołem łączącym doradztwo kupującego, wynajem, administrację i koordynację na miejscu.",
    eyebrow: "Zespół",
    title: "Poznaj zespół Move2Marbella",
    members: [
      {
        bio: "Strategia po stronie kupującego, porównanie rynku i wsparcie decyzji dotyczących nieruchomości na Costa del Sol.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Założyciel i Dyrektor Strategiczny",
      },
      {
        bio: "Lokalne prowadzenie spraw i koordynacja klientów podczas wyszukiwania oraz rozmów zakupowych.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Wsparcie wyszukiwania, koordynacja shortlisty i komunikacja z klientem w procesie zakupu.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Senior Consultant",
      },
      {
        bio: "Koordynacja najmu i praktyczne wsparcie dla właścicieli, gości oraz nieruchomości gotowych do wynajmu.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Rental Manager",
      },
      {
        bio: "Administracja biura, follow-up i koordynacja procesu, aby zgłoszenia szły jasno do przodu.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Wsparcie klienta i lokalna koordynacja zapytań, oględzin oraz kolejnych kroków.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Koordynatorka Klientów",
      },
    ],
  },
  hu: {
    body: "Egy kis helyi csapattal beszélsz, ahol a vevői tanácsadás, a bérbeadás, az adminisztráció és a helyszíni koordináció egy kézben mozog.",
    eyebrow: "Csapat",
    title: "Ismerd meg a Move2Marbella csapatát",
    members: [
      {
        bio: "Vevői stratégia, piaci összehasonlítás és döntéstámogatás Costa del Sol ingatlanvásárlásokhoz.",
        company: "Move2Marbella",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        name: "Zsolt Miguel Horvath dr.",
        role: "Alapító és stratégiai vezető",
      },
      {
        bio: "Helyi vezetés és ügyfélkoordináció a Move2Marbella kereséseiben és vevői egyeztetéseiben.",
        company: "Move2Marbella",
        initials: "RB",
        name: "Regan Berger",
        role: "Managing Partner",
      },
      {
        bio: "Ingatlankeresési támogatás, shortlist-koordináció és ügyfélkommunikáció a vásárlási folyamatban.",
        company: "Move2Marbella",
        initials: "MI",
        name: "Maria Ivady",
        role: "Senior Consultant",
      },
      {
        bio: "Bérbeadási koordináció és gyakorlati támogatás tulajdonosoknak, vendégeknek és kiadásra kész ingatlanoknak.",
        company: "Welcome2Marbella",
        initials: "MB",
        name: "Mira Bartfai",
        role: "Rental Manager",
      },
      {
        bio: "Irodai adminisztráció, utánkövetés és folyamatkoordináció, hogy az ügyfélkérések tisztán haladjanak.",
        company: "Move2Marbella",
        initials: "AV",
        name: "Andrea Vida",
        role: "Office Manager",
      },
      {
        bio: "Ügyféltámogatás és helyi koordináció érdeklődésekhez, megtekintésekhez és következő lépésekhez.",
        company: "Move2Marbella",
        initials: "HS",
        name: "Hajnalka Ságodi",
        role: "Ügyfélkoordinátor",
      },
    ],
  },
};

export const contactContent: Record<
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
  const page = getEditablePageContent("contact", locale, contactContent[locale]);

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
  const page = getEditablePageContent("contact", locale, contactContent[locale]);
  const basePath = getLocaleBasePath(locale);
  const team = teamContent[locale];

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
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a3a]">
          {team.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-[#102844] sm:text-4xl">
          {team.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b4740]">
          {team.body}
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center gap-4">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={72}
                    height={72}
                    className="h-16 w-16 rounded-full object-cover ring-1 ring-[#e3d8c7] sm:h-[72px] sm:w-[72px]"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#102844] text-base font-semibold text-white ring-1 ring-[#e3d8c7] sm:h-[72px] sm:w-[72px]">
                    {member.initials}
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold leading-tight text-[#171717]">
                    {member.name}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#102844]">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#4b4740]">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 3600;
