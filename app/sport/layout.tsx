import type { Metadata } from "next";
import SportHeader from "@/components/sport/SportHeader";
import SportFooter from "@/components/sport/SportFooter";

export const metadata: Metadata = {
  title: "NUESTRA Sport | The Game is Ours",
  description: "Premium football equipment for kids and youth. Training gear, match kits, and accessories designed for the next generation of players. Powered by Radical Football.",
  keywords: ["youth football", "kids football equipment", "training gear", "match kits", "NUESTRA Sport", "Radical Football"],
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

