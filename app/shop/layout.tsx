import type { Metadata } from "next";

const baseUrl = "https://nuestra-shop.netlify.app";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop NUESTRA streetwear collection. Premium hoodies, t-shirts, pants, jackets, and accessories. Born at the intersection of football, culture, and community.",
  keywords: [
    "NUESTRA shop",
    "streetwear",
    "hoodies",
    "t-shirts",
    "pants",
    "jackets",
    "urban fashion",
    "premium clothing",
    "street style",
  ],
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop | NUESTRA",
    description:
      "Shop NUESTRA streetwear collection. Premium hoodies, t-shirts, pants, jackets, and accessories.",
    url: `${baseUrl}/shop`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | NUESTRA",
    description: "Shop NUESTRA streetwear collection. Premium streetwear for the streets.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
