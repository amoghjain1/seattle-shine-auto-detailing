import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PackageId } from "@/lib/packages";

export function PricingCard({
  name,
  subtitle,
  blurb,
  features,
  packageId,
  featured,
  featuredBadge = "Best value",
}: {
  name: string;
  subtitle: string;
  blurb: string;
  features: string[];
  packageId: PackageId;
  featured?: boolean;
  featuredBadge?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border bg-background p-6 shadow-sm transition hover:shadow-md",
        featured
          ? "border-accent/60 bg-accent/[0.04] shadow-glow ring-1 ring-accent/25 md:-translate-y-1"
          : "border-border/80",
      )}
    >
      {featured ? (
        <p className="mb-3 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {featuredBadge}
        </p>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {subtitle}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
        {name}
      </h2>
      <p className="mt-2 text-sm text-muted">{blurb}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-accent" aria-hidden>
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/contact?package=${packageId}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-foreground transition hover:brightness-110"
        >
          Quick quote
        </Link>
        <Link
          href="/contact"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-border py-3 text-center text-sm font-semibold text-foreground transition hover:bg-surface"
        >
          Book now
        </Link>
      </div>
    </article>
  );
}
