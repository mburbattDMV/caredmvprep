"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    label: "DMV Practice Tests",
    key: "dmv",
    items: [
      { label: "All 50 States", href: "/states" },
      { label: "California", href: "/california-dmv-practice-test" },
      { label: "Texas", href: "/texas-dmv-practice-test" },
      { label: "Florida", href: "/florida-dmv-practice-test" },
      { label: "New York", href: "/new-york-dmv-practice-test" },
    ],
  },
  {
    label: "CDL Tests",
    key: "cdl",
    items: [
      { label: "CDL Overview", href: "/cdl-practice-test" },
      { label: "General Knowledge", href: "/cdl-general-knowledge" },
      { label: "Air Brakes", href: "/cdl-air-brakes" },
      { label: "Hazmat", href: "/cdl-hazmat" },
      { label: "Passenger", href: "/cdl-passenger" },
      { label: "School Bus", href: "/cdl-school-bus" },
      { label: "Tanker", href: "/cdl-tanker" },
      { label: "Doubles & Triples", href: "/cdl-doubles-triples" },
    ],
  },
  {
    label: "Motorcycle Tests",
    key: "moto",
    items: [
      { label: "Motorcycle Overview", href: "/motorcycle-practice-test" },
      { label: "Permit Test", href: "/motorcycle-permit-test" },
      { label: "Endorsement Test", href: "/motorcycle-endorsement-test" },
      { label: "License Test", href: "/motorcycle-license-test" },
      { label: "Road Signs", href: "/motorcycle-road-signs" },
      { label: "Safety Tips", href: "/motorcycle-safety-tips" },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    items: [
      { label: "All Resources", href: "/resources" },
      { label: "DMV Study Tips", href: "/dmv-study-tips" },
      { label: "Driver's License Guide", href: "/drivers-license-guide" },
      { label: "CDL Guide", href: "/cdl-guide" },
      { label: "Motorcycle Guide", href: "/motorcycle-guide" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey,    setOpenKey]    = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggle = (key: string) => setOpenKey((prev) => (prev === key ? null : key));

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <>
    <style>{`
      .header-logo { width: auto; height: 40px; max-height: 40px; object-fit: contain; }
      @media (min-width: 1024px) { .header-logo { height: 56px; max-height: 56px; } }
    `}</style>
    <header className="text-white sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#0f1e3c' }}>
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-header.png"
              alt="CAREDMVPrep – Your Road to Success"
              width={700}
              height={140}
              className="header-logo"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 shrink-0">
            {navItems.map((nav) => (
              <NavDropdown
                key={nav.key}
                label={nav.label}
                items={nav.items}
                open={openKey === nav.key}
                onToggle={() => toggle(nav.key)}
                onClose={() => setOpenKey(null)}
              />
            ))}
            <Link
              href="/pricing"
              className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA buttons — auth-aware */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-semibold border border-white/30 rounded hover:bg-white/10 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  className="px-4 py-2 text-sm font-semibold border border-white/30 rounded hover:bg-white/10 transition"
                >
                  Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-semibold bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold border border-white/30 rounded hover:bg-white/10 transition"
                >
                  LOG IN
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-[#1a7f3c] rounded hover:bg-[#158532] transition"
                >
                  SIGN UP
                </Link>
              </>
            )}
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
          {navItems.map((nav) => (
            <MobileSection key={nav.key} label={nav.label} items={nav.items} />
          ))}
          <Link
            href="/pricing"
            className="block px-3 py-2 text-sm text-gray-200 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          {isLoggedIn ? (
            <div className="pt-3 flex gap-2">
              <Link
                href="/dashboard"
                className="flex-1 text-center py-2 text-sm font-semibold border border-white/30 rounded hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex-1 text-center py-2 text-sm font-semibold bg-white/10 rounded hover:bg-white/20"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 flex gap-2">
              <Link href="/login" className="flex-1 text-center py-2 text-sm font-semibold border border-white/30 rounded hover:bg-white/10">
                Log In
              </Link>
              <Link href="/signup" className="flex-1 text-center py-2 text-sm font-semibold bg-[#1a7f3c] rounded hover:bg-[#158532]">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
    </>
  );
}

function NavDropdown({
  label, items, open, onToggle, onClose,
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
        className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded transition"
      >
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl z-20 py-1 border border-gray-100">
            {items.map((item) => (
              <Link
                key={item.label}
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
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-200 hover:text-white"
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 space-y-1">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
