export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo placeholder */}
        <div className="flex gap-2 animate-pulse">
          <div className="w-1 h-12 bg-white/20 transform -skew-x-12" />
          <div className="w-1 h-12 bg-white/20 transform -skew-x-12" />
        </div>
        {/* Loading text */}
        <p
          className="text-white/40 text-sm uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
