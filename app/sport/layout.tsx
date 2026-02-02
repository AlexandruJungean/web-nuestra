import type { Metadata } from "next";
import SportHeader from "@/components/sport/SportHeader";
import SportFooter from "@/components/sport/SportFooter";

const baseUrl = "https://nuestra-shop.netlify.app";

export const metadata: Metadata = {
  title: {
    default: "NUESTRA Sport | The Game is Ours",
    template: "%s | NUESTRA Sport",
  },
  description: "Premium football equipment for kids and youth. Training gear, match kits, shorts, and accessories designed for the next generation of players. Powered by Radical Football.",
  keywords: [
    "youth football",
    "kids football equipment",
    "training gear",
    "match kits",
    "NUESTRA Sport",
    "Radical Football",
    "football shorts",
    "youth sports",
    "kids sports clothing",
    "football accessories",
    "team equipment",
    "junior football",
  ],
  alternates: {
    canonical: "/sport",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/sport`,
    siteName: "NUESTRA Sport",
    title: "NUESTRA Sport | The Game is Ours",
    description: "Premium football equipment for kids and youth. Training gear, match kits, and accessories for the next generation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NUESTRA Sport | The Game is Ours",
    description: "Premium football equipment for kids and youth. The Game is Ours.",
    creator: "@nuestra",
    site: "@nuestra",
  },
};

export default function SportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SportHeader />
      <main>{children}</main>
      <SportFooter />
    </>
  );
}

