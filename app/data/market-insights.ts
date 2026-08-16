import type { Locale } from "../i18n/translations";

export type MarketInsight = {
  bullets: string[];
  category: string;
  href: string;
  title: string;
};

export type MarketPageCopy = {
  body: string;
  eyebrow: string;
  metaDescription: string;
  readMore: string;
  title: string;
  updatedLabel: string;
  updatedValue: string;
  insights: MarketInsight[];
};

const sourcePosts = {
  data: "https://move2marbella.com/how-to-read-marbella-property-market-data/",
  risks:
    "https://move2marbella.com/marbella-property-market-2026-what-buyers-should-really-know/",
  spain: "https://move2marbella.com/what-to-expect-from-the-spanish-property-market-in-2026/",
  plots: "https://move2marbella.com/marbella-abandoned-plots-regulation-2026/",
};

export const marketPageCopy: Record<Locale, MarketPageCopy> = {
  en: {
    body:
      "Short buyer-focused signals on prices, supply, risk and timing in Marbella and the Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Marbella and Costa del Sol real estate market trends, buyer signals, price context and practical investment notes from Move2Marbella.",
    readMore: "Read source",
    title: "Marbella real estate trends",
    updatedLabel: "Updated",
    updatedValue: "Real Estate Market Trends",
    insights: [
      {
        category: "Market data",
        href: sourcePosts.data,
        title: "Marbella property prices",
        bullets: [
          "Average price of properties listed for sale in Marbella: about €5,596/m² in January 2026.",
          "Listed apartments were higher on average: about €6,151/m².",
          "Use listed-property prices, valuation data and notarial transactions together; each source measures a different layer of the market.",
        ],
      },
      {
        category: "Buyer strategy",
        href: sourcePosts.risks,
        title: "Selective growth in 2026",
        bullets: [
          "Average Marbella prices are broadly above €5,000/m².",
          "Prime areas such as Golden Mile, Puente Romano and Sierra Blanca trade far above the municipal average.",
          "For buyers, good micro-location, legal transparency, property condition and resale potential are the key decision factors.",
        ],
      },
      {
        category: "Spain context",
        href: sourcePosts.spain,
        title: "Costa del Sol vs national market",
        bullets: [
          "Marbella 2026 growth is expected to outperform the national average in selected prime segments.",
          "Demand continues to outpace quality supply in the luxury villa and well-located apartment markets.",
          "National data is useful context, but Costa del Sol pricing is driven by international demand and lifestyle buying.",
        ],
      },
      {
        category: "Urban planning",
        href: sourcePosts.plots,
        title: "Abandoned plots and unfinished assets",
        bullets: [
          "The new Marbella regulation targets undeveloped urban plots, halted construction and ruinous buildings.",
          "Owners may be pushed to act within defined timeframes; one year is a key reference in reported cases.",
          "Distressed land can still be an opportunity, but planning, licence history and execution orders must be checked before reservation.",
        ],
      },
    ],
  },
  es: {
    body:
      "Señales breves para compradores sobre precios, oferta, riesgo y timing en Marbella y la Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Tendencias del mercado inmobiliario de Marbella y la Costa del Sol: precios, señales de comprador e inversión.",
    readMore: "Leer fuente",
    title: "Tendencias inmobiliarias en Marbella",
    updatedLabel: "Actualizado",
    updatedValue: "Tendencias del mercado inmobiliario",
    insights: [
      {
        category: "Datos de mercado",
        href: sourcePosts.data,
        title: "Precios inmobiliarios en Marbella",
        bullets: [
          "Precio medio de las propiedades anunciadas en venta en Marbella: aprox. €5.596/m² en enero de 2026.",
          "Los apartamentos anunciados estaban por encima de la media: aprox. €6.151/m².",
          "Conviene cruzar precios de propiedades anunciadas, valoraciones y compraventas notariales: no miden lo mismo.",
        ],
      },
      {
        category: "Estrategia comprador",
        href: sourcePosts.risks,
        title: "Crecimiento más selectivo en 2026",
        bullets: [
          "Los precios medios en Marbella se sitúan ampliamente por encima de €5.000/m².",
          "Golden Mile, Puente Romano y Sierra Blanca operan muy por encima de la media municipal.",
          "Para el comprador, la buena microlocalización, la transparencia legal, el estado de la vivienda y el potencial de reventa son los factores clave.",
        ],
      },
      {
        category: "Contexto España",
        href: sourcePosts.spain,
        title: "Costa del Sol frente al mercado nacional",
        bullets: [
          "En 2026, Marbella puede superar la media nacional en segmentos prime seleccionados.",
          "La demanda sigue por encima de la oferta de calidad en villas de lujo y apartamentos bien ubicados.",
          "El dato nacional ayuda, pero la Costa del Sol responde a demanda internacional y compra lifestyle.",
        ],
      },
      {
        category: "Urbanismo",
        href: sourcePosts.plots,
        title: "Solares abandonados y activos inacabados",
        bullets: [
          "La nueva norma de Marbella afecta solares urbanos sin desarrollar, obras paralizadas y edificios ruinosos.",
          "Los propietarios pueden verse obligados a actuar en plazos definidos; un año aparece como referencia clave.",
          "El suelo distressed puede ser oportunidad, pero antes de reservar hay que revisar planeamiento, licencias y expedientes.",
        ],
      },
    ],
  },
  fr: {
    body:
      "Signaux courts pour acheteurs sur prix, offre, risque et timing à Marbella et sur la Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Tendances du marché immobilier de Marbella et de la Costa del Sol: prix, signaux acheteurs et notes d'investissement.",
    readMore: "Lire la source",
    title: "Tendances immobilières à Marbella",
    updatedLabel: "Mis à jour",
    updatedValue: "Tendances du marché immobilier",
    insights: [
      {
        category: "Données marché",
        href: sourcePosts.data,
        title: "Prix immobiliers à Marbella",
        bullets: [
          "Prix moyen des biens proposés à la vente à Marbella: environ €5,596/m² en janvier 2026.",
          "Les appartements proposés à la vente étaient plus élevés: environ €6,151/m².",
          "Croiser prix des biens proposés, estimations et transactions notariales: chaque source mesure autre chose.",
        ],
      },
      {
        category: "Stratégie acheteur",
        href: sourcePosts.risks,
        title: "Croissance plus sélective en 2026",
        bullets: [
          "Les prix moyens à Marbella sont largement au-dessus de €5,000/m².",
          "Golden Mile, Puente Romano et Sierra Blanca restent très au-dessus de la moyenne municipale.",
          "Pour l'acheteur, la bonne micro-localisation, la transparence juridique, l'état du bien et le potentiel de revente sont les facteurs essentiels.",
        ],
      },
      {
        category: "Contexte Espagne",
        href: sourcePosts.spain,
        title: "Costa del Sol vs marché national",
        bullets: [
          "En 2026, Marbella devrait dépasser la moyenne nationale dans certains segments prime.",
          "La demande dépasse encore l'offre de qualité pour les villas de luxe et les appartements bien placés.",
          "Le national donne le contexte; la Costa del Sol dépend surtout de la demande internationale et lifestyle.",
        ],
      },
      {
        category: "Urbanisme",
        href: sourcePosts.plots,
        title: "Terrains abandonnés et actifs inachevés",
        bullets: [
          "La nouvelle règle de Marbella vise terrains urbains non bâtis, chantiers arrêtés et bâtiments ruineux.",
          "Les propriétaires peuvent devoir agir dans des délais définis; un an ressort comme référence importante.",
          "Les actifs distressed peuvent être intéressants, mais urbanisme, licences et ordres d'exécution doivent être vérifiés.",
        ],
      },
    ],
  },
  de: {
    body:
      "Kurze Käufersignale zu Preisen, Angebot, Risiko und Timing in Marbella und an der Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Immobilientrends für Marbella und Costa del Sol: Preise, Käufersignale und Investmenthinweise.",
    readMore: "Quelle lesen",
    title: "Immobilientrends in Marbella",
    updatedLabel: "Aktualisiert",
    updatedValue: "Real Estate Market Trends",
    insights: [
      {
        category: "Marktdaten",
        href: sourcePosts.data,
        title: "Immobilienpreise in Marbella",
        bullets: [
          "Durchschnittspreis der zum Verkauf angebotenen Immobilien in Marbella: ca. €5.596/m² im Januar 2026.",
          "Zum Verkauf angebotene Apartments lagen im Durchschnitt höher: ca. €6.151/m².",
          "Preise angebotener Immobilien, Bewertungsdaten und notarielle Verkäufe zusammen lesen; jede Quelle zeigt eine andere Ebene.",
        ],
      },
      {
        category: "Käuferstrategie",
        href: sourcePosts.risks,
        title: "Selektiveres Wachstum 2026",
        bullets: [
          "Marbellas Durchschnittspreise liegen breit über €5.000/m².",
          "Golden Mile, Puente Romano und Sierra Blanca handeln deutlich über dem Gemeindedurchschnitt.",
          "Aus Käufersicht sind gute Mikrolage, rechtliche Transparenz, Zustand der Immobilie und Wiederverkaufspotenzial die wichtigsten Faktoren.",
        ],
      },
      {
        category: "Spanien-Kontext",
        href: sourcePosts.spain,
        title: "Costa del Sol vs nationaler Markt",
        bullets: [
          "Marbella dürfte 2026 in ausgewählten Prime-Segmenten stärker wachsen als der nationale Durchschnitt.",
          "Nachfrage übersteigt weiter das Qualitätsangebot bei Luxusvillen und gut gelegenen Apartments.",
          "Nationale Daten sind Kontext; Costa del Sol wird von internationaler Nachfrage und Lifestyle-Käufen geprägt.",
        ],
      },
      {
        category: "Stadtplanung",
        href: sourcePosts.plots,
        title: "Verlassene Grundstücke und unfertige Objekte",
        bullets: [
          "Die neue Marbella-Regel betrifft unbebaute Stadtgrundstücke, gestoppte Bauprojekte und ruinöse Gebäude.",
          "Eigentümer können zu Maßnahmen innerhalb definierter Fristen gedrängt werden; ein Jahr ist ein wichtiger Bezugspunkt.",
          "Distressed-Land kann Chance sein, aber Planung, Lizenzen und Vollstreckungsanordnungen müssen vor Reservierung geprüft werden.",
        ],
      },
    ],
  },
  ru: {
    body:
      "Короткие сигналы для покупателей о ценах, предложении, рисках и timing в Marbella и на Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Тренды рынка недвижимости Marbella и Costa del Sol: цены, сигналы для покупателей и инвестиционные заметки.",
    readMore: "Читать источник",
    title: "Тренды недвижимости Marbella",
    updatedLabel: "Обновлено",
    updatedValue: "Тренды рынка недвижимости",
    insights: [
      {
        category: "Данные рынка",
        href: sourcePosts.data,
        title: "Цены на недвижимость в Marbella",
        bullets: [
          "Средняя цена объектов, выставленных на продажу в Marbella: около €5,596/м² в январе 2026.",
          "Выставленные на продажу апартаменты были выше среднего: около €6,151/м².",
          "Сравнивайте цены объектов в продаже, оценки и нотариальные сделки: это разные уровни рынка.",
        ],
      },
      {
        category: "Стратегия покупателя",
        href: sourcePosts.risks,
        title: "Более выборочный рост в 2026",
        bullets: [
          "Средние цены Marbella в целом выше €5,000/м².",
          "Golden Mile, Puente Romano и Sierra Blanca значительно выше средней цены муниципалитета.",
          "С точки зрения покупателя, хорошая микролокация, юридическая прозрачность, состояние объекта и потенциал перепродажи являются ключевыми факторами.",
        ],
      },
      {
        category: "Контекст Испании",
        href: sourcePosts.spain,
        title: "Costa del Sol против национального рынка",
        bullets: [
          "В 2026 Marbella может опережать средний рынок Испании в выбранных prime-сегментах.",
          "Спрос продолжает превышать качественное предложение в люксовых виллах и удачно расположенных апартаментах.",
          "Национальные данные полезны, но Costa del Sol движется международным спросом и lifestyle-покупками.",
        ],
      },
      {
        category: "Градостроительство",
        href: sourcePosts.plots,
        title: "Заброшенные участки и недостроенные активы",
        bullets: [
          "Новая норма Marbella касается незастроенных городских участков, остановленных строек и аварийных зданий.",
          "Собственников могут обязать действовать в установленные сроки; один год указан как важный ориентир.",
          "Distressed-активы могут быть возможностью, но до резервации нужно проверить планирование, лицензии и предписания.",
        ],
      },
    ],
  },
  pl: {
    body:
      "Krótkie sygnały dla kupujących o cenach, podaży, ryzyku i timingu w Marbella oraz na Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Trendy rynku nieruchomości Marbella i Costa del Sol: ceny, sygnały kupujących i informacje inwestycyjne.",
    readMore: "Czytaj źródło",
    title: "Trendy nieruchomości w Marbella",
    updatedLabel: "Aktualizacja",
    updatedValue: "Trendy rynku nieruchomości",
    insights: [
      {
        category: "Dane rynkowe",
        href: sourcePosts.data,
        title: "Ceny nieruchomości w Marbella",
        bullets: [
          "Średnia cena nieruchomości wystawionych na sprzedaż w Marbella: ok. €5,596/m² w styczniu 2026.",
          "Wystawione na sprzedaż apartamenty były średnio droższe: ok. €6,151/m².",
          "Łącz ceny nieruchomości wystawionych na sprzedaż, wyceny i transakcje notarialne; każde źródło mierzy inny fragment rynku.",
        ],
      },
      {
        category: "Strategia kupującego",
        href: sourcePosts.risks,
        title: "Bardziej selektywny wzrost w 2026",
        bullets: [
          "Średnie ceny w Marbella są szeroko powyżej €5,000/m².",
          "Golden Mile, Puente Romano i Sierra Blanca są znacznie powyżej średniej gminy.",
          "Z punktu widzenia kupującego najważniejsze są dobra mikrolokalizacja, przejrzystość prawna, stan nieruchomości i potencjał odsprzedaży.",
        ],
      },
      {
        category: "Kontekst Hiszpanii",
        href: sourcePosts.spain,
        title: "Costa del Sol vs rynek krajowy",
        bullets: [
          "W 2026 Marbella może przewyższać średnią krajową w wybranych segmentach prime.",
          "Popyt nadal przewyższa dobrej jakości podaż w luksusowych willach i dobrze położonych apartamentach.",
          "Dane krajowe są kontekstem; Costa del Sol napędza popyt międzynarodowy i zakup lifestyle.",
        ],
      },
      {
        category: "Urbanistyka",
        href: sourcePosts.plots,
        title: "Opuszczone działki i niedokończone aktywa",
        bullets: [
          "Nowa regulacja Marbella dotyczy niezabudowanych działek miejskich, zatrzymanych budów i ruin.",
          "Właściciele mogą być zmuszeni do działania w określonych terminach; jeden rok jest ważnym punktem odniesienia.",
          "Distressed land może być okazją, ale planowanie, licencje i nakazy trzeba sprawdzić przed rezerwacją.",
        ],
      },
    ],
  },
  hu: {
    body:
      "Rövid vevői jelzések árakról, kínálatról, kockázatokról és időzítésről Marbellán és a Costa del Solon.",
    eyebrow: "Trends",
    metaDescription:
      "Marbella és Costa del Sol ingatlanpiaci trendek: árak, vevői jelzések és befektetési szempontok.",
    readMore: "Forrás megnyitása",
    title: "Marbella ingatlanpiaci trendek",
    updatedLabel: "Frissítve",
    updatedValue: "Ingatlanpiaci trendek",
    insights: [
      {
        category: "Piaci adatok",
        href: sourcePosts.data,
        title: "Marbella ingatlanárak",
        bullets: [
          "A Marbellán eladásra hirdetett ingatlanok átlagos ára: kb. €5,596/m² 2026 januárjában.",
          "Az eladásra hirdetett apartmanok átlaga ennél magasabb volt: kb. €6,151/m².",
          "Az eladásra hirdetett ingatlanok árait, értékbecsléseket és közjegyzői tranzakciókat együtt érdemes nézni; mindegyik más piaci réteget mér.",
        ],
      },
      {
        category: "Vevői stratégia",
        href: sourcePosts.risks,
        title: "Szelektívebb növekedés 2026-ban",
        bullets: [
          "Marbella átlagárai széles körben €5,000/m² felett vannak.",
          "Golden Mile, Puente Romano és Sierra Blanca jóval a városi átlag felett mozog.",
          "A vevő szempontjából a jó mikrolokáció, jogi átláthatóság, az ingatlan állapota és továbbértékesíthetőségi potenciál a legfontosabbak.",
        ],
      },
      {
        category: "Spanyol háttér",
        href: sourcePosts.spain,
        title: "Costa del Sol vs országos piac",
        bullets: [
          "2026-ban Marbella egyes prémium szegmensekben várhatóan az országos átlag felett teljesít.",
          "A kereslet továbbra is meghaladja a minőségi kínálatot luxusvillákban és jó lokációjú apartmanokban.",
          "Az országos adat csak háttér; a Costa del Solt nemzetközi kereslet és életmódvásárlás mozgatja.",
        ],
      },
      {
        category: "Városrendezés",
        href: sourcePosts.plots,
        title: "Elhagyott telkek és befejezetlen projektek",
        bullets: [
          "Marbella új szabálya beépítetlen városi telkeket, leállt építkezéseket és romos épületeket céloz.",
          "A tulajdonosokat meghatározott határidőn belüli lépésre kényszeríthetik; az 1 év fontos hivatkozási pont.",
          "A distressed ingatlan lehetőség lehet, de foglaló előtt ellenőrizni kell a városrendezést, licenceket és hatósági eljárásokat.",
        ],
      },
    ],
  },
};

export function getMarketPageCopy(locale: Locale) {
  return marketPageCopy[locale];
}
