"use client";

import Link from "next/link";
import { useState } from "react";

const dmvDropdown = [
  { label: "All States", href: "/" },
  { label: "California", href: "/california-dmv-practice-test" },
  { label: "Texas", href: "/texas-dmv-practice-test" },
  { label: "Florida", href: "/florida-dmv-practice-test" },
  { label: "New York", href: "/new-york-dmv-practice-test" },
];

const cdlDropdown = [
  { label: "CDL General Knowledge", href: "/cdl-practice-test" },
  { label: "CDL Air Brakes", href: "/cdl-practice-test#air-brakes" },
  { label: "CDL Hazmat", href: "/cdl-practice-test#hazmat" },
  { label: "CDL Passenger", href: "/cdl-practice-test#passenger" },
  { label: "CDL School Bus", href: "/cdl-practice-test#school-bus" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  return (
    <header className="bg-[#0d2240] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#1a7f3c] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-base tracking-tight">
                <span className="text-white">CARE</span>
                <span className="text-[#22a050]">DMV</span>
                <span className="text-white">Prep</span>
              </span>
              <p className="text-[10px] text-gray-400 hidden sm:block">YOUR ROAD TO SUCCESS</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavDropdown label="DMV Practice Tests" items={dmvDropdown} open={openDropdown === "dmv"} onToggle={() => toggle("dmv")} onClose={() => setOpenDropdown(null)} />
            <NavDropdown label="CDL Tests" items={cdlDropdown} open={openDropdown === "cdl"} onToggle={() => toggle("cdl")} onClose={() => setOpenDropdown(null)} />
            <Link href="/motorcycle-practice-test" className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition">
              Motorcycle Tests
            </Link>
            <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition">
              Pricing
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition">
              About
            </Link>
          </nav>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/pricing" className="px-4 py-2 text-sm font-semibold border border-white/40 rounded hover:bg-white/10 transition">
              Log In
            </Link>
            <Link href="/pricing" className="px-4 py-2 text-sm font-semibold bg-[#1a7f3c] rounded hover:bg-[#158532] transition">
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a1c34] border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          <MobileSection label="DMV Practice Tests" items={dmvDropdown} />
          <MobileSection label="CDL Tests" items={cdlDropdown} />
          <Link href="/motorcycle-practice-test" className="block px-3 py-2 text-sm text-gray-200 hover:text-white" onClick={() => setMobileOpen(false)}>Motorcycle Tests</Link>
          <Link href="/pricing" className="block px-3 py-2 text-sm text-gray-200 hover:text-white" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/about" className="block px-3 py-2 text-sm text-gray-200 hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
          <div className="pt-3 flex gap-2">
            <Link href="/pricing" className="flex-1 text-center py-2 text-sm font-semibold border border-white/40 rounded hover:bg-white/10">Log In</Link>
            <Link href="/pricing" className="flex-1 text-center py-2 text-sm font-semibold bg-[#1a7f3c] rounded hover:bg-[#158532]">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition"
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl z-20 py-1 border border-gray-100">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a7f3c]"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MobileSection({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-200 hover:text-white">
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 space-y-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
