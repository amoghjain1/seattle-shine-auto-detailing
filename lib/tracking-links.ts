type ContactHrefOptions = {
  source: string;
  content: string;
  packageId?: "limited-protection" | "ultimate-protection";
  addOnId?: string;
};

/**
 * Build consistent internal contact URLs with UTM attribution.
 * This keeps lead source data clean when analytics is connected.
 */
export function contactHref(options: ContactHrefOptions): string {
  const params = new URLSearchParams({
    utm_source: options.source,
    utm_medium: "website",
    utm_campaign: "quote_funnel",
    utm_content: options.content,
  });

  if (options.packageId) {
    params.set("package", options.packageId);
  }
  if (options.addOnId) {
    params.set("addOn", options.addOnId);
  }

  return `/contact?${params.toString()}`;
}
