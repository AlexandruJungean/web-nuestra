import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: "hoodie-our-street-black",
    name: "Our Street Hoodie",
    price: 129.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_84107ebe.jpg",
    hoverImage: "/images/WhatsApp Image 2025-09-24 at 11.34.56_18e997e0.jpg",
    category: "Hoodies",
    isNew: true,
  },
  {
    id: "tshirt-double-slash-white",
    name: "Double Slash Tee - White",
    price: 59.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_1a7db3fe.jpg",
    category: "T-Shirts",
    isNew: true,
  },
  {
    id: "tshirt-nue-stra-olive",
    name: "NUE/STRA Tee - Olive",
    price: 59.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_1a7db3fe.jpg",
    category: "T-Shirts",
  },
  {
    id: "tshirt-double-slash-black",
    name: "Double Slash Tee - Black",
    price: 59.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_1a7db3fe.jpg",
    category: "T-Shirts",
  },
  {
    id: "jacket-windbreaker-black",
    name: "Windbreaker Jacket",
    price: 159.00,
    originalPrice: 199.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_84107ebe.jpg",
    category: "Jackets",
  },
  {
    id: "joggers-essential-black",
    name: "Essential Joggers",
    price: 89.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_84107ebe.jpg",
    category: "Pants",
    isNew: true,
  },
  {
    id: "beanie-burgundy",
    name: "Slash Beanie - Burgundy",
    price: 35.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.34.55_ab64d190.jpg",
    category: "Accessories",
  },
  {
    id: "tote-bag-forest",
    name: "NUE/STRA Tote Bag",
    price: 45.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_84107ebe.jpg",
    category: "Accessories",
  },
  {
    id: "hoodie-asphalt-grey",
    name: "Asphalt Hoodie - Grey",
    price: 139.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.34.55_ab64d190.jpg",
    category: "Hoodies",
  },
  {
    id: "crewneck-ours-black",
    name: "OURS Crewneck",
    price: 99.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.23.47_ff938f9d.jpg",
    category: "Sweatshirts",
    isNew: true,
  },
  {
    id: "shorts-training-black",
    name: "Training Shorts",
    price: 65.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.34.55_ab64d190.jpg",
    category: "Shorts",
  },
  {
    id: "cap-structured-black",
    name: "Structured Cap - Black",
    price: 39.00,
    image: "/images/WhatsApp Image 2025-09-24 at 11.34.55_ab64d190.jpg",
    category: "Accessories",
    isSoldOut: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedProducts(count: number = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}

