"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import { contactHref } from "@/lib/tracking-links";

export function HomeCtaStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-border/60 bg-surface/25 py-16 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        animate={
          reduce
            ? undefined
            : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 0%, color-mix(in srgb, var(--accent) 18%, transparent) 45%, transparent 90%)",
          backgroundSize: "200% 100%",
        }}
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl text-sm text-muted"
        >
          {site.serviceArea}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
            <Link
              href={contactHref({
                source: "homepage",
                content: "bottom_cta_strip_primary",
              })}
              className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
            >
              Get a free quote
            </Link>
          </motion.div>
          <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              Follow on Instagram
            </a>
          </motion.div>
          <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
            <Link
              href="/areas"
              className="inline-flex rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
            >
              Areas we serve
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
