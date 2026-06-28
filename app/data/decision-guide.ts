import type { Locale } from "../i18n/translations";
import { getEditablePageContent } from "../lib/editable-copy";

export type DecisionQuestionId =
  | "location"
  | "views"
  | "surroundings"
  | "complexAmenities"
  | "proximity"
  | "rentalPotential"
  | "bathrooms"
  | "kitchen"
  | "climate"
  | "windows"
  | "finishes"
  | "layout";

export type DecisionQuestion = {
  id: DecisionQuestionId;
  changeable: boolean;
  defaultImportance: "essential" | "important" | "advantage";
};

export const decisionQuestions: DecisionQuestion[] = [
  { id: "location", changeable: false, defaultImportance: "essential" },
  { id: "views", changeable: false, defaultImportance: "important" },
  { id: "surroundings", changeable: false, defaultImportance: "essential" },
  { id: "complexAmenities", changeable: false, defaultImportance: "important" },
  { id: "proximity", changeable: false, defaultImportance: "essential" },
  { id: "rentalPotential", changeable: false, defaultImportance: "important" },
  { id: "bathrooms", changeable: true, defaultImportance: "important" },
  { id: "kitchen", changeable: true, defaultImportance: "important" },
  { id: "climate", changeable: true, defaultImportance: "important" },
  { id: "windows", changeable: true, defaultImportance: "important" },
  { id: "finishes", changeable: true, defaultImportance: "advantage" },
  { id: "layout", changeable: true, defaultImportance: "important" },
];

type DecisionGuideCopy = {
  title: string;
  eyebrow: string;
  body: string;
  metaDescription: string;
  evaluateInApp: string;
  evaluateAnother: string;
  evaluateThisProperty: string;
  chooseTitle: string;
  chooseBody: string;
  savedProperties: string;
  noSavedProperties: string;
  browseProperties: string;
  externalTitle: string;
  propertyName: string;
  propertyReference: string;
  propertyLocation: string;
  propertyPrice: string;
  propertyUrl: string;
  optional: string;
  startEvaluation: string;
  back: string;
  next: string;
  finish: string;
  startOver: string;
  delete: string;
  yourEvaluations: string;
  noEvaluations: string;
  immutable: string;
  changeable: string;
  immutableHint: string;
  changeableHint: string;
  importance: string;
  assessment: string;
  essential: string;
  important: string;
  advantage: string;
  meets: string;
  partly: string;
  no: string;
  unknown: string;
  questionProgress: string;
  resultTitle: string;
  longTermFit: string;
  currentCondition: string;
  overallScore: string;
  criticalIssues: string;
  itemsToVerify: string;
  improvementPotential: string;
  strongFit: string;
  goodFit: string;
  weakFit: string;
  reconsider: string;
  verifyFirst: string;
  saved: string;
  criticalMessage: string;
  scoreDisclaimer: string;
  questions: Record<DecisionQuestionId, string>;
};

