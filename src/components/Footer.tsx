import Link from "next/link";

const dmvLinks = [
  { label: "All States", href: "/" },
  { label: "California", href: "/california-dmv-practice-test" },
  { label: "Texas", href: "/texas-dmv-practice-test" },
  { label: "Florida", href: "/florida-dmv-practice-test" },
  { label: "New York", href: "/new-york-dmv-practice-test" },
];

const cdlLinks = [
  { label: "CDL General Knowledge", href: "/cdl-practice-test" },
  { label: "CDL Air Brakes", href: "/cdl-practice-test#air-brakes" },
  { label: "CDL Hazmat", href: "/cdl-practice-test#hazmat" },
  { label: "CDL Passenger", href: "/cdl-practice-test#passenger" },
  { label: "CDL School Bus", href: "/cdl-practice-test#school-bus" },
  { label: "View All CDL Tests", href: "/cdl-practice-test" },
];

const resourceLinks = [
  { label: "DMV Study Tips", href: "/about" },
  { label: "Driver's License Guide", href: "/about" },
  { label: "CDL Guide", href: "/cdl-practice-test" },
  { label: "FAQs", href: "/about" },
  { label: "Blog", href: "/about" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms of Use", href: "/about" },
  { label: "Privacy Policy", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2240] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1a7f3c] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-sm">
                <span className="text-white">CARE</span>
                <span className="text-[#22a050]">DMV</span>
                <span className="text-white">Prep</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The trusted DMV test prep platform in the United States.
            </p>
            <div className="flex gap-3">
              {["facebook", "instagram", "youtube", "tiktok"].map((s) => (
                <span key={s} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition text-xs text-gray-400 uppercase font-bold">
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* DMV Practice Tests */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">DMV Practice Tests</h3>
            <ul className="space-y-2">
              {dmvLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CDL Tests */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">CDL Tests</h3>
            <ul className="space-y-2">
              {cdlLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CAREDMVPrep. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Not affiliated with any government agency. Practice materials for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
