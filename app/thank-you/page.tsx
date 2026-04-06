import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your quote request was sent. Seattle Shine will respond shortly.",
};

export default function ThankYouPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-border/80 bg-surface/25 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Request received
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Thank you - we will reach out shortly.
          </h1>
          <p className="mt-4 text-muted">
            We got your quote request. Seattle Shine will follow up with
            availability and recommendations based on your vehicle details.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
            >
              Call {site.phoneDisplay}
            </a>
            <Link
              href="/gallery"
              className="inline-flex rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              View recent results
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
