type FeatureGroup = {
  Type: string;
  Value: string[];
};

type SampleProperty = {
  ref: string;
  title: string;
  location: string;
  city: string;
  price: string;
  beds: string;
  baths: string;
  size: string;
  plot: string;
  terrace: string;
  tag: string;
  type: string;
  status: string;
  description: string;
  images: string[];
  featureGroups: FeatureGroup[];
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
  "Nueva Andalucia",
  "Marbella",
  "Estepona",
  "Puerto Banus",
  "Beachfront",
  "Hot offer",
];

const gallery = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
];

const featureGroups: FeatureGroup[] = [
  {
    Type: "Setting",
    Value: ["Close To Shops", "Close To Town", "Close To Schools"],
  },
  {
    Type: "Views",
    Value: ["Sea", "Mountain", "Panoramic", "Garden", "Pool"],
  },
  {
    Type: "Features",
    Value: ["Covered Terrace", "Lift", "Private Terrace", "Double Glazing"],
  },
  {
    Type: "Parking",
    Value: ["Private"],
  },
];

const descriptions = {
  luxury:
    "A prime Move2Marbella listing for buyers looking for a refined Costa del Sol lifestyle. The property combines a strong location, comfortable interior spaces and easy access to beaches, restaurants, golf and daily services.",
  apartment:
    "A practical and well-located apartment option with a clear lifestyle focus. This sample listing is structured from the Move2Marbella properties page and is ready to be replaced by live Resales Online API data.",
  development:
    "A new development opportunity with modern layouts, outdoor living and strong buyer appeal. This sample keeps the core public listing data while the API integration is prepared.",
};

export const properties: SampleProperty[] = [
  {
    ref: "R5238238",
    title: "New Development in Nueva Andalucia",
    location: "Nueva Andalucia, Costa del Sol",
    city: "Nueva Andalucia",
    price: "EUR 3,800,000",
    beds: "3",
    baths: "4",
    size: "268 m2",
    plot: "400 m2",
    terrace: "Private terraces",
    tag: "Prime Listing",
    type: "New Development",
    status: "Available, For Sale",
    description: descriptions.development,
    images: gallery,
    featureGroups,
  },
  {
    ref: "R5270242",
    title: "Middle Floor Apartment in Marbella",
    location: "Marbella, Costa del Sol",
    city: "Marbella",
    price: "EUR 399,000",
    beds: "1",
    baths: "1",
    size: "57 m2",
    plot: "Community",
    terrace: "Private terrace",
    tag: "Beachfront",
    type: "Middle Floor Apartment",
    status: "Available, For Sale",
    description: descriptions.apartment,
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R5163850",
    title: "Detached Villa in Costalita",
    location: "Costalita, Costa del Sol",
    city: "Costalita",
    price: "EUR 900,000",
    beds: "4",
    baths: "4",
    size: "194 m2",
    plot: "Private plot",
    terrace: "Covered terrace",
    tag: "Hot Offer",
    type: "Detached Villa",
    status: "Available, For Sale",
    description: descriptions.luxury,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R5289715",
    title: "Top Floor Apartment in Estepona",
    location: "Estepona, Costa del Sol",
    city: "Estepona",
    price: "EUR 450,000",
    beds: "2",
    baths: "2",
    size: "86 m2",
    plot: "Community",
    terrace: "Private terrace",
    tag: "Hot Offer",
    type: "Top Floor Apartment",
    status: "Available, For Sale",
    description: descriptions.apartment,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752447-f4c40cb35944?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R5216425",
    title: "Middle Floor Apartment in Estepona",
    location: "Estepona, Costa del Sol",
    city: "Estepona",
    price: "EUR 2,395,000",
    beds: "3",
    baths: "2",
    size: "134 m2",
    plot: "Community",
    terrace: "Sea-facing terrace",
    tag: "Prime Listing",
    type: "Middle Floor Apartment",
    status: "Available, For Sale",
    description: descriptions.luxury,
    images: [
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R5109505",
    title: "Ground Floor Apartment in Estepona",
    location: "Estepona, Costa del Sol",
    city: "Estepona",
    price: "EUR 2,350,000",
    beds: "3",
    baths: "2",
    size: "130 m2",
    plot: "Garden access",
    terrace: "Private terrace",
    tag: "Prime Listing",
    type: "Ground Floor Apartment",
    status: "Available, For Sale",
    description: descriptions.luxury,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752229-250ed79470e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R2998166",
    title: "Middle Floor Apartment in Puerto Banus",
    location: "Puerto Banus, Costa del Sol",
    city: "Puerto Banus",
    price: "EUR 830,000",
    beds: "2",
    baths: "2",
    size: "121 m2",
    plot: "Community",
    terrace: "Private terrace",
    tag: "Prime Listing",
    type: "Middle Floor Apartment",
    status: "Available, For Sale",
    description: descriptions.apartment,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R5074729",
    title: "New Development in Estepona",
    location: "Estepona, Costa del Sol",
    city: "Estepona",
    price: "From EUR 259,000",
    beds: "1 - 3",
    baths: "1 - 2",
    size: "65 - 138 m2",
    plot: "Community",
    terrace: "Private terraces",
    tag: "New Development",
    type: "New Development",
    status: "Available, For Sale",
    description: descriptions.development,
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
  {
    ref: "R4624858",
    title: "Penthouse in Bahia de Marbella",
    location: "Bahia de Marbella, Costa del Sol",
    city: "Bahia de Marbella",
    price: "EUR 860,000",
    beds: "4",
    baths: "2",
    size: "230 m2",
    plot: "Community",
    terrace: "Large terrace",
    tag: "Under Offer",
    type: "Penthouse",
    status: "Under Offer",
    description: descriptions.luxury,
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1200&q=80",
    ],
    featureGroups,
  },
];

export type Property = (typeof properties)[number];

export function getPropertyByRef(ref: string) {
  return properties.find(
    (property) => property.ref.toLowerCase() === ref.toLowerCase(),
  );
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34650059356?text=Hola%2C%20need%20more%20info%20%5B${ref}%5D`;
}
