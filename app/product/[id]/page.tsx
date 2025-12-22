"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, getProductById } from "@/lib/products";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get related products
  const relatedProducts = products
    .filter((p) => p.id !== productId && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-white uppercase mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Product Not Found
            </h1>
            <p className="text-white/60 mb-8">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/shop" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Generate multiple images for gallery (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.hoverImage || product.image,
    product.image,
    product.hoverImage || product.image,
  ];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Highlight size selection
      return;
    }
    setIsAddingToCart(true);
    // Simulate add to cart
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32">
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-8">
          <nav className="flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={productImages[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span
                      className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      New
                    </span>
                  )}
                  {discount > 0 && (
                    <span
                      className="px-4 py-2 bg-[#722F37] text-white text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? productImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === productImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square overflow-hidden bg-[#1a1a1a] transition-all ${
                      activeImageIndex === index
                        ? "ring-2 ring-white"
                        : "ring-1 ring-white/10 hover:ring-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Category */}
              <p className="text-[#722F37] text-sm uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                {product.category}
              </p>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-6"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-white">
                  €{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-white/40 line-through">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-white/70 text-lg leading-relaxed">
                  Premium quality streetwear piece from the NUESTRA collection. Crafted with attention to detail, 
                  featuring the iconic double slash branding. Made from 100% organic cotton with a relaxed, 
                  comfortable fit perfect for the streets.
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-white font-semibold uppercase tracking-wider text-sm"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Select Size
                  </h3>
                  <button className="text-white/50 hover:text-white text-sm underline transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? "bg-white text-black"
                          : "bg-transparent border border-white/20 text-white hover:border-white/50"
                      }`}
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="mt-2 text-white/40 text-sm">Please select a size</p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3
                  className="text-white font-semibold uppercase tracking-wider text-sm mb-4"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-16 text-center text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || product.isSoldOut}
                  className={`w-full py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                    product.isSoldOut
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : selectedSize
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/20 text-white/60 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {isAddingToCart
                    ? "Adding..."
                    : product.isSoldOut
                    ? "Sold Out"
                    : "Add to Cart"}
                </button>
                <button
                  className="w-full py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-all"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    Add to Wishlist
                  </span>
                </button>
              </div>

              {/* Features */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-white/60 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    <div>
                      <p className="text-white text-sm font-medium">Free Shipping</p>
                      <p className="text-white/50 text-xs">On orders over €100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-white/60 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <div>
                      <p className="text-white text-sm font-medium">Easy Returns</p>
                      <p className="text-white/50 text-xs">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-white/60 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    <div>
                      <p className="text-white text-sm font-medium">Premium Quality</p>
                      <p className="text-white/50 text-xs">100% organic cotton</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-white/60 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-white text-sm font-medium">Sustainable</p>
                      <p className="text-white/50 text-xs">Eco-friendly production</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Details */}
              <div className="mt-8 space-y-4">
                <AccordionItem title="Product Details">
                  <ul className="space-y-2 text-white/70">
                    <li>• Relaxed fit</li>
                    <li>• Heavy-weight 380gsm cotton</li>
                    <li>• Ribbed cuffs and hem</li>
                    <li>• Double-stitched seams</li>
                    <li>• Embroidered double slash logo</li>
                    <li>• Woven label at hem</li>
                  </ul>
                </AccordionItem>
                <AccordionItem title="Shipping & Returns">
                  <div className="text-white/70 space-y-3">
                    <p>Free standard shipping on orders over €100. Express shipping available at checkout.</p>
                    <p>Returns accepted within 30 days of delivery. Items must be unworn with original tags attached.</p>
                  </div>
                </AccordionItem>
                <AccordionItem title="Care Instructions">
                  <ul className="space-y-2 text-white/70">
                    <li>• Machine wash cold with similar colors</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low</li>
                    <li>• Cool iron if needed</li>
                    <li>• Do not dry clean</li>
                  </ul>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-24 mt-16 border-t border-white/10">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
              <div className="flex items-end justify-between mb-12">
                <h2
                  className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  You May Also Like
                </h2>
                <Link
                  href={`/shop?category=${product.category.toLowerCase()}`}
                  className="hidden md:flex text-white/60 hover:text-white text-sm uppercase tracking-wider items-center gap-2 group transition-colors"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  View All
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span
          className="text-white font-semibold uppercase tracking-wider text-sm"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

