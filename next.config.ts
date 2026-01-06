import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
};

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

export default withNextIntl(nextConfig);
