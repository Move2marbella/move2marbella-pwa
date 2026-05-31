export const locales = ["en", "es", "fr", "de", "ru", "pl", "hu"] as const;

export type Locale = (typeof locales)[number];

type Translation = {
  any: string;
  anyProperty: string;
  apiStatus: string;
  area: string;
  askAboutProperty: string;
  back: string;
  bathrooms: string;
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
  leadForm: string;
  liveSearchPreview: string;
  location: string;
  maxPrice: string;
  message: string;
  mapZone: string;
  moreSaved: string;
  name: string;
  next: string;
  noPropertiesFound: string;
  overview: string;
  openInMaps: string;
  phone: string;
  plot: string;
  previous: string;
  quickFilters: string;
  requestDetails: string;
  features: string;
  saved: string;
  saveHint: string;
  search: string;
  sendEnquiry: string;
  terrace: string;
  type: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  leadDefaultMessage: string;
};

export const translations: Record<Locale, Translation> = {
  en: {
    any: "Any",
    anyProperty: "Any property",
    apiStatus: "API Status",
    area: "Area",
    askAboutProperty: "Ask about this property",
    back: "Back",
    bathrooms: "Bathrooms",
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
    leadForm: "Lead form",
    liveSearchPreview: "Live search preview",
    location: "Location",
    maxPrice: "Max price",
    message: "Message",
    mapZone: "Map zone",
    moreSaved: "more saved on this device.",
    name: "Name",
    next: "Next",
    noPropertiesFound: "No properties found for these filters.",
    overview: "Overview",
    openInMaps: "Open in Maps",
    phone: "Phone",
    plot: "Plot",
    previous: "Previous",
    quickFilters: "Quick filters",
    requestDetails: "Request details",
    features: "Features",
    saved: "Saved",
    saveHint: "Tap Favourite on any property to keep it saved on this device.",
    search: "Search",
    sendEnquiry: "Send enquiry",
    terrace: "Terrace",
    type: "Type",
    heroEyebrow: "Marbella property search",
    heroTitle: "Find your next home on the Costa del Sol",
    heroText:
      "Search live Move2Marbella listings, then contact the team directly from your phone.",
    leadDefaultMessage: "I would like more information about this property.",
  },
  es: {
    any: "Cualquiera",
    anyProperty: "Cualquier propiedad",
    apiStatus: "Estado API",
    area: "Zona",
    askAboutProperty: "Preguntar por esta propiedad",
    back: "Volver",
    bathrooms: "Baños",
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
    leadForm: "Formulario",
    liveSearchPreview: "Vista de búsqueda",
    location: "Ubicación",
    maxPrice: "Precio max.",
    message: "Mensaje",
    mapZone: "Zona del mapa",
    moreSaved: "más guardadas en este dispositivo.",
    name: "Nombre",
    next: "Siguiente",
    noPropertiesFound: "No se encontraron propiedades con estos filtros.",
    overview: "Resumen",
    openInMaps: "Abrir en Maps",
    phone: "Teléfono",
    plot: "Parcela",
    previous: "Anterior",
    quickFilters: "Filtros rápidos",
    requestDetails: "Solicitar detalles",
    features: "Características",
    saved: "Guardado",
    saveHint: "Toca Favorito para guardar propiedades en este dispositivo.",
    search: "Buscar",
    sendEnquiry: "Enviar consulta",
    terrace: "Terraza",
    type: "Tipo",
    heroEyebrow: "Búsqueda de propiedades en Marbella",
    heroTitle: "Encuentra tu próxima casa en la Costa del Sol",
    heroText:
      "Busca propiedades Move2Marbella y contacta directamente con el equipo desde tu teléfono.",
    leadDefaultMessage: "Me gustaría recibir más información sobre esta propiedad.",
  },
  fr: {
    any: "Tous",
    anyProperty: "Tout bien",
    apiStatus: "Statut API",
    area: "Zone",
    askAboutProperty: "Demander ce bien",
    back: "Retour",
    bathrooms: "Salles de bain",
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
    leadForm: "Formulaire",
    liveSearchPreview: "Aperçu de recherche",
    location: "Localisation",
    maxPrice: "Prix max.",
    message: "Message",
    mapZone: "Zone carte",
    moreSaved: "autres enregistrés sur cet appareil.",
    name: "Nom",
    next: "Suivant",
    noPropertiesFound: "Aucun bien trouvé avec ces filtres.",
    overview: "Aperçu",
    openInMaps: "Ouvrir dans Maps",
    phone: "Téléphone",
    plot: "Terrain",
    previous: "Précédent",
    quickFilters: "Filtres rapides",
    requestDetails: "Demander des détails",
    features: "Caractéristiques",
    saved: "Enregistré",
    saveHint: "Touchez Favori pour garder un bien sur cet appareil.",
    search: "Rechercher",
    sendEnquiry: "Envoyer la demande",
    terrace: "Terrasse",
    type: "Type",
    heroEyebrow: "Recherche immobilière à Marbella",
    heroTitle: "Trouvez votre prochaine maison sur la Costa del Sol",
    heroText:
      "Recherchez les biens Move2Marbella, puis contactez directement l'équipe depuis votre téléphone.",
    leadDefaultMessage: "Je souhaite recevoir plus d'informations sur ce bien.",
  },
  de: {
    any: "Alle",
    anyProperty: "Jede Immobilie",
    apiStatus: "API Status",
    area: "Gebiet",
    askAboutProperty: "Diese Immobilie anfragen",
    back: "Zurück",
    bathrooms: "Badezimmer",
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
    leadForm: "Kontaktformular",
    liveSearchPreview: "Suchvorschau",
    location: "Lage",
    maxPrice: "Max. Preis",
    message: "Nachricht",
    mapZone: "Kartenzone",
    moreSaved: "weitere auf diesem Gerät gespeichert.",
    name: "Name",
    next: "Weiter",
    noPropertiesFound: "Keine Immobilien für diese Filter gefunden.",
    overview: "Überblick",
    openInMaps: "In Maps öffnen",
    phone: "Telefon",
    plot: "Grundstück",
    previous: "Zurück",
    quickFilters: "Schnellfilter",
    requestDetails: "Details anfragen",
    features: "Ausstattung",
    saved: "Gespeichert",
    saveHint: "Tippen Sie auf Favorit, um Immobilien auf diesem Gerät zu speichern.",
    search: "Suchen",
    sendEnquiry: "Anfrage senden",
    terrace: "Terrasse",
    type: "Typ",
    heroEyebrow: "Immobiliensuche Marbella",
    heroTitle: "Finden Sie Ihr neues Zuhause an der Costa del Sol",
    heroText:
      "Suchen Sie Move2Marbella-Angebote und kontaktieren Sie das Team direkt von Ihrem Telefon.",
    leadDefaultMessage: "Ich möchte mehr Informationen zu dieser Immobilie erhalten.",
  },
  ru: {
    any: "Любой",
    anyProperty: "Любая недвижимость",
    apiStatus: "Статус API",
    area: "Район",
    askAboutProperty: "Спросить об объекте",
    back: "Назад",
    bathrooms: "Ванные",
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
    leadForm: "Форма заявки",
    liveSearchPreview: "Результаты поиска",
    location: "Локация",
    maxPrice: "Макс. цена",
    message: "Сообщение",
    mapZone: "Зона на карте",
    moreSaved: "ещё сохранено на этом устройстве.",
    name: "Имя",
    next: "Далее",
    noPropertiesFound: "По этим фильтрам объекты не найдены.",
    overview: "Обзор",
    openInMaps: "Открыть в Maps",
    phone: "Телефон",
    plot: "Участок",
    previous: "Назад",
    quickFilters: "Быстрые фильтры",
    requestDetails: "Запросить детали",
    features: "Характеристики",
    saved: "Сохранено",
    saveHint: "Нажмите В избранное, чтобы сохранить объект на этом устройстве.",
    search: "Поиск",
    sendEnquiry: "Отправить запрос",
    terrace: "Терраса",
    type: "Тип",
    heroEyebrow: "Поиск недвижимости в Марбелье",
    heroTitle: "Найдите свой новый дом на Costa del Sol",
    heroText:
      "Ищите предложения Move2Marbella и связывайтесь с командой прямо с телефона.",
    leadDefaultMessage: "Я хотел бы получить больше информации об этом объекте.",
  },
  pl: {
    any: "Dowolne",
    anyProperty: "Dowolna nieruchomość",
    apiStatus: "Status API",
    area: "Obszar",
    askAboutProperty: "Zapytaj o tę nieruchomość",
    back: "Wstecz",
    bathrooms: "Łazienki",
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
    leadForm: "Formularz",
    liveSearchPreview: "Podgląd wyników",
    location: "Lokalizacja",
    maxPrice: "Cena maks.",
    message: "Wiadomość",
    mapZone: "Strefa mapy",
    moreSaved: "więcej zapisanych na tym urządzeniu.",
    name: "Imię",
    next: "Dalej",
    noPropertiesFound: "Nie znaleziono nieruchomości dla tych filtrów.",
    overview: "Opis",
    openInMaps: "Otwórz w Maps",
    phone: "Telefon",
    plot: "Działka",
    previous: "Wstecz",
    quickFilters: "Szybkie filtry",
    requestDetails: "Poproś o szczegóły",
    features: "Cechy",
    saved: "Zapisano",
    saveHint: "Dotknij Ulubione, aby zapisać nieruchomość na tym urządzeniu.",
    search: "Szukaj",
    sendEnquiry: "Wyślij zapytanie",
    terrace: "Taras",
    type: "Typ",
    heroEyebrow: "Wyszukiwarka nieruchomości Marbella",
    heroTitle: "Znajdź swój następny dom na Costa del Sol",
    heroText:
      "Przeglądaj oferty Move2Marbella i skontaktuj się z zespołem bezpośrednio z telefonu.",
    leadDefaultMessage: "Chciałbym otrzymać więcej informacji o tej nieruchomości.",
  },
  hu: {
    any: "Bármelyik",
    anyProperty: "Bármilyen ingatlan",
    apiStatus: "API státusz",
    area: "Terület",
    askAboutProperty: "Érdeklődés az ingatlanról",
    back: "Vissza",
    bathrooms: "Fürdők",
    bedrooms: "Hálószobák",
    built: "Alapterület",
    clear: "Törlés",
    costaDelSol: "Costa del Sol",
    details: "Részletek",
    email: "Email",
    enquire: "Érdeklődöm",
    favourite: "Kedvenc",
    favourites: "Kedvencek",
    featuredProperties: "Kiemelt ingatlanok",
    leadForm: "Érdeklődő űrlap",
    liveSearchPreview: "Keresési találatok",
    location: "Lokáció",
    maxPrice: "Max ár",
    message: "Üzenet",
    mapZone: "Térkép zóna",
    moreSaved: "további mentve ezen az eszközön.",
    name: "Név",
    next: "Következő",
    noPropertiesFound: "Nincs találat ezekkel a szűrőkkel.",
    overview: "Áttekintés",
    openInMaps: "Megnyitás Maps-ben",
    phone: "Telefon",
    plot: "Telek",
    previous: "Előző",
    quickFilters: "Gyors szűrők",
    requestDetails: "Részletek kérése",
    features: "Jellemzők",
    saved: "Mentve",
    saveHint: "Koppints a Kedvenc gombra, hogy elmentsd az ingatlant ezen az eszközön.",
    search: "Keresés",
    sendEnquiry: "Érdeklődés küldése",
    terrace: "Terasz",
    type: "Típus",
    heroEyebrow: "Marbella ingatlankeresés",
    heroTitle: "Találd meg következő otthonod a Costa del Solon",
    heroText:
      "Keress élő Move2Marbella ingatlanokat, majd vedd fel közvetlenül a kapcsolatot a csapattal telefonról.",
    leadDefaultMessage: "Szeretnék további információt kérni erről az ingatlanról.",
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
