import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Capture 10% of sessions for performance tracing in production;
  // 100% in development (if key is set).
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  // Capture replays only when an error occurs
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText:   true,
      blockAllMedia: true,
    }),
  ],
  // Don't capture events in development unless DSN is explicitly set
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  beforeSend(event) {
    // Strip Stripe card numbers / auth tokens from request bodies
    if (event.request?.data) {
      delete event.request.data;
    }
    return event;
  },
});
