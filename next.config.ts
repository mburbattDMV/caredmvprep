import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent the site from being framed (clickjacking protection)
          { key: "X-Frame-Options",        value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send full origin only to same-origin; send only origin to cross-origin HTTPS
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          // Disable browser features we don't use
          { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              // Default: only same-origin
              "default-src 'self'",
              // Next.js requires unsafe-eval for its runtime in development;
              // unsafe-inline is required for inline styles and script tags.
              // Tighten with nonces in a future pass.
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              // Allow images from same origin, data URIs, and any HTTPS host
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              // Allow connections to Supabase (REST + Realtime WebSocket)
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              // No frames allowed
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/texas-dmv-practice-tests",
        destination: "/texas-dmv-practice-test",
        permanent: true,
      },
      {
        source: "/florida-dmv-practice-tests",
        destination: "/florida-dmv-practice-test",
        permanent: true,
      },
      {
        source: "/new-york-dmv-practice-tests",
        destination: "/new-york-dmv-practice-test",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
