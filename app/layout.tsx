import type { Metadata } from "next";
import { Oswald, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NUESTRA | The Street is Ours",
  description: "NUESTRA is a premium streetwear brand born at the intersection of football, culture, and community. Made in the streets. Worn everywhere.",
  keywords: ["streetwear", "urban fashion", "football culture", "NUESTRA", "street fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased`}
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
