import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  enabled: !!(process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN),
  beforeSend(event) {
    // Strip Supabase service role key and Stripe secret from captured data
    if (event.request?.headers) {
      delete event.request.headers["authorization"];
      delete event.request.headers["stripe-signature"];
    }
    return event;
  },
});
