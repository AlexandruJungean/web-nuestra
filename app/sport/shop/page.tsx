"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { sportProducts, SportProduct } from "@/lib/sportProducts";

type Category = "all" | SportProduct["category"];
type AgeGroup = "all" | SportProduct["ageGroup"];
type SortOption = "newest" | "price-asc" | "price-desc" | "name";

export default function SportShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...sportProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by age group
    if (selectedAgeGroup !== "all") {
      products = products.filter((p) => p.ageGroup === selectedAgeGroup);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return products;
  }, [selectedCategory, selectedAgeGroup, sortBy]);

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "training", label: "Training Gear" },
    { value: "match", label: "Match Kits" },
    { value: "shorts", label: "Shorts" },
    { value: "accessories", label: "Accessories" },
  ];

  const ageGroups: { value: AgeGroup; label: string }[] = [
    { value: "all", label: "All Ages" },
    { value: "u8", label: "Under 8" },
    { value: "u10", label: "Under 10" },
    { value: "u12", label: "Under 12" },
    { value: "u14", label: "Under 14" },
    { value: "u16+", label: "Under 16+" },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/sport" className="hover:text-[#722F37] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#1a2a3a]">Shop</span>
              </nav>
              <h1
                className="text-4xl md:text-5xl font-bold text-[#1a2a3a] uppercase"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Shop All
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} Products
              </p>
            </div>

            {/* Sort Dropdown - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <label className="text-sm text-gray-500">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-200 text-[#1a2a3a] focus:outline-none focus:border-[#722F37] bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              {/* Category Filter */}
              <div className="mb-8">
                <h3
                  className="text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Category
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.value}>
                      <button
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          selectedCategory === cat.value
                            ? "bg-[#722F37]/10 text-[#722F37] font-medium"
                            : "text-gray-600 hover:text-[#1a2a3a] hover:bg-gray-50"
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Age Group Filter */}
              <div className="mb-8">
                <h3
                  className="text-sm font-semibold text-[#1a2a3a] uppercase tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Age Group
                </h3>
                <ul className="space-y-2">
                  {ageGroups.map((age) => (
                    <li key={age.value}>
                      <button
                        onClick={() => setSelectedAgeGroup(age.value)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          selectedAgeGroup === age.value
                            ? "bg-[#722F37]/10 text-[#722F37] font-medium"
                            : "text-gray-600 hover:text-[#1a2a3a] hover:bg-gray-50"
                        }`}
                      >
                        {age.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reset Filters */}
              {(selectedCategory !== "all" || selectedAgeGroup !== "all") && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedAgeGroup("all");
                  }}
                  className="text-sm text-[#722F37] underline hover:no-underline"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-[#1a2a3a]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-200 text-[#1a2a3a] focus:outline-none bg-white"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Mobile Filters Panel */}
          {isFilterOpen && (
            <div className="lg:hidden bg-gray-50 p-6 mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#1a2a3a] uppercase mb-3">
                    Category
                  </h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as Category)}
                    className="w-full px-3 py-2 border border-gray-200 bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a2a3a] uppercase mb-3">
                    Age Group
                  </h3>
                  <select
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup)}
                    className="w-full px-3 py-2 border border-gray-200 bg-white"
                  >
                    {ageGroups.map((age) => (
                      <option key={age.value} value={age.value}>
                        {age.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedAgeGroup("all");
                  }}
                  className="text-[#722F37] underline hover:no-underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: SportProduct }) {
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
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-400 text-xs uppercase tracking-wider">{product.category}</span>
          <span className="text-gray-400 text-xs uppercase tracking-wider">{product.ageGroup}</span>
        </div>
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

        {/* Colors */}
        <div className="flex gap-1 mt-2">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}

