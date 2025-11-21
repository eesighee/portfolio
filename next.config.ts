import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable browser source maps in production to make debugging harder
  productionBrowserSourceMaps: false,
  // Disable the Next.js dev indicator. Type is platform-specific; coerce to any to avoid TS typing errors.
  // Note: setting `devIndicators: false` will remove the 'N' badge in the dev UI.
  devIndicators: (false as unknown) as any,
  // Next.js uses SWC minification by default in modern versions; no explicit option required here.
};

export default nextConfig;
