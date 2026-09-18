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
  detailsBio?: string;
  detailsLabel?: string;
  email?: string;
  image?: string;
  initials: string;
  languages?: string;
  name: string;
  phone?: string;
  role: string;
};

const teamImageByName: Record<string, string> = {
  "Andrea Vida": "/team/andrea-vida.jpg",
  "Hajnalka Ságodi": "/team/hajnalka-sagodi.jpg",
  "Maria Ivady": "/team/maria-ivady.png",
  "Mira Bartfai": "/team/mira-bartfai.jpeg",
  "Regan Berger": "/team/regan-berger.jpg",
  "Zsolt Miguel Horvath dr.": "/team/zsolt-miguel-horvath.jpg",
};

function getTeamMemberHref(member: TeamMember, locale: Locale) {
  if (member.name !== "Zsolt Miguel Horvath dr.") {
    return null;
  }

  return locale === "hu" ? "/hu/horvath-zsolt-marbella" : `${getLocaleBasePath(locale)}/meet-miguel`;
}

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
        detailsBio: "Dr. Horváth Zsolt Mihály, also known to many clients as Zsolt Miguel Horvath, is the founder of Move2Marbella and a trusted property advisor for international buyers on the Costa del Sol, with a strong focus on Marbella, Estepona, Benahavís and the surrounding prime areas. With local market experience since 2010, he helps buyers navigate not only property selection, but also the much more important questions behind a successful purchase: which area fits their goals, which property type holds value best, what the real ownership costs are, how strong the resale potential is and where hidden risks may appear.",
        detailsLabel: "About Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "English, Spanish, Hungarian",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Founder & Strategic Director",
      },
      {
        bio: "Local leadership and client coordination across Move2Marbella searches and buyer conversations.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "English, Spanish",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Property search support, shortlist coordination and client communication during the buying process.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Spanish, English, Russian, German",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Senior Consultant",
      },
      {
        bio: "Rental coordination and practical support for owners, guests and rental-ready properties.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "English, Hungarian",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Rental Manager",
      },
      {
        bio: "Office administration, follow-up and process coordination so client requests move clearly.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "English, Spanish, Hungarian, Romanian",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Trusted first point of contact in Hungary for Hungarian-speaking clients starting their Spanish property journey.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka is the Senior Partner in Hungary and Hungarian Representative of Move2Marbella. With several decades of experience in the Hungarian real estate market, she supports Hungarian-speaking clients at the early stages of their Spanish property journey, helping them understand their goals, clarify their options and enter the Marbella and Costa del Sol market with confidence. Working closely with the Move2Marbella team, she provides a trusted first point of contact in Hungary, backed by strong local expertise in Southern Spain.",
        detailsLabel: "About Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Hungarian, English, German",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner in Hungary & Hungarian Representative",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, conocido por muchos clientes como Zsolt Miguel Horvath, es el fundador de Move2Marbella y un asesor inmobiliario de confianza para compradores internacionales en la Costa del Sol, con especial enfoque en Marbella, Estepona, Benahavís y las zonas prime cercanas. Con experiencia local desde 2010, ayuda a los compradores no solo a seleccionar propiedades, sino también a resolver las preguntas clave detrás de una buena compra: qué zona encaja con sus objetivos, qué tipo de propiedad conserva mejor el valor, cuáles son los costes reales de propiedad, qué fuerza tiene la reventa y dónde pueden aparecer riesgos ocultos.",
        detailsLabel: "Sobre Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Inglés, español, húngaro",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Fundador y Director Estratégico",
      },
      {
        bio: "Dirección local y coordinación de clientes en búsquedas y conversaciones de compra.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Inglés, español",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Apoyo en la búsqueda, coordinación de preselecciones y comunicación con clientes durante la compra.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Español, inglés, ruso, alemán",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Consultora Senior",
      },
      {
        bio: "Coordinación de alquileres y apoyo práctico para propietarios, huéspedes e inmuebles listos para alquilar.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Inglés, húngaro",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Responsable de Alquileres",
      },
      {
        bio: "Administración de oficina, seguimiento y coordinación de procesos para que cada solicitud avance con claridad.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Inglés, español, húngaro, rumano",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Primer punto de contacto de confianza en Hungría para clientes húngaro-parlantes que empiezan su búsqueda en España.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka es Senior Partner en Hungría y representante húngara de Move2Marbella. Con varias décadas de experiencia en el mercado inmobiliario húngaro, apoya a clientes húngaro-parlantes en las primeras etapas de su compra en España, ayudándoles a entender sus objetivos, aclarar sus opciones y entrar en el mercado de Marbella y la Costa del Sol con confianza. Trabaja estrechamente con el equipo de Move2Marbella y ofrece un primer punto de contacto de confianza en Hungría, respaldado por fuerte experiencia local en el sur de España.",
        detailsLabel: "Sobre Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Húngaro, inglés, alemán",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner en Hungría y representante húngara",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, connu par de nombreux clients sous le nom de Zsolt Miguel Horvath, est le fondateur de Move2Marbella et un conseiller immobilier de confiance pour les acheteurs internationaux sur la Costa del Sol, avec un fort accent sur Marbella, Estepona, Benahavís et les secteurs prime voisins. Fort d'une expérience locale depuis 2010, il aide les acheteurs non seulement à choisir des biens, mais aussi à traiter les questions essentielles d'un achat réussi: quel secteur correspond aux objectifs, quel type de bien conserve le mieux sa valeur, quels sont les vrais coûts de détention, quel est le potentiel de revente et où peuvent apparaître les risques cachés.",
        detailsLabel: "À propos de Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Anglais, espagnol, hongrois",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Fondateur et Directeur Stratégique",
      },
      {
        bio: "Leadership local et coordination client pour les recherches et les échanges d'achat.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Anglais, espagnol",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Aide à la recherche, coordination des sélections et communication client pendant le processus d'achat.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Espagnol, anglais, russe, allemand",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Consultante Senior",
      },
      {
        bio: "Coordination locative et soutien pratique pour propriétaires, invités et biens prêts à louer.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Anglais, hongrois",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Responsable Locations",
      },
      {
        bio: "Administration, suivi et coordination des processus pour faire avancer clairement chaque demande.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Anglais, espagnol, hongrois, roumain",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Premier contact de confiance en Hongrie pour les clients hongrois qui démarrent leur projet immobilier en Espagne.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka est Senior Partner en Hongrie et représentante hongroise de Move2Marbella. Avec plusieurs décennies d'expérience sur le marché immobilier hongrois, elle accompagne les clients hongrois au début de leur projet immobilier en Espagne, les aide à comprendre leurs objectifs, clarifier leurs options et aborder le marché de Marbella et de la Costa del Sol avec confiance. En étroite collaboration avec l'équipe Move2Marbella, elle constitue un premier point de contact fiable en Hongrie, soutenu par une forte expertise locale dans le sud de l'Espagne.",
        detailsLabel: "À propos de Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Hongrois, anglais, allemand",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner en Hongrie et représentante hongroise",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, vielen Kunden auch als Zsolt Miguel Horvath bekannt, ist Gründer von Move2Marbella und vertrauensvoller Immobilienberater für internationale Käufer an der Costa del Sol, mit starkem Fokus auf Marbella, Estepona, Benahavís und die umliegenden Prime-Lagen. Mit lokaler Markterfahrung seit 2010 unterstützt er Käufer nicht nur bei der Auswahl von Immobilien, sondern vor allem bei den entscheidenden Fragen eines erfolgreichen Kaufs: welche Lage zu den Zielen passt, welcher Immobilientyp den Wert am besten hält, welche realen Besitzkosten entstehen, wie stark das Wiederverkaufspotenzial ist und wo versteckte Risiken liegen können.",
        detailsLabel: "Über Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Englisch, Spanisch, Ungarisch",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Gründer und Strategischer Direktor",
      },
      {
        bio: "Lokale Leitung und Kundenkoordination bei Suchprozessen und Käufergesprächen.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Englisch, Spanisch",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Unterstützung bei Immobiliensuche, Shortlist-Koordination und Kundenkommunikation im Kaufprozess.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Spanisch, Englisch, Russisch, Deutsch",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Senior Consultant",
      },
      {
        bio: "Vermietungskoordination und praktische Unterstützung für Eigentümer, Gäste und vermietungsbereite Immobilien.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Englisch, Ungarisch",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Rental Manager",
      },
      {
        bio: "Büroadministration, Nachverfolgung und Prozesskoordination für klare nächste Schritte.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Englisch, Spanisch, Ungarisch, Rumänisch",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Vertrauensvolle erste Ansprechpartnerin in Ungarn für ungarischsprachige Kunden am Beginn ihrer Spanien-Suche.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka ist Senior Partner in Ungarn und ungarische Repräsentantin von Move2Marbella. Mit mehreren Jahrzehnten Erfahrung im ungarischen Immobilienmarkt unterstützt sie ungarischsprachige Kunden in der frühen Phase ihrer Immobiliensuche in Spanien, hilft ihnen, Ziele zu verstehen, Optionen zu klären und mit Vertrauen in den Markt von Marbella und der Costa del Sol einzusteigen. In enger Zusammenarbeit mit dem Move2Marbella Team bietet sie einen verlässlichen ersten Kontaktpunkt in Ungarn, gestützt durch starke lokale Expertise in Südspanien.",
        detailsLabel: "Über Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Ungarisch, Englisch, Deutsch",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner in Ungarn und ungarische Repräsentantin",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, многим клиентам известный как Zsolt Miguel Horvath, является основателем Move2Marbella и доверенным консультантом по недвижимости для международных покупателей на Costa del Sol, с сильным фокусом на Marbella, Estepona, Benahavís и окружающие премиальные районы. Имея местный рыночный опыт с 2010 года, он помогает покупателям не только выбирать недвижимость, но и разбираться в ключевых вопросах успешной покупки: какой район соответствует целям, какой тип недвижимости лучше сохраняет ценность, каковы реальные расходы владения, насколько силен потенциал перепродажи и где могут скрываться риски.",
        detailsLabel: "О Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Английский, испанский, венгерский",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Основатель и Стратегический Директор",
      },
      {
        bio: "Локальное руководство и координация клиентов по поиску и переговорам о покупке.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Английский, испанский",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Поддержка поиска, координация короткого списка и коммуникация с клиентами в процессе покупки.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Испанский, английский, русский, немецкий",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Старший Консультант",
      },
      {
        bio: "Координация аренды и практическая поддержка собственников, гостей и объектов для аренды.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Английский, венгерский",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Менеджер по Аренде",
      },
      {
        bio: "Офисное администрирование, контроль задач и координация процессов для понятных следующих шагов.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Английский, испанский, венгерский, румынский",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Надёжный первый контакт в Венгрии для венгероязычных клиентов, начинающих поиск недвижимости в Испании.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka является Senior Partner в Венгрии и венгерским представителем Move2Marbella. Имея несколько десятилетий опыта на венгерском рынке недвижимости, она поддерживает венгероязычных клиентов на раннем этапе их пути к покупке недвижимости в Испании, помогая понять цели, уточнить варианты и уверенно выйти на рынок Marbella и Costa del Sol. Работая в тесном контакте с командой Move2Marbella, она обеспечивает надёжную первую точку контакта в Венгрии, опираясь на сильную локальную экспертизу в южной Испании.",
        detailsLabel: "О Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Венгерский, английский, немецкий",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner в Венгрии и венгерский представитель",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, znany wielu klientom jako Zsolt Miguel Horvath, jest założycielem Move2Marbella i zaufanym doradcą nieruchomości dla międzynarodowych kupujących na Costa del Sol, ze szczególnym naciskiem na Marbella, Estepona, Benahavís oraz okoliczne lokalizacje premium. Dzięki lokalnemu doświadczeniu od 2010 roku pomaga kupującym nie tylko w wyborze nieruchomości, ale także w kluczowych pytaniach stojących za udanym zakupem: która okolica pasuje do celów, jaki typ nieruchomości najlepiej utrzymuje wartość, jakie są realne koszty posiadania, jak silny jest potencjał odsprzedaży i gdzie mogą pojawić się ukryte ryzyka.",
        detailsLabel: "O Zsolt Miguel Horvath",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Angielski, hiszpański, węgierski",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Założyciel i Dyrektor Strategiczny",
      },
      {
        bio: "Lokalne prowadzenie spraw i koordynacja klientów podczas wyszukiwania oraz rozmów zakupowych.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Angielski, hiszpański",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Wsparcie wyszukiwania, koordynacja shortlisty i komunikacja z klientem w procesie zakupu.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Hiszpański, angielski, rosyjski, niemiecki",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Senior Consultant",
      },
      {
        bio: "Koordynacja najmu i praktyczne wsparcie dla właścicieli, gości oraz nieruchomości gotowych do wynajmu.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Angielski, węgierski",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Rental Manager",
      },
      {
        bio: "Administracja biura, follow-up i koordynacja procesu, aby zgłoszenia szły jasno do przodu.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Angielski, hiszpański, węgierski, rumuński",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Zaufany pierwszy kontakt na Węgrzech dla klientów węgierskojęzycznych rozpoczynających zakup w Hiszpanii.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka jest Senior Partnerem na Węgrzech i węgierską przedstawicielką Move2Marbella. Dzięki kilkudziesięciu latom doświadczenia na węgierskim rynku nieruchomości wspiera klientów węgierskojęzycznych na wczesnym etapie ich hiszpańskiej drogi zakupowej, pomagając zrozumieć cele, doprecyzować opcje i wejść na rynek Marbelli oraz Costa del Sol z pewnością. Ściśle współpracując z zespołem Move2Marbella, zapewnia zaufany pierwszy kontakt na Węgrzech, wsparty silną lokalną wiedzą w południowej Hiszpanii.",
        detailsLabel: "O Hajnalka Ságodi",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Węgierski, angielski, niemiecki",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Senior Partner na Węgrzech i przedstawicielka węgierska",
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
        detailsBio: "Dr. Horváth Zsolt Mihály, sok ügyfél számára Zsolt Miguel Horvath néven ismert, a Move2Marbella alapítója és nemzetközi vevők megbízható ingatlan tanácsadója a Costa del Solon, különös fókuszban Marbellával, Esteponával, Benahavísszal és a környező prémium területekkel. 2010 óta szerzett helyi piaci tapasztalatával nemcsak az ingatlan kiválasztásában segít, hanem azokban a fontosabb kérdésekben is, amelyek egy sikeres vásárlás mögött állnak: melyik környék illik a célokhoz, melyik ingatlantípus tartja jobban az értékét, mik a valódi fenntartási költségek, mennyire erős a továbbértékesítési potenciál, és hol jelenhetnek meg rejtett kockázatok.",
        detailsLabel: "Zsolt Miguel Horvath bemutatkozása",
        email: "info@move2marbella.com",
        image: "/zsolt-miguel-horvath.webp",
        initials: "ZH",
        languages: "Angol, spanyol, magyar",
        name: "Zsolt Miguel Horvath dr.",
        phone: "+34 673 151 000",
        role: "Alapító és stratégiai vezető",
      },
      {
        bio: "Helyi vezetés és ügyfélkoordináció a Move2Marbella kereséseiben és vevői egyeztetéseiben.",
        company: "Move2Marbella",
        email: "regan@move2marbella.com",
        initials: "RB",
        languages: "Angol, spanyol",
        name: "Regan Berger",
        phone: "+34 646 672 890",
        role: "Managing Partner",
      },
      {
        bio: "Ingatlankeresési támogatás, shortlist-koordináció és ügyfélkommunikáció a vásárlási folyamatban.",
        company: "Move2Marbella",
        email: "maria@move2marbella.com",
        initials: "MI",
        languages: "Spanyol, angol, orosz, német",
        name: "Maria Ivady",
        phone: "+34 605 565 701",
        role: "Senior Consultant",
      },
      {
        bio: "Bérbeadási koordináció és gyakorlati támogatás tulajdonosoknak, vendégeknek és kiadásra kész ingatlanoknak.",
        company: "Welcome2Marbella",
        email: "mira@welcome2marbella.com",
        initials: "MB",
        languages: "Angol, magyar",
        name: "Mira Bartfai",
        phone: "+34 603 401 828",
        role: "Rental Manager",
      },
      {
        bio: "Irodai adminisztráció, utánkövetés és folyamatkoordináció, hogy az ügyfélkérések tisztán haladjanak.",
        company: "Move2Marbella",
        email: "office@move2marbella.com",
        initials: "AV",
        languages: "Angol, spanyol, magyar, román",
        name: "Andrea Vida",
        phone: "+34 650 812 064",
        role: "Office Manager",
      },
      {
        bio: "Megbízható első kapcsolódási pont Magyarországon azoknak, akik spanyol ingatlanvásárlásban gondolkodnak.",
        company: "Move2Marbella",
        detailsBio: "Ságodi Hajnalka a Move2Marbella magyarországi senior partnere és magyar képviselője. Több évtizedes magyar ingatlanpiaci tapasztalattal támogatja a magyar nyelvű ügyfeleket a spanyol ingatlanvásárlási folyamat korai szakaszában: segít megérteni a célokat, tisztázni a lehetőségeket, és magabiztosan belépni a Marbella és Costa del Sol piacára. A Move2Marbella csapatával szorosan együttműködve megbízható első kapcsolódási pontot biztosít Magyarországon, erős dél-spanyolországi helyi szakértelemmel a háttérben.",
        detailsLabel: "Hajnalka Ságodi bemutatkozása",
        email: "sagodi.hajnalka@gmail.com",
        initials: "HS",
        languages: "Magyar, angol, német",
        name: "Hajnalka Ságodi",
        phone: "+36 30 966 0339",
        role: "Magyarországi senior partner és magyar képviselő",
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
          {team.members.map((member) => {
            const memberImage = teamImageByName[member.name] ?? member.image;
            const memberHref = getTeamMemberHref(member, locale);

            return (
              <article
                key={member.name}
                className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex items-center gap-4">
                  {memberImage ? (
                    <Image
                      src={memberImage}
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
                    {memberHref ? (
                      <Link
                        href={memberHref}
                        className="text-base font-semibold leading-tight text-[#171717] underline decoration-[#c29a4b]/50 underline-offset-4 transition hover:text-[#9a7a3a]"
                      >
                        {member.name}
                      </Link>
                    ) : (
                      <h3 className="text-base font-semibold leading-tight text-[#171717]">
                        {member.name}
                      </h3>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-[#102844]">
                  {member.role}
                </p>
                {member.languages ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a3a]">
                    {member.languages}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-[#4b4740]">
                  {member.bio}
                </p>
                {member.detailsBio ? (
                  <details className="mt-4 rounded-[8px] border border-[#eee5d8] bg-[#fbf8f2] p-3 text-sm leading-6 text-[#4b4740]">
                    <summary className="cursor-pointer text-sm font-semibold text-[#102844] transition hover:text-[#9a7a3a]">
                      {member.detailsLabel ?? member.name}
                    </summary>
                    <p className="mt-3">{member.detailsBio}</p>
                  </details>
                ) : null}
                {member.phone || member.email ? (
                  <div className="mt-4 space-y-1 border-t border-[#eee5d8] pt-3 text-sm leading-6">
                    {member.phone ? (
                      <a
                        href={`tel:${member.phone.replace(/\s/g, "")}`}
                        className="block font-semibold text-[#102844] transition hover:text-[#9a7a3a]"
                      >
                        {member.phone}
                      </a>
                    ) : null}
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="block break-all font-semibold text-[#102844] transition hover:text-[#9a7a3a]"
                      >
                        {member.email}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 3600;
