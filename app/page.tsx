"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts(4);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/WhatsApp Image 2025-09-24 at 11.34.55_ab64d190.jpg"
              alt="NUESTRA Streetwear"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            
            {/* Scratched Texture Overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
            {/* Double Slash Icon */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="flex gap-2">
                <div className="w-1 h-16 bg-white transform -skew-x-12" />
                <div className="w-1 h-16 bg-white transform -skew-x-12" />
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight animate-fade-in-up"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              THE STREET
              <br />
              <span className="text-gradient-brand">IS OURS</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
              Born at the intersection of football, culture, and community.
              <br className="hidden md:block" />
              Made in the streets. Worn everywhere.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Link href="/shop" className="btn-primary min-w-[200px]">
                Shop Now
              </Link>
              <Link href="/lookbook" className="btn-secondary min-w-[200px]">
                View Lookbook
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        {/* Marquee Banner */}
        <section className="py-4 bg-[#722F37] overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content flex items-center gap-8 text-white/90 text-sm font-medium uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-oswald)" }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 whitespace-nowrap">
                  <span>The Street is Ours</span>
                  <span className="text-white/40">//</span>
                  <span>The Game is Ours</span>
                  <span className="text-white/40">//</span>
                  <span>Asphalt Capsule 001</span>
                  <span className="text-white/40">//</span>
                  <span>Free Shipping Over €100</span>
                  <span className="text-white/40">//</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <p className="text-[#722F37] text-sm uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                  New Arrivals
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Fresh Drops
                </h2>
              </div>
              <Link
                href="/shop"
                className="mt-6 md:mt-0 text-white/60 hover:text-white text-sm uppercase tracking-wider flex items-center gap-2 group transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                View All Products
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Split Collection Section */}
        <section className="grid md:grid-cols-2">
          {/* Streetwear */}
          <Link href="/shop?category=streetwear" className="group relative h-[70vh] md:h-[90vh] overflow-hidden">
            <Image
              src="/images/WhatsApp Image 2025-09-24 at 11.34.56_18e997e0.jpg"
              alt="Streetwear Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                Collection
              </p>
              <h3
                className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Streetwear
              </h3>
              <p className="text-white/70 text-lg mb-6">The Street is Ours</p>
              <span className="btn-secondary text-sm">
                Explore
              </span>
            </div>
          </Link>

          {/* Sport */}
          <Link href="/shop?category=sport" className="group relative h-[70vh] md:h-[90vh] overflow-hidden">
            <Image
              src="/images/WhatsApp Image 2025-09-24 at 11.23.47_ff938f9d.jpg"
              alt="Sport Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                Collection
              </p>
              <h3
                className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Sport
              </h3>
              <p className="text-white/70 text-lg mb-6">The Game is Ours</p>
              <span className="btn-secondary text-sm">
                Explore
              </span>
            </div>
          </Link>
        </section>

        {/* Brand Story Section */}
        <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 border border-white/20 rotate-45 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rotate-45 translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className="order-2 lg:order-1">
                <p className="text-[#722F37] text-sm uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                  Our Story
                </p>
                <h2
                  className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8 leading-[1.1]"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Made in the Streets.
                  <br />
                  <span className="text-white/60">Worn Everywhere.</span>
                </h2>
                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>
                    NUESTRA is a premium brand born at the intersection of football, culture, and community. Its name — meaning <em>ours</em> — reflects a universal truth: the game belongs to the people.
                  </p>
                  <p>
                    Rooted in the spirit of la nuestra, the legendary Argentinian philosophy of football defined by creativity, identity, and collective play, NUESTRA reclaims that energy for a new generation.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/about" className="btn-burgundy">
                    Our Story
                  </Link>
                  <Link href="/lookbook" className="btn-secondary">
                    View Lookbook
                  </Link>
                </div>
              </div>

              {/* Image Grid */}
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/images/WhatsApp Image 2025-09-24 at 11.23.48_48766ce7.jpg"
                      alt="NUESTRA Community"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/images/WhatsApp Image 2025-09-24 at 11.30.21_6ae8082c.jpg"
                      alt="NUESTRA Culture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-12">
                  <div className="relative aspect-[3/5] overflow-hidden">
                    <Image
                      src="/images/WhatsApp Image 2025-09-24 at 11.23.47_e573e93b.jpg"
                      alt="NUESTRA Football"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asphalt Capsule Feature */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/WhatsApp Image 2025-09-24 at 11.34.55_6ce60318.jpg"
              alt="Asphalt Capsule"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-xl">
              <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                Limited Edition
              </p>
              <h2
                className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Asphalt
                <span className="text-[#722F37]"> //</span>
              </h2>
              <h3
                className="text-3xl md:text-4xl font-bold text-white/60 uppercase tracking-tight mb-6"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Capsule 001
              </h3>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Every street is a field. The first capsule collection celebrating the raw texture of urban football culture.
              </p>
              <Link href="/shop?collection=asphalt" className="btn-primary">
                Shop Capsule
              </Link>
            </div>
          </div>
        </section>

        {/* More Products */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Best Sellers
              </h2>
              <p className="text-white/60 max-w-lg mx-auto">
                Community favorites that define the NUESTRA look.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.slice(4, 8).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link href="/shop" className="btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-[#121212] border-y border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <ValueCard
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Fast Shipping"
                description="2-5 business days worldwide"
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Premium Quality"
                description="Crafted for durability & comfort"
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
                title="Easy Returns"
                description="30-day hassle-free returns"
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Community"
                description="Join the NUESTRA family"
              />
            </div>
          </div>
        </section>

        {/* Instagram Feed Placeholder */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-[#722F37] text-sm uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                @nuestra
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Join the Movement
              </h2>
            </div>

            {/* Instagram Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                "/images/social media/post/Social Media Post.jpg",
                "/images/social media/post/Social Media Post2.jpg",
                "/images/social media/post/Social Media Post3.jpg",
                "/images/social media/post/Social Media Post4.jpg",
                "/images/social media/post/Social Media Post5.jpg",
                "/images/social media/post/Social Media Post6.jpg",
              ].map((src, index) => (
                <a
                  key={index}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`NUESTRA Instagram ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-white/60">
        {icon}
      </div>
      <h3
        className="text-white font-semibold uppercase tracking-wide text-sm mb-2"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {title}
      </h3>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}
