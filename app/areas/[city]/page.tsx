import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/site-url";
import { SERVICE_AREAS, areaBySlug } from "@/lib/areas";
import { jsonLdStringify } from "@/lib/json-ld";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = areaBySlug(city);
  if (!area) {
    return {};
  }

  const url = new URL(`/areas/${area.slug}`, resolveSiteUrl()).href;
  return {
    title: area.title,
    description: `${area.intro} Request a free quote from ${site.shortName}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${area.title} | ${site.shortName}`,
      description: area.intro,
      url,
      type: "website",
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { city } = await params;
  const area = areaBySlug(city);
  if (!area) {
    notFound();
  }

  const areaJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${site.name} - ${area.city}`,
    areaServed: area.city,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phoneTel,
      email: site.email,
    },
    description: area.intro,
  };

  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(areaJsonLd) }}
      />
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Service Area
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {area.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-muted">{area.intro}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {area.highlights.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border/80 bg-surface/30 p-4 text-sm text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-3xl border border-border/80 bg-background p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Need a quote in {area.city}?
          </h2>
          <p className="mt-3 text-muted">
            Send your vehicle photos and we will recommend the right package and
            next appointment options.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
            >
              Get a free quote
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
