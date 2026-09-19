import type { Locale } from "../i18n/translations";

export type MarketInsight = {
  bullets: string[];
  category: string;
  href: string;
  title: string;
};

export const marketArticleSlugs = [
  "marbella-property-prices-2026",
  "marbella-market-growth-2026",
  "costa-del-sol-vs-spain-property-market",
  "marbella-abandoned-plots-buyer-risk",
  "property-purchase-costs-andalusia",
  "buying-property-in-spain-guide",
  "new-build-vs-resale-costa-del-sol",
  "sea-view-beachside-beachfront-marbella",
] as const;

export type MarketArticleSlug = (typeof marketArticleSlugs)[number];

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
  buying: "https://move2marbella.com/buying-guide/",
  costs: "https://move2marbella.com/property-purchase-costs-in-marbella-2026/",
  data: "https://move2marbella.com/how-to-read-marbella-property-market-data/",
  risks:
    "https://move2marbella.com/marbella-property-market-2026-what-buyers-should-really-know/",
  spain: "https://move2marbella.com/what-to-expect-from-the-spanish-property-market-in-2026/",
  plots: "https://move2marbella.com/marbella-abandoned-plots-regulation-2026/",
};

export const marketArticleUi: Record<Locale, {
  back: string;
  buyerTakeaway: string;
  exploreAreas: string;
  findProperties: string;
  practicalNextStep: string;
  readSource: string;
  updated: string;
}> = {
  en: { back: "All trends", buyerTakeaway: "Buyer takeaway", exploreAreas: "Explore regions", findProperties: "Find properties", practicalNextStep: "Practical next step", readSource: "Read source", updated: "Updated September 2026" },
  es: { back: "Todas las tendencias", buyerTakeaway: "Conclusión para compradores", exploreAreas: "Explorar regiones", findProperties: "Buscar propiedades", practicalNextStep: "Siguiente paso práctico", readSource: "Leer fuente", updated: "Actualizado en septiembre de 2026" },
  fr: { back: "Toutes les tendances", buyerTakeaway: "À retenir pour l’acheteur", exploreAreas: "Explorer les régions", findProperties: "Voir les biens", practicalNextStep: "Prochaine étape", readSource: "Lire la source", updated: "Mis à jour en septembre 2026" },
  de: { back: "Alle Trends", buyerTakeaway: "Fazit für Käufer", exploreAreas: "Regionen entdecken", findProperties: "Immobilien suchen", practicalNextStep: "Praktischer nächster Schritt", readSource: "Quelle lesen", updated: "Aktualisiert im September 2026" },
  ru: { back: "Все тренды", buyerTakeaway: "Вывод для покупателя", exploreAreas: "Изучить регионы", findProperties: "Найти объекты", practicalNextStep: "Практический следующий шаг", readSource: "Читать источник", updated: "Обновлено в сентябре 2026" },
  pl: { back: "Wszystkie trendy", buyerTakeaway: "Wniosek dla kupującego", exploreAreas: "Poznaj regiony", findProperties: "Znajdź nieruchomości", practicalNextStep: "Praktyczny następny krok", readSource: "Czytaj źródło", updated: "Aktualizacja: wrzesień 2026" },
  hu: { back: "Összes trend", buyerTakeaway: "Vevői összefoglaló", exploreAreas: "Régiók megtekintése", findProperties: "Ingatlanok keresése", practicalNextStep: "Gyakorlati következő lépés", readSource: "Forrás megnyitása", updated: "Frissítve: 2026. szeptember" },
};

