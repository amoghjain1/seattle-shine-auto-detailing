import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-surface/40 py-12">
      <Container className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-md space-y-3">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="text-sm text-muted">{site.serviceArea}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-accent"
          >
            Instagram @{site.instagramHandle}
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="text-muted transition hover:text-accent"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-muted transition hover:text-accent"
          >
            {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <Link href="/services" className="text-muted hover:text-accent">
            Services &amp; pricing
          </Link>
          <Link href="/contact" className="text-muted hover:text-accent">
            Contact &amp; booking
          </Link>
          <p className="text-muted">
            © {site.copyrightYear} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
