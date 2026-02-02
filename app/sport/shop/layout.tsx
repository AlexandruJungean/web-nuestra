import type { Metadata } from "next";

const baseUrl = "https://nuestra-shop.netlify.app";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop NUESTRA Sport youth football equipment. Training gear, match kits, shorts, and accessories for kids and young players. The Game is Ours.",
  keywords: [
    "youth football equipment",
    "kids football gear",
    "training kits",
    "match kits",
    "football shorts",
    "youth sports",
    "NUESTRA Sport",
    "Radical Football",
  ],
  alternates: {
    canonical: "/sport/shop",
  },
  openGraph: {
    title: "Shop | NUESTRA Sport",
    description:
      "Shop NUESTRA Sport youth football equipment. Premium training gear and match kits for the next generation.",
    url: `${baseUrl}/sport/shop`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | NUESTRA Sport",
    description: "Youth football equipment. The Game is Ours.",
  },
};

export default function SportShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
