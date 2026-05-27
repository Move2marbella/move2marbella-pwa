type ResalesFeatureCategory = {
  Type: string;
  Value: string[];
};

type ResalesProperty = {
  Reference: string;
  AgencyRef: string;
  Country: string;
  Province: string;
  Area: string;
  Location: string;
  SubLocation: string;
  PropertyType: {
    NameType: string;
    Type: string;
    TypeId: string;
    Subtype1: string;
    SubtypeId1: string;
  };
  Status: {
    system: string;
    en: string;
  };
  Bedrooms: string;
  Bathrooms: string;
  Currency: string;
  Price: string;
  OriginalPrice: number;
  Dimensions: string;
  Built: number;
  Terrace: number;
  GardenPlot: number;
  CO2Rated: string;
  EnergyRated: string;
  OwnProperty: string;
  Pool: number;
  Parking: number;
  Garden: number;
  Description: string;
  PropertyFeatures: {
    Category: ResalesFeatureCategory[];
  };
  Pictures: {
    Count: number;
    Picture: {
      Id: number;
      PictureURL: string;
      PictureCaption: string;
    }[];
  };
};

export const languages = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Espanol" },
  { code: "FR", label: "Francais" },
  { code: "DE", label: "Deutsch" },
  { code: "RU", label: "Russian" },
  { code: "PL", label: "Polski" },
  { code: "HU", label: "Magyar" },
];

export const quickFilters = [
  "Manilva",
  "Penthouse",
  "Apartment",
  "Sea views",
  "New construction",
  "Communal pool",
];

const description =
  "A design horizon facing the sea. This residential complex presents a residential building of 44 exclusive homes, integrated into a unique natural environment, characterized by its excellent geographical position in terms of landscape and sea views. A contemporary architectural style residential with qualities of excellence in a magnificent location facing the Mediterranean. Apartments with 2 and 3 bedrooms, 2 bathrooms, spacious rooms and wonderful terraces with open access from the living room and bedroom. The complex includes landscaped recreation areas with a swimming pool and private parking spaces, located in one of the most distinguished residential areas of Manilva, close to El Castillo Beach and La Duquesa Beach.";

const sharedFeatureGroups: ResalesFeatureCategory[] = [
  {
    Type: "Setting",
    Value: ["Close To Shops", "Close To Town", "Close To Schools"],
  },
  {
    Type: "Orientation",
    Value: ["South"],
  },
  {
    Type: "Condition",
    Value: ["Excellent", "New Construction"],
  },
  {
    Type: "Pool",
    Value: ["Communal"],
  },
  {
    Type: "Climate Control",
    Value: ["Air Conditioning", "U/F Heating"],
  },
  {
    Type: "Views",
    Value: ["Sea", "Mountain", "Panoramic", "Garden", "Pool"],
  },
  {
    Type: "Features",
    Value: [
      "Covered Terrace",
      "Lift",
      "Fitted Wardrobes",
      "Near Transport",
      "Private Terrace",
      "Utility Room",
      "Ensuite Bathroom",
      "Double Glazing",
    ],
  },
  {
    Type: "Furniture",
    Value: ["Not Furnished", "Optional"],
  },
  {
    Type: "Kitchen",
    Value: ["Fully Fitted"],
  },
  {
    Type: "Garden",
    Value: ["Communal"],
  },
  {
    Type: "Security",
    Value: ["Entry Phone", "24 Hour Security"],
  },
  {
    Type: "Parking",
    Value: ["Private"],
  },
  {
    Type: "Category",
    Value: ["Luxury"],
  },
];

