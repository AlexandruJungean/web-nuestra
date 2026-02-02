import type { Metadata, Viewport } from "next";
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

const baseUrl = "https://nuestra-shop.netlify.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#722F37" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  // Basic
  title: {
    default: "NUESTRA | The Street is Ours",
    template: "%s | NUESTRA",
  },
  description: "NUESTRA is a premium streetwear brand born at the intersection of football, culture, and community. Shop hoodies, t-shirts, pants & accessories. Made in the streets. Worn everywhere.",
  keywords: [
    "NUESTRA",
    "streetwear",
    "urban fashion",
    "football culture",
    "street fashion",
    "hoodies",
    "t-shirts",
    "premium clothing",
    "la nuestra",
    "street style",
    "football apparel",
    "youth football",
    "sport equipment",
  ],

  // Authors & Creator
  authors: [{ name: "NUESTRA APPAREL SRL" }],
  creator: "NUESTRA APPAREL SRL",
  publisher: "NUESTRA APPAREL SRL",

  // Canonical & Base
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (fără imagine - de adăugat manual)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "NUESTRA",
    title: "NUESTRA | The Street is Ours",
    description: "Premium streetwear brand born at the intersection of football, culture, and community. Shop hoodies, t-shirts, pants & accessories.",
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "NUESTRA - The Street is Ours",
    //   },
    // ],
  },

  // Twitter Card (fără imagine - de adăugat manual)
  twitter: {
    card: "summary_large_image",
    title: "NUESTRA | The Street is Ours",
    description: "Premium streetwear brand born at the intersection of football, culture, and community.",
    // images: ["/og-image.jpg"],
    creator: "@nuestra",
    site: "@nuestra",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    // apple: "/apple-touch-icon.png", // TODO: Add when available
  },

  // Category
  category: "fashion",

  // Verification (adaugă când ai conturile)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
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
