"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { HeroVideoBackdrop } from "@/components/hero-video-backdrop";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroVideoBackdrop />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--hero-scrim)" }}
      />
      <Container className="relative z-[2] flex min-h-[85vh] flex-col justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Based in Bothell · Greater Seattle
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#faf6ef] sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#e8e0d4] sm:text-xl">
            {site.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-center text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
            >
              Book your detail
            </Link>
            <Link
              href="/contact?package=limited-protection"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Get a free quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-center text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
            >
              View services
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