export const resalesApiProperties: ResalesProperty[] = [
  {
    Reference: "R4205452",
    AgencyRef: "R4205452",
    Country: "Spain",
    Province: "Malaga",
    Area: "Costa del Sol",
    Location: "Manilva",
    SubLocation: "",
    PropertyType: {
      NameType: "Penthouse",
      Type: "Apartment",
      TypeId: "1-1",
      Subtype1: "Penthouse",
      SubtypeId1: "1-6",
    },
    Status: {
      system: "Available",
      en: "Available",
    },
    Bedrooms: "3",
    Bathrooms: "2",
    Currency: "EUR",
    Price: "261500",
    OriginalPrice: 261500,
    Dimensions: "Metres",
    Built: 94,
    Terrace: 9,
    GardenPlot: 0,
    CO2Rated: "",
    EnergyRated: "",
    OwnProperty: "1",
    Pool: 1,
    Parking: 1,
    Garden: 1,
    Description: description,
    PropertyFeatures: {
      Category: sharedFeatureGroups,
    },
    Pictures: {
      Count: 10,
      Picture: [
        {
          Id: 1,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/1-7980e48d732b6fc85c14b43b94d2aa54.jpg?v=1676910382",
          PictureCaption: "",
        },
        {
          Id: 2,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/2-5bd7b9d04b45e33852eaf0ec6670150d.jpg?v=1676910382",
          PictureCaption: "",
        },
        {
          Id: 3,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/3-e898b2bb2a2fdfd06d2c39894dce8316.jpg?v=1676910382",
          PictureCaption: "",
        },
        {
          Id: 4,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/4-c23c0f86247804fa50226aecd8b0b2c8.jpg?v=1676910382",
          PictureCaption: "",
        },
        {
          Id: 5,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/5-3595ad71cbd87be6c3643a4285ef4791.jpg?v=1676910382",
          PictureCaption: "",
        },
        {
          Id: 6,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/bf41233f7fb511ed98460217bc231ef4/w1200/6-241328e1bcc9c0d8ce1222beb6c967a8.jpg?v=1676910382",
          PictureCaption: "",
        },
      ],
    },
  },
  {
    Reference: "R4204873",
    AgencyRef: "R4204873",
    Country: "Spain",
    Province: "Malaga",
    Area: "Costa del Sol",
    Location: "Manilva",
    SubLocation: "",
    PropertyType: {
      NameType: "Middle Floor Apartment",
      Type: "Apartment",
      TypeId: "1-1",
      Subtype1: "Middle Floor Apartment",
      SubtypeId1: "1-4",
    },
    Status: {
      system: "Available",
      en: "Available",
    },
    Bedrooms: "2",
    Bathrooms: "2",
    Currency: "EUR",
    Price: "291000",
    OriginalPrice: 291000,
    Dimensions: "Metres",
    Built: 79,
    Terrace: 24,
    GardenPlot: 0,
    CO2Rated: "",
    EnergyRated: "",
    OwnProperty: "1",
    Pool: 1,
    Parking: 1,
    Garden: 1,
    Description: description,
    PropertyFeatures: {
      Category: sharedFeatureGroups,
    },
    Pictures: {
      Count: 10,
      Picture: [
        {
          Id: 1,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/1-7980e48d732b6fc85c14b43b94d2aa54.jpg?v=1676910380",
          PictureCaption: "",
        },
        {
          Id: 2,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/2-5bd7b9d04b45e33852eaf0ec6670150d.jpg?v=1676910380",
          PictureCaption: "",
        },
        {
          Id: 3,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/3-e898b2bb2a2fdfd06d2c39894dce8316.jpg?v=1676910380",
          PictureCaption: "",
        },
        {
          Id: 4,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/4-c23c0f86247804fa50226aecd8b0b2c8.jpg?v=1676910380",
          PictureCaption: "",
        },
        {
          Id: 5,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/5-3595ad71cbd87be6c3643a4285ef4791.jpg?v=1676910380",
          PictureCaption: "",
        },
        {
          Id: 6,
          PictureURL:
            "https://cdn.resales-online.com/public/2clagkpr0e/properties/8a24df547f9f11ed98460217bc231ef4/w1200/6-241328e1bcc9c0d8ce1222beb6c967a8.jpg?v=1676910380",
          PictureCaption: "",
        },
      ],
    },
  },
];

function formatPrice(currency: string, price: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function normalizeProperty(property: ResalesProperty) {
  const subLocation = property.SubLocation ? `, ${property.SubLocation}` : "";
  const location = `${property.Location}${subLocation}, ${property.Area}`;
  const views = property.PropertyFeatures.Category.find(
    (category) => category.Type === "Views",
  )?.Value;

  return {
    ref: property.Reference,
    agencyRef: property.AgencyRef,
    title: `${property.PropertyType.NameType} in ${property.Location}`,
    location,
    price: formatPrice(property.Currency, property.Price),
    rawPrice: Number(property.Price),
    beds: Number(property.Bedrooms),
    baths: Number(property.Bathrooms),
    size: `${property.Built} m2`,
    plot: property.GardenPlot ? `${property.GardenPlot} m2` : "Community",
    terrace: `${property.Terrace} m2`,
    tag: views?.includes("Sea") ? "Sea views" : property.Status.en,
    type: property.PropertyType.NameType,
    status: property.Status.en,
    description: property.Description,
    images: property.Pictures.Picture.map((picture) => picture.PictureURL),
    featureGroups: property.PropertyFeatures.Category,
    features: property.PropertyFeatures.Category.flatMap((category) =>
      category.Value.map((value) => `${category.Type}: ${value}`),
    ).slice(0, 8),
    raw: property,
  };
}

export const properties = resalesApiProperties.map(normalizeProperty);

export type Property = (typeof properties)[number];

export function getPropertyByRef(ref: string) {
  return properties.find(
    (property) => property.ref.toLowerCase() === ref.toLowerCase(),
  );
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34600000000?text=Hi%20Move2Marbella%2C%20I%20am%20interested%20in%20${ref}.`;
}
