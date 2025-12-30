"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById, getFeaturedProducts, SportProduct } from "@/lib/sportProducts";

export default function SportProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const relatedProducts = getFeaturedProducts().filter((p) => p.id !== productId).slice(0, 3);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a2a3a] mb-4">Product Not Found</h1>
          <Link href="/sport/shop" className="text-[#722F37] underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/sport" className="hover:text-[#722F37] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/sport/shop" className="hover:text-[#722F37] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/sport/shop?category=${product.category}`}
              className="hover:text-[#722F37] transition-colors capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#1a2a3a]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-4 py-2 bg-[#722F37] text-white text-xs font-semibold uppercase tracking-wider">
                      New Arrival
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="px-4 py-2 bg-[#1a2a3a] text-white text-xs font-semibold uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery (if multiple images) */}
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-20 h-20 overflow-hidden border-2 transition-colors ${
                        activeImageIndex === index
                          ? "border-[#722F37]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              {/* Category & Age */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#722F37] text-sm font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm uppercase tracking-wider">
                  {product.ageGroup}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl font-bold text-[#1a2a3a] uppercase mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-[#1a2a3a]">€{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      €{product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-[#722F37]/10 text-[#722F37] text-sm font-semibold">
                      Save €{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider mb-3">
                  Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-[#722F37] scale-110"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider">
                    Size
                  </label>
                  <Link
                    href="/sport/size-guide"
                    className="text-sm text-[#722F37] underline hover:no-underline"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-4 py-3 border text-sm font-medium uppercase transition-all ${
                        selectedSize === size
                          ? "bg-[#1a2a3a] border-[#1a2a3a] text-white"
                          : "border-gray-200 text-[#1a2a3a] hover:border-[#722F37]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-200 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[#1a2a3a] hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-16 text-center font-semibold text-[#1a2a3a]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[#1a2a3a] hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="flex-1 py-4 px-8 bg-[#722F37] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#5a252c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-oswald)" }}
                  disabled={!selectedSize}
                >
                  {selectedSize ? "Add to Cart" : "Select a Size"}
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-[#722F37] hover:border-[#722F37] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-8">
                <h3
                  className="text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <svg
                        className="w-5 h-5 text-[#722F37] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 p-6 bg-gray-50">
                <div className="flex items-start gap-4 mb-4">
                  <svg className="w-6 h-6 text-[#722F37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <p className="font-semibold text-[#1a2a3a]">Free Shipping</p>
                    <p className="text-sm text-gray-500">On orders over €75</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#722F37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div>
                    <p className="font-semibold text-[#1a2a3a]">Easy Returns</p>
                    <p className="text-sm text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2
              className="text-3xl font-bold text-[#1a2a3a] uppercase mb-12"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: SportProduct }) {
  return (
    <Link href={`/sport/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
      </div>
      <div>
        <span className="text-gray-400 text-xs uppercase tracking-wider">{product.category}</span>
        <h3
          className="text-lg font-semibold text-[#1a2a3a] group-hover:text-[#722F37] transition-colors mb-1"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </h3>
        <span className="text-[#1a2a3a] font-semibold">€{product.price}</span>
      </div>
    </Link>
  );
}


