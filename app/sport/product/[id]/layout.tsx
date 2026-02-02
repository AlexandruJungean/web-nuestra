import type { Metadata } from "next";
import { getProductById, sportProducts } from "@/lib/sportProducts";

const baseUrl = "https://nuestra-shop.netlify.app";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const categoryNames: Record<string, string> = {
    training: "Training Gear",
    match: "Match Kits",
    shorts: "Shorts",
    accessories: "Accessories",
  };

  const title = product.name;
  const description = `${product.description} €${product.price.toFixed(2)}. Premium youth football equipment from NUESTRA Sport.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      categoryNames[product.category] || product.category,
      "NUESTRA Sport",
      "youth football",
      "kids football",
      "training gear",
      "football equipment",
    ],
    alternates: {
      canonical: `/sport/product/${id}`,
    },
    openGraph: {
      title: `${product.name} | NUESTRA Sport`,
      description,
      url: `${baseUrl}/sport/product/${id}`,
      type: "website",
      images: product.images[0]
        ? [
            {
              url: product.images[0].startsWith("http")
                ? product.images[0]
                : `${baseUrl}${product.images[0]}`,
              width: 800,
              height: 1000,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | NUESTRA Sport`,
      description: `${product.name} - €${product.price.toFixed(2)}. Youth football equipment from NUESTRA Sport.`,
    },
  };
}

// Generate static params for all sport products
export async function generateStaticParams() {
  return sportProducts.map((product) => ({
    id: product.id,
  }));
}

export default function SportProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
