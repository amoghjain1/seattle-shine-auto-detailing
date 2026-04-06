import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SERVICE_AREAS } from "@/lib/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service areas",
  description: `${site.shortName} service areas across Everett, Seattle, Renton, Bothell, and nearby cities.`,
};

export default function AreasPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Areas we serve
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Premium detailing coverage from Everett to Renton
        </h1>
        <p className="mt-4 text-muted">
          Choose your city to see local detailing coverage details and request a
          free quote.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {SERVICE_AREAS.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="block rounded-2xl border border-border/80 bg-surface/25 p-4 transition hover:border-accent/50 hover:bg-surface"
              >
                <p className="font-display text-xl font-semibold text-foreground">
                  {area.city}
                </p>
                <p className="mt-1 text-sm text-muted">{area.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
