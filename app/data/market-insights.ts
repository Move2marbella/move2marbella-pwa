import type { Locale } from "../i18n/translations";

export type MarketInsight = {
  category: string;
  href: string;
  summary: string;
  title: string;
};

export type MarketPageCopy = {
  body: string;
  eyebrow: string;
  metaDescription: string;
  readMore: string;
  sourceLabel: string;
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
      "Compact market notes for buyers who want to understand price pressure, supply, risk and timing before choosing a property on the Costa del Sol.",
    eyebrow: "Market insights",
    metaDescription:
      "Marbella and Costa del Sol property market insights, buyer trends, price context and practical investment notes from Move2Marbella.",
    readMore: "Read source article",
    sourceLabel: "Source",
    title: "Marbella market reports and buyer intelligence",
    updatedLabel: "Updated",
    updatedValue: "2026 market cycle",
    insights: [
      {
        category: "Market data",
        href: sourcePosts.data,
        title: "How to read Marbella property market data",
        summary:
          "Asking prices, valuation reports and notarial transactions measure different parts of the market. Buyers should compare sources instead of relying on one headline number.",
      },
      {
        category: "Buyer strategy",
        href: sourcePosts.risks,
        title: "Marbella 2026: risks and opportunities",
        summary:
          "Demand remains strong, but growth is more selective. The best opportunities depend on micro-location, legal clarity, condition and real resale appeal.",
      },
      {
        category: "Spain context",
        href: sourcePosts.spain,
        title: "Spanish property market outlook for 2026",
        summary:
          "National trends matter, but Marbella and the Costa del Sol behave differently because international demand, lifestyle buying and limited prime supply are local forces.",
      },
      {
        category: "Urban planning",
        href: sourcePosts.plots,
        title: "Marbella abandoned plots regulation",
        summary:
          "New municipal pressure on neglected land and unfinished buildings may affect some owners, plots and stalled projects. Buyers should understand planning context before committing.",
      },
    ],
  },
  es: {
    body:
      "Notas compactas de mercado para compradores que quieren entender precios, oferta, riesgos y timing antes de elegir una propiedad en la Costa del Sol.",
    eyebrow: "Market insights",
    metaDescription:
      "Información del mercado inmobiliario de Marbella y la Costa del Sol: tendencias, precios, contexto comprador e inversión.",
    readMore: "Leer artículo fuente",
    sourceLabel: "Fuente",
    title: "Informes de mercado de Marbella e inteligencia para compradores",
    updatedLabel: "Actualizado",
    updatedValue: "Ciclo de mercado 2026",
    insights: [
      {
        category: "Datos de mercado",
        href: sourcePosts.data,
        title: "Cómo leer los datos del mercado de Marbella",
        summary:
          "Los precios de oferta, las valoraciones y las compraventas notariales no miden lo mismo. Conviene comparar fuentes antes de decidir por un solo titular.",
      },
      {
        category: "Estrategia comprador",
        href: sourcePosts.risks,
        title: "Marbella 2026: riesgos y oportunidades",
        summary:
          "La demanda sigue fuerte, pero el crecimiento es más selectivo. La buena compra depende de microlocalización, situación legal, estado y reventa real.",
      },
      {
        category: "Contexto España",
        href: sourcePosts.spain,
        title: "Perspectiva del mercado inmobiliario español en 2026",
        summary:
          "Las tendencias nacionales importan, pero Marbella y la Costa del Sol tienen dinámica propia por demanda internacional, lifestyle y escasez de producto prime.",
      },
      {
        category: "Urbanismo",
        href: sourcePosts.plots,
        title: "Nueva norma de Marbella sobre solares abandonados",
        summary:
          "La presión municipal sobre suelo descuidado y edificios inacabados puede influir en propietarios, solares y proyectos parados. Antes de comprar, hay que entender el contexto urbanístico.",
      },
    ],
  },
  fr: {
    body:
      "Notes de marché compactes pour comprendre prix, offre, risques et timing avant de choisir un bien sur la Costa del Sol.",
    eyebrow: "Market insights",
    metaDescription:
      "Insights sur le marché immobilier de Marbella et de la Costa del Sol: tendances, prix, contexte acheteur et investissement.",
    readMore: "Lire l'article source",
    sourceLabel: "Source",
    title: "Rapports de marché Marbella et intelligence acheteur",
    updatedLabel: "Mis à jour",
    updatedValue: "Cycle de marché 2026",
    insights: [
      {
        category: "Données marché",
        href: sourcePosts.data,
        title: "Comment lire les données du marché à Marbella",
        summary:
          "Prix affichés, estimations et transactions notariales ne mesurent pas la même chose. Un acheteur doit croiser les sources avant de suivre un seul chiffre.",
      },
      {
        category: "Stratégie acheteur",
        href: sourcePosts.risks,
        title: "Marbella 2026: risques et opportunités",
        summary:
          "La demande reste forte, mais la croissance devient plus sélective. Les bonnes opportunités dépendent de la micro-localisation, du juridique, de l'état et de la revente.",
      },
      {
        category: "Contexte Espagne",
        href: sourcePosts.spain,
        title: "Perspectives du marché immobilier espagnol en 2026",
        summary:
          "Les tendances nationales comptent, mais Marbella et la Costa del Sol réagissent différemment grâce à la demande internationale et à l'offre prime limitée.",
      },
      {
        category: "Urbanisme",
        href: sourcePosts.plots,
        title: "Nouvelle règle de Marbella sur les terrains abandonnés",
        summary:
          "La pression municipale sur les terrains négligés et les bâtiments inachevés peut influencer certains propriétaires et projets. Le contexte urbanistique compte avant d'acheter.",
      },
    ],
  },
  de: {
    body:
      "Kompakte Marktnotizen für Käufer, die Preisniveau, Angebot, Risiken und Timing an der Costa del Sol besser verstehen möchten.",
    eyebrow: "Market insights",
    metaDescription:
      "Immobilienmarkt-Insights für Marbella und Costa del Sol: Trends, Preise, Käuferkontext und Investmenthinweise.",
    readMore: "Quellartikel lesen",
    sourceLabel: "Quelle",
    title: "Marbella Market Reports und Käufer-Intelligence",
    updatedLabel: "Aktualisiert",
    updatedValue: "Marktzyklus 2026",
    insights: [
      {
        category: "Marktdaten",
        href: sourcePosts.data,
        title: "Wie man Marbella-Marktdaten richtig liest",
        summary:
          "Angebotspreise, Bewertungen und notarielle Transaktionen zeigen unterschiedliche Marktteile. Käufer sollten mehrere Quellen vergleichen.",
      },
      {
        category: "Käuferstrategie",
        href: sourcePosts.risks,
        title: "Marbella 2026: Risiken und Chancen",
        summary:
          "Die Nachfrage bleibt stark, aber Wachstum wird selektiver. Gute Chancen hängen von Mikrolage, rechtlicher Klarheit, Zustand und Wiederverkaufswert ab.",
      },
      {
        category: "Spanien-Kontext",
        href: sourcePosts.spain,
        title: "Ausblick für den spanischen Immobilienmarkt 2026",
        summary:
          "Nationale Trends sind nützlich, aber Marbella und die Costa del Sol folgen eigenen Regeln: internationale Nachfrage, Lifestyle-Kauf und knappes Prime-Angebot.",
      },
      {
        category: "Stadtplanung",
        href: sourcePosts.plots,
        title: "Marbellas neue Regel zu verlassenen Grundstücken",
        summary:
          "Mehr kommunaler Druck auf vernachlässigte Grundstücke und unfertige Gebäude kann Eigentümer und Projekte beeinflussen. Planungskontext ist wichtig.",
      },
    ],
  },
  ru: {
    body:
      "Короткие рыночные заметки для покупателей, которые хотят понимать цены, предложение, риски и момент покупки на Costa del Sol.",
    eyebrow: "Market insights",
    metaDescription:
      "Аналитика рынка недвижимости Marbella и Costa del Sol: тренды, цены, контекст для покупателей и инвесторов.",
    readMore: "Читать источник",
    sourceLabel: "Источник",
    title: "Рыночные отчеты Marbella и аналитика для покупателей",
    updatedLabel: "Обновлено",
    updatedValue: "Рыночный цикл 2026",
    insights: [
      {
        category: "Данные рынка",
        href: sourcePosts.data,
        title: "Как читать данные рынка Marbella",
        summary:
          "Цены объявлений, оценки и нотариальные сделки показывают разные части рынка. Покупателю важно сравнивать источники, а не один заголовок.",
      },
      {
        category: "Стратегия покупателя",
        href: sourcePosts.risks,
        title: "Marbella 2026: риски и возможности",
        summary:
          "Спрос остается сильным, но рост становится более выборочным. Возможности зависят от микролокации, юридической чистоты, состояния и ликвидности.",
      },
      {
        category: "Контекст Испании",
        href: sourcePosts.spain,
        title: "Прогноз рынка недвижимости Испании на 2026 год",
        summary:
          "Национальные тренды важны, но Marbella и Costa del Sol имеют свою динамику из-за международного спроса и ограниченного prime-предложения.",
      },
      {
        category: "Градостроительство",
        href: sourcePosts.plots,
        title: "Новое правило Marbella по заброшенным участкам",
        summary:
          "Муниципальное давление на заброшенные участки и недострои может влиять на владельцев и проекты. Перед покупкой важно понимать градостроительный контекст.",
      },
    ],
  },
  pl: {
    body:
      "Krótkie notatki rynkowe dla kupujących, którzy chcą zrozumieć ceny, podaż, ryzyko i timing na Costa del Sol.",
    eyebrow: "Market insights",
    metaDescription:
      "Analizy rynku nieruchomości Marbella i Costa del Sol: trendy, ceny, kontekst kupującego i informacje inwestycyjne.",
    readMore: "Czytaj artykuł źródłowy",
    sourceLabel: "Źródło",
    title: "Raporty rynkowe Marbella i wiedza dla kupujących",
    updatedLabel: "Aktualizacja",
    updatedValue: "Cykl rynkowy 2026",
    insights: [
      {
        category: "Dane rynkowe",
        href: sourcePosts.data,
        title: "Jak czytać dane rynku Marbella",
        summary:
          "Ceny ofertowe, wyceny i transakcje notarialne pokazują różne części rynku. Kupujący powinien porównywać źródła.",
      },
      {
        category: "Strategia kupującego",
        href: sourcePosts.risks,
        title: "Marbella 2026: ryzyka i możliwości",
        summary:
          "Popyt pozostaje silny, ale wzrost jest bardziej selektywny. Dobra okazja zależy od mikrolokalizacji, stanu prawnego, jakości i odsprzedaży.",
      },
      {
        category: "Kontekst Hiszpanii",
        href: sourcePosts.spain,
        title: "Perspektywy hiszpańskiego rynku nieruchomości w 2026",
        summary:
          "Trendy krajowe są ważne, ale Marbella i Costa del Sol mają własną dynamikę dzięki popytowi międzynarodowemu i ograniczonej podaży prime.",
      },
      {
        category: "Urbanistyka",
        href: sourcePosts.plots,
        title: "Nowa regulacja Marbella dotycząca opuszczonych działek",
        summary:
          "Presja miasta na zaniedbane działki i niedokończone budynki może wpływać na właścicieli i projekty. Kontekst planistyczny ma znaczenie.",
      },
    ],
  },
  hu: {
    body:
      "Rövid piaci összefoglalók azoknak, akik vásárlás előtt érteni szeretnék az árakat, a kínálatot, a kockázatokat és az időzítést a Costa del Solon.",
    eyebrow: "Piaci információk",
    metaDescription:
      "Marbella és Costa del Sol ingatlanpiaci elemzések: trendek, árak, vevői szempontok és befektetési információk.",
    readMore: "Forráscikk megnyitása",
    sourceLabel: "Forrás",
    title: "Marbella market reportok és vevői háttérinformációk",
    updatedLabel: "Frissítve",
    updatedValue: "2026-os piaci ciklus",
    insights: [
      {
        category: "Piaci adatok",
        href: sourcePosts.data,
        title: "Hogyan érdemes olvasni a marbellai piaci adatokat",
        summary:
          "A hirdetési árak, értékbecslési riportok és közjegyzői tranzakciók nem ugyanazt mérik. Vásárlás előtt érdemes több adatforrást együtt nézni.",
      },
      {
        category: "Vevői stratégia",
        href: sourcePosts.risks,
        title: "Marbella 2026: kockázatok és lehetőségek",
        summary:
          "A kereslet továbbra is erős, de az áremelkedés szelektívebb. A jó vétel a mikrolokáción, jogi tisztaságon, állapoton és továbbértékesíthetőségen múlik.",
      },
      {
        category: "Spanyol piaci háttér",
        href: sourcePosts.spain,
        title: "A spanyol ingatlanpiac 2026-os kilátásai",
        summary:
          "Az országos trendek fontosak, de Marbella és a Costa del Sol saját logika szerint működik: nemzetközi kereslet, életmódvásárlás és szűk prémium kínálat.",
      },
      {
        category: "Városrendezés",
        href: sourcePosts.plots,
        title: "Marbella új szabálya az elhagyott telkekről",
        summary:
          "Az elhanyagolt telkekre és befejezetlen épületekre vonatkozó önkormányzati nyomás hatással lehet tulajdonosokra és projektekre. Vásárlás előtt ezt is érteni kell.",
      },
    ],
  },
};

export function getMarketPageCopy(locale: Locale) {
  return marketPageCopy[locale];
}
