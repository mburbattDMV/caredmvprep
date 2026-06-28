"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, BarChart2, Users, CreditCard, TrendingUp,
  Tag, Megaphone, BookOpen, Activity, Headphones, Search,
  ExternalLink, LogOut, ChevronRight,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard",   href: "/myadmin2026",            icon: LayoutDashboard, exact: true },
      { label: "Analytics",   href: "/myadmin2026/analytics",  icon: BarChart2 },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Users",          href: "/myadmin2026/users",          icon: Users },
      { label: "Subscriptions",  href: "/myadmin2026/subscriptions",  icon: CreditCard },
      { label: "Revenue",        href: "/myadmin2026/revenue",        icon: TrendingUp },
    ],
  },
  {
    label: "Marketing",
    items: [
      { label: "Coupons",  href: "/myadmin2026/coupons",  icon: Tag },
      { label: "Banners",  href: "/myadmin2026/banners",  icon: Megaphone },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Coverage",  href: "/myadmin2026/coverage",  icon: BookOpen },
      { label: "Activity",  href: "/myadmin2026/activity",  icon: Activity },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Support",  href: "/myadmin2026/support",  icon: Headphones },
      { label: "SEO",      href: "/myadmin2026/seo",      icon: Search },
    ],
  },
];

interface Props { userEmail: string }

export default function AdminSidebar({ userEmail }: Props) {
  const pathname = usePathname();
  const router   = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/myadmin2026/login");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside
      className="hidden lg:flex flex-col w-56 shrink-0 border-r overflow-hidden"
      style={{ backgroundColor: "#0a1628", borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/myadmin2026">
          <Image
            src="/logo.png"
            alt="CAREDMVPrep"
            width={240}
            height={96}
            className="w-[190px] h-auto"
            priority
          />
        </Link>
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(26,127,60,0.25)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs font-medium text-green-400">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon   = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all group"
                    style={
                      active
                        ? { backgroundColor: "#1a7f3c", color: "#ffffff" }
                        : { color: "rgba(255,255,255,0.55)" }
                    }
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                      }
                    }}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={12} className="ml-auto opacity-60" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="px-2.5 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-xs font-medium text-white truncate">{userEmail}</p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Administrator</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
        >
          <ExternalLink size={12} />
          Public site
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f87171"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
        >
          <LogOut size={12} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
