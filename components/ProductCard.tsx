import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  isNew?: boolean;
  isSoldOut?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block product-card animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
        {/* Main Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover Image */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span
              className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              New
            </span>
          )}
          {discount > 0 && (
            <span
              className="px-3 py-1 bg-[#722F37] text-white text-[10px] font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Sold Out Overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span
              className="text-white text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        {!product.isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="py-4 px-1">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3
          className="text-white text-sm font-medium uppercase tracking-wide mb-2 group-hover:text-white/80 transition-colors line-clamp-1"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">
            €{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-white/40 line-through text-sm">
              €{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

