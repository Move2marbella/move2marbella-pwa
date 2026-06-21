export const locales = ["en", "es", "fr", "de", "ru", "pl", "hu"] as const;

export type Locale = (typeof locales)[number];

type Translation = {
  any: string;
  anyProperty: string;
  anyReference: string;
  apiStatus: string;
  apply: string;
  area: string;
  askAboutProperty: string;
  advancedFilters: string;
  back: string;
  bathrooms: string;
  beachfront: string;
  bedrooms: string;
  built: string;
  clear: string;
  costaDelSol: string;
  details: string;
  email: string;
  enquire: string;
  favourite: string;
  favourites: string;
  featuredProperties: string;
  defaultSort: string;
  heatedPool: string;
  leadForm: string;
  liveSearchPreview: string;
  location: string;
  maxPrice: string;
  message: string;
  mapZone: string;
  moreSaved: string;
  mustHave: string;
  name: string;
  nearbyAreaHint: string;
  nearbyAttribution: string;
  nearbyPlaces: string;
  next: string;
  noPropertiesFound: string;
  overview: string;
  openInMaps: string;
  phone: string;
  plot: string;
  previous: string;
  pricePerSquareMetre: string;
  priceHighToLow: string;
  priceLowToHigh: string;
  quickFilters: string;
  reference: string;
  requestDetails: string;
  searchExamples: string[];
  smartSearchLabel: string;
  smartSearchPlaceholder: string;
  features: string;
  saved: string;
  saveHint: string;
  search: string;
  seaView: string;
  sendEnquiry: string;
  shareOnWhatsApp: string;
  sortByPrice: string;
  terrace: string;
  type: string;
  heroEyebrow: string;
  heroTitle: string;
  seoDescription: string;
  leadDefaultMessage: string;
  valuation: {
    adjustments: string;
    askingRangeHint: string;
    benchmarkDetails: string;
    benchmarksAvailable: string;
    builtArea: string;
    calculateEstimate: string;
    comparableActiveListings: string;
    comparableListings: string;
    confidence: string;
    consent: string;
    detailedReport: string;
    detailedSourceQuality: string;
    emailPlaceholder: string;
    estimateDisclaimer: string;
    estimateReady: string;
    firstValuationBody: string;
    firstValuationTitle: string;
    formArea: string;
    formMunicipality: string;
    formOutdoorSpace: string;
    formParking: string;
    formPostalCode: string;
    formPropertyType: string;
    geographyMunicipality: string;
    geographyNearestMunicipality: string;
    geographyNearestPostalCode: string;
    geographyPostalCode: string;
    heroBody: string;
    heroEyebrow: string;
    heroTitle: string;
    homeCta: string;
    indicativeRange: string;
    leadBody: string;
    leadSubmitError: string;
    leadSubmitting: string;
    leadTitle: string;
    marketBenchmark: string;
    midpoint: string;
    noComparables: string;
    noMatch: string;
    noPublicMatch: string;
    notariadoArea: string;
    notariadoBenchmark: string;
    ownListingComps: string;
    preview: string;
    property: string;
    propertyInArea: string;
    ready: string;
    report: string;
    searchProperties: string;
    showDetailedValuation: string;
    shortCta: string;
    sourceBreakdown: string;
    sourceLogic: string;
    sourceLogicBody: string;
    sourceWeights: string;
    transactions: string;
    weight: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    any: "Any",
    anyProperty: "Any property",
    anyReference: "Any reference",
    apiStatus: "API Status",
    apply: "Apply",
    area: "Area",
    askAboutProperty: "Ask about this property",
    advancedFilters: "Advanced filters",
    back: "Back",
    bathrooms: "Bathrooms",
    beachfront: "Beachfront",
    bedrooms: "Bedrooms",
    built: "Built",
    clear: "Clear",
    costaDelSol: "Costa del Sol",
    details: "Details",
    email: "Email",
    enquire: "Enquire",
    favourite: "Favourite",
    favourites: "Favourites",
    featuredProperties: "Featured properties",
    defaultSort: "Newest",
    heatedPool: "Heated Pool",
    leadForm: "Lead form",
    liveSearchPreview: "Live search preview",
    location: "Location",
    maxPrice: "Max price",
    mustHave: "Must have",
    message: "Message",
    mapZone: "Map zone",
    moreSaved: "more saved on this device.",
    name: "Name",
    nearbyAreaHint: "Places within the displayed ZIP zone.",
    nearbyAttribution: "Nearby place data: © OpenStreetMap contributors",
    nearbyPlaces: "Nearby places in the area",
    next: "Next",
    noPropertiesFound: "No properties found for these filters.",
    overview: "Overview",
    openInMaps: "Open in Maps",
    phone: "Phone",
    plot: "Plot",
    previous: "Previous",
    pricePerSquareMetre: "Price / m²",
    priceHighToLow: "High to low price",
    priceLowToHigh: "Low to high price",
    quickFilters: "Quick filters",
    reference: "Reference",
    requestDetails: "Request details",
    searchExamples: [
      "sea-view villa in Marbella",
      "beachside apartment close to the beach",
      "beachfront penthouse on the Costa del Sol",
    ],
    smartSearchLabel: "Describe your ideal property",
    smartSearchPlaceholder: "sea-view villa in Marbella close to the beach",
    features: "Features",
    saved: "Saved",
    saveHint: "Tap Favourite on any property to keep it saved on this device.",
    search: "Search",
    seaView: "Sea-View",
    sendEnquiry: "Send enquiry",
    shareOnWhatsApp: "Share on WhatsApp",
    sortByPrice: "Sort by",
    terrace: "Terrace",
    type: "Type",
    heroEyebrow: "Marbella property search",
    heroTitle: "Find your next home on the Costa del Sol",
    seoDescription:
      "Search properties for sale in Marbella and across the Costa del Sol with Move2Marbella.",
    leadDefaultMessage: "I would like more information about this property.",
    valuation: {
      adjustments: "Adjustments",
      askingRangeHint:
        "Combine Move2Marbella active listing comparables with public Notariado transaction benchmarks to estimate a realistic asking range before speaking with an owner.",
      benchmarkDetails: "Benchmark details",
      benchmarksAvailable: "Benchmarks and comparables available",
      builtArea: "Built area",
      calculateEstimate: "Calculate estimate",
      comparableActiveListings: "Comparable active listings",
      comparableListings: "Comparable listings",
      confidence: "Confidence",
      consent:
        "I am happy for Move2Marbella to contact me about this valuation by email, phone or WhatsApp.",
      detailedReport: "Detailed report",
      detailedSourceQuality: "Detailed source quality after contact",
      emailPlaceholder: "name@example.com",
      estimateDisclaimer:
        "This tool is a market estimate for lead qualification and seller conversations. It is not an official bank valuation or a regulated tasacion. Public benchmark use should remain targeted and cached rather than copied as a bulk dataset.",
      estimateReady: "Ready",
      firstValuationBody:
        "Fill in the form above to generate an indicative owner-facing range. The result will show the blend between active Move2Marbella listings, public Notariado transaction data and the external market benchmark slot.",
      firstValuationTitle: "Ready for the first valuation",
      formArea: "Area or urbanisation",
      formMunicipality: "Municipality",
      formOutdoorSpace: "Outdoor space",
      formParking: "Parking",
      formPostalCode: "Postal code",
      formPropertyType: "Property type",
      geographyMunicipality: "municipality",
      geographyNearestMunicipality: "nearest municipality",
      geographyNearestPostalCode: "nearest postal code",
      geographyPostalCode: "postal code",
      heroBody:
        "Combine Move2Marbella active listing comparables with public Notariado transaction benchmarks to estimate a realistic asking range before speaking with an owner.",
      heroEyebrow: "Seller intelligence",
      heroTitle: "Costa del Sol property valuation",
      homeCta: "Get a property valuation",
      indicativeRange: "Indicative range",
      leadBody:
        "We will show the source breakdown, Notariado benchmark and comparable Move2Marbella listings after the contact details. No hard sell, just enough information to follow up properly if the estimate is relevant.",
      leadSubmitError:
        "We could not send the request right now. Please check the details and try again.",
      leadSubmitting: "Sending...",
      leadTitle: "Send me the detailed valuation",
      marketBenchmark: "Market benchmark",
      midpoint: "Midpoint",
      noComparables:
        "No close active listing comparables were found for this exact area/type/size combination yet. The estimate falls back to public benchmarks until more matching listings are available.",
      noMatch: "No match",
      noPublicMatch: "No public match",
      notariadoArea: "Notariado area",
      notariadoBenchmark: "Notariado benchmark",
      ownListingComps: "Own listing comps",
      preview: "Preview",
      property: "Property",
      propertyInArea: "{type} in {area}",
      ready: "Ready",
      report: "Report",
      searchProperties: "Search properties",
      showDetailedValuation: "Show detailed valuation",
      shortCta: "Valuation",
      sourceBreakdown: "Source breakdown",
      sourceLogic: "Source logic",
      sourceLogicBody:
        "Own listings represent active asking prices. Notariado gives a public transaction benchmark by postal code or municipality. The RealAdvisor slot is currently a public market benchmark and can be replaced with an approved data feed later.",
      sourceWeights: "Source weights",
      transactions: "Transactions",
      weight: "Weight",
    },
  },
  es: {
    any: "Cualquiera",
    anyProperty: "Cualquier propiedad",
    anyReference: "Cualquier referencia",
    apiStatus: "Estado API",
    apply: "Aplicar",
    area: "Zona",
    askAboutProperty: "Preguntar por esta propiedad",
    advancedFilters: "Filtros avanzados",
    back: "Volver",
    bathrooms: "Baños",
    beachfront: "Primera línea de playa",
    bedrooms: "Dormitorios",
    built: "Construido",
    clear: "Borrar",
    costaDelSol: "Costa del Sol",
    details: "Detalles",
    email: "Email",
    enquire: "Consultar",
    favourite: "Favorito",
    favourites: "Favoritos",
    featuredProperties: "Propiedades destacadas",
    defaultSort: "Más recientes",
    heatedPool: "Piscina climatizada",
    leadForm: "Formulario",
    liveSearchPreview: "Vista de búsqueda",
    location: "Ubicación",
    maxPrice: "Precio max.",
    mustHave: "Imprescindible",
    message: "Mensaje",
    mapZone: "Zona del mapa",
    moreSaved: "más guardadas en este dispositivo.",
    name: "Nombre",
    nearbyAreaHint: "Lugares dentro de la zona postal mostrada.",
    nearbyAttribution: "Datos de lugares cercanos: © colaboradores de OpenStreetMap",
    nearbyPlaces: "Lugares cercanos en la zona",
    next: "Siguiente",
    noPropertiesFound: "No se encontraron propiedades con estos filtros.",
    overview: "Resumen",
    openInMaps: "Abrir en Maps",
    phone: "Teléfono",
    plot: "Parcela",
    previous: "Anterior",
    pricePerSquareMetre: "Precio / m²",
    priceHighToLow: "Precio de mayor a menor",
    priceLowToHigh: "Precio de menor a mayor",
    quickFilters: "Filtros rápidos",
    reference: "Referencia",
    requestDetails: "Solicitar detalles",
    searchExamples: [
      "villa con vistas al mar en Marbella",
      "apartamento beachside cerca de la playa",
      "ático beachfront en la Costa del Sol",
    ],
    smartSearchLabel: "Describe la vivienda que buscas",
    smartSearchPlaceholder: "villa con vistas al mar en Marbella cerca de la playa",
    features: "Características",
    saved: "Guardado",
    saveHint: "Toca Favorito para guardar propiedades en este dispositivo.",
    search: "Buscar",
    seaView: "Vistas al mar",
    sendEnquiry: "Enviar consulta",
    shareOnWhatsApp: "Compartir en WhatsApp",
    sortByPrice: "Ordenar por",
    terrace: "Terraza",
    type: "Tipo",
    heroEyebrow: "Búsqueda de propiedades en Marbella",
    heroTitle: "Encuentra tu próxima casa en la Costa del Sol",
    seoDescription:
      "Busca propiedades en venta en Marbella y la Costa del Sol con Move2Marbella.",
    leadDefaultMessage: "Me gustaría recibir más información sobre esta propiedad.",
    valuation: {
      adjustments: "Ajustes",
      askingRangeHint:
        "Combina comparables activos de Move2Marbella con datos públicos de transacciones del Notariado para estimar un rango de precio realista antes de hablar con un propietario.",
      benchmarkDetails: "Detalles del benchmark",
      benchmarksAvailable: "Benchmarks y comparables disponibles",
      builtArea: "Superficie construida",
      calculateEstimate: "Calcular estimación",
      comparableActiveListings: "Comparables activos",
      comparableListings: "Inmuebles comparables",
      confidence: "Confianza",
      consent:
        "Acepto que Move2Marbella me contacte sobre esta valoración por email, teléfono o WhatsApp.",
      detailedReport: "Informe detallado",
      detailedSourceQuality: "Calidad de fuentes detallada tras el contacto",
      emailPlaceholder: "nombre@ejemplo.com",
      estimateDisclaimer:
        "Esta herramienta ofrece una estimación de mercado para cualificar leads y conversaciones con vendedores. No es una tasación bancaria oficial ni una tasación regulada. El uso de benchmarks públicos debe ser puntual y cacheado, no una copia masiva de datos.",
      estimateReady: "Listo",
      firstValuationBody:
        "Completa el formulario para generar un rango indicativo para propietarios. El resultado mostrará la mezcla entre anuncios activos de Move2Marbella, datos públicos del Notariado y el benchmark externo de mercado.",
      firstValuationTitle: "Listo para la primera valoración",
      formArea: "Zona o urbanización",
      formMunicipality: "Municipio",
      formOutdoorSpace: "Espacio exterior",
      formParking: "Aparcamiento",
      formPostalCode: "Código postal",
      formPropertyType: "Tipo de propiedad",
      geographyMunicipality: "municipio",
      geographyNearestMunicipality: "municipio más cercano",
      geographyNearestPostalCode: "código postal más cercano",
      geographyPostalCode: "código postal",
      heroBody:
        "Combina comparables activos de Move2Marbella con datos públicos de transacciones del Notariado para estimar un rango de precio realista antes de hablar con un propietario.",
      heroEyebrow: "Inteligencia para vendedores",
      heroTitle: "Valoración de propiedades en la Costa del Sol",
      homeCta: "Obtener valoración",
      indicativeRange: "Rango indicativo",
      leadBody:
        "Mostraremos el desglose de fuentes, el benchmark del Notariado y los comparables de Move2Marbella después de los datos de contacto. Sin presión comercial, solo la información necesaria para hacer seguimiento si la estimación encaja.",
      leadSubmitError:
        "No hemos podido enviar la solicitud ahora mismo. Revisa los datos e inténtalo de nuevo.",
      leadSubmitting: "Enviando...",
      leadTitle: "Enviarme la valoración detallada",
      marketBenchmark: "Benchmark de mercado",
      midpoint: "Punto medio",
      noComparables:
        "Aún no se encontraron comparables activos cercanos para esta combinación exacta de zona, tipo y superficie. La estimación usa benchmarks públicos hasta que haya más anuncios similares.",
      noMatch: "Sin coincidencia",
      noPublicMatch: "Sin dato público",
      notariadoArea: "Zona Notariado",
      notariadoBenchmark: "Benchmark Notariado",
      ownListingComps: "Comparables propios",
      preview: "Vista previa",
      property: "Propiedad",
      propertyInArea: "{type} en {area}",
      ready: "Listo",
      report: "Informe",
      searchProperties: "Buscar propiedades",
      showDetailedValuation: "Ver valoración detallada",
      shortCta: "Valoración",
      sourceBreakdown: "Desglose de fuentes",
      sourceLogic: "Lógica de fuentes",
      sourceLogicBody:
        "Los anuncios propios representan precios de oferta activos. El Notariado aporta un benchmark público de transacciones por código postal o municipio. El bloque de RealAdvisor es actualmente un benchmark público de mercado y puede sustituirse por un feed aprobado más adelante.",
      sourceWeights: "Pesos de fuentes",
      transactions: "Transacciones",
      weight: "Peso",
    },
  },
  fr: {
    any: "Tous",
    anyProperty: "Tout bien",
    anyReference: "Toute référence",
    apiStatus: "Statut API",
    apply: "Appliquer",
    area: "Zone",
    askAboutProperty: "Demander ce bien",
    advancedFilters: "Filtres avancés",
    back: "Retour",
    bathrooms: "Salles de bain",
    beachfront: "Front de mer",
    bedrooms: "Chambres",
    built: "Construit",
    clear: "Effacer",
    costaDelSol: "Costa del Sol",
    details: "Details",
    email: "Email",
    enquire: "Demander",
    favourite: "Favori",
    favourites: "Favoris",
    featuredProperties: "Biens en vedette",
    defaultSort: "Plus récents",
    heatedPool: "Piscine chauffée",
    leadForm: "Formulaire",
    liveSearchPreview: "Aperçu de recherche",
    location: "Localisation",
    maxPrice: "Prix max.",
    mustHave: "Indispensable",
    message: "Message",
    mapZone: "Zone carte",
    moreSaved: "autres enregistrés sur cet appareil.",
    name: "Nom",
    nearbyAreaHint: "Lieux situés dans la zone postale affichée.",
    nearbyAttribution: "Données des lieux à proximité : © contributeurs OpenStreetMap",
    nearbyPlaces: "Lieux à proximité dans la zone",
    next: "Suivant",
    noPropertiesFound: "Aucun bien trouvé avec ces filtres.",
    overview: "Aperçu",
    openInMaps: "Ouvrir dans Maps",
    phone: "Téléphone",
    plot: "Terrain",
    previous: "Précédent",
    pricePerSquareMetre: "Prix / m²",
    priceHighToLow: "Prix décroissant",
    priceLowToHigh: "Prix croissant",
    quickFilters: "Filtres rapides",
    reference: "Référence",
    requestDetails: "Demander des détails",
    searchExamples: [
      "villa vue mer à Marbella",
      "appartement beachside proche de la plage",
      "penthouse beachfront sur la Costa del Sol",
    ],
    smartSearchLabel: "Décrivez le bien recherché",
    smartSearchPlaceholder: "villa vue mer à Marbella proche de la plage",
    features: "Caractéristiques",
    saved: "Enregistré",
    saveHint: "Touchez Favori pour garder un bien sur cet appareil.",
    search: "Rechercher",
    seaView: "Vue mer",
    sendEnquiry: "Envoyer la demande",
    shareOnWhatsApp: "Partager sur WhatsApp",
    sortByPrice: "Trier par",
    terrace: "Terrasse",
    type: "Type",
    heroEyebrow: "Recherche immobilière à Marbella",
    heroTitle: "Trouvez votre prochaine maison sur la Costa del Sol",
    seoDescription:
      "Recherchez des biens à vendre à Marbella et sur la Costa del Sol avec Move2Marbella.",
    leadDefaultMessage: "Je souhaite recevoir plus d'informations sur ce bien.",
    valuation: {
      adjustments: "Ajustements",
      askingRangeHint:
        "Combine les biens comparables actifs de Move2Marbella avec les benchmarks publics du Notariado pour estimer une fourchette de prix réaliste avant d'échanger avec un propriétaire.",
      benchmarkDetails: "Détails du benchmark",
      benchmarksAvailable: "Benchmarks et comparables disponibles",
      builtArea: "Surface construite",
      calculateEstimate: "Calculer l'estimation",
      comparableActiveListings: "Annonces actives comparables",
      comparableListings: "Biens comparables",
      confidence: "Confiance",
      consent:
        "J'accepte que Move2Marbella me contacte au sujet de cette estimation par email, téléphone ou WhatsApp.",
      detailedReport: "Rapport détaillé",
      detailedSourceQuality: "Qualité détaillée des sources après contact",
      emailPlaceholder: "nom@exemple.com",
      estimateDisclaimer:
        "Cet outil est une estimation de marché pour qualifier les leads et préparer les échanges avec les vendeurs. Ce n'est pas une estimation bancaire officielle ni une tasación réglementée. L'utilisation des benchmarks publics doit rester ciblée et mise en cache, sans copie massive des données.",
      estimateReady: "Prêt",
      firstValuationBody:
        "Remplissez le formulaire pour générer une fourchette indicative destinée aux propriétaires. Le résultat montrera la combinaison entre annonces actives Move2Marbella, données publiques du Notariado et benchmark externe de marché.",
      firstValuationTitle: "Prêt pour la première estimation",
      formArea: "Zone ou urbanisation",
      formMunicipality: "Municipalité",
      formOutdoorSpace: "Espace extérieur",
      formParking: "Parking",
      formPostalCode: "Code postal",
      formPropertyType: "Type de bien",
      geographyMunicipality: "municipalité",
      geographyNearestMunicipality: "municipalité la plus proche",
      geographyNearestPostalCode: "code postal le plus proche",
      geographyPostalCode: "code postal",
      heroBody:
        "Combine les biens comparables actifs de Move2Marbella avec les benchmarks publics du Notariado pour estimer une fourchette de prix réaliste avant d'échanger avec un propriétaire.",
      heroEyebrow: "Intelligence vendeur",
      heroTitle: "Estimation immobilière sur la Costa del Sol",
      homeCta: "Obtenir une estimation",
      indicativeRange: "Fourchette indicative",
      leadBody:
        "Nous afficherons le détail des sources, le benchmark Notariado et les comparables Move2Marbella après les coordonnées. Pas de vente forcée, seulement les informations nécessaires pour faire un suivi si l'estimation est pertinente.",
      leadSubmitError:
        "Nous n'avons pas pu envoyer la demande pour le moment. Vérifiez les informations et réessayez.",
      leadSubmitting: "Envoi...",
      leadTitle: "M'envoyer l'estimation détaillée",
      marketBenchmark: "Benchmark marché",
      midpoint: "Point médian",
      noComparables:
        "Aucune annonce comparable proche n'a encore été trouvée pour cette combinaison exacte de zone, type et surface. L'estimation s'appuie sur les benchmarks publics jusqu'à l'arrivée de comparables plus proches.",
      noMatch: "Aucune correspondance",
      noPublicMatch: "Aucune donnée publique",
      notariadoArea: "Zone Notariado",
      notariadoBenchmark: "Benchmark Notariado",
      ownListingComps: "Comparables internes",
      preview: "Aperçu",
      property: "Bien",
      propertyInArea: "{type} à {area}",
      ready: "Prêt",
      report: "Rapport",
      searchProperties: "Rechercher des biens",
      showDetailedValuation: "Voir l'estimation détaillée",
      shortCta: "Estimation",
      sourceBreakdown: "Répartition des sources",
      sourceLogic: "Logique des sources",
      sourceLogicBody:
        "Les annonces internes représentent les prix demandés actifs. Le Notariado fournit un benchmark public des transactions par code postal ou municipalité. Le bloc RealAdvisor est actuellement un benchmark public de marché et pourra être remplacé par un flux approuvé plus tard.",
      sourceWeights: "Poids des sources",
      transactions: "Transactions",
      weight: "Poids",
    },
  },
  de: {
    any: "Alle",
    anyProperty: "Jede Immobilie",
    anyReference: "Jede Referenz",
    apiStatus: "API Status",
    apply: "Anwenden",
    area: "Gebiet",
    askAboutProperty: "Diese Immobilie anfragen",
    advancedFilters: "Erweiterte Filter",
    back: "Zurück",
    bathrooms: "Badezimmer",
    beachfront: "Direkt am Strand",
    bedrooms: "Schlafzimmer",
    built: "Wohnfläche",
    clear: "Löschen",
    costaDelSol: "Costa del Sol",
    details: "Details",
    email: "E-Mail",
    enquire: "Anfragen",
    favourite: "Favorit",
    favourites: "Favoriten",
    featuredProperties: "Ausgewählte Immobilien",
    defaultSort: "Neueste",
    heatedPool: "Beheizter Pool",
    leadForm: "Kontaktformular",
    liveSearchPreview: "Suchvorschau",
    location: "Lage",
    maxPrice: "Max. Preis",
    mustHave: "Must-have",
    message: "Nachricht",
    mapZone: "Kartenzone",
    moreSaved: "weitere auf diesem Gerät gespeichert.",
    name: "Name",
    nearbyAreaHint: "Orte innerhalb der angezeigten Postleitzone.",
    nearbyAttribution: "Daten zu Orten in der Nähe: © OpenStreetMap-Mitwirkende",
    nearbyPlaces: "Orte in der Nähe",
    next: "Weiter",
    noPropertiesFound: "Keine Immobilien für diese Filter gefunden.",
    overview: "Überblick",
    openInMaps: "In Maps öffnen",
    phone: "Telefon",
    plot: "Grundstück",
    previous: "Zurück",
    pricePerSquareMetre: "Preis / m²",
    priceHighToLow: "Preis absteigend",
    priceLowToHigh: "Preis aufsteigend",
    quickFilters: "Schnellfilter",
    reference: "Referenz",
    requestDetails: "Details anfragen",
    searchExamples: [
      "Villa mit Meerblick in Marbella",
      "Beachside Apartment nahe am Strand",
      "Beachfront Penthouse an der Costa del Sol",
    ],
    smartSearchLabel: "Beschreiben Sie Ihre Wunschimmobilie",
    smartSearchPlaceholder: "Villa mit Meerblick in Marbella nahe am Strand",
    features: "Ausstattung",
    saved: "Gespeichert",
    saveHint: "Tippen Sie auf Favorit, um Immobilien auf diesem Gerät zu speichern.",
    search: "Suchen",
    seaView: "Meerblick",
    sendEnquiry: "Anfrage senden",
    shareOnWhatsApp: "Auf WhatsApp teilen",
    sortByPrice: "Sortieren nach",
    terrace: "Terrasse",
    type: "Typ",
    heroEyebrow: "Immobiliensuche Marbella",
    heroTitle: "Finden Sie Ihr neues Zuhause an der Costa del Sol",
    seoDescription:
      "Suchen Sie Immobilien zum Verkauf in Marbella und an der Costa del Sol mit Move2Marbella.",
    leadDefaultMessage: "Ich möchte mehr Informationen zu dieser Immobilie erhalten.",
    valuation: {
      adjustments: "Anpassungen",
      askingRangeHint:
        "Kombiniert aktive Move2Marbella-Vergleichsangebote mit öffentlichen Notariado-Transaktionsbenchmarks, um vor dem Eigentümergespräch eine realistische Preisrange zu schätzen.",
      benchmarkDetails: "Benchmark-Details",
      benchmarksAvailable: "Benchmarks und Vergleichsobjekte verfügbar",
      builtArea: "Wohnfläche",
      calculateEstimate: "Schätzung berechnen",
      comparableActiveListings: "Aktive Vergleichsangebote",
      comparableListings: "Vergleichsimmobilien",
      confidence: "Sicherheit",
      consent:
        "Ich bin einverstanden, dass Move2Marbella mich zu dieser Bewertung per E-Mail, Telefon oder WhatsApp kontaktiert.",
      detailedReport: "Detaillierter Bericht",
      detailedSourceQuality: "Detaillierte Quellenqualität nach Kontaktangabe",
      emailPlaceholder: "name@beispiel.com",
      estimateDisclaimer:
        "Dieses Tool ist eine Marktschätzung zur Lead-Qualifizierung und für Verkäufergespräche. Es ist keine offizielle Bankbewertung und keine regulierte Tasación. Öffentliche Benchmarks sollten gezielt und zwischengespeichert genutzt werden, nicht als Massendatenkopie.",
      estimateReady: "Bereit",
      firstValuationBody:
        "Füllen Sie das Formular aus, um eine indikative Eigentümer-Preisspanne zu erhalten. Das Ergebnis zeigt die Mischung aus aktiven Move2Marbella-Angeboten, öffentlichen Notariado-Transaktionsdaten und externem Marktbenchmark.",
      firstValuationTitle: "Bereit für die erste Bewertung",
      formArea: "Gebiet oder Urbanisation",
      formMunicipality: "Gemeinde",
      formOutdoorSpace: "Außenbereich",
      formParking: "Parken",
      formPostalCode: "Postleitzahl",
      formPropertyType: "Immobilientyp",
      geographyMunicipality: "Gemeinde",
      geographyNearestMunicipality: "nächste Gemeinde",
      geographyNearestPostalCode: "nächste Postleitzahl",
      geographyPostalCode: "Postleitzahl",
      heroBody:
        "Kombiniert aktive Move2Marbella-Vergleichsangebote mit öffentlichen Notariado-Transaktionsbenchmarks, um vor dem Eigentümergespräch eine realistische Preisrange zu schätzen.",
      heroEyebrow: "Verkäufer-Intelligenz",
      heroTitle: "Immobilienbewertung an der Costa del Sol",
      homeCta: "Immobilienbewertung erhalten",
      indicativeRange: "Indikative Preisspanne",
      leadBody:
        "Nach den Kontaktdaten zeigen wir die Quellenaufschlüsselung, den Notariado-Benchmark und vergleichbare Move2Marbella-Angebote. Kein harter Verkauf, nur genug Information für eine sinnvolle Nachverfolgung.",
      leadSubmitError:
        "Die Anfrage konnte gerade nicht gesendet werden. Bitte prüfen Sie die Angaben und versuchen Sie es erneut.",
      leadSubmitting: "Wird gesendet...",
      leadTitle: "Detaillierte Bewertung senden",
      marketBenchmark: "Marktbenchmark",
      midpoint: "Mittelpunkt",
      noComparables:
        "Für diese genaue Kombination aus Gebiet, Typ und Fläche wurden noch keine nahen aktiven Vergleichsangebote gefunden. Die Schätzung nutzt öffentliche Benchmarks, bis mehr passende Angebote verfügbar sind.",
      noMatch: "Keine Übereinstimmung",
      noPublicMatch: "Keine öffentlichen Daten",
      notariadoArea: "Notariado-Gebiet",
      notariadoBenchmark: "Notariado-Benchmark",
      ownListingComps: "Eigene Vergleichsangebote",
      preview: "Vorschau",
      property: "Immobilie",
      propertyInArea: "{type} in {area}",
      ready: "Bereit",
      report: "Bericht",
      searchProperties: "Immobilien suchen",
      showDetailedValuation: "Detaillierte Bewertung anzeigen",
      shortCta: "Bewertung",
      sourceBreakdown: "Quellenaufschlüsselung",
      sourceLogic: "Quellenlogik",
      sourceLogicBody:
        "Eigene Angebote stehen für aktive Angebotspreise. Notariado liefert einen öffentlichen Transaktionsbenchmark nach Postleitzahl oder Gemeinde. Der RealAdvisor-Block ist derzeit ein öffentlicher Marktbenchmark und kann später durch einen freigegebenen Feed ersetzt werden.",
      sourceWeights: "Quellengewichtung",
      transactions: "Transaktionen",
      weight: "Gewicht",
    },
  },
  ru: {
    any: "Любой",
    anyProperty: "Любая недвижимость",
    anyReference: "Любая референция",
    apiStatus: "Статус API",
    apply: "Применить",
    area: "Район",
    askAboutProperty: "Спросить об объекте",
    advancedFilters: "Расширенные фильтры",
    back: "Назад",
    bathrooms: "Ванные",
    beachfront: "Первая линия пляжа",
    bedrooms: "Спальни",
    built: "Площадь",
    clear: "Очистить",
    costaDelSol: "Costa del Sol",
    details: "Подробнее",
    email: "Email",
    enquire: "Запрос",
    favourite: "В избранное",
    favourites: "Избранное",
    featuredProperties: "Рекомендуемые объекты",
    defaultSort: "Новые",
    heatedPool: "Подогреваемый бассейн",
    leadForm: "Форма заявки",
    liveSearchPreview: "Результаты поиска",
    location: "Локация",
    maxPrice: "Макс. цена",
    mustHave: "Обязательно",
    message: "Сообщение",
    mapZone: "Зона на карте",
    moreSaved: "ещё сохранено на этом устройстве.",
    name: "Имя",
    nearbyAreaHint: "Места в пределах указанной почтовой зоны.",
    nearbyAttribution: "Данные о ближайших местах: © участники OpenStreetMap",
    nearbyPlaces: "Места поблизости",
    next: "Далее",
    noPropertiesFound: "По этим фильтрам объекты не найдены.",
    overview: "Обзор",
    openInMaps: "Открыть в Maps",
    phone: "Телефон",
    plot: "Участок",
    previous: "Назад",
    pricePerSquareMetre: "Цена / м²",
    priceHighToLow: "Цена по убыванию",
    priceLowToHigh: "Цена по возрастанию",
    quickFilters: "Быстрые фильтры",
    reference: "Референция",
    requestDetails: "Запросить детали",
    searchExamples: [
      "вилла с видом на море в Marbella",
      "beachside апартаменты рядом с пляжем",
      "beachfront пентхаус на Costa del Sol",
    ],
    smartSearchLabel: "Опишите недвижимость, которую ищете",
    smartSearchPlaceholder: "вилла с видом на море в Marbella рядом с пляжем",
    features: "Характеристики",
    saved: "Сохранено",
    saveHint: "Нажмите В избранное, чтобы сохранить объект на этом устройстве.",
    search: "Поиск",
    seaView: "Вид на море",
    sendEnquiry: "Отправить запрос",
    shareOnWhatsApp: "Поделиться в WhatsApp",
    sortByPrice: "Сортировать по",
    terrace: "Терраса",
    type: "Тип",
    heroEyebrow: "Поиск недвижимости в Марбелье",
    heroTitle: "Найдите свой новый дом на Costa del Sol",
    seoDescription:
      "Найдите недвижимость на продажу в Марбелье и на Costa del Sol с Move2Marbella.",
    leadDefaultMessage: "Я хотел бы получить больше информации об этом объекте.",
    valuation: {
      adjustments: "Корректировки",
      askingRangeHint:
        "Сравниваем активные объявления Move2Marbella с публичными транзакционными benchmark-данными Notariado, чтобы оценить реалистичный диапазон цены перед разговором с собственником.",
      benchmarkDetails: "Детали benchmark",
      benchmarksAvailable: "Benchmarks и сравнимые объекты доступны",
      builtArea: "Площадь",
      calculateEstimate: "Рассчитать оценку",
      comparableActiveListings: "Активные сравнимые объявления",
      comparableListings: "Сравнимые объекты",
      confidence: "Надежность",
      consent:
        "Я согласен, чтобы Move2Marbella связалась со мной по этой оценке по email, телефону или WhatsApp.",
      detailedReport: "Подробный отчет",
      detailedSourceQuality: "Детальное качество источников после контакта",
      emailPlaceholder: "name@example.com",
      estimateDisclaimer:
        "Этот инструмент дает рыночную оценку для квалификации лидов и переговоров с продавцами. Это не официальная банковская оценка и не регулируемая tasacion. Публичные benchmarks следует использовать точечно и с кешированием, а не копировать массово.",
      estimateReady: "Готово",
      firstValuationBody:
        "Заполните форму, чтобы получить ориентировочный диапазон для собственника. Результат покажет сочетание активных объявлений Move2Marbella, публичных данных Notariado и внешнего рыночного benchmark.",
      firstValuationTitle: "Готово к первой оценке",
      formArea: "Район или урбанизация",
      formMunicipality: "Муниципалитет",
      formOutdoorSpace: "Внешняя зона",
      formParking: "Парковка",
      formPostalCode: "Почтовый индекс",
      formPropertyType: "Тип недвижимости",
      geographyMunicipality: "муниципалитет",
      geographyNearestMunicipality: "ближайший муниципалитет",
      geographyNearestPostalCode: "ближайший почтовый индекс",
      geographyPostalCode: "почтовый индекс",
      heroBody:
        "Сравниваем активные объявления Move2Marbella с публичными транзакционными benchmark-данными Notariado, чтобы оценить реалистичный диапазон цены перед разговором с собственником.",
      heroEyebrow: "Данные для продавцов",
      heroTitle: "Оценка недвижимости на Costa del Sol",
      homeCta: "Получить оценку",
      indicativeRange: "Ориентировочный диапазон",
      leadBody:
        "После контактных данных мы покажем разбивку источников, benchmark Notariado и сравнимые объекты Move2Marbella. Без навязчивых продаж, только информация для корректного follow-up.",
      leadSubmitError:
        "Сейчас не удалось отправить заявку. Проверьте данные и попробуйте снова.",
      leadSubmitting: "Отправка...",
      leadTitle: "Отправить мне подробную оценку",
      marketBenchmark: "Рыночный benchmark",
      midpoint: "Средняя точка",
      noComparables:
        "Для этой точной комбинации района, типа и площади пока не найдено близких активных comparables. Оценка использует публичные benchmarks, пока не появится больше похожих объектов.",
      noMatch: "Нет совпадения",
      noPublicMatch: "Нет публичных данных",
      notariadoArea: "Зона Notariado",
      notariadoBenchmark: "Benchmark Notariado",
      ownListingComps: "Собственные comparables",
      preview: "Предпросмотр",
      property: "Объект",
      propertyInArea: "{type} в {area}",
      ready: "Готово",
      report: "Отчет",
      searchProperties: "Искать недвижимость",
      showDetailedValuation: "Показать подробную оценку",
      shortCta: "Оценка",
      sourceBreakdown: "Разбивка источников",
      sourceLogic: "Логика источников",
      sourceLogicBody:
        "Собственные объявления отражают активные цены предложения. Notariado дает публичный benchmark транзакций по почтовому индексу или муниципалитету. Блок RealAdvisor сейчас является публичным рыночным benchmark и может быть позже заменен одобренным feed.",
      sourceWeights: "Вес источников",
      transactions: "Транзакции",
      weight: "Вес",
    },
  },
  pl: {
    any: "Dowolne",
    anyProperty: "Dowolna nieruchomość",
    anyReference: "Dowolny numer",
    apiStatus: "Status API",
    apply: "Zastosuj",
    area: "Obszar",
    askAboutProperty: "Zapytaj o tę nieruchomość",
    advancedFilters: "Filtry zaawansowane",
    back: "Wstecz",
    bathrooms: "Łazienki",
    beachfront: "Przy plaży",
    bedrooms: "Sypialnie",
    built: "Powierzchnia",
    clear: "Wyczyść",
    costaDelSol: "Costa del Sol",
    details: "Szczegóły",
    email: "Email",
    enquire: "Zapytaj",
    favourite: "Ulubione",
    favourites: "Ulubione",
    featuredProperties: "Polecane nieruchomości",
    defaultSort: "Najnowsze",
    heatedPool: "Podgrzewany basen",
    leadForm: "Formularz",
    liveSearchPreview: "Podgląd wyników",
    location: "Lokalizacja",
    maxPrice: "Cena maks.",
    mustHave: "Must have",
    message: "Wiadomość",
    mapZone: "Strefa mapy",
    moreSaved: "więcej zapisanych na tym urządzeniu.",
    name: "Imię",
    nearbyAreaHint: "Miejsca w obrębie wyświetlonej strefy kodu pocztowego.",
    nearbyAttribution: "Dane o pobliskich miejscach: © autorzy OpenStreetMap",
    nearbyPlaces: "Miejsca w pobliżu",
    next: "Dalej",
    noPropertiesFound: "Nie znaleziono nieruchomości dla tych filtrów.",
    overview: "Opis",
    openInMaps: "Otwórz w Maps",
    phone: "Telefon",
    plot: "Działka",
    previous: "Wstecz",
    pricePerSquareMetre: "Cena / m²",
    priceHighToLow: "Cena od najwyższej",
    priceLowToHigh: "Cena od najniższej",
    quickFilters: "Szybkie filtry",
    reference: "Numer referencyjny",
    requestDetails: "Poproś o szczegóły",
    searchExamples: [
      "willa z widokiem na morze w Marbella",
      "apartament beachside blisko plaży",
      "beachfront penthouse na Costa del Sol",
    ],
    smartSearchLabel: "Opisz idealną nieruchomość",
    smartSearchPlaceholder: "willa z widokiem na morze w Marbella blisko plaży",
    features: "Cechy",
    saved: "Zapisano",
    saveHint: "Dotknij Ulubione, aby zapisać nieruchomość na tym urządzeniu.",
    search: "Szukaj",
    seaView: "Widok na morze",
    sendEnquiry: "Wyślij zapytanie",
    shareOnWhatsApp: "Udostępnij na WhatsApp",
    sortByPrice: "Sortuj wg",
    terrace: "Taras",
    type: "Typ",
    heroEyebrow: "Wyszukiwarka nieruchomości Marbella",
    heroTitle: "Znajdź swój następny dom na Costa del Sol",
    seoDescription:
      "Znajdź nieruchomości na sprzedaż w Marbelli i na Costa del Sol z Move2Marbella.",
    leadDefaultMessage: "Chciałbym otrzymać więcej informacji o tej nieruchomości.",
    valuation: {
      adjustments: "Korekty",
      askingRangeHint:
        "Łączy aktywne oferty porównawcze Move2Marbella z publicznymi benchmarkami transakcyjnymi Notariado, aby oszacować realistyczny zakres ceny przed rozmową z właścicielem.",
      benchmarkDetails: "Szczegóły benchmarku",
      benchmarksAvailable: "Benchmarki i porównania dostępne",
      builtArea: "Powierzchnia",
      calculateEstimate: "Oblicz wycenę",
      comparableActiveListings: "Aktywne oferty porównawcze",
      comparableListings: "Nieruchomości porównawcze",
      confidence: "Pewność",
      consent:
        "Zgadzam się, aby Move2Marbella skontaktowało się ze mną w sprawie tej wyceny emailem, telefonicznie lub przez WhatsApp.",
      detailedReport: "Szczegółowy raport",
      detailedSourceQuality: "Szczegółowa jakość źródeł po kontakcie",
      emailPlaceholder: "imie@example.com",
      estimateDisclaimer:
        "To narzędzie jest szacunkiem rynkowym do kwalifikacji leadów i rozmów ze sprzedającymi. Nie jest oficjalną wyceną bankową ani regulowaną tasacion. Publiczne benchmarki powinny być używane punktowo i cache'owane, a nie kopiowane masowo.",
      estimateReady: "Gotowe",
      firstValuationBody:
        "Wypełnij formularz, aby wygenerować orientacyjny zakres dla właściciela. Wynik pokaże połączenie aktywnych ofert Move2Marbella, publicznych danych Notariado i zewnętrznego benchmarku rynkowego.",
      firstValuationTitle: "Gotowe do pierwszej wyceny",
      formArea: "Obszar lub urbanizacja",
      formMunicipality: "Gmina",
      formOutdoorSpace: "Przestrzeń zewnętrzna",
      formParking: "Parking",
      formPostalCode: "Kod pocztowy",
      formPropertyType: "Typ nieruchomości",
      geographyMunicipality: "gmina",
      geographyNearestMunicipality: "najbliższa gmina",
      geographyNearestPostalCode: "najbliższy kod pocztowy",
      geographyPostalCode: "kod pocztowy",
      heroBody:
        "Łączy aktywne oferty porównawcze Move2Marbella z publicznymi benchmarkami transakcyjnymi Notariado, aby oszacować realistyczny zakres ceny przed rozmową z właścicielem.",
      heroEyebrow: "Dane dla sprzedających",
      heroTitle: "Wycena nieruchomości na Costa del Sol",
      homeCta: "Uzyskaj wycenę",
      indicativeRange: "Zakres orientacyjny",
      leadBody:
        "Po podaniu danych kontaktowych pokażemy rozbicie źródeł, benchmark Notariado i porównywalne oferty Move2Marbella. Bez agresywnej sprzedaży, tylko informacje potrzebne do sensownego kontaktu.",
      leadSubmitError:
        "Nie udało się teraz wysłać zgłoszenia. Sprawdź dane i spróbuj ponownie.",
      leadSubmitting: "Wysyłanie...",
      leadTitle: "Wyślij mi szczegółową wycenę",
      marketBenchmark: "Benchmark rynkowy",
      midpoint: "Punkt środkowy",
      noComparables:
        "Nie znaleziono jeszcze bliskich aktywnych ofert porównawczych dla tej dokładnej kombinacji obszaru, typu i powierzchni. Wycena opiera się na publicznych benchmarkach, dopóki nie będzie więcej podobnych ofert.",
      noMatch: "Brak dopasowania",
      noPublicMatch: "Brak danych publicznych",
      notariadoArea: "Obszar Notariado",
      notariadoBenchmark: "Benchmark Notariado",
      ownListingComps: "Własne comparables",
      preview: "Podgląd",
      property: "Nieruchomość",
      propertyInArea: "{type} w {area}",
      ready: "Gotowe",
      report: "Raport",
      searchProperties: "Szukaj nieruchomości",
      showDetailedValuation: "Pokaż szczegółową wycenę",
      shortCta: "Wycena",
      sourceBreakdown: "Rozbicie źródeł",
      sourceLogic: "Logika źródeł",
      sourceLogicBody:
        "Własne oferty reprezentują aktywne ceny ofertowe. Notariado daje publiczny benchmark transakcji według kodu pocztowego lub gminy. Blok RealAdvisor jest obecnie publicznym benchmarkiem rynkowym i może później zostać zastąpiony zatwierdzonym feedem.",
      sourceWeights: "Wagi źródeł",
      transactions: "Transakcje",
      weight: "Waga",
    },
  },
  hu: {
    any: "Bármelyik",
    anyProperty: "Bármilyen ingatlan",
    anyReference: "Bármely referencia",
    apiStatus: "API státusz",
    apply: "Alkalmaz",
    area: "Terület",
    askAboutProperty: "Érdeklődés az ingatlanról",
    advancedFilters: "Részletes szűrők",
    back: "Vissza",
    bathrooms: "Fürdőszoba",
    beachfront: "Beachfront",
    bedrooms: "Hálószoba",
    built: "Alapterület",
    clear: "Törlés",
    costaDelSol: "Costa del Sol",
    details: "Részletek",
    email: "Email",
    enquire: "Érdeklődöm",
    favourite: "Kedvenc",
    favourites: "Kedvencek",
    featuredProperties: "Kiemelt ingatlanok",
    defaultSort: "Legújabb",
    heatedPool: "Fűtött medence",
    leadForm: "Űrlap",
    liveSearchPreview: "Keresési találatok",
    location: "Lokáció",
    maxPrice: "Max ár",
    mustHave: "Must have",
    message: "Üzenet",
    mapZone: "Térkép",
    moreSaved: "tovább mentve ezen az eszközön.",
    name: "Név",
    nearbyAreaHint: "A megjelenített irányítószám-zónán belüli helyek.",
    nearbyAttribution: "Nearby adatok: © OpenStreetMap használatával",
    nearbyPlaces: "Közeli helyek a környéken",
    next: "Következő",
    noPropertiesFound: "Nincs találat ezekkel a szűrőkkel.",
    overview: "Áttekintés",
    openInMaps: "Megnyitás Maps-ben",
    phone: "Telefon",
    plot: "Telek",
    previous: "Előző",
    pricePerSquareMetre: "Ár / m²",
    priceHighToLow: "Ár szerint csökkenő",
    priceLowToHigh: "Ár szerint növekvő",
    quickFilters: "Gyors szűrők",
    reference: "Referencia",
    requestDetails: "Részletek kérése",
    searchExamples: [
      "sea-view villa Marbellában",
      "beachside apartman közel a strandhoz",
      "beachfront penthouse a Costa del Solon",
    ],
    smartSearchLabel: "Írd le, milyen ingatlant keresel",
    smartSearchPlaceholder: "sea-view villa Marbellában közel a strandhoz",
    features: "Jellemzők",
    saved: "Mentve",
    saveHint: "Koppints a Kedvenc gombra, hogy elmentsd az ingatlant ezen az eszközön.",
    search: "Keresés",
    seaView: "Tengeri kilátás",
    sendEnquiry: "Érdeklődés küldése",
    shareOnWhatsApp: "Megosztás WhatsAppon",
    sortByPrice: "Rendezés",
    terrace: "Terasz",
    type: "Típus",
    heroEyebrow: "Marbella ingatlankeresés",
    heroTitle: "Találd meg következő otthonod a Costa del Solon",
    seoDescription:
      "Keress eladó ingatlanokat Marbellán és a Costa del Sol térségében a Move2Marbella segítségével.",
    leadDefaultMessage: "Szeretnék további információt kérni erről az ingatlanról.",
    valuation: {
      adjustments: "Korrekciók",
      askingRangeHint:
        "A Move2Marbella aktív összehasonlító hirdetéseit és a publikus Notariado tranzakciós adatokat kombináljuk, hogy reális ársávot adjunk.",
      benchmarkDetails: "Referencia részletek",
      benchmarksAvailable: "Elérhető referencia adatok",
      builtArea: "Alapterület",
      calculateEstimate: "Becslés kiszámítása",
      comparableActiveListings: "Aktív hasonló hirdetések",
      comparableListings: "Hasonló ingatlanok",
      confidence: "Megbízhatóság",
      consent:
        "Hozzájárulok, hogy a Move2Marbella emailben, telefonon vagy WhatsAppon megkeressen ezzel az értékbecsléssel kapcsolatban.",
      detailedReport: "Részletes riport",
      detailedSourceQuality: "Részletes adatok kapcsolatfelvétel után",
      emailPlaceholder: "nev@example.com",
      estimateDisclaimer:
        "Ez az eszköz piaci becslést ad lead-minősítéshez és személyes egyeztetésekhez. Nem hivatalos banki értékbecslés. A publikus referencia adatokat célzottan érdemes használni, nem tömeges másolatként.",
      estimateReady: "Kész",
      firstValuationBody:
        "Töltsd ki a fenti űrlapot egy tulajdonosnak szóló indikatív ársávhoz. Az eredmény megmutatja a Move2Marbella aktív hirdetései, a publikus Notariado tranzakciós adatok és a külső piaci referencia adatok kombinációját.",
      firstValuationTitle: "Készen áll az első értékbecslésre",
      formArea: "Környék vagy urbanizáció",
      formMunicipality: "Település",
      formOutdoorSpace: "Kültéri tér",
      formParking: "Parkolás",
      formPostalCode: "Irányítószám",
      formPropertyType: "Ingatlan típusa",
      geographyMunicipality: "település",
      geographyNearestMunicipality: "legközelebbi település",
      geographyNearestPostalCode: "legközelebbi irányítószám",
      geographyPostalCode: "irányítószám",
      heroBody:
        "A Move2Marbella aktív összehasonlító hirdetéseit és a publikus Notariado tranzakciós adatokat kombináljuk, hogy reális ársávot adjunk személyes konzultáció előtt.",
      heroEyebrow: "Eladói intelligencia",
      heroTitle: "Costa del Sol ingatlanérték-becslés",
      homeCta: "Ingatlanérték-becslés kérése",
      indicativeRange: "Indikatív ársáv",
      leadBody:
        "A kontaktadatok után megmutatjuk a források szerint, a Notariado adatokat és a Move2Marbella összehasonlító hirdetéseit. Nincs értékesítési nyomás, csak elegendő információ a pontos utánkövetéshez.",
      leadSubmitError:
        "Most nem sikerült elküldeni a kérést. Ellenőrizd az adatokat, és próbáld újra.",
      leadSubmitting: "Küldés...",
      leadTitle: "Kérem a részletes értékbecslést",
      marketBenchmark: "Piaci adatok",
      midpoint: "Középérték",
      noComparables:
        "Ehhez a pontos környék/típus/méret kombinációhoz még nincs közeli aktív összehasonlító hirdetés. A becslés addig publikus benchmarkokra támaszkodik, amíg több hasonló hirdetés elérhető.",
      noMatch: "Nincs találat",
      noPublicMatch: "Nincs publikus adat",
      notariadoArea: "Notariado terület",
      notariadoBenchmark: "Notariado referencia adatok",
      ownListingComps: "Saját összehasonlítás",
      preview: "Előnézet",
      property: "Ingatlan",
      propertyInArea: "{type} itt: {area}",
      ready: "Kész",
      report: "Riport",
      searchProperties: "Ingatlanok keresése",
      showDetailedValuation: "Részletes értékbecslés megnyitása",
      shortCta: "Értékbecslés",
      sourceBreakdown: "Forrásbontás",
      sourceLogic: "Forráslogika",
      sourceLogicBody:
        "A saját hirdetések az aktív kínálati árakat mutatják. A Notariado publikus tranzakció adatokat ad irányítószám vagy település alapján. A RealAdvisor blokk egy ismert publikus piaci benchmark.",
      sourceWeights: "Források súlya",
      transactions: "Tranzakciók",
      weight: "Súly",
    },
  },
};

export function getLocale(value?: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "en";
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleBasePath(locale: Locale) {
  return `/${locale}`;
}
