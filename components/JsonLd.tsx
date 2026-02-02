// JSON-LD Structured Data Components for SEO

const baseUrl = "https://nuestra-shop.netlify.app";

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NUESTRA",
    legalName: "NUESTRA APPAREL SRL",
    url: baseUrl,
    logo: `${baseUrl}/images/logo/Nuestra - Full Logo 1 - Main.png`,
    description:
      "Premium streetwear brand born at the intersection of football, culture, and community.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Jungean-Herman Marius-Alexandru",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "RO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "alex.jungean@gmail.com",
    },
    // sameAs: [], // TODO: Add social media links when available
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NUESTRA",
    url: baseUrl,
    description:
      "Premium streetwear and youth football equipment. Shop hoodies, t-shirts, pants, and accessories.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Store Schema
export function StoreJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "NUESTRA",
    url: baseUrl,
    description:
      "Premium streetwear brand. Shop hoodies, t-shirts, pants, jackets and accessories.",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Credit Card, Debit Card",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NUESTRA Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Streetwear",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hoodies" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "T-Shirts" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pants" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Jackets" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Sport",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Training Gear" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Match Kits" } },
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema
export function ProductJsonLd({
  product,
}: {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    isSoldOut?: boolean;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      `Premium ${product.category.toLowerCase()} from NUESTRA. Made with high-quality materials.`,
    image: product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image}`,
    url: `${baseUrl}/product/${product.id}`,
    brand: {
      "@type": "Brand",
      name: "NUESTRA",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/product/${product.id}`,
      priceCurrency: "EUR",
      price: product.price,
      ...(product.originalPrice && {
        priceValidUntil: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      }),
      availability: product.isSoldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "NUESTRA APPAREL SRL",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema (for FAQ pages)
export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Collection/ItemList Schema (for shop pages)
export function CollectionJsonLd({
  name,
  description,
  products,
}: {
  name: string;
  description: string;
  products: { id: string; name: string; price: number; image: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/product/${product.id}`,
        name: product.name,
        image: product.image.startsWith("http")
          ? product.image
          : `${baseUrl}${product.image}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
