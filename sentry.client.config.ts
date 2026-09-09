import * as Sentry from "@sentry/nextjs";
const SENTRY_ENVIRONMENT = process.env.NODE_ENV || "development";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: SENTRY_ENVIRONMENT === "development" ? 1.0 : 0.2,
});
