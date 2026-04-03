import "server-only";

function normalizeSiteUrl(raw: string): string {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/$/, "");
}

/**
 * Canonical public site origin (no trailing slash). Used for metadata and JSON-LD.
 * On Vercel production, any `*.vercel.app` value in NEXT_PUBLIC_SITE_URL is replaced
 * with VERCEL_PROJECT_PRODUCTION_URL so deployment URLs are not baked into SEO tags.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const currentHost = process.env.VERCEL_URL;
  const isVercelProd = process.env.VERCEL_ENV === "production";

  if (isVercelProd && productionHost) {
    if (!explicit) {
      return normalizeSiteUrl(productionHost);
    }
    try {
      const host = new URL(normalizeSiteUrl(explicit)).hostname.toLowerCase();
      if (host.endsWith(".vercel.app")) {
        return normalizeSiteUrl(productionHost);
      }
    } catch {
      /* use explicit below */
    }
  }

  if (explicit) {
    return normalizeSiteUrl(explicit);
  }

  if (currentHost) {
    return normalizeSiteUrl(currentHost);
  }

  return "http://localhost:3000";
}
