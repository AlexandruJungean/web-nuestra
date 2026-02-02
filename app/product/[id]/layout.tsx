import type { Metadata } from "next";
import { getProductById, products } from "@/lib/products";

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

  const title = product.name;
  const description = `Shop ${product.name} from NUESTRA. Premium ${product.category.toLowerCase()} made with high-quality materials. €${product.price.toFixed(2)}. Free shipping on orders over €100.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      "NUESTRA",
      "streetwear",
      "premium clothing",
      "urban fashion",
    ],
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title: `${product.name} | NUESTRA`,
      description,
      url: `${baseUrl}/product/${id}`,
      type: "website",
      images: product.image
        ? [
            {
              url: product.image.startsWith("http")
                ? product.image
                : `${baseUrl}${product.image}`,
              width: 800,
              height: 1000,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | NUESTRA`,
      description: `${product.name} - €${product.price.toFixed(2)}. Premium ${product.category.toLowerCase()} from NUESTRA.`,
    },
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
