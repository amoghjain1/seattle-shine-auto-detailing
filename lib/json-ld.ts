/**
 * Safe JSON-LD for inline script tags: breaks out of </script> if strings ever
 * contain "<" (e.g. future CMS content).
 */
export function jsonLdStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
