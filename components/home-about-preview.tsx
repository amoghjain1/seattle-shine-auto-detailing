"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { contactHref } from "@/lib/tracking-links";

export function HomeAboutPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-background py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border/80 bg-surface/40"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/about/amogh-jain.png"
                alt="Amogh Jain, founder of Seattle Shine Auto Detailing"
                fill
                sizes="(max-width: 1024px) 80vw, 320px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Who is behind Seattle Shine
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Built by a local high schooler obsessed with the details
            </h2>
            <p className="mt-4 text-muted">
              I am Amogh. Seattle Shine is now in its 3rd year, with 30+ vehicles
              detailed and repeat clients from Everett to Renton. I started this
              to prove that premium care and honest service can still feel
              personal, responsive, and reliable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
              >
                Read our story
              </Link>
              <Link
                href={contactHref({
                  source: "homepage",
                  content: "about_preview_secondary",
                })}
                className="inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
              >
                Book now
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
