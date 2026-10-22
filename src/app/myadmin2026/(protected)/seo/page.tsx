import type { Metadata } from "next";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { CheckCircle, AlertCircle, XCircle, ExternalLink, FileText, Globe, Search } from "lucide-react";

export const metadata: Metadata = { title: "SEO | Admin", robots: { index: false, follow: false } };

interface Check { label: string; status: "ok" | "warn" | "error"; detail: string }

function StatusIcon({ status }: { status: "ok" | "warn" | "error" }) {
  if (status === "ok")    return <CheckCircle size={16} className="text-green-600 shrink-0" />;
  if (status === "warn")  return <AlertCircle size={16} className="text-amber-500 shrink-0" />;
  return <XCircle size={16} className="text-red-500 shrink-0" />;
}

export default async function AdminSeoPage() {
  const publicDir = join(process.cwd(), "public");

  const checks: Check[] = [];

  // robots.txt
  const hasRobots = existsSync(join(publicDir, "robots.txt"));
  checks.push({
    label:  "robots.txt",
    status: hasRobots ? "ok" : "error",
    detail: hasRobots
      ? readFileSync(join(publicDir, "robots.txt"), "utf-8").slice(0, 120)
      : "robots.txt not found in /public — create it to control crawler access.",
  });

  // sitemap.xml
  const hasSitemapXml = existsSync(join(publicDir, "sitemap.xml"));
  const hasSitemapTs  = existsSync(join(process.cwd(), "src/app/sitemap.ts")) ||
                        existsSync(join(process.cwd(), "src/app/sitemap.xml/route.ts"));
  checks.push({
    label:  "sitemap.xml",
    status: hasSitemapXml || hasSitemapTs ? "ok" : "warn",
    detail: hasSitemapXml
      ? "sitemap.xml found in /public."
      : hasSitemapTs
        ? "Dynamic sitemap route found (src/app/sitemap.ts) — will be generated at /sitemap.xml."
        : "No sitemap found. Add src/app/sitemap.ts or public/sitemap.xml.",
  });

  // metadataBase
  const layoutPath = join(process.cwd(), "src/app/layout.tsx");
  const hasMetadataBase = existsSync(layoutPath) && readFileSync(layoutPath, "utf-8").includes("metadataBase");
  checks.push({
    label:  "metadataBase",
    status: hasMetadataBase ? "ok" : "error",
    detail: hasMetadataBase
      ? "metadataBase is set in root layout — Open Graph URLs will be absolute."
      : "metadataBase missing from root layout — OG images will use relative paths, which won't work.",
  });

  // OG image
  const hasOgImage = existsSync(join(publicDir, "opengraph-image.png"))
    || existsSync(join(process.cwd(), "src/app/opengraph-image.png"))
    || existsSync(join(process.cwd(), "src/app/opengraph-image.tsx"));
  checks.push({
    label:  "Open Graph image",
    status: hasOgImage ? "ok" : "warn",
    detail: hasOgImage
      ? "OG image found — social media previews will work."
      : "No OG image found at /public/opengraph-image.png or src/app/opengraph-image.tsx.",
  });

  // favicon
  const hasFavicon = existsSync(join(publicDir, "favicon.ico"))
    || existsSync(join(process.cwd(), "src/app/favicon.ico"));
  checks.push({
    label:  "favicon.ico",
    status: hasFavicon ? "ok" : "warn",
    detail: hasFavicon ? "Favicon found." : "No favicon.ico found.",
  });

  const passCount = checks.filter(c => c.status === "ok").length;
  const warnCount = checks.filter(c => c.status === "warn").length;
  const failCount = checks.filter(c => c.status === "error").length;

  // Static route inventory
  const KNOWN_ROUTES = [
    { path: "/",                            type: "SSG", priority: 1.0,  desc: "Home page" },
    { path: "/pricing",                     type: "SSG", priority: 0.9,  desc: "Pricing page" },
    { path: "/login",                       type: "SSG", priority: 0.7,  desc: "Login" },
    { path: "/quiz/california-permit",      type: "SSR", priority: 0.8,  desc: "CA Permit quiz" },
    { path: "/quiz/california-motorcycle",  type: "SSR", priority: 0.7,  desc: "CA Motorcycle quiz" },
    { path: "/mock-exam",                   type: "SSR", priority: 0.7,  desc: "Mock exam" },
    { path: "/dashboard",                   type: "SSR", priority: 0.3,  desc: "User dashboard (auth)" },
    { path: "/account",                     type: "SSR", priority: 0.2,  desc: "Account page (auth)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">SEO Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Technical SEO checks and configuration status</p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Checks Passed</p>
          <p className="text-3xl font-bold text-green-600">{passCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Warnings</p>
          <p className="text-3xl font-bold text-amber-500">{warnCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Failures</p>
          <p className="text-3xl font-bold text-red-500">{failCount}</p>
        </div>
      </div>

      {/* Technical checks */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Search size={16} className="text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900">Technical SEO Checks</h2>
        </div>
        <div className="space-y-3">
          {checks.map((c) => (
            <div key={c.label} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
              <StatusIcon status={c.status} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{c.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 font-mono leading-relaxed whitespace-pre-wrap break-all">{c.detail}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase ${
                c.status === "ok"    ? "bg-green-50 text-green-700" :
                c.status === "warn"  ? "bg-amber-50 text-amber-700" :
                                       "bg-red-50 text-red-600"
              }`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Route inventory */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900">Route Inventory</h2>
          <span className="text-xs text-gray-400 ml-auto">{KNOWN_ROUTES.length} known routes</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#f8fafc" }}>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left px-3 py-2.5 font-semibold">Path</th>
                <th className="text-left px-3 py-2.5 font-semibold">Description</th>
                <th className="text-left px-3 py-2.5 font-semibold">Render</th>
                <th className="text-left px-3 py-2.5 font-semibold">Priority</th>
                <th className="text-left px-3 py-2.5 font-semibold">Indexed</th>
              </tr>
            </thead>
            <tbody>
              {KNOWN_ROUTES.map((r) => (
                <tr key={r.path} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-2.5">
                    <a href={r.path} target="_blank" className="font-mono text-xs text-blue-600 hover:underline flex items-center gap-1">
                      {r.path} <ExternalLink size={10} />
                    </a>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{r.desc}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      r.type === "SSG" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                    }`}>{r.type}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{r.priority}</td>
                  <td className="px-3 py-2.5">
                    {r.priority >= 0.5 ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <span className="text-xs text-gray-400">Auth only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO checklist */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900">SEO Implementation Checklist</h2>
        </div>
        <div className="space-y-2">
          {[
            { label: "Server-side rendering for all public pages",   done: true  },
            { label: "Unique <title> and meta description per page", done: true  },
            { label: "Open Graph tags (og:title, og:image, etc.)",   done: true  },
            { label: "Twitter card meta tags",                       done: true  },
            { label: "Canonical URL set per page",                   done: false },
            { label: "Structured data (schema.org) on key pages",    done: false },
            { label: "Image alt text on all images",                 done: false },
            { label: "Semantic heading hierarchy (h1→h2→h3)",        done: true  },
            { label: "Internal linking between pages",               done: false },
            { label: "Page load < 2s on mobile (Core Web Vitals)",   done: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-1.5">
              {item.done
                ? <CheckCircle size={14} className="text-green-500 shrink-0" />
                : <AlertCircle size={14} className="text-amber-400 shrink-0" />
              }
              <span className={`text-sm ${item.done ? "text-gray-700" : "text-gray-500"}`}>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 rounded-lg text-xs" style={{ backgroundColor: "#f8fafc", color: "#475569" }}>
          <strong>Note:</strong> Connect Google Search Console to get real indexed page counts, search queries, click-through rates, and Core Web Vitals scores.
          Visit <span className="font-mono">search.google.com/search-console</span> and add the property for caredmvprep.com.
        </div>
      </div>
    </div>
  );
}
