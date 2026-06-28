"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Practice Tests",
    href: "/quiz/california-permit",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Mock Exams",
    href: "/mock-exam",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Review Center",
    href: "/review",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    label: "History",
    href: "/history",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Account",
    href: "/account",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const PRODUCT_LABELS: Record<string, string> = {
  dmv: 'DMV', motorcycle: 'Moto', cdl: 'CDL',
  cdl_hazmat: 'HazMat', cdl_tanker: 'Tanker', cdl_doubles_triples: 'D&T',
  cdl_school_bus: 'School Bus', cdl_passenger: 'Passenger',
};

interface Props {
  displayName: string;
  isPro: boolean;
  activeProducts: string[];
}

export default function DashboardSidebar({ displayName, isPro, activeProducts }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 border-r border-gray-200 min-h-screen"
      style={{ backgroundColor: '#0f1e3c' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="CAREDMVPrep"
            width={160}
            height={64}
            style={{ height: '44px', width: 'auto' }}
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              style={isActive ? { backgroundColor: '#1a7f3c' } : {}}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + plan badge */}
      <div className="px-4 py-5 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold uppercase">
            {displayName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{displayName}</p>
            {isPro ? (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {activeProducts.map((p) => (
                  <span
                    key={p}
                    className="inline-block text-xs px-1.5 py-0.5 rounded font-semibold"
                    style={{ backgroundColor: '#1a7f3c', color: '#fff' }}
                  >
                    {PRODUCT_LABELS[p] ?? p}
                  </span>
                ))}
              </div>
            ) : (
              <span
                className="inline-block text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#9ca3af' }}
              >
                Free
              </span>
            )}
          </div>
        </div>
        {!isPro && (
          <Link
            href="/pricing"
            className="block w-full text-center py-2 rounded-lg text-xs font-bold transition"
            style={{ backgroundColor: '#1a7f3c', color: '#fff' }}
          >
            Upgrade to Pro →
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="mt-2 w-full text-center py-2 text-xs text-gray-500 hover:text-gray-300 transition"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