export const marketPageCopy: Record<Locale, MarketPageCopy> = {
  en: {
    body:
      "Short buyer-focused signals on prices, supply, risk and timing in Marbella and the Costa del Sol.",
    eyebrow: "Trends",
    metaDescription:
      "Marbella and Costa del Sol real estate market trends, buyer signals, price context and practical investment notes from Move2Marbella.",
    readMore: "Read article",
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
      {
        category: "Buying costs",
        href: sourcePosts.costs,
        title: "Property purchase costs in Andalusia",
        bullets: [
          "Resale homes normally carry 7% transfer tax in Andalusia; new homes generally carry 10% VAT plus stamp duty.",
          "Legal, notary and land-registry costs must be included before setting the final property budget.",
          "Calculate costs separately for resale and new-build property because the tax structure is different.",
        ],
      },
      {
        category: "Buying guide",
        href: sourcePosts.buying,
        title: "Buying property in Spain: buyer roadmap",
        bullets: [
          "A reservation, legal due diligence, private purchase contract and notarial completion are distinct stages.",
          "Check ownership, debts, planning status and licences before committing the main deposit.",
          "Define location, total budget and exit strategy before comparing individual properties.",
        ],
      },
      {
        category: "Property choice",
        href: sourcePosts.costs,
        title: "New build vs resale on the Costa del Sol",
        bullets: [
          "New developments offer modern specifications and staged payments, but require delivery and developer checks.",
          "Resale homes can offer established locations and immediate use, while condition and renovation costs need scrutiny.",
          "Compare total acquisition cost, not only the advertised price.",
        ],
      },
      {
        category: "Coastal property",
        href: sourcePosts.data,
        title: "Sea-view, beachside or beachfront?",
        bullets: [
          "Sea-view describes outlook, beachside describes location, and beachfront means the property or complex is directly by the shore.",
          "Orientation, future construction and the exact position within a complex can materially change the value of a view.",
          "Verify the feature at the property and on planning maps instead of relying on listing terminology alone.",
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
    readMore: "Leer artículo",
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
      {
        category: "Costes de compra",
        href: sourcePosts.costs,
        title: "Costes de compra de vivienda en Andalucía",
        bullets: [
          "La vivienda usada tributa normalmente al 7% por ITP en Andalucía; la obra nueva suele llevar 10% de IVA más AJD.",
          "Abogado, notaría y Registro deben formar parte del presupuesto total antes de elegir vivienda.",
          "Calcula por separado obra nueva y reventa porque su estructura fiscal es diferente.",
        ],
      },
      {
        category: "Guía de compra",
        href: sourcePosts.buying,
        title: "Comprar vivienda en España: hoja de ruta",
        bullets: [
          "Reserva, revisión legal, contrato privado y firma notarial son etapas distintas.",
          "Comprueba titularidad, deudas, situación urbanística y licencias antes de entregar el depósito principal.",
          "Define zona, presupuesto total y estrategia de salida antes de comparar inmuebles.",
        ],
      },
      {
        category: "Elección del inmueble",
        href: sourcePosts.costs,
        title: "Obra nueva o reventa en la Costa del Sol",
        bullets: [
          "La obra nueva ofrece especificaciones modernas y pagos por fases, pero exige revisar promotor y entrega.",
          "La reventa permite ubicaciones consolidadas y uso inmediato; hay que revisar estado y reforma.",
          "Compara el coste total de adquisición, no solo el precio anunciado.",
        ],
      },
      {
        category: "Vivienda costera",
        href: sourcePosts.data,
        title: "Vistas al mar, cerca de playa o primera línea",
        bullets: [
          "Vistas al mar describe la perspectiva, beachside la ubicación y beachfront el contacto directo con la costa.",
          "Orientación, futuras obras y posición dentro del complejo pueden cambiar mucho el valor de las vistas.",
          "Verifica la característica in situ y en el planeamiento, no solo en el anuncio.",
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
    readMore: "Lire l’article",
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
      {
        category: "Frais d’achat",
        href: sourcePosts.costs,
        title: "Frais d’achat immobilier en Andalousie",
        bullets: [
          "La revente supporte normalement 7% d’ITP en Andalousie; le neuf généralement 10% de TVA plus droit de timbre.",
          "Avocat, notaire et registre foncier doivent être inclus dans le budget global.",
          "Calculez séparément neuf et revente car leur fiscalité diffère.",
        ],
      },
      {
        category: "Guide d’achat",
        href: sourcePosts.buying,
        title: "Acheter en Espagne: parcours de l’acheteur",
        bullets: [
          "Réservation, audit juridique, contrat privé et signature notariale sont des étapes distinctes.",
          "Vérifiez propriété, dettes, urbanisme et licences avant le dépôt principal.",
          "Définissez zone, budget total et stratégie de revente avant de comparer les biens.",
        ],
      },
      {
        category: "Choix du bien",
        href: sourcePosts.costs,
        title: "Neuf ou revente sur la Costa del Sol",
        bullets: [
          "Le neuf offre prestations modernes et paiements échelonnés, avec contrôle du promoteur et de la livraison.",
          "La revente offre des quartiers établis et un usage immédiat; état et rénovation doivent être étudiés.",
          "Comparez le coût total d’acquisition, pas seulement le prix affiché.",
        ],
      },
      {
        category: "Immobilier côtier",
        href: sourcePosts.data,
        title: "Vue mer, proche plage ou front de mer?",
        bullets: [
          "Vue mer décrit la perspective, beachside la localisation et beachfront une position directement en bord de mer.",
          "Orientation, futures constructions et position dans la résidence peuvent modifier la valeur de la vue.",
          "Vérifiez sur place et dans les plans d’urbanisme, pas seulement dans l’annonce.",
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
    readMore: "Artikel lesen",
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
      {
        category: "Kaufnebenkosten",
        href: sourcePosts.costs,
        title: "Immobilienkaufkosten in Andalusien",
        bullets: [
          "Bei Bestandsimmobilien fallen in Andalusien normalerweise 7% Grunderwerbsteuer an; bei Neubauten meist 10% MwSt. plus Stempelsteuer.",
          "Anwalt, Notar und Grundbuch müssen vor der Objektauswahl im Gesamtbudget stehen.",
          "Neubau und Bestand getrennt kalkulieren, da die Steuerstruktur unterschiedlich ist.",
        ],
      },
      {
        category: "Kaufleitfaden",
        href: sourcePosts.buying,
        title: "Immobilienkauf in Spanien: Fahrplan",
        bullets: [
          "Reservierung, rechtliche Prüfung, Privatvertrag und notarielle Übergabe sind getrennte Schritte.",
          "Eigentum, Schulden, Baurecht und Genehmigungen vor der Hauptanzahlung prüfen.",
          "Lage, Gesamtbudget und Exit-Strategie vor dem Objektvergleich definieren.",
        ],
      },
      {
        category: "Objektwahl",
        href: sourcePosts.costs,
        title: "Neubau oder Bestand an der Costa del Sol",
        bullets: [
          "Neubau bietet moderne Ausstattung und Ratenzahlungen, verlangt aber Bauträger- und Übergabeprüfung.",
          "Bestand bietet etablierte Lagen und sofortige Nutzung; Zustand und Renovierungskosten sind zu prüfen.",
          "Gesamte Erwerbskosten vergleichen, nicht nur den Angebotspreis.",
        ],
      },
      {
        category: "Küstenimmobilien",
        href: sourcePosts.data,
        title: "Meerblick, strandnah oder direkt am Strand?",
        bullets: [
          "Meerblick beschreibt die Aussicht, beachside die Lage und beachfront eine direkte Position an der Küste.",
          "Ausrichtung, künftige Bebauung und Lage innerhalb der Anlage beeinflussen den Wert stark.",
          "Merkmal vor Ort und in Planungsunterlagen prüfen, nicht nur im Inserat.",
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
    readMore: "Читать статью",
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
      {
        category: "Расходы на покупку",
        href: sourcePosts.costs,
        title: "Расходы на покупку недвижимости в Андалусии",
        bullets: [
          "Вторичная недвижимость обычно облагается 7% ITP; новостройки — 10% НДС плюс гербовый сбор.",
          "Юрист, нотариус и реестр должны входить в полный бюджет до выбора объекта.",
          "Новостройку и вторичную недвижимость рассчитывайте отдельно из-за разной налоговой структуры.",
        ],
      },
      {
        category: "Руководство покупателя",
        href: sourcePosts.buying,
        title: "Покупка недвижимости в Испании: этапы",
        bullets: [
          "Резерв, юридическая проверка, частный договор и нотариальное завершение — отдельные этапы.",
          "До основного депозита проверьте собственника, долги, градостроительный статус и лицензии.",
          "Сначала определите район, полный бюджет и стратегию выхода, затем сравнивайте объекты.",
        ],
      },
      {
        category: "Выбор объекта",
        href: sourcePosts.costs,
        title: "Новостройка или вторичная недвижимость",
        bullets: [
          "Новостройки предлагают современные характеристики и поэтапную оплату, но требуют проверки застройщика и сроков.",
          "Вторичное жильё даёт сложившуюся локацию и быстрое заселение; важны состояние и ремонт.",
          "Сравнивайте полную стоимость приобретения, а не только цену объявления.",
        ],
      },
      {
        category: "Недвижимость у моря",
        href: sourcePosts.data,
        title: "Вид на море, рядом с пляжем или первая линия?",
        bullets: [
          "Sea-view означает вид, beachside — расположение рядом с пляжем, beachfront — непосредственно у берега.",
          "Ориентация, будущая застройка и положение в комплексе существенно влияют на ценность вида.",
          "Проверяйте характеристику на месте и по градостроительным картам, а не только по объявлению.",
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
    readMore: "Czytaj artykuł",
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
      {
        category: "Koszty zakupu",
        href: sourcePosts.costs,
        title: "Koszty zakupu nieruchomości w Andaluzji",
        bullets: [
          "Rynek wtórny zwykle podlega 7% ITP; nowa nieruchomość — 10% VAT plus podatek skarbowy.",
          "Prawnik, notariusz i rejestr muszą być uwzględnione w pełnym budżecie.",
          "Nowe i używane nieruchomości licz osobno ze względu na inną strukturę podatków.",
        ],
      },
      {
        category: "Przewodnik kupującego",
        href: sourcePosts.buying,
        title: "Zakup nieruchomości w Hiszpanii: etapy",
        bullets: [
          "Rezerwacja, analiza prawna, umowa prywatna i akt notarialny to osobne etapy.",
          "Przed główną zaliczką sprawdź własność, długi, planowanie i pozwolenia.",
          "Najpierw określ lokalizację, pełny budżet i strategię wyjścia, potem porównuj oferty.",
        ],
      },
      {
        category: "Wybór nieruchomości",
        href: sourcePosts.costs,
        title: "Nowa inwestycja czy rynek wtórny",
        bullets: [
          "Nowe inwestycje oferują nowoczesny standard i płatności etapowe, ale wymagają kontroli dewelopera i terminu.",
          "Rynek wtórny daje ustaloną lokalizację i szybkie użytkowanie; trzeba sprawdzić stan i remont.",
          "Porównuj pełny koszt nabycia, nie tylko cenę ofertową.",
        ],
      },
      {
        category: "Nieruchomości nad morzem",
        href: sourcePosts.data,
        title: "Widok na morze, blisko plaży czy pierwsza linia?",
        bullets: [
          "Sea-view opisuje widok, beachside lokalizację, a beachfront bezpośrednie położenie przy brzegu.",
          "Orientacja, przyszła zabudowa i położenie w kompleksie znacząco zmieniają wartość widoku.",
          "Sprawdź cechę na miejscu i w planach, nie tylko w opisie oferty.",
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
    readMore: "Cikk megnyitása",
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
      {
        category: "Vásárlási költségek",
        href: sourcePosts.costs,
        title: "Ingatlanvásárlási költségek Andalúziában",
        bullets: [
          "Használt ingatlannál Andalúziában általában 7% ITP fizetendő; új építésnél jellemzően 10% áfa és illeték.",
          "Az ügyvédi, közjegyzői és ingatlan-nyilvántartási díjakat már a teljes keret meghatározásakor számolni kell.",
          "A használt és az új építésű ingatlant külön kell kalkulálni, mert eltérő az adóstruktúrájuk.",
        ],
      },
      {
        category: "Vásárlási útmutató",
        href: sourcePosts.buying,
        title: "Spanyolországi ingatlanvásárlás: vevői útvonal",
        bullets: [
          "A foglalás, jogi átvilágítás, magánszerződés és közjegyzői adásvétel különálló szakaszok.",
          "A fő foglaló kifizetése előtt ellenőrizni kell a tulajdonjogot, tartozásokat, városrendezési státuszt és engedélyeket.",
          "Az ingatlanok összevetése előtt határozd meg a lokációt, teljes keretet és továbbértékesítési stratégiát.",
        ],
      },
      {
        category: "Ingatlanválasztás",
        href: sourcePosts.costs,
        title: "Új építés vagy használt ingatlan a Costa del Solon",
        bullets: [
          "Az új projektek modern műszaki tartalmat és szakaszos fizetést kínálnak, de ellenőrizni kell a fejlesztőt és az átadást.",
          "A használt ingatlanok bejáratott lokációt és gyors használatot adhatnak; az állapotot és felújítási költséget vizsgálni kell.",
          "Ne csak a hirdetési árat, hanem a teljes bekerülési költséget hasonlítsd össze.",
        ],
      },
      {
        category: "Tengerparti ingatlan",
        href: sourcePosts.data,
        title: "Tengeri kilátás, strandközeli vagy közvetlen vízpart?",
        bullets: [
          "A sea-view a kilátást, a beachside a strandközeli elhelyezkedést, a beachfront pedig a közvetlen vízparti fekvést jelenti.",
          "A tájolás, a jövőbeli építkezések és a komplexumon belüli pozíció jelentősen befolyásolhatják a kilátás értékét.",
          "A jellemzőt a helyszínen és városrendezési térképen is ellenőrizd, ne csak a hirdetés alapján.",
        ],
      },
    ],
  },
};

export function getMarketPageCopy(locale: Locale) {
  return marketPageCopy[locale];
}

export function getMarketArticle(locale: Locale, slug: string) {
  const index = marketArticleSlugs.indexOf(slug as MarketArticleSlug);

  if (index === -1) {
    return null;
  }

  const insight = marketPageCopy[locale].insights[index];
  return insight ? { ...insight, slug: marketArticleSlugs[index] } : null;
}

export function getMarketArticles(locale: Locale) {
  return marketArticleSlugs.flatMap((slug, index) => {
    const insight = marketPageCopy[locale].insights[index];
    return insight ? [{ ...insight, slug }] : [];
  });
}
