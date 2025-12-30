import Link from "next/link";
import Image from "next/image";

export default function SportFooter() {
  return (
    <footer className="bg-[#1a2a3a] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Join the Team
              </h3>
              <p className="text-white/60 text-sm">
                Subscribe for exclusive equipment drops, team offers, and youth football updates.
              </p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-6 py-4 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#722F37] transition-colors"
              />
              <button
                className="px-8 py-4 bg-[#722F37] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#5a252c] transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Image
              src="/images/logo/Nuestra - Full Logo 1 - White.png"
              alt="NUESTRA Sport"
              width={730}
              height={164}
              className="h-8 w-auto mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Premium football equipment for the next generation. The Game is Ours.
            </p>
            <p className="text-white/40 text-xs mb-6">
              Powered by Radical Football
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <SocialLink
                href="https://instagram.com"
                label="Instagram"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                }
              />
              <SocialLink
                href="https://youtube.com"
                label="YouTube"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                }
              />
              <SocialLink
                href="https://facebook.com"
                label="Facebook"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/sport/shop">All Products</FooterLink>
              <FooterLink href="/sport/shop?category=training">Training Gear</FooterLink>
              <FooterLink href="/sport/shop?category=match">Match Kits</FooterLink>
              <FooterLink href="/sport/shop?category=shorts">Shorts</FooterLink>
              <FooterLink href="/sport/shop?category=accessories">Accessories</FooterLink>
            </ul>
          </div>

          {/* Age Groups Column */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Age Groups
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/sport/shop?age=u8">Under 8</FooterLink>
              <FooterLink href="/sport/shop?age=u10">Under 10</FooterLink>
              <FooterLink href="/sport/shop?age=u12">Under 12</FooterLink>
              <FooterLink href="/sport/shop?age=u14">Under 14</FooterLink>
              <FooterLink href="/sport/shop?age=u16">Under 16+</FooterLink>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Info
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/sport/about">About Us</FooterLink>
              <FooterLink href="/sport/teams">Team Orders</FooterLink>
              <FooterLink href="/sport/radical-football">Radical Football</FooterLink>
              <FooterLink href="/sport/contact">Contact</FooterLink>
              <FooterLink href="/">Streetwear</FooterLink>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4
              className="text-white font-semibold uppercase tracking-wider text-sm mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Help
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/sport/faq">FAQ</FooterLink>
              <FooterLink href="/sport/shipping">Shipping</FooterLink>
              <FooterLink href="/sport/returns">Returns</FooterLink>
              <FooterLink href="/sport/size-guide">Size Guide</FooterLink>
              <FooterLink href="/sport/track-order">Track Order</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2025 NUESTRA APPAREL SRL. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/60 hover:text-white text-sm transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-[#722F37] hover:bg-[#722F37] transition-colors"
    >
      {icon}
    </a>
  );
}

