export interface SportProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "training" | "match" | "shorts" | "accessories";
  ageGroup: "u8" | "u10" | "u12" | "u14" | "u16+";
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  features: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export const sportProducts: SportProduct[] = [
  {
    id: "training-polo-black",
    name: "NUESTRA Training Polo",
    description: "Premium quarter-zip training polo with signature diagonal stripe. Breathable performance fabric with moisture-wicking technology for intense training sessions.",
    price: 89,
    category: "training",
    ageGroup: "u14",
    images: [
      "/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (1).jpeg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black/Burgundy", hex: "#0a0a0a" },
      { name: "Navy/Burgundy", hex: "#1a2a3a" },
    ],
    features: [
      "Moisture-wicking fabric",
      "Quarter-zip collar",
      "Signature diagonal stripe",
      "NUESTRA embroidered logo",
      "RITUAL sleeve detail",
    ],
    isNew: true,
  },
  {
    id: "training-shorts-black",
    name: "NUESTRA Training Shorts",
    description: "Lightweight training shorts with side branding and premium stretch fabric. Features the iconic double-slash logo and NUESTRA typography.",
    price: 59,
    category: "shorts",
    ageGroup: "u14",
    images: [
      "/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (2).jpeg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Navy", hex: "#1a2a3a" },
    ],
    features: [
      "Stretch performance fabric",
      "Side zip pockets",
      "NUESTRA side branding",
      "Double-slash logo detail",
      "Elastic waistband with drawcord",
    ],
    isBestseller: true,
  },
  {
    id: "match-shorts-burgundy",
    name: "NUESTRA Match Day Shorts",
    description: "Competition-ready shorts featuring 'THE GAME IS OURS' tagline. Designed for match day performance with premium fit and durability.",
    price: 69,
    category: "shorts",
    ageGroup: "u14",
    images: [
      "/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (3).jpeg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Burgundy/Black", hex: "#722F37" },
      { name: "Black/Burgundy", hex: "#0a0a0a" },
    ],
    features: [
      "'THE GAME IS OURS' tagline",
      "Match-day fit",
      "Premium durability fabric",
      "Side panel design",
      "Double-slash logo",
    ],
    isNew: true,
  },
  {
    id: "training-top-black",
    name: "NUESTRA Training Top",
    description: "Long-sleeve turtleneck training top with signature diagonal stripe. Perfect for cold weather training with thermal properties.",
    price: 99,
    category: "training",
    ageGroup: "u14",
    images: [
      "/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (4).jpeg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black/Burgundy", hex: "#0a0a0a" },
    ],
    features: [
      "Thermal fabric technology",
      "Turtleneck design",
      "Signature diagonal stripe",
      "Double-slash chest logo",
      "NUESTRA text branding",
    ],
    isBestseller: true,
  },
  {
    id: "match-jersey-primary",
    name: "NUESTRA Match Jersey",
    description: "Premium match day jersey with NUESTRA branding. Features the classic club design with contrast raglan sleeves.",
    price: 79,
    category: "match",
    ageGroup: "u14",
    images: [
      "/images/sport/WhatsApp Image 2025-11-23 at 16.02.12.jpeg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Burgundy/White", hex: "#722F37" },
      { name: "White/Burgundy", hex: "#ffffff" },
    ],
    features: [
      "Match-ready performance fabric",
      "Contrast raglan sleeves",
      "NUESTRA chest branding",
      "Club badge placement",
      "Breathable mesh panels",
    ],
    isNew: true,
  },
  {
    id: "training-jersey-statement",
    name: "NUESTRA Statement Jersey",
    description: "Bold statement training jersey featuring the iconic NUESTRA branding with premium embossed typography and 'THE GAME IS OURS' tagline.",
    price: 89,
    category: "training",
    ageGroup: "u16+",
    images: [
      "/images/sport/WhatsApp Image 2025-11-19 at 21.59.28.jpeg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black/Burgundy/Gold", hex: "#0a0a0a" },
    ],
    features: [
      "Premium embossed NUESTRA typography",
      "'THE GAME IS OURS' tagline",
      "Diagonal stripe design",
      "Double-slash logo",
      "Gold accent details",
    ],
    isBestseller: true,
  },
];

export function getProductById(id: string): SportProduct | undefined {
  return sportProducts.find((product) => product.id === id);
}

export function getProductsByCategory(category: SportProduct["category"]): SportProduct[] {
  return sportProducts.filter((product) => product.category === category);
}

export function getProductsByAgeGroup(ageGroup: SportProduct["ageGroup"]): SportProduct[] {
  return sportProducts.filter((product) => product.ageGroup === ageGroup);
}

export function getFeaturedProducts(): SportProduct[] {
  return sportProducts.filter((product) => product.isNew || product.isBestseller);
}

export function getBestsellers(): SportProduct[] {
  return sportProducts.filter((product) => product.isBestseller);
}

export function getNewArrivals(): SportProduct[] {
  return sportProducts.filter((product) => product.isNew);
}

