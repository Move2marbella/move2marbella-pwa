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
  "Marbella",
  "Estepona",
  "Benahavis",
  "Nueva Andalucia",
  "Beachfront",
  "New builds",
];

export const properties = [
  {
    ref: "R482101",
    title: "Modern villa in Nueva Andalucia",
    location: "Nueva Andalucia, Marbella",
    price: "EUR 2,450,000",
    beds: 5,
    baths: 5,
    size: "420 m2",
    plot: "1,050 m2",
    terrace: "86 m2",
    tag: "Featured",
    type: "Detached villa",
    status: "Resale",
    features: [
      "Private pool and landscaped garden",
      "Open-plan kitchen with premium appliances",
      "Covered terrace for year-round outdoor living",
      "Close to golf, restaurants and Puerto Banus",
    ],
    description:
      "A contemporary villa designed for easy Mediterranean living in one of Marbella's most requested residential areas. The home combines generous indoor spaces with a calm outdoor flow, making it a strong fit for families, second-home buyers and clients who want privacy close to services.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    ref: "R481774",
    title: "Beachside apartment near Puerto Banus",
    location: "Puerto Banus, Marbella",
    price: "EUR 695,000",
    beds: 2,
    baths: 2,
    size: "118 m2",
    plot: "Community",
    terrace: "24 m2",
    tag: "Beachside",
    type: "Middle floor apartment",
    status: "Resale",
    features: [
      "Walking distance to the beach",
      "Secure community with pool",
      "Bright living room opening to terrace",
      "Strong rental potential",
    ],
    description:
      "A practical beachside apartment close to Puerto Banus, restaurants, shops and the promenade. The layout is compact and efficient, with a sunny terrace and easy lock-up-and-leave ownership for international buyers.",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    ref: "R480933",
    title: "Penthouse with sea views",
    location: "Estepona, Costa del Sol",
    price: "EUR 1,150,000",
    beds: 3,
    baths: 3,
    size: "185 m2",
    plot: "Community",
    terrace: "72 m2",
    tag: "Sea views",
    type: "Penthouse",
    status: "Resale",
    features: [
      "Panoramic sea and mountain views",
      "Large private roof terrace",
      "Modern community with pool and gym",
      "Short drive to Estepona town and Marbella",
    ],
    description:
      "A spacious penthouse made for buyers who want views, privacy and outdoor space. The rooftop terrace gives the home a resort-like feel, while the location keeps Estepona, Marbella and the beach within easy reach.",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752447-f4c40cb35944?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export type Property = (typeof properties)[number];

export function getPropertyByRef(ref: string) {
  return properties.find(
    (property) => property.ref.toLowerCase() === ref.toLowerCase(),
  );
}

export function getWhatsAppUrl(ref: string) {
  return `https://wa.me/34600000000?text=Hi%20Move2Marbella%2C%20I%20am%20interested%20in%20${ref}.`;
}
