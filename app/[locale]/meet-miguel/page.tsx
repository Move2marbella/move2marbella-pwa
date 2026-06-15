import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContentPageShell } from "../../components/content-page-shell";
import { JsonLd } from "../../components/json-ld";
import { getLocale, getLocaleBasePath, locales, type Locale } from "../../i18n/translations";
import { SITE_URL, getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type MeetMiguelPageProps = {
  params: Promise<{ locale: string }>;
};

type Card = { text: string; title: string };
type Faq = { answer: string; question: string };

type MeetContent = {
  body: string;
  buyerEyebrow: string;
  buyerQuestions: string[];
  buyerTitle: string;
  eyebrow: string;
  faqs: Faq[];
  faqEyebrow: string;
  faqTitle: string;
  metaDescription: string;
  methodEyebrow: string;
  methodTitle: string;
  pillars: Card[];
  proofCards: Card[];
  supportBody: string[];
  supportEyebrow: string;
  supportTitle: string;
  title: string;
  whyBody: string[];
  whyEyebrow: string;
  whyTitle: string;
};

const enContent: MeetContent = {
  body:
    "Founder of Move2Marbella, Miguel helps international buyers choose the right area, understand the real price logic and move through the Marbella buying process with clarity.",
  buyerEyebrow: "Buyer questions",
  buyerQuestions: [
    "Which area fits your lifestyle, family needs or investment goals?",
    "Is the property genuinely well positioned, or simply well presented?",
    "What are the real purchase costs, ownership costs and renovation risks?",
    "How strong is the resale potential and rental logic?",
    "Are there hidden issues in the micro-location, community rules or price level?",
    "Does the shortlist match your long-term strategy, not only today's emotion?",
  ],
  buyerTitle: "The questions behind a confident purchase",
  eyebrow: "Costa del Sol buyer advisor",
  faqs: [
    {
      question: "Who is Miguel Horvath?",
      answer:
        "Miguel Horvath, also known as Zsolt Miguel Horvath or Dr. Horvath Zsolt Mihaly, is the founder of Move2Marbella and a Costa del Sol property advisor for international buyers.",
    },
    {
      question: "What makes Move2Marbella different?",
      answer:
        "The work is based on buyer advisory, not only listing search. The focus is area fit, micro-location, cost clarity, resale potential and a shortlist that makes sense.",
    },
    {
      question: "Which areas does Miguel focus on?",
      answer:
        "The main focus areas include Marbella, Estepona, Benahavis, Nueva Andalucia, the Golden Mile, San Pedro de Alcantara and other high-demand western Costa del Sol locations.",
    },
    {
      question: "Is the service only for Hungarian buyers?",
      answer:
        "No. Move2Marbella supports international buyers, while Hungarian-language advisory is an important advantage for clients who want local guidance in their own language.",
    },
  ],
  faqEyebrow: "Quick answers",
  faqTitle: "About Miguel and Move2Marbella",
  metaDescription:
    "Meet Miguel Zsolt Horvath, founder of Move2Marbella and Costa del Sol buyer advisor helping clients choose the right area, property and strategy.",
  methodEyebrow: "Move2Marbella method",
  methodTitle: "A structured way to compare properties",
  pillars: [
    { title: "Area fit", text: "Marbella, Estepona, Benahavis and the wider Costa del Sol are not one single market. Each micro-area behaves differently." },
    { title: "Property-type fit", text: "A beach apartment, golf villa, off-plan unit and refurbishment opportunity can all be attractive, but they serve different goals." },
    { title: "Micro-location quality", text: "Long-term satisfaction often depends on the exact setting, access, noise, community, views and liquidity of the location." },
    { title: "Cost clarity", text: "Move2Marbella looks beyond the asking price: taxes, legal costs, financing, community fees, maintenance and furnishing needs." },
    { title: "Resale and rental logic", text: "Some homes look impressive online but are weaker in future buyer demand. Others are quieter, but strategically stronger." },
    { title: "Coordinated support", text: "The process can include lawyers, tax advisers, mortgage specialists, banks and local professionals when needed." },
  ],
  proofCards: [
    { title: "Costa del Sol experience since 2010", text: "Miguel has advised international buyers across Marbella, Estepona, Benahavis, Nueva Andalucia, the Golden Mile and other prime western Costa del Sol areas." },
    { title: "Doctor and economist background", text: "His medical and economics training brings a structured, analytical way of thinking to a market where calm judgment matters." },
    { title: "Buyer-first advisory", text: "The goal is not to push the fastest transaction. It is to help you choose a property decision you can still defend years later." },
  ],
  supportBody: [
    "A purchase in Spain involves more than choosing the property. International buyers often need legal, tax, banking, mortgage and practical local support to keep the process secure and understandable.",
    "Miguel coordinates the advisory side with a trusted local network where needed, while keeping the buyer focused on the main objective: choosing the location, property and strategy that fit the plan.",
  ],
  supportEyebrow: "Support",
  supportTitle: "Before, during and after the purchase",
  title: "Meet Miguel Zsolt Horvath",
  whyBody: [
    "Buying in Marbella is rarely just about finding a beautiful home. Most buyers are really trying to understand the right area, the right property type, the right price level and the right buying strategy before committing.",
    "Move2Marbella was built around decision support. The aim is to reduce uncertainty, make the process easier to understand and help each buyer move forward with a shortlist that has been filtered properly.",
  ],
  whyEyebrow: "Why it matters",
  whyTitle: "Good advice is more than showing listings",
};

const meetContent: Record<Locale, MeetContent> = {
  en: enContent,
  es: {
    ...enContent,
    body: "Fundador de Move2Marbella, Miguel ayuda a compradores internacionales a elegir la zona correcta, entender la logica real del precio y avanzar con claridad.",
    buyerEyebrow: "Preguntas del comprador",
    buyerQuestions: [
      "Que zona encaja con tu estilo de vida, familia u objetivo de inversion?",
      "La propiedad esta realmente bien ubicada o solo se presenta bien?",
      "Cuales son los costes reales de compra, mantenimiento y reforma?",
      "Que fuerza tiene la reventa o el alquiler?",
      "Hay riesgos en la microlocalizacion, comunidad o nivel de precio?",
      "La lista corta encaja con tu estrategia, no solo con la emocion del momento?",
    ],
    buyerTitle: "Las preguntas detras de una compra segura",
    eyebrow: "Asesor comprador Costa del Sol",
    faqEyebrow: "Respuestas rapidas",
    faqTitle: "Sobre Miguel y Move2Marbella",
    metaDescription: "Conoce a Miguel Zsolt Horvath, fundador de Move2Marbella y asesor comprador en la Costa del Sol.",
    methodEyebrow: "Metodo Move2Marbella",
    methodTitle: "Una forma estructurada de comparar propiedades",
    proofCards: [
      { title: "Experiencia en la Costa del Sol desde 2010", text: "Miguel ha asesorado a compradores internacionales en Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile y otras zonas prime." },
      { title: "Doctor y economista", text: "Su formacion medica y economica aporta una forma analitica y ordenada de pensar en un mercado donde la calma importa." },
      { title: "Asesoramiento centrado en el comprador", text: "El objetivo no es empujar la transaccion mas rapida, sino ayudarte a tomar una decision defendible a largo plazo." },
    ],
    pillars: [
      { title: "Encaje de zona", text: "Marbella, Estepona, Benahavis y la Costa del Sol no son un unico mercado. Cada microlocalizacion se comporta distinto." },
      { title: "Encaje de tipo de propiedad", text: "Apartamento de playa, villa de golf, obra nueva o reforma pueden ser buenos, pero sirven objetivos diferentes." },
      { title: "Calidad de microlocalizacion", text: "La satisfaccion futura depende del entorno exacto, accesos, ruido, comunidad, vistas y liquidez." },
      { title: "Claridad de costes", text: "Move2Marbella mira mas alla del precio: impuestos, legal, financiacion, comunidad, mantenimiento y equipamiento." },
      { title: "Reventa y alquiler", text: "Algunas casas impresionan online pero son mas debiles en demanda futura. Otras son mas discretas pero estrategicamente mejores." },
      { title: "Soporte coordinado", text: "El proceso puede incluir abogados, asesores fiscales, hipotecas, bancos y profesionales locales." },
    ],
    supportBody: [
      "Comprar en Espana implica mas que elegir la propiedad. Muchos compradores internacionales necesitan apoyo legal, fiscal, bancario y practico.",
      "Miguel coordina la parte de asesoramiento con una red local cuando hace falta, manteniendo el foco en zona, propiedad y estrategia.",
    ],
    supportEyebrow: "Soporte",
    supportTitle: "Antes, durante y despues de la compra",
    title: "Conoce a Miguel Zsolt Horvath",
    whyBody: [
      "Comprar en Marbella no consiste solo en encontrar una vivienda bonita. La clave es entender zona, tipo de propiedad, nivel de precio y estrategia.",
      "Move2Marbella se basa en apoyo a la decision: reducir incertidumbre, explicar el proceso y crear una lista corta bien filtrada.",
    ],
    whyEyebrow: "Por que importa",
    whyTitle: "Un buen consejo es mas que mostrar listados",
    faqs: [
      { question: "Quien es Miguel Horvath?", answer: "Miguel Horvath, tambien Zsolt Miguel Horvath o Dr. Horvath Zsolt Mihaly, es fundador de Move2Marbella y asesor inmobiliario en la Costa del Sol." },
      { question: "Que hace diferente a Move2Marbella?", answer: "Trabajamos como asesores del comprador: zona, microlocalizacion, costes, reventa y una lista corta con sentido." },
      { question: "En que zonas se centra?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro y otras zonas de alta demanda." },
      { question: "Solo trabaja con compradores hungaros?", answer: "No. Move2Marbella apoya a compradores internacionales, aunque el asesoramiento en hungaro es una ventaja para muchos clientes." },
    ],
  },
  fr: {
    ...enContent,
    body: "Fondateur de Move2Marbella, Miguel aide les acheteurs internationaux a choisir le bon secteur, comprendre le vrai prix et avancer clairement.",
    buyerEyebrow: "Questions acheteur",
    buyerQuestions: ["Quel secteur correspond a votre style de vie ou objectif?", "Le bien est-il vraiment bien place ou seulement bien presente?", "Quels sont les couts reels d'achat et de detention?", "Quel est le potentiel de revente ou location?", "Y a-t-il des risques de microlocalisation ou de communaute?", "La shortlist sert-elle votre strategie a long terme?"],
    buyerTitle: "Les questions derriere un achat confiant",
    eyebrow: "Conseil acheteur Costa del Sol",
    faqEyebrow: "Reponses rapides",
    faqTitle: "A propos de Miguel et Move2Marbella",
    metaDescription: "Rencontrez Miguel Zsolt Horvath, fondateur de Move2Marbella et conseiller acheteur sur la Costa del Sol.",
    methodEyebrow: "Methode Move2Marbella",
    methodTitle: "Une facon structuree de comparer les biens",
    proofCards: [
      { title: "Experience Costa del Sol depuis 2010", text: "Miguel accompagne des acheteurs internationaux a Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile et autres zones prime." },
      { title: "Profil docteur et economiste", text: "Sa formation medicale et economique apporte une pensee analytique dans un marche ou le calme compte." },
      { title: "Conseil centre acheteur", text: "Le but n'est pas la transaction la plus rapide, mais une decision defendable dans le temps." },
    ],
    supportEyebrow: "Accompagnement",
    supportTitle: "Avant, pendant et apres l'achat",
    title: "Rencontrer Miguel Zsolt Horvath",
    whyEyebrow: "Pourquoi c'est important",
    whyTitle: "Un bon conseil va au-dela des annonces",
    faqs: [
      { question: "Qui est Miguel Horvath?", answer: "Miguel Horvath, aussi Zsolt Miguel Horvath, est le fondateur de Move2Marbella et conseiller immobilier sur la Costa del Sol." },
      { question: "Pourquoi Move2Marbella est different?", answer: "L'approche est orientee acheteur: secteur, microlocalisation, couts, revente et shortlist logique." },
      { question: "Quelles zones couvre-t-il?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro et autres zones demandees." },
      { question: "Uniquement pour acheteurs hongrois?", answer: "Non. Move2Marbella accompagne des acheteurs internationaux, avec un support hongrois quand utile." },
    ],
  },
  de: {
    ...enContent,
    body: "Als Grunder von Move2Marbella hilft Miguel internationalen Kaufern, die richtige Lage zu wahlen, Preislogik zu verstehen und klar zu kaufen.",
    buyerEyebrow: "Kauferfragen",
    buyerQuestions: ["Welche Lage passt zu Lebensstil, Familie oder Investment?", "Ist die Immobilie wirklich gut gelegen oder nur gut prasentiert?", "Welche Kauf-, Besitz- und Renovierungskosten entstehen?", "Wie stark sind Wiederverkauf und Vermietung?", "Gibt es Risiken bei Mikrolage, Community oder Preisniveau?", "Passt die Shortlist zur langfristigen Strategie?"],
    buyerTitle: "Fragen fur eine sichere Kaufentscheidung",
    eyebrow: "Kauferberater Costa del Sol",
    faqEyebrow: "Kurzantworten",
    faqTitle: "Uber Miguel und Move2Marbella",
    metaDescription: "Lernen Sie Miguel Zsolt Horvath kennen, Grunder von Move2Marbella und Kauferberater an der Costa del Sol.",
    methodEyebrow: "Move2Marbella Methode",
    methodTitle: "Strukturiert Immobilien vergleichen",
    proofCards: [
      { title: "Costa-del-Sol-Erfahrung seit 2010", text: "Miguel berat internationale Kaufer in Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile und weiteren Prime-Lagen." },
      { title: "Arzt und Okonom", text: "Medizinischer und wirtschaftlicher Hintergrund bringen analytische Ruhe in einen emotionalen Markt." },
      { title: "Kauferorientierte Beratung", text: "Ziel ist nicht der schnellste Abschluss, sondern eine Entscheidung, die langfristig Sinn ergibt." },
    ],
    supportEyebrow: "Begleitung",
    supportTitle: "Vor, wahrend und nach dem Kauf",
    title: "Miguel Zsolt Horvath kennenlernen",
    whyEyebrow: "Warum es zahlt",
    whyTitle: "Gute Beratung ist mehr als Exposes zeigen",
    faqs: [
      { question: "Wer ist Miguel Horvath?", answer: "Miguel Horvath, auch Zsolt Miguel Horvath, ist Grunder von Move2Marbella und Immobilienberater an der Costa del Sol." },
      { question: "Was macht Move2Marbella anders?", answer: "Die Arbeit ist Kauferberatung: Lage, Mikrolage, Kosten, Wiederverkauf und eine sinnvolle Shortlist." },
      { question: "Auf welche Gebiete fokussiert er sich?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro und weitere gefragte Lagen." },
      { question: "Nur fur ungarische Kaufer?", answer: "Nein. Move2Marbella begleitet internationale Kaufer; ungarische Beratung ist ein zusatzlicher Vorteil." },
    ],
  },
  ru: {
    ...enContent,
    body: "Основатель Move2Marbella, Miguel помогает международным покупателям выбрать правильный район, понять цену и пройти покупку спокойно.",
    buyerEyebrow: "Вопросы покупателя",
    buyerQuestions: ["Какой район подходит вашему образу жизни или инвестиционной цели?", "Объект действительно хорошо расположен или просто красиво представлен?", "Какие реальные расходы покупки и владения?", "Какой потенциал перепродажи и аренды?", "Есть ли риски микро-локации, community или цены?", "Соответствует ли shortlist вашей долгосрочной стратегии?"],
    buyerTitle: "Вопросы для уверенной покупки",
    eyebrow: "Советник покупателя Costa del Sol",
    faqEyebrow: "Короткие ответы",
    faqTitle: "О Miguel и Move2Marbella",
    metaDescription: "Познакомьтесь с Miguel Zsolt Horvath, основателем Move2Marbella и советником покупателей на Costa del Sol.",
    methodEyebrow: "Метод Move2Marbella",
    methodTitle: "Структурное сравнение объектов",
    proofCards: [
      { title: "Опыт на Costa del Sol с 2010 года", text: "Miguel консультирует международных покупателей в Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile и других prime-зонах." },
      { title: "Врач и экономист", text: "Медицинское и экономическое образование дают аналитичный подход на эмоциональном рынке." },
      { title: "Сначала интерес покупателя", text: "Цель не самая быстрая сделка, а решение, которое будет логичным и через годы." },
    ],
    supportEyebrow: "Поддержка",
    supportTitle: "До, во время и после покупки",
    title: "Познакомьтесь с Miguel Zsolt Horvath",
    whyEyebrow: "Почему это важно",
    whyTitle: "Хороший совет это больше, чем показы объектов",
    faqs: [
      { question: "Кто такой Miguel Horvath?", answer: "Miguel Horvath, также Zsolt Miguel Horvath, основатель Move2Marbella и консультант по недвижимости на Costa del Sol." },
      { question: "Чем отличается Move2Marbella?", answer: "Это buyer advisory: район, микро-локация, расходы, ликвидность и логичный shortlist." },
      { question: "На каких районах он фокусируется?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro и другие востребованные зоны." },
      { question: "Это только для венгерских покупателей?", answer: "Нет. Move2Marbella работает с международными покупателями; венгерский язык является дополнительным преимуществом." },
    ],
  },
  pl: {
    ...enContent,
    body: "Zalozyciel Move2Marbella, Miguel pomaga kupujacym wybrac odpowiednia okolice, zrozumiec logike ceny i przejsc proces jasno.",
    buyerEyebrow: "Pytania kupujacego",
    buyerQuestions: ["Ktora okolica pasuje do stylu zycia, rodziny lub inwestycji?", "Czy nieruchomosc jest naprawde dobrze polozona czy tylko dobrze pokazana?", "Jakie sa realne koszty zakupu i utrzymania?", "Jak mocny jest potencjal odsprzedazy lub najmu?", "Czy sa ryzyka mikro-lokalizacji, wspolnoty lub ceny?", "Czy shortlist pasuje do strategii dlugoterminowej?"],
    buyerTitle: "Pytania za pewna decyzja",
    eyebrow: "Doradca kupujacego Costa del Sol",
    faqEyebrow: "Krotkie odpowiedzi",
    faqTitle: "O Miguelu i Move2Marbella",
    metaDescription: "Poznaj Miguel Zsolt Horvath, zalozyciela Move2Marbella i doradce kupujacych na Costa del Sol.",
    methodEyebrow: "Metoda Move2Marbella",
    methodTitle: "Strukturalne porownanie nieruchomosci",
    proofCards: [
      { title: "Doswiadczenie Costa del Sol od 2010", text: "Miguel doradza kupujacym w Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile i innych top lokalizacjach." },
      { title: "Lekarz i ekonomista", text: "Wyksztalcenie medyczne i ekonomiczne daje analityczne podejscie do emocjonalnego rynku." },
      { title: "Doradztwo po stronie kupujacego", text: "Celem nie jest najszybsza transakcja, ale decyzja, ktora ma sens takze za kilka lat." },
    ],
    supportEyebrow: "Wsparcie",
    supportTitle: "Przed, w trakcie i po zakupie",
    title: "Poznaj Miguel Zsolt Horvath",
    whyEyebrow: "Dlaczego to wazne",
    whyTitle: "Dobra rada to wiecej niz pokazywanie ofert",
    faqs: [
      { question: "Kim jest Miguel Horvath?", answer: "Miguel Horvath, takze Zsolt Miguel Horvath, jest zalozycielem Move2Marbella i doradca nieruchomosci na Costa del Sol." },
      { question: "Co wyroznia Move2Marbella?", answer: "To doradztwo kupujacego: okolica, mikro-lokalizacja, koszty, odsprzedaz i sensowny shortlist." },
      { question: "Na jakich obszarach sie skupia?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro i inne mocne lokalizacje." },
      { question: "Czy tylko dla Wegrow?", answer: "Nie. Move2Marbella wspiera kupujacych miedzynarodowych, a jezyk wegierski jest dodatkowa przewaga." },
    ],
  },
  hu: {
    ...enContent,
    body: "A Move2Marbella alapitojakent Miguel abban segit, hogy jo kornyeket, realis arat es hosszu tavon is vedheto dontest valassz.",
    buyerEyebrow: "Vevoi kerdesek",
    buyerQuestions: ["Melyik kornyek illik az eletmododhoz vagy befektetesi celodhoz?", "Az ingatlan valoban jo helyen van, vagy csak jol van talalva?", "Milyen valos veteli es fenntartasi koltsegek vannak?", "Milyen az ujraeladasi vagy kiadasi logika?", "Van-e mikro-lokacios, community vagy arszint kockazat?", "A shortlist a hosszu tavu celodat szolgalja?"],
    buyerTitle: "Kerdesek egy magabiztos vasarlashoz",
    eyebrow: "Costa del Sol vevoi tanacsado",
    faqEyebrow: "Rovid valaszok",
    faqTitle: "Miguel es a Move2Marbella",
    metaDescription: "Ismerd meg Miguel Zsolt Horvathot, a Move2Marbella alapitojat es Costa del Sol vevoi tanacsadot.",
    methodEyebrow: "Move2Marbella modszer",
    methodTitle: "Strukturalt ingatlan-osszehasonlitas",
    proofCards: [
      { title: "Costa del Sol tapasztalat 2010 ota", text: "Miguel nemzetkozi vevoknek segit Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile es mas prime teruleteken." },
      { title: "Orvos es kozgazdasz hatter", text: "Az orvosi es kozgazdasagi gondolkodas rendszerezett, elemzo dontestamogatast ad egy erzelmes piacon." },
      { title: "Vevo-kozpontu tanacsadas", text: "Nem a leggyorsabb tranzakcio a cel, hanem egy olyan dontes, amit evekkel kesobb is vallalni lehet." },
    ],
    supportEyebrow: "Tamogatas",
    supportTitle: "Vasarlas elott, kozben es utan",
    title: "Ismerd meg Miguel Zsolt Horvathot",
    whyEyebrow: "Miert fontos",
    whyTitle: "A jo tanacsadas tobb, mint hirdetesek mutatasa",
    faqs: [
      { question: "Ki Miguel Horvath?", answer: "Miguel Horvath, mas neven Zsolt Miguel Horvath, a Move2Marbella alapitoja es Costa del Sol ingatlan tanacsado." },
      { question: "Miben mas a Move2Marbella?", answer: "Vevoi tanacsadasban dolgozunk: kornyek, mikrolokacio, koltsegek, ujraeladas es ertelmes shortlist." },
      { question: "Mely teruletekre fokuszal?", answer: "Marbella, Estepona, Benahavis, Nueva Andalucia, Golden Mile, San Pedro es mas keresett nyugati Costa del Sol teruletek." },
      { question: "Csak magyar vevoknek szol?", answer: "Nem. A Move2Marbella nemzetkozi vevokkel dolgozik, de a magyar nyelvu tanacsadas kulon elony." },
    ],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function getMeetMiguelHref(locale: Locale) {
  return locale === "hu"
    ? "/hu/horvath-zsolt-marbella"
    : `${getLocaleBasePath(locale)}/meet-miguel`;
}

export async function generateMetadata({
  params,
}: MeetMiguelPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = meetContent[locale];
  const canonical =
    locale === "hu" ? "/hu/horvath-zsolt-marbella" : getLocalizedPath(locale, "/meet-miguel");

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: {
        ...getLanguageAlternates("/meet-miguel"),
        hu: "/hu/horvath-zsolt-marbella",
      },
    },
    robots: getPageRobots(),
  };
}

function Section({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[320px_1fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#171717]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-base leading-8 text-[#4b4740]">
        {children}
      </div>
    </section>
  );
}

export default async function MeetMiguelPage({ params }: MeetMiguelPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = meetContent[locale];

  return (
    <ContentPageShell
      locale={locale}
      getLanguageHref={getMeetMiguelHref}
      eyebrow={page.eyebrow}
      title={page.title}
      body={page.body}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zsolt Miguel Horvath",
          alternateName: ["Miguel Horvath", "Dr. Horváth Zsolt Mihály"],
          jobTitle: "Costa del Sol property advisor",
          worksFor: {
            "@type": "RealEstateAgent",
            name: "Move2Marbella",
            url: SITE_URL,
          },
          areaServed: ["Marbella", "Estepona", "Benahavis", "Costa del Sol"],
          knowsAbout: [
            "Marbella property market",
            "Costa del Sol property buying",
            "buyer advisory",
            "property investment",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        {page.proofCards.map((item) => (
          <article
            key={item.title}
            className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
          >
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#4b4740]">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <figure className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5">
          <Image
            src="/zsolt-miguel-horvath.webp"
            alt="Zsolt Miguel Horvath advising international buyers"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
          <figcaption className="border-t border-[#ece2d3] px-5 py-4 text-base font-semibold text-[#0f253d]">
            Zsolt Miguel Horvath dr.
          </figcaption>
        </figure>
      </section>

      <Section eyebrow={page.whyEyebrow} title={page.whyTitle}>
        {page.whyBody.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </Section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.buyerEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            {page.buyerTitle}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {page.buyerQuestions.map((question) => (
            <div
              key={question}
              className="rounded-[8px] bg-white p-4 font-medium leading-7 text-[#242424] shadow-sm ring-1 ring-black/5"
            >
              {question}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.methodEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            {page.methodTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {page.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-xl font-semibold text-[#171717]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Section eyebrow={page.supportEyebrow} title={page.supportTitle}>
        {page.supportBody.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </Section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {page.faqEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#171717]">
            {page.faqTitle}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-lg font-semibold text-[#171717]">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#4b4740]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      {locale === "hu" ? (
        <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <Link
            href="/hu/horvath-zsolt-marbella"
            className="inline-flex rounded-full border border-[#0f253d] px-5 py-3 text-sm font-semibold text-[#0f253d]"
          >
            Reszletes magyar bemutatkozo oldal
          </Link>
        </section>
      ) : null}
    </ContentPageShell>
  );
}

export const revalidate = 300;
