"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = [
  { id: "all", name: "All Products" },
  { id: "hoodies", name: "Hoodies" },
  { id: "t-shirts", name: "T-Shirts" },
  { id: "sweatshirts", name: "Sweatshirts" },
  { id: "jackets", name: "Jackets" },
  { id: "pants", name: "Pants" },
  { id: "shorts", name: "Shorts" },
  { id: "accessories", name: "Accessories" },
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "newest", name: "Newest" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase().replace("-", " ") ===
          selectedCategory.toLowerCase().replace("-", " ")
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Hero Banner */}
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/WhatsApp Image 2025-09-24 at 11.23.47_1a7db3fe.jpg"
              alt="NUESTRA Shop"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1
              className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Shop
            </h1>
            <p className="text-white/70 text-lg max-w-md mx-auto">
              Explore our complete collection of streetwear and sportswear
            </p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              {/* Results Count */}
              <p className="text-white/60 text-sm">
                Showing{" "}
                <span className="text-white font-medium">{filteredProducts.length}</span>{" "}
                products
              </p>

              {/* Sort & Filter Controls */}
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  className="md:hidden flex items-center gap-2 text-white text-sm uppercase tracking-wider"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border border-white/20 text-white text-sm px-4 py-2 pr-10 focus:outline-none focus:border-white/40 cursor-pointer uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        className="bg-[#1a1a1a] text-white"
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="flex gap-12">
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden md:block w-64 shrink-0">
                <div className="sticky top-32">
                  <h3
                    className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`text-sm transition-colors ${
                            selectedCategory === category.id
                              ? "text-white font-medium"
                              : "text-white/50 hover:text-white"
                          }`}
                        >
                          {category.name}
                          {selectedCategory === category.id && (
                            <span className="ml-2 text-[#722F37]">//</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Collections */}
                  <div className="mt-12">
                    <h3
                      className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      Collections
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <button className="text-sm text-white/50 hover:text-white transition-colors">
                          Streetwear
                        </button>
                      </li>
                      <li>
                        <button className="text-sm text-white/50 hover:text-white transition-colors">
                          Sport
                        </button>
                      </li>
                      <li>
                        <button className="text-sm text-white/50 hover:text-white transition-colors">
                          Asphalt // Capsule
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Price Range */}
                  <div className="mt-12">
                    <h3
                      className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      Price Range
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-transparent border border-white/30 rounded-none checked:bg-[#722F37] checked:border-[#722F37] focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                          Under €50
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-transparent border border-white/30 rounded-none checked:bg-[#722F37] checked:border-[#722F37] focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                          €50 - €100
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-transparent border border-white/30 rounded-none checked:bg-[#722F37] checked:border-[#722F37] focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                          €100 - €150
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-transparent border border-white/30 rounded-none checked:bg-[#722F37] checked:border-[#722F37] focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                          Over €150
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <p className="text-white/60 text-lg mb-4">
                      No products found in this category.
                    </p>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="btn-secondary"
                    >
                      View All Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters Drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            isMobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#121212] transform transition-transform duration-300 ${
              isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2
                className="text-white font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <h3
                className="text-white font-semibold uppercase tracking-wider text-sm mb-4"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Categories
              </h3>
              <ul className="space-y-3 mb-8">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`text-sm transition-colors ${
                        selectedCategory === category.id
                          ? "text-white font-medium"
                          : "text-white/50"
                      }`}
                    >
                      {category.name}
                      {selectedCategory === category.id && (
                        <span className="ml-2 text-[#722F37]">//</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Apply Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full btn-primary mt-6"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

