import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "CAREDMVPrep – Free DMV Practice Tests for All 50 States",
    template: "%s | CAREDMVPrep",
  },
  description:
    "Prepare for your DMV written knowledge test with free practice tests modeled on official state driver manuals. Covers car, CDL, and motorcycle tests for all 50 states.",
  metadataBase: new URL("https://caredmvprep.com"),
  openGraph: {
    type: "website",
    siteName: "CAREDMVPrep",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@caredmvprep",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
