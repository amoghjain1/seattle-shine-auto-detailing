"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/container";
import { contactHref } from "@/lib/tracking-links";

export function HomeAboutPreview() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, reduce ? 0 : -20]);

  return (
    <section ref={sectionRef} className="border-t border-border/60 bg-background py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5]"
            >
              <Image
                src="/about/amogh-jain.png"
                alt="Amogh Jain, founder of Seattle Shine Auto Detailing"
                fill
                sizes="(max-width: 1024px) 80vw, 340px"
                className="object-cover"
              />
            </motion.div>
            {/* Frosted name overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-black/40 px-5 py-4 backdrop-blur-md">
              <p className="text-sm font-semibold text-white">Amogh Jain</p>
              <p className="text-xs text-white/70">Founder, Seattle Shine</p>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
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
