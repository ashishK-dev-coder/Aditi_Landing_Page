import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app reads `visual-data/content.json` using `fs` at runtime (SSR + API routes).
  // Vercel/Next's file tracing can sometimes omit non-imported runtime files, so we
  // explicitly include it to keep deployments "just working".
  outputFileTracingIncludes: {
    "/": ["visual-data/content.json"],
    "/api/admin/**": ["visual-data/content.json"],
  },
  /* config options here */
};

export default nextConfig;
