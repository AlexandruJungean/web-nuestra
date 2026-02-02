"use client";

import dynamic from "next/dynamic";

// Loading placeholders
const FooterSkeleton = () => (
  <div className="bg-[#0a0a0a] border-t border-white/10 py-16 animate-pulse">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
          <div className="h-8 w-32 bg-white/10 rounded" />
          <div className="h-16 w-48 bg-white/5 rounded" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 w-20 bg-white/10 rounded" />
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-3 bg-white/5 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SportFooterSkeleton = () => (
  <div className="bg-[#1a2a3a] border-t border-white/10 py-16 animate-pulse">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
          <div className="h-8 w-32 bg-white/10 rounded" />
          <div className="h-16 w-48 bg-white/5 rounded" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 w-20 bg-white/10 rounded" />
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-3 bg-white/5 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Lazy loaded Footer - loads after initial paint
export const LazyFooter = dynamic(() => import("./Footer"), {
  loading: () => <FooterSkeleton />,
  ssr: true, // Keep SSR for SEO
});

// Lazy loaded SportFooter
export const LazySportFooter = dynamic(() => import("./sport/SportFooter"), {
  loading: () => <SportFooterSkeleton />,
  ssr: true,
});

// Generic section skeleton for below-the-fold content
export const SectionSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div 
    className="bg-[#0a0a0a] animate-pulse" 
    style={{ height }}
  />
);
