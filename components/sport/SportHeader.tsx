"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SportHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/sport" className="relative z-10">
            <Image
              src="/images/logo/Nuestra - Full Logo 1 - Main.png"
              alt="NUESTRA Sport"
              width={730}
              height={164}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink href="/sport" isScrolled={isScrolled}>Home</NavLink>
            <NavLink href="/sport/shop" isScrolled={isScrolled}>Shop</NavLink>
            <NavLink href="/sport/shop?category=training" isScrolled={isScrolled}>Training</NavLink>
            <NavLink href="/sport/shop?category=match" isScrolled={isScrolled}>Match Kits</NavLink>
            <NavLink href="/sport/teams" isScrolled={isScrolled}>Teams</NavLink>
            <NavLink href="/sport/about" isScrolled={isScrolled}>About</NavLink>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button
              className={`hidden md:flex items-center justify-center w-10 h-10 transition-colors ${
                isScrolled ? "text-[#1a2a3a]/70 hover:text-[#1a2a3a]" : "text-white/80 hover:text-white"
              }`}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <button
              className={`relative flex items-center justify-center w-10 h-10 transition-colors ${
                isScrolled ? "text-[#1a2a3a]/70 hover:text-[#1a2a3a]" : "text-white/80 hover:text-white"
              }`}
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#722F37] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-[#1a2a3a]" : "bg-white"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-[#1a2a3a]" : "bg-white"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-[#1a2a3a]" : "bg-white"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <nav className="flex flex-col py-6 px-6">
            <MobileNavLink href="/sport" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/sport/shop" onClick={() => setIsMobileMenuOpen(false)}>
              Shop All
            </MobileNavLink>
            <MobileNavLink href="/sport/shop?category=training" onClick={() => setIsMobileMenuOpen(false)}>
              Training
            </MobileNavLink>
            <MobileNavLink href="/sport/shop?category=match" onClick={() => setIsMobileMenuOpen(false)}>
              Match Kits
            </MobileNavLink>
            <MobileNavLink href="/sport/teams" onClick={() => setIsMobileMenuOpen(false)}>
              Teams
            </MobileNavLink>
            <MobileNavLink href="/sport/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium tracking-[0.12em] uppercase transition-colors group ${
        isScrolled ? "text-[#1a2a3a]/70 hover:text-[#1a2a3a]" : "text-white/80 hover:text-white"
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
        isScrolled ? "bg-[#722F37]" : "bg-white"
      }`} />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-4 text-lg font-medium tracking-[0.1em] text-[#1a2a3a]/80 hover:text-[#722F37] uppercase transition-colors border-b border-gray-100 last:border-0"
      style={{ fontFamily: "var(--font-oswald)" }}
    >
      {children}
    </Link>
  );
}

