"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard",      href: "/dashboard" },
  { label: "Practice Tests", href: "/quiz/california-permit" },
  { label: "Mock Exams",     href: "/mock-exam" },
  { label: "Review Center",  href: "/review" },
  { label: "History",        href: "/history" },
  { label: "Account",        href: "/account" },
];

interface Props {
  displayName: string;
  isPro:       boolean;
}

export default function MobileNav({ displayName, isPro }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="lg:hidden">
      {/* Sticky top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-white/10 sticky top-0 z-30"
        style={{ backgroundColor: "#0f1e3c" }}
      >
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt="CAREDMVPrep"
            width={140}
            height={56}
            style={{ height: "36px", width: "auto" }}
          />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-white"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay + drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in drawer from the right */}
          <aside
            className="relative flex flex-col w-72 max-w-[85vw] z-50"
            style={{ backgroundColor: "#0f1e3c" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Image
                src="/logo.png"
                alt="CAREDMVPrep"
                width={140}
                height={56}
                style={{ height: "36px", width: "auto" }}
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition"
                aria-label="Close navigation menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    style={isActive ? { backgroundColor: "#1a7f3c" } : {}}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="px-4 py-5 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                  {displayName[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{displayName}</p>
                  <p className="text-xs" style={{ color: isPro ? "#34d399" : "#9ca3af" }}>
                    {isPro ? "Pro" : "Free"}
                  </p>
                </div>
              </div>
              {!isPro && (
                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-2 rounded-lg text-xs font-bold text-white mb-2 transition hover:opacity-90"
                  style={{ backgroundColor: "#1a7f3c" }}
                >
                  Upgrade to Pro →
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="w-full text-center py-2 text-xs text-gray-500 hover:text-gray-300 transition"
              >
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
