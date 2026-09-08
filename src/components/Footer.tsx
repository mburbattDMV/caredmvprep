import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

const driverLinks = [
  { label: "All 50 States", href: "/states" },
  { label: "California Permit Test", href: "/california-dmv-practice-test" },
  { label: "Texas Permit Test", href: "/texas-dmv-practice-test" },
  { label: "Florida Permit Test", href: "/florida-dmv-practice-test" },
  { label: "New York Permit Test", href: "/new-york-dmv-practice-test" },
  { label: "Illinois Permit Test", href: "/illinois-dmv-practice-test" },
  { label: "Pennsylvania Permit Test", href: "/pennsylvania-dmv-practice-test" },
  { label: "Ohio Permit Test", href: "/ohio-dmv-practice-test" },
  { label: "Georgia Permit Test", href: "/georgia-dmv-practice-test" },
  { label: "North Carolina Permit Test", href: "/north-carolina-dmv-practice-test" },
];

const allStates = [
  { label: "Alabama", href: "/alabama-dmv-practice-test" },
  { label: "Alaska", href: "/alaska-dmv-practice-test" },
  { label: "Arizona", href: "/arizona-dmv-practice-test" },
  { label: "Arkansas", href: "/arkansas-dmv-practice-test" },
  { label: "California", href: "/california-dmv-practice-test" },
  { label: "Colorado", href: "/colorado-dmv-practice-test" },
  { label: "Connecticut", href: "/connecticut-dmv-practice-test" },
  { label: "Delaware", href: "/delaware-dmv-practice-test" },
  { label: "Florida", href: "/florida-dmv-practice-test" },
  { label: "Georgia", href: "/georgia-dmv-practice-test" },
  { label: "Hawaii", href: "/hawaii-dmv-practice-test" },
  { label: "Idaho", href: "/idaho-dmv-practice-test" },
  { label: "Illinois", href: "/illinois-dmv-practice-test" },
  { label: "Indiana", href: "/indiana-dmv-practice-test" },
  { label: "Iowa", href: "/iowa-dmv-practice-test" },
  { label: "Kansas", href: "/kansas-dmv-practice-test" },
  { label: "Kentucky", href: "/kentucky-dmv-practice-test" },
  { label: "Louisiana", href: "/louisiana-dmv-practice-test" },
  { label: "Maine", href: "/maine-dmv-practice-test" },
  { label: "Maryland", href: "/maryland-dmv-practice-test" },
  { label: "Massachusetts", href: "/massachusetts-dmv-practice-test" },
  { label: "Michigan", href: "/michigan-dmv-practice-test" },
  { label: "Minnesota", href: "/minnesota-dmv-practice-test" },
  { label: "Mississippi", href: "/mississippi-dmv-practice-test" },
  { label: "Missouri", href: "/missouri-dmv-practice-test" },
  { label: "Montana", href: "/montana-dmv-practice-test" },
  { label: "Nebraska", href: "/nebraska-dmv-practice-test" },
  { label: "Nevada", href: "/nevada-dmv-practice-test" },
  { label: "New Hampshire", href: "/new-hampshire-dmv-practice-test" },
  { label: "New Jersey", href: "/new-jersey-dmv-practice-test" },
  { label: "New Mexico", href: "/new-mexico-dmv-practice-test" },
  { label: "New York", href: "/new-york-dmv-practice-test" },
  { label: "North Carolina", href: "/north-carolina-dmv-practice-test" },
  { label: "North Dakota", href: "/north-dakota-dmv-practice-test" },
  { label: "Ohio", href: "/ohio-dmv-practice-test" },
  { label: "Oklahoma", href: "/oklahoma-dmv-practice-test" },
  { label: "Oregon", href: "/oregon-dmv-practice-test" },
  { label: "Pennsylvania", href: "/pennsylvania-dmv-practice-test" },
  { label: "Rhode Island", href: "/rhode-island-dmv-practice-test" },
  { label: "South Carolina", href: "/south-carolina-dmv-practice-test" },
  { label: "South Dakota", href: "/south-dakota-dmv-practice-test" },
  { label: "Tennessee", href: "/tennessee-dmv-practice-test" },
  { label: "Texas", href: "/texas-dmv-practice-test" },
  { label: "Utah", href: "/utah-dmv-practice-test" },
  { label: "Vermont", href: "/vermont-dmv-practice-test" },
  { label: "Virginia", href: "/virginia-dmv-practice-test" },
  { label: "Washington", href: "/washington-dmv-practice-test" },
  { label: "West Virginia", href: "/west-virginia-dmv-practice-test" },
  { label: "Wisconsin", href: "/wisconsin-dmv-practice-test" },
  { label: "Wyoming", href: "/wyoming-dmv-practice-test" },
];

const motoAndCdlLinks = [
  { label: "Motorcycle Overview", href: "/motorcycle-practice-test" },
  { label: "Motorcycle Permit Test", href: "/motorcycle-permit-test" },
  { label: "Motorcycle Safety Tips", href: "/motorcycle-safety-tips" },
  { label: "CDL Overview", href: "/cdl-practice-test" },
  { label: "CDL General Knowledge", href: "/cdl-general-knowledge" },
  { label: "CDL Air Brakes", href: "/cdl-air-brakes" },
  { label: "CDL Hazmat", href: "/cdl-hazmat" },
  { label: "CDL Tanker", href: "/cdl-tanker" },
  { label: "CDL Doubles & Triples", href: "/cdl-doubles-triples" },
];

const resourceLinks = [
  { label: "All Resources", href: "/resources" },
  { label: "DMV Study Tips", href: "/dmv-study-tips" },
  { label: "Driver's License Guide", href: "/drivers-license-guide" },
  { label: "CDL Guide", href: "/cdl-guide" },
  { label: "Motorcycle Guide", href: "/motorcycle-guide" },
  { label: "FAQs", href: "/faqs" },
];

const companyLinks = [
  { label: "Why CARE", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d2240' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <BrandLogo height={40} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The trusted DMV test prep platform in the United States.
            </p>
            <div className="flex gap-3">
              {["facebook", "instagram", "youtube", "tiktok"].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition text-xs text-gray-400 uppercase font-bold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Driver's License Tests */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Driver&apos;s License Tests</h3>
            <ul className="space-y-2">
              {driverLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Motorcycle & CDL Tests */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Motorcycle & CDL Tests</h3>
            <ul className="space-y-2">
              {motoAndCdlLinks.map((l) => (
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

        {/* All 50 States grid */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">DMV Practice Tests — All 50 States</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-x-3 gap-y-1.5">
            {allStates.map((s) => (
              <Link key={s.href} href={s.href} className="text-xs text-gray-500 hover:text-gray-300 transition truncate">
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CAREDMVPrep. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            CAREDMVPrep.com is not affiliated with any government agency. Practice materials are for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
