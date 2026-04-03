import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { isValidAddOnId, type PackageId } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Contact & booking",
  description: `Book ${site.name}. Based in Bothell — mobile detailing or drop-off across the Seattle metro.`,
};

const validPackages: Record<string, PackageId> = {
  "limited-protection": "limited-protection",
  "ultimate-protection": "ultimate-protection",
  /** Legacy URL params */
  standard: "limited-protection",
  "light-protection": "limited-protection",
  "deep-clean": "limited-protection",
  protection: "ultimate-protection",
  "paint-correction": "ultimate-protection",
};

type Props = {
  searchParams: Promise<{ package?: string; addOn?: string | string[] }>;
};

function parseAddOnQuery(
  v: string | string[] | undefined,
): string[] {
  if (v === undefined) return [];
  const parts = Array.isArray(v) ? v : [v];
  const ids = parts
    .flatMap((s) => s.split(/[\s,]+/))
    .map((s) => s.trim().toLowerCase())
    .filter((id): id is string => id.length > 0);
  return [...new Set(ids)].filter((id) => isValidAddOnId(id));
}

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = sp.package ?? "";
  const key = raw.trim().toLowerCase().replace(/_/g, "-");
  const mapped = validPackages[key];
  const defaultPackage =
    mapped === "limited-protection" || mapped === "ultimate-protection"
      ? mapped
      : "";
  const defaultAddOnIds = parseAddOnQuery(sp.addOn);

  return (
    <>
      <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Contact
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Book your detail or request a quote
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Tell us about your vehicle and preferred package — we will confirm
            timing, location needs (water/power for mobile), or drop-off
            windows. Prefer the phone?{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <ContactForm
            defaultPackage={defaultPackage}
            defaultAddOnIds={defaultAddOnIds}
          />
        </Container>
      </section>
    </>
  );
}
