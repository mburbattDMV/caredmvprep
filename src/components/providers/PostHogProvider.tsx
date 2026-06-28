"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";

function PostHogInit() {
  useEffect(() => {
    const key  = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    if (!key) return;
    posthog.init(key, {
      api_host:         host,
      capture_pageview: true,
      capture_pageleave: true,
      // Don't capture in development unless POSTHOG_KEY is explicitly set
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.opt_out_capturing();
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) ph.opt_in_capturing();
      },
    });
  }, []);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogInit />
      {children}
    </PHProvider>
  );
}

// Re-export hook for use in client components
export { usePostHog };
