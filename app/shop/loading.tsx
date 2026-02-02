export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero skeleton */}
      <div className="h-[40vh] md:h-[50vh] bg-[#1a1a1a] animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        {/* Top bar skeleton */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-10 w-40 bg-white/10 rounded animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="flex gap-12">
          {/* Sidebar skeleton (desktop) */}
          <div className="hidden md:block w-64 shrink-0 space-y-8">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-white/5 rounded animate-pulse"
                  style={{ width: `${60 + Math.random() * 40}%` }}
                />
              ))}
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[#1a1a1a] animate-pulse rounded" />
                <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
