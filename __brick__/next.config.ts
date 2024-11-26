import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

import { env } from "@dotenv-run/core";
import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";

const { raw } = env({
  root: "../..",
  verbose: true,
  prefix: "(^FRONTEND_|^NEXT_PUBLIC_FRONTEND_)",
  nodeEnv: false,
});

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  env: raw,
  distDir: isProd ? "dist" : ".next",
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  org: process.env.FRONTEND_SENTRY_ORG,
  project: process.env.FRONTEND_SENTRY_PROJECT,
  authToken: process.env.FRONTEND_SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  sentryWebpackPluginOptions,
);