const en: DecisionGuideCopy = {
  title: "Choose the property that still works in 10–15 years",
  eyebrow: "Property decision guide",
  body: "Compare what cannot be changed with what can be improved. Essential long-term factors carry substantially more weight than finishes and fittings.",
  metaDescription: "Evaluate and compare Costa del Sol properties using weighted long-term value factors, improvement potential and critical buyer requirements.",
  evaluateInApp: "Evaluate in property app",
  evaluateAnother: "Evaluate another property",
  evaluateThisProperty: "Evaluate this property",
  chooseTitle: "What would you like to evaluate?",
  chooseBody: "Choose a saved app property or enter another property manually.",
  savedProperties: "Saved app properties",
  noSavedProperties: "No app properties have been saved on this device yet.",
  browseProperties: "Browse properties",
  externalTitle: "Add another property",
  propertyName: "Property name",
  propertyReference: "Reference",
  propertyLocation: "Location",
  propertyPrice: "Price",
  propertyUrl: "Listing URL",
  optional: "Optional",
  startEvaluation: "Start evaluation",
  back: "Back",
  next: "Next",
  finish: "See result",
  startOver: "Evaluate another",
  delete: "Delete",
  yourEvaluations: "My evaluations",
  noEvaluations: "Completed evaluations will be saved on this device.",
  immutable: "What you cannot change",
  changeable: "What you can change",
  immutableHint: "Timeless factors that create long-term value.",
  changeableHint: "Features that can be improved after purchase.",
  importance: "How important is this to you?",
  assessment: "Assessment",
  essential: "Essential",
  important: "Important",
  advantage: "Nice to have",
  meets: "Meets",
  partly: "Partly",
  no: "Does not meet",
  unknown: "Need to verify",
  questionProgress: "Question",
  resultTitle: "Decision summary",
  longTermFit: "Long-term fit",
  currentCondition: "Current condition",
  overallScore: "Decision score",
  criticalIssues: "Critical mismatches",
  itemsToVerify: "Items to verify",
  improvementPotential: "Upgrade opportunities",
  strongFit: "Strong long-term fit",
  goodFit: "Good fit with points to review",
  weakFit: "Weak fit for your priorities",
  reconsider: "Reconsider before proceeding",
  verifyFirst: "Verify the unknown essentials first",
  saved: "Saved on this device",
  criticalMessage: "An essential factor that cannot be changed does not meet your criteria. Renovations should not cancel out this warning.",
  scoreDisclaimer: "This score supports comparison; it is not a valuation, survey or legal recommendation.",
  questions: {
    location: "Location and micro-area",
    views: "Views",
    surroundings: "Surroundings and neighbourhood character",
    complexAmenities: "Amenities in the residential complex",
    proximity: "Proximity and infrastructure",
    rentalPotential: "Rental potential and licence viability",
    bathrooms: "Bathrooms",
    kitchen: "Kitchen and appliances",
    climate: "Air conditioning and heating",
    windows: "Windows and doors",
    finishes: "Flooring, finishes and lighting",
    layout: "Layout and optimisation potential",
  },
};

