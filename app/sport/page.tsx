"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getBestsellers } from "@/lib/sportProducts";

export default function SportHomePage() {
  const featuredProducts = getFeaturedProducts();
  const bestsellers = getBestsellers();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sport/WhatsApp Image 2025-11-19 at 21.59.28.jpeg"
            alt="NUESTRA Sport"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] text-white text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
              <span className="double-slash text-white/80" />
              <span>Youth Football Equipment</span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-[0.9] mb-6 animate-fade-in-up"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              The Game
              <br />
              <span className="text-[#722F37]">is Ours</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg animate-fade-in-up delay-200">
              Premium training gear and match kits designed for the next generation of players. Built for performance, made for champions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link
                href="/sport/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a2a3a] font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-all hover:-translate-y-1"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Shop Collection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/sport/teams"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider text-sm hover:bg-white hover:text-[#1a2a3a] transition-all"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Team Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Categories
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1a2a3a] uppercase"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Gear Up for Victory
            </h2>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Training Gear"
              description="Performance training wear"
              image="/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (1).jpeg"
              href="/sport/shop?category=training"
              count={3}
            />
            <CategoryCard
              title="Match Kits"
              description="Competition ready jerseys"
              image="/images/sport/WhatsApp Image 2025-11-23 at 16.02.12.jpeg"
              href="/sport/shop?category=match"
              count={2}
            />
            <CategoryCard
              title="Shorts"
              description="Training & match shorts"
              image="/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (3).jpeg"
              href="/sport/shop?category=shorts"
              count={2}
            />
            <CategoryCard
              title="Accessories"
              description="Complete your kit"
              image="/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (4).jpeg"
              href="/sport/shop?category=accessories"
              count={4}
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Featured
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1a2a3a] uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                New Arrivals
              </h2>
            </div>
            <Link
              href="/sport/shop"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold uppercase tracking-wider text-sm hover:gap-4 transition-all"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Banner */}
      <section className="py-24 bg-[#1a2a3a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              For Every Player
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white uppercase mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Shop by Age Group
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Find the perfect fit for young players. Our gear is designed specifically for each age group.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "U8", age: "Under 8", href: "/sport/shop?age=u8" },
              { label: "U10", age: "Under 10", href: "/sport/shop?age=u10" },
              { label: "U12", age: "Under 12", href: "/sport/shop?age=u12" },
              { label: "U14", age: "Under 14", href: "/sport/shop?age=u14" },
              { label: "U16+", age: "Under 16+", href: "/sport/shop?age=u16+" },
            ].map((group) => (
              <Link
                key={group.label}
                href={group.href}
                className="group relative p-8 bg-white/5 border border-white/10 hover:border-[#722F37] hover:bg-[#722F37]/10 transition-all text-center"
              >
                <span
                  className="block text-4xl md:text-5xl font-bold text-white group-hover:text-[#722F37] transition-colors mb-2"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {group.label}
                </span>
                <span className="text-white/60 text-sm">{group.age}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Most Popular
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1a2a3a] uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Bestsellers
              </h2>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Radical Football Connection */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/sport/WhatsApp Image 2025-11-19 at 21.59.28 (1).jpeg"
                  alt="Radical Football"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#722F37] text-white p-6 shadow-xl">
                <span
                  className="block text-3xl font-bold"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  10+
                </span>
                <span className="text-sm text-white/80">Years Experience</span>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Heritage
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1a2a3a] uppercase mb-6"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Powered by
                <br />
                Radical Football
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                NUESTRA Sport is born from Radical Football – a conference where European coaches come together for theoretical and practical training sessions focused on youth development.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our equipment is designed with input from professional coaches who understand what young players need to develop their skills and confidence on the pitch.
              </p>
              <div className="flex flex-wrap gap-8 mb-8">
                <div>
                  <span
                    className="block text-3xl font-bold text-[#722F37]"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    500+
                  </span>
                  <span className="text-gray-500 text-sm">Coaches Trained</span>
                </div>
                <div>
                  <span
                    className="block text-3xl font-bold text-[#722F37]"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    25+
                  </span>
                  <span className="text-gray-500 text-sm">Countries</span>
                </div>
                <div>
                  <span
                    className="block text-3xl font-bold text-[#722F37]"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    10K+
                  </span>
                  <span className="text-gray-500 text-sm">Young Athletes</span>
                </div>
              </div>
              <Link
                href="/sport/radical-football"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a2a3a] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#2d4a5e] transition-all"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Orders CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sport/WhatsApp Image 2025-11-23 at 16.02.12.jpeg"
            alt="Team Orders"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a2a3a]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-[#722F37] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            For Clubs & Academies
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-white uppercase mb-6"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Outfit Your Entire Team
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Custom team orders with club branding, special pricing for bulk orders, and dedicated support for academies and youth clubs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sport/teams"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#722F37] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#5a252c] transition-all"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Request Team Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/sport/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider text-sm hover:bg-white hover:text-[#1a2a3a] transition-all"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  image,
  href,
  count,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  count: number;
}) {
  return (
    <Link href={href} className="group relative block overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-white/60 text-xs uppercase tracking-wider">{count} Products</span>
        <h3
          className="text-2xl font-bold text-white uppercase mb-1"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {title}
        </h3>
        <p className="text-white/70 text-sm">{description}</p>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
          <span className="text-sm uppercase tracking-wider">Shop Now</span>
          <svg
            className="w-4 h-4 transform transition-transform group-hover:translate-x-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
  return (
    <Link href={`/sport/product/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-[#722F37] text-white text-xs font-semibold uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-3 py-1 bg-[#1a2a3a] text-white text-xs font-semibold uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 bg-[#1a2a3a] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#722F37] transition-colors">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <span className="text-gray-400 text-xs uppercase tracking-wider">{product.category}</span>
        <h3
          className="text-lg font-semibold text-[#1a2a3a] group-hover:text-[#722F37] transition-colors mb-1"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[#1a2a3a] font-semibold">€{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">€{product.originalPrice}</span>
          )}
        </div>

        {/* Size Tags */}
        <div className="flex gap-1 mt-2">
          {product.sizes.slice(0, 5).map((size) => (
            <span key={size} className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5">
              {size}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

