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
  moreSaved: string;
  name: string;
  next: string;
  noPropertiesFound: string;
  overview: string;
  phone: string;
  plot: string;
  previous: string;
  quickFilters: string;
  requestDetails: string;
  resalesFeatures: string;
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
    moreSaved: "more saved on this device.",
    name: "Name",
    next: "Next",
    noPropertiesFound: "No properties found for these filters.",
    overview: "Overview",
    phone: "Phone",
    plot: "Plot",
    previous: "Previous",
    quickFilters: "Quick filters",
    requestDetails: "Request details",
    resalesFeatures: "Resales Online features",
    saved: "Saved",
    saveHint: "Tap Favourite on any property to keep it saved on this device.",
    search: "Search",
    sendEnquiry: "Send enquiry",
    terrace: "Terrace",
    type: "Type",
    heroEyebrow: "Marbella property search",
    heroTitle: "Find your next home on the Costa del Sol",
    heroText:
      "Search live Move2Marbella listings imported from Resales Online, then contact the team directly from your phone.",
    leadDefaultMessage: "I would like more information about this property.",
  },
  es: {
    any: "Cualquiera",
    anyProperty: "Cualquier propiedad",
    apiStatus: "Estado API",
    area: "Zona",
    askAboutProperty: "Preguntar por esta propiedad",
    back: "Volver",
    bathrooms: "Banos",
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
    liveSearchPreview: "Vista de busqueda",
    location: "Ubicacion",
    maxPrice: "Precio max.",
    message: "Mensaje",
    moreSaved: "mas guardadas en este dispositivo.",
    name: "Nombre",
    next: "Siguiente",
    noPropertiesFound: "No se encontraron propiedades con estos filtros.",
    overview: "Resumen",
    phone: "Telefono",
    plot: "Parcela",
    previous: "Anterior",
    quickFilters: "Filtros rapidos",
    requestDetails: "Solicitar detalles",
    resalesFeatures: "Caracteristicas",
    saved: "Guardado",
    saveHint: "Toca Favorito para guardar propiedades en este dispositivo.",
    search: "Buscar",
    sendEnquiry: "Enviar consulta",
    terrace: "Terraza",
    type: "Tipo",
    heroEyebrow: "Busqueda de propiedades en Marbella",
    heroTitle: "Encuentra tu proxima casa en la Costa del Sol",
    heroText:
      "Busca propiedades Move2Marbella importadas desde Resales Online y contacta directamente desde tu telefono.",
    leadDefaultMessage: "Me gustaria recibir mas informacion sobre esta propiedad.",
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
    liveSearchPreview: "Apercu de recherche",
    location: "Localisation",
    maxPrice: "Prix max.",
    message: "Message",
    moreSaved: "autres enregistres sur cet appareil.",
    name: "Nom",
    next: "Suivant",
    noPropertiesFound: "Aucun bien trouve avec ces filtres.",
    overview: "Apercu",
    phone: "Telephone",
    plot: "Terrain",
    previous: "Precedent",
    quickFilters: "Filtres rapides",
    requestDetails: "Demander des details",
    resalesFeatures: "Caracteristiques",
    saved: "Enregistre",
    saveHint: "Touchez Favori pour garder un bien sur cet appareil.",
    search: "Rechercher",
    sendEnquiry: "Envoyer la demande",
    terrace: "Terrasse",
    type: "Type",
    heroEyebrow: "Recherche immobiliere a Marbella",
    heroTitle: "Trouvez votre prochaine maison sur la Costa del Sol",
    heroText:
      "Recherchez les biens Move2Marbella importes depuis Resales Online puis contactez l'equipe depuis votre telephone.",
    leadDefaultMessage: "Je souhaite recevoir plus d'informations sur ce bien.",
  },
  de: {
    any: "Alle",
    anyProperty: "Jede Immobilie",
    apiStatus: "API Status",
    area: "Gebiet",
    askAboutProperty: "Diese Immobilie anfragen",
    back: "Zuruck",
    bathrooms: "Badezimmer",
    bedrooms: "Schlafzimmer",
    built: "Wohnflache",
    clear: "Loschen",
    costaDelSol: "Costa del Sol",
    details: "Details",
    email: "E-Mail",
    enquire: "Anfragen",
    favourite: "Favorit",
    favourites: "Favoriten",
    featuredProperties: "Ausgewahlte Immobilien",
    leadForm: "Kontaktformular",
    liveSearchPreview: "Suchvorschau",
    location: "Lage",
    maxPrice: "Max. Preis",
    message: "Nachricht",
    moreSaved: "weitere auf diesem Gerat gespeichert.",
    name: "Name",
    next: "Weiter",
    noPropertiesFound: "Keine Immobilien fur diese Filter gefunden.",
    overview: "Uberblick",
    phone: "Telefon",
    plot: "Grundstuck",
    previous: "Zuruck",
    quickFilters: "Schnellfilter",
    requestDetails: "Details anfragen",
    resalesFeatures: "Ausstattung",
    saved: "Gespeichert",
    saveHint: "Tippen Sie auf Favorit, um Immobilien auf diesem Gerat zu speichern.",
    search: "Suchen",
    sendEnquiry: "Anfrage senden",
    terrace: "Terrasse",
    type: "Typ",
    heroEyebrow: "Immobiliensuche Marbella",
    heroTitle: "Finden Sie Ihr neues Zuhause an der Costa del Sol",
    heroText:
      "Suchen Sie live Move2Marbella Angebote aus Resales Online und kontaktieren Sie das Team direkt vom Telefon.",
    leadDefaultMessage: "Ich mochte mehr Informationen zu dieser Immobilie erhalten.",
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
    moreSaved: "еще сохранено на этом устройстве.",
    name: "Имя",
    next: "Далее",
    noPropertiesFound: "По этим фильтрам объекты не найдены.",
    overview: "Обзор",
    phone: "Телефон",
    plot: "Участок",
    previous: "Назад",
    quickFilters: "Быстрые фильтры",
    requestDetails: "Запросить детали",
    resalesFeatures: "Характеристики",
    saved: "Сохранено",
    saveHint: "Нажмите В избранное, чтобы сохранить объект на этом устройстве.",
    search: "Поиск",
    sendEnquiry: "Отправить запрос",
    terrace: "Терраса",
    type: "Тип",
    heroEyebrow: "Поиск недвижимости в Марбелье",
    heroTitle: "Найдите свой новый дом на Costa del Sol",
    heroText:
      "Ищите предложения Move2Marbella из Resales Online и связывайтесь с командой прямо с телефона.",
    leadDefaultMessage: "Я хотел бы получить больше информации об этом объекте.",
  },
  pl: {
    any: "Dowolne",
    anyProperty: "Dowolna nieruchomosc",
    apiStatus: "Status API",
    area: "Obszar",
    askAboutProperty: "Zapytaj o te nieruchomosc",
    back: "Wstecz",
    bathrooms: "Lazienki",
    bedrooms: "Sypialnie",
    built: "Powierzchnia",
    clear: "Wyczysc",
    costaDelSol: "Costa del Sol",
    details: "Szczegoly",
    email: "Email",
    enquire: "Zapytaj",
    favourite: "Ulubione",
    favourites: "Ulubione",
    featuredProperties: "Polecane nieruchomosci",
    leadForm: "Formularz",
    liveSearchPreview: "Podglad wynikow",
    location: "Lokalizacja",
    maxPrice: "Cena maks.",
    message: "Wiadomosc",
    moreSaved: "wiecej zapisanych na tym urzadzeniu.",
    name: "Imie",
    next: "Dalej",
    noPropertiesFound: "Nie znaleziono nieruchomosci dla tych filtrow.",
    overview: "Opis",
    phone: "Telefon",
    plot: "Dzialka",
    previous: "Wstecz",
    quickFilters: "Szybkie filtry",
    requestDetails: "Popros o szczegoly",
    resalesFeatures: "Cechy",
    saved: "Zapisano",
    saveHint: "Dotknij Ulubione, aby zapisac nieruchomosc na tym urzadzeniu.",
    search: "Szukaj",
    sendEnquiry: "Wyslij zapytanie",
    terrace: "Taras",
    type: "Typ",
    heroEyebrow: "Wyszukiwarka nieruchomosci Marbella",
    heroTitle: "Znajdz swoj nastepny dom na Costa del Sol",
    heroText:
      "Przegladaj oferty Move2Marbella z Resales Online i skontaktuj sie z zespolem z telefonu.",
    leadDefaultMessage: "Chcialbym otrzymac wiecej informacji o tej nieruchomosci.",
  },
  hu: {
    any: "Barmelyik",
    anyProperty: "Barmilyen ingatlan",
    apiStatus: "API statusz",
    area: "Terulet",
    askAboutProperty: "Erdeklodes az ingatlanrol",
    back: "Vissza",
    bathrooms: "Furdok",
    bedrooms: "Halszobak",
    built: "Alapterulet",
    clear: "Torles",
    costaDelSol: "Costa del Sol",
    details: "Reszletek",
    email: "Email",
    enquire: "Erdeklodom",
    favourite: "Kedvenc",
    favourites: "Kedvencek",
    featuredProperties: "Kiemelt ingatlanok",
    leadForm: "Erdeklodo urlap",
    liveSearchPreview: "Keresesi talalatok",
    location: "Lokacio",
    maxPrice: "Max ar",
    message: "Uzenet",
    moreSaved: "tovabbi mentve ezen az eszkozon.",
    name: "Nev",
    next: "Kovetkezo",
    noPropertiesFound: "Nincs talalat ezekkel a szurokkel.",
    overview: "Attekintes",
    phone: "Telefon",
    plot: "Telek",
    previous: "Elozo",
    quickFilters: "Gyors szurok",
    requestDetails: "Reszletek kerese",
    resalesFeatures: "Jellemzok",
    saved: "Mentve",
    saveHint: "Koppints a Kedvenc gombra, hogy elmentsd az ingatlant ezen az eszkozon.",
    search: "Kereses",
    sendEnquiry: "Erdeklodes kuldese",
    terrace: "Terasz",
    type: "Tipus",
    heroEyebrow: "Marbella ingatlankereses",
    heroTitle: "Talald meg kovetkezo otthonod a Costa del Solon",
    heroText:
      "Keress elo Move2Marbella ingatlanokat a Resales Online adatbazisbol, majd vedd fel a kapcsolatot telefonrol.",
    leadDefaultMessage: "Szeretnek tovabbi informaciot kerni errol az ingatlanrol.",
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