export const decisionGuideCopy: Record<Locale, DecisionGuideCopy> = {
  en,
  es: {
    ...en,
    title: "Elige una vivienda que siga funcionando dentro de 10–15 años",
    eyebrow: "Guía de decisión inmobiliaria",
    body: "Compara lo que no puede cambiarse con lo que sí puede mejorarse. Los factores esenciales de largo plazo tienen mucho más peso que los acabados.",
    metaDescription: "Evalúa y compara propiedades en la Costa del Sol mediante factores ponderados de valor a largo plazo, mejoras y requisitos críticos.",
    evaluateInApp: "Evaluate in property app",
    evaluateAnother: "Evaluate another property",
    evaluateThisProperty: "Evaluar esta propiedad",
    chooseTitle: "¿Qué quieres evaluar?",
    chooseBody: "Elige una propiedad guardada en la app o introduce otra manualmente.",
    savedProperties: "Propiedades guardadas",
    noSavedProperties: "Todavía no hay propiedades guardadas en este dispositivo.",
    browseProperties: "Ver propiedades",
    externalTitle: "Añadir otra propiedad",
    propertyName: "Nombre de la propiedad",
    propertyReference: "Referencia",
    propertyLocation: "Ubicación",
    propertyPrice: "Precio",
    propertyUrl: "URL del anuncio",
    optional: "Opcional",
    startEvaluation: "Empezar evaluación",
    back: "Atrás",
    next: "Siguiente",
    finish: "Ver resultado",
    startOver: "Evaluar otra",
    delete: "Eliminar",
    yourEvaluations: "Mis evaluaciones",
    noEvaluations: "Las evaluaciones terminadas se guardarán en este dispositivo.",
    immutable: "Lo que no puedes cambiar",
    changeable: "Lo que puedes cambiar",
    immutableHint: "Factores permanentes que crean valor a largo plazo.",
    changeableHint: "Características que pueden mejorarse después de comprar.",
    importance: "¿Qué importancia tiene para ti?",
    assessment: "Evaluación",
    essential: "Esencial",
    important: "Importante",
    advantage: "Deseable",
    meets: "Cumple",
    partly: "Parcialmente",
    no: "No cumple",
    unknown: "Hay que comprobar",
    questionProgress: "Pregunta",
    resultTitle: "Resumen de decisión",
    longTermFit: "Encaje a largo plazo",
    currentCondition: "Estado actual",
    overallScore: "Puntuación",
    criticalIssues: "Incompatibilidades críticas",
    itemsToVerify: "Puntos por comprobar",
    improvementPotential: "Oportunidades de mejora",
    strongFit: "Buen encaje a largo plazo",
    goodFit: "Buen encaje con puntos a revisar",
    weakFit: "Encaje débil para tus prioridades",
    reconsider: "Reconsidera antes de continuar",
    verifyFirst: "Comprueba primero los puntos esenciales",
    saved: "Guardado en este dispositivo",
    criticalMessage: "Un factor esencial que no puede cambiarse no cumple tus criterios. Una reforma no debe ocultar esta advertencia.",
    scoreDisclaimer: "Esta puntuación ayuda a comparar; no es una tasación, inspección ni recomendación legal.",
    questions: {
      location: "Ubicación y microzona",
      views: "Vistas",
      surroundings: "Entorno y carácter del barrio",
      complexAmenities: "Servicios de la urbanización",
      proximity: "Proximidad e infraestructuras",
      rentalPotential: "Potencial de alquiler y viabilidad de licencia",
      bathrooms: "Baños",
      kitchen: "Cocina y electrodomésticos",
      climate: "Aire acondicionado y calefacción",
      windows: "Ventanas y puertas",
      finishes: "Suelos, acabados e iluminación",
      layout: "Distribución y posibilidades de optimización",
    },
  },
  hu: {
    ...en,
    title: "Válaszd azt az ingatlant, amely 10–15 év múlva is jó döntés",
    eyebrow: "Ingatlanválasztási útmutató",
    body: "Hasonlítsd össze a nem változtatható értékeket a fejleszthető tulajdonságokkal. A hosszú távú, alapvető tényezők sokkal nagyobb súlyt kapnak.",
    metaDescription: "Ingatlanok értékelése és összehasonlítása súlyozott hosszú távú érték, fejlesztési lehetőségek és kritikus vásárlói feltételek alapján.",
    evaluateInApp: "Evaluate in property app",
    evaluateAnother: "Evaluate another property",
    evaluateThisProperty: "Ingatlan értékelése",
    chooseTitle: "Melyik ingatlant szeretnéd értékelni?",
    chooseBody: "Válassz egy appban mentett ingatlant, vagy adj meg egy másik ingatlant.",
    savedProperties: "Appban mentett ingatlanok",
    noSavedProperties: "Ezen az eszközön még nincs mentett ingatlan.",
    browseProperties: "Ingatlanok böngészése",
    externalTitle: "Másik ingatlan megadása",
    propertyName: "Ingatlan neve",
    propertyReference: "Referenciaszám",
    propertyLocation: "Elhelyezkedés",
    propertyPrice: "Ár",
    propertyUrl: "Hirdetés linkje",
    optional: "Opcionális",
    startEvaluation: "Értékelés indítása",
    back: "Vissza",
    next: "Tovább",
    finish: "Eredmény megtekintése",
    startOver: "Másik értékelése",
    delete: "Törlés",
    yourEvaluations: "Saját értékeléseim",
    noEvaluations: "A befejezett értékeléseket ezen az eszközön mentjük.",
    immutable: "Amit nem tudsz megváltoztatni",
    changeable: "Amit meg tudsz változtatni",
    immutableHint: "Időtálló tényezők, amelyek hosszú távú értéket teremtenek.",
    changeableHint: "Vásárlás után fejleszthető tulajdonságok.",
    importance: "Mennyire fontos ez számodra?",
    assessment: "Értékelés",
    essential: "Alapvető",
    important: "Fontos",
    advantage: "Előny",
    meets: "Megfelel",
    partly: "Részben felel meg",
    no: "Nem felel meg",
    unknown: "Ellenőrizni kell",
    questionProgress: "Kérdés",
    resultTitle: "Döntési összefoglaló",
    longTermFit: "Hosszú távú megfelelés",
    currentCondition: "Jelenlegi állapot",
    overallScore: "Döntési pontszám",
    criticalIssues: "Kritikus eltérések",
    itemsToVerify: "Ellenőrizni kell",
    improvementPotential: "Fejlesztési lehetőségek",
    strongFit: "Erős hosszú távú megfelelés",
    goodFit: "Jó választás, néhány ellenőrzendő ponttal",
    weakFit: "Gyenge megfelelés a prioritásaidhoz",
    reconsider: "Gondold át újra a továbblépés előtt",
    verifyFirst: "Először ellenőrizd az ismeretlen alapfeltételeket",
    saved: "Mentve ezen az eszközön",
    criticalMessage: "Egy nem változtatható, alapvető tényező nem felel meg a feltételeidnek. Ezt egy felújítás nem ellensúlyozhatja.",
    scoreDisclaimer: "A pontszám az összehasonlítást segíti; nem értékbecslés, műszaki vizsgálat vagy jogi tanács.",
    questions: {
      location: "Lokáció és mikrokörnyezet",
      views: "Kilátás",
      surroundings: "Környezet és a környék karaktere",
      complexAmenities: "A lakókomplexum szolgáltatásai",
      proximity: "Közelség és infrastruktúra",
      rentalPotential: "Bérbeadási lehetőség és engedélyezhetőség",
      bathrooms: "Fürdőszoba",
      kitchen: "Konyha és gépek",
      climate: "Légkondicionálás és fűtés",
      windows: "Ablakok és ajtók",
      finishes: "Burkolatok, felületek és világítás",
      layout: "Elrendezés és optimalizálási lehetőség",
    },
  },
  de: {
    ...en,
    title: "Wählen Sie eine Immobilie, die auch in 10–15 Jahren passt",
    eyebrow: "Entscheidungshilfe für Immobilien",
    body: "Vergleichen Sie unveränderbare Faktoren mit verbesserbaren Eigenschaften. Langfristige Kriterien erhalten deutlich mehr Gewicht.",
    evaluateThisProperty: "Diese Immobilie bewerten",
    chooseTitle: "Was möchten Sie bewerten?",
    chooseBody: "Wählen Sie eine gespeicherte Immobilie oder erfassen Sie eine andere.",
    savedProperties: "Gespeicherte Immobilien",
    noSavedProperties: "Auf diesem Gerät sind noch keine Immobilien gespeichert.",
    browseProperties: "Immobilien ansehen",
    externalTitle: "Andere Immobilie hinzufügen",
    propertyName: "Immobilienname",
    propertyReference: "Referenz",
    propertyLocation: "Lage",
    propertyPrice: "Preis",
    propertyUrl: "Anzeigen-URL",
    startEvaluation: "Bewertung starten",
    back: "Zurück",
    next: "Weiter",
    finish: "Ergebnis anzeigen",
    startOver: "Weitere bewerten",
    delete: "Löschen",
    yourEvaluations: "Meine Bewertungen",
    noEvaluations: "Abgeschlossene Bewertungen werden auf diesem Gerät gespeichert.",
    immutable: "Was Sie nicht ändern können",
    changeable: "Was Sie ändern können",
    immutableHint: "Dauerhafte Faktoren für langfristigen Wert.",
    changeableHint: "Eigenschaften, die nach dem Kauf verbessert werden können.",
    importance: "Wie wichtig ist Ihnen das?",
    assessment: "Bewertung",
    essential: "Unverzichtbar",
    important: "Wichtig",
    advantage: "Wünschenswert",
    meets: "Erfüllt",
    partly: "Teilweise",
    no: "Nicht erfüllt",
    unknown: "Zu prüfen",
    questionProgress: "Frage",
    resultTitle: "Entscheidungsübersicht",
    longTermFit: "Langfristige Eignung",
    currentCondition: "Aktueller Zustand",
    overallScore: "Entscheidungspunktzahl",
    criticalIssues: "Kritische Abweichungen",
    itemsToVerify: "Zu prüfende Punkte",
    improvementPotential: "Verbesserungsmöglichkeiten",
    questions: {
      location: "Lage und Mikrolage", views: "Aussicht", surroundings: "Umgebung und Nachbarschaft", complexAmenities: "Ausstattung der Wohnanlage", proximity: "Nähe und Infrastruktur", rentalPotential: "Vermietungspotenzial und Lizenz", bathrooms: "Badezimmer", kitchen: "Küche und Geräte", climate: "Klimaanlage und Heizung", windows: "Fenster und Türen", finishes: "Böden, Oberflächen und Beleuchtung", layout: "Grundriss und Optimierung",
    },
  },
  fr: {
    ...en,
    title: "Choisissez un bien qui restera pertinent dans 10–15 ans",
    eyebrow: "Guide de décision immobilière",
    body: "Comparez les facteurs immuables avec les éléments améliorables. Les critères essentiels à long terme ont beaucoup plus de poids.",
    evaluateThisProperty: "Évaluer ce bien",
    chooseTitle: "Quel bien souhaitez-vous évaluer ?",
    chooseBody: "Choisissez un bien enregistré dans l’app ou ajoutez-en un autre.",
    savedProperties: "Biens enregistrés",
    noSavedProperties: "Aucun bien n’est encore enregistré sur cet appareil.",
    browseProperties: "Voir les biens",
    externalTitle: "Ajouter un autre bien",
    propertyName: "Nom du bien",
    propertyReference: "Référence",
    propertyLocation: "Localisation",
    propertyPrice: "Prix",
    propertyUrl: "URL de l’annonce",
    startEvaluation: "Commencer l’évaluation",
    back: "Retour",
    next: "Suivant",
    finish: "Voir le résultat",
    startOver: "Évaluer un autre",
    delete: "Supprimer",
    yourEvaluations: "Mes évaluations",
    noEvaluations: "Les évaluations terminées seront enregistrées sur cet appareil.",
    immutable: "Ce que vous ne pouvez pas changer",
    changeable: "Ce que vous pouvez changer",
    immutableHint: "Facteurs durables qui créent de la valeur à long terme.",
    changeableHint: "Éléments améliorables après l’achat.",
    importance: "Quelle importance pour vous ?",
    assessment: "Évaluation",
    essential: "Essentiel",
    important: "Important",
    advantage: "Souhaitable",
    meets: "Conforme",
    partly: "Partiellement",
    no: "Non conforme",
    unknown: "À vérifier",
    questionProgress: "Question",
    resultTitle: "Résumé de décision",
    longTermFit: "Pertinence à long terme",
    currentCondition: "État actuel",
    overallScore: "Score de décision",
    criticalIssues: "Incompatibilités critiques",
    itemsToVerify: "Points à vérifier",
    improvementPotential: "Possibilités d’amélioration",
    questions: {
      location: "Localisation et micro-secteur", views: "Vues", surroundings: "Environnement et quartier", complexAmenities: "Services de la résidence", proximity: "Proximité et infrastructures", rentalPotential: "Potentiel locatif et licence", bathrooms: "Salles de bains", kitchen: "Cuisine et appareils", climate: "Climatisation et chauffage", windows: "Fenêtres et portes", finishes: "Sols, finitions et éclairage", layout: "Agencement et optimisation",
    },
  },
  pl: {
    ...en,
    title: "Wybierz nieruchomość, która sprawdzi się także za 10–15 lat",
    eyebrow: "Przewodnik decyzyjny",
    body: "Porównaj czynniki niezmienne z elementami, które można ulepszyć. Kryteria długoterminowe mają znacznie większą wagę.",
    evaluateThisProperty: "Oceń tę nieruchomość",
    chooseTitle: "Co chcesz ocenić?",
    chooseBody: "Wybierz zapisaną nieruchomość lub dodaj inną.",
    savedProperties: "Zapisane nieruchomości",
    noSavedProperties: "Na tym urządzeniu nie zapisano jeszcze nieruchomości.",
    browseProperties: "Przeglądaj nieruchomości",
    externalTitle: "Dodaj inną nieruchomość",
    propertyName: "Nazwa nieruchomości",
    propertyReference: "Numer referencyjny",
    propertyLocation: "Lokalizacja",
    propertyPrice: "Cena",
    propertyUrl: "Link do ogłoszenia",
    startEvaluation: "Rozpocznij ocenę",
    back: "Wstecz",
    next: "Dalej",
    finish: "Zobacz wynik",
    startOver: "Oceń kolejną",
    delete: "Usuń",
    yourEvaluations: "Moje oceny",
    noEvaluations: "Ukończone oceny zostaną zapisane na tym urządzeniu.",
    immutable: "Czego nie można zmienić",
    changeable: "Co można zmienić",
    immutableHint: "Trwałe czynniki budujące wartość długoterminową.",
    changeableHint: "Elementy możliwe do ulepszenia po zakupie.",
    importance: "Jak ważne jest to dla Ciebie?",
    assessment: "Ocena",
    essential: "Niezbędne",
    important: "Ważne",
    advantage: "Dodatkowy atut",
    meets: "Spełnia",
    partly: "Częściowo",
    no: "Nie spełnia",
    unknown: "Do sprawdzenia",
    questionProgress: "Pytanie",
    resultTitle: "Podsumowanie decyzji",
    longTermFit: "Dopasowanie długoterminowe",
    currentCondition: "Stan obecny",
    overallScore: "Wynik decyzji",
    criticalIssues: "Krytyczne rozbieżności",
    itemsToVerify: "Punkty do sprawdzenia",
    improvementPotential: "Możliwości ulepszeń",
    questions: {
      location: "Lokalizacja i mikrolokalizacja", views: "Widoki", surroundings: "Otoczenie i charakter dzielnicy", complexAmenities: "Udogodnienia osiedla", proximity: "Bliskość i infrastruktura", rentalPotential: "Potencjał najmu i licencja", bathrooms: "Łazienki", kitchen: "Kuchnia i sprzęt", climate: "Klimatyzacja i ogrzewanie", windows: "Okna i drzwi", finishes: "Podłogi, wykończenie i oświetlenie", layout: "Układ i możliwości optymalizacji",
    },
  },
  ru: {
    ...en,
    title: "Выберите объект, который останется удачным через 10–15 лет",
    eyebrow: "Гид по выбору недвижимости",
    body: "Сравните неизменяемые факторы с тем, что можно улучшить. Долгосрочные критерии имеют значительно больший вес.",
    evaluateThisProperty: "Оценить этот объект",
    chooseTitle: "Какой объект вы хотите оценить?",
    chooseBody: "Выберите сохранённый объект или добавьте другой.",
    savedProperties: "Сохранённые объекты",
    noSavedProperties: "На этом устройстве пока нет сохранённых объектов.",
    browseProperties: "Смотреть объекты",
    externalTitle: "Добавить другой объект",
    propertyName: "Название объекта",
    propertyReference: "Референс",
    propertyLocation: "Расположение",
    propertyPrice: "Цена",
    propertyUrl: "Ссылка на объявление",
    startEvaluation: "Начать оценку",
    back: "Назад",
    next: "Далее",
    finish: "Показать результат",
    startOver: "Оценить другой",
    delete: "Удалить",
    yourEvaluations: "Мои оценки",
    noEvaluations: "Завершённые оценки сохраняются на этом устройстве.",
    immutable: "Что нельзя изменить",
    changeable: "Что можно изменить",
    immutableHint: "Постоянные факторы долгосрочной ценности.",
    changeableHint: "Характеристики, которые можно улучшить после покупки.",
    importance: "Насколько это важно?",
    assessment: "Оценка",
    essential: "Обязательно",
    important: "Важно",
    advantage: "Желательно",
    meets: "Соответствует",
    partly: "Частично",
    no: "Не соответствует",
    unknown: "Нужно проверить",
    questionProgress: "Вопрос",
    resultTitle: "Итог решения",
    longTermFit: "Долгосрочное соответствие",
    currentCondition: "Текущее состояние",
    overallScore: "Оценка решения",
    criticalIssues: "Критические несоответствия",
    itemsToVerify: "Что проверить",
    improvementPotential: "Возможности улучшения",
    questions: {
      location: "Расположение и микрорайон", views: "Виды", surroundings: "Окружение и характер района", complexAmenities: "Инфраструктура комплекса", proximity: "Близость и инфраструктура", rentalPotential: "Арендный потенциал и лицензия", bathrooms: "Ванные комнаты", kitchen: "Кухня и техника", climate: "Кондиционирование и отопление", windows: "Окна и двери", finishes: "Полы, отделка и освещение", layout: "Планировка и оптимизация",
    },
  },
};

export function getDecisionGuideCopy(locale: Locale) {
  return getEditablePageContent("decisionGuide", locale, decisionGuideCopy[locale]);
}
