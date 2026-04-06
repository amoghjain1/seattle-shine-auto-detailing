"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";

type Pair = {
  id: string;
  label: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

const pairs: Pair[] = [
  {
    id: "mercedes-interior",
    label: "Mercedes GLC interior",
    beforeSrc: "/gallery/mercedes-glc-interior-before.png",
    afterSrc: "/gallery/mercedes-glc-interior-after.png",
    beforeAlt: "Mercedes GLC interior before detail",
    afterAlt: "Mercedes GLC interior after detail",
  },
  {
    id: "tesla-wheel",
    label: "Tesla wheel",
    beforeSrc: "/gallery/tesla-wheel-before.png",
    afterSrc: "/gallery/tesla-wheel-after.png",
    beforeAlt: "Tesla wheel before treatment",
    afterAlt: "Tesla wheel after treatment",
  },
  {
    id: "tesla-rear-row",
    label: "Tesla rear row",
    beforeSrc: "/gallery/tesla-rear-row-before.png",
    afterSrc: "/gallery/tesla-rear-row-after.png",
    beforeAlt: "Tesla rear row before interior detail",
    afterAlt: "Tesla rear row after interior detail",
  },
  {
    id: "tesla-front-row",
    label: "Tesla front row",
    beforeSrc: "/gallery/tesla-front-row-before.png",
    afterSrc: "/gallery/tesla-front-row-after.png",
    beforeAlt: "Tesla front row before interior detail",
    afterAlt: "Tesla front row after interior detail",
  },
  {
    id: "honda-rear-row",
    label: "Honda rear row",
    beforeSrc: "/gallery/honda-rear-row-before.png",
    afterSrc: "/gallery/honda-rear-row-after.png",
    beforeAlt: "Honda rear row before interior detail",
    afterAlt: "Honda rear row after interior detail",
  },
  {
    id: "mercedes-wheel",
    label: "Mercedes wheel",
    beforeSrc: "/gallery/mercedes-wheel-before.png",
    afterSrc: "/gallery/mercedes-wheel-after.png",
    beforeAlt: "Mercedes wheel before treatment",
    afterAlt: "Mercedes wheel after treatment",
  },
];

export function HomeBeforeAfter() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(pairs[0]);
  const [slider, setSlider] = useState(55);

  return (
    <section className="border-t border-border/60 bg-background py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Before / after
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Drag to reveal the difference
            </h2>
            <p className="mt-4 text-muted">
              Proof from real Seattle Shine jobs. Use the slider to compare
              what the car looked like before service versus the final result.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {pairs.map((pair) => {
                const isActive = pair.id === active.id;
                return (
                  <li key={pair.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(pair);
                        setSlider(55);
                      }}
                      className={
                        isActive
                          ? "rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                          : "rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface"
                      }
                    >
                      {pair.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-border/70 bg-surface/30 p-4 shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70">
              <Image
                src={active.beforeSrc}
                alt={active.beforeAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${slider}%` }}
                aria-hidden
              >
                <div className="relative h-full w-full">
                  <Image
                    src={active.afterSrc}
                    alt={active.afterAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/85"
                style={{ left: `${slider}%` }}
                aria-hidden
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Before
              </div>
              <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                After
              </div>
            </div>
            <label className="mt-4 block">
              <span className="sr-only">Before after slider</span>
              <input
                type="range"
                min={5}
                max={95}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </label>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
