/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,

  // Optimize images
  images: {
    // Modern image formats
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for next/image
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Short cache for quick updates (1 hour)
    minimumCacheTTL: 60 * 60, // 1 hour
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["@/components", "@/lib"],
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        // Short cache for images (1 hour) - allows quick updates
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        // Security headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects (if needed in future)
  async redirects() {
    return [];
  },

  // PoweredByHeader removal for security
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
