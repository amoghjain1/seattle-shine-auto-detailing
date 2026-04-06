"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
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

function DragHandle() {
  return (
    <div className="flex h-12 w-8 flex-col items-center justify-center gap-[3px] rounded-full bg-white shadow-[0_0_16px_rgba(212,160,87,0.5)]">
      <span className="block h-3.5 w-[2px] rounded-full bg-neutral-400" />
      <span className="block h-3.5 w-[2px] rounded-full bg-neutral-400" />
    </div>
  );
}

function ComparisonSlider({
  pair,
  autoReveal,
}: {
  pair: Pair;
  autoReveal: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState(autoReveal ? 92 : 55);
  const isDragging = useRef(false);
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (!autoReveal || hasRevealed.current) return;
    hasRevealed.current = true;
    const timeout = setTimeout(() => {
      let start: number | null = null;
      const from = 92;
      const to = 55;
      const duration = 900;

      const animate = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setSlider(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 400);
    return () => clearTimeout(timeout);
  }, [autoReveal]);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(95, Math.max(5, (x / rect.width) * 100));
    setSlider(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-col-resize select-none overflow-hidden rounded-2xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="slider"
      aria-label="Before after comparison"
      aria-valuemin={5}
      aria-valuemax={95}
      aria-valuenow={Math.round(slider)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSlider((s) => Math.max(5, s - 2));
        if (e.key === "ArrowRight") setSlider((s) => Math.min(95, s + 2));
      }}
    >
      {/* Before image (background) */}
      <Image
        src={pair.beforeSrc}
        alt={pair.beforeAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover"
      />

      {/* After image (overlay clipped) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${slider}%` }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src={pair.afterSrc}
            alt={pair.afterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Glowing divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-[2px]"
        style={{
          left: `${slider}%`,
          background: "var(--accent)",
          boxShadow: "0 0 14px 2px color-mix(in srgb, var(--accent) 50%, transparent)",
        }}
        aria-hidden
      />

      {/* Draggable handle */}
      <div
        className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${slider}%` }}
        aria-hidden
      >
        <DragHandle />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
        Before
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
        After
      </div>
    </div>
  );
}

export function HomeBeforeAfter() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(pairs[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="border-t border-border/60 bg-background py-20">
      <Container>
        <div
          ref={sectionRef}
          className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Before / after
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Drag to reveal the difference
            </h2>
            <p className="mt-4 text-muted">
              Proof from real Seattle Shine jobs. Drag the handle to compare
              what the car looked like before service versus the final result.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {pairs.map((pair) => {
                const isActive = pair.id === active.id;
                return (
                  <li key={pair.id}>
                    <button
                      type="button"
                      onClick={() => setActive(pair)}
                      className="relative rounded-full px-4 py-2 text-sm font-semibold transition"
                      style={
                        isActive
                          ? undefined
                          : { border: "1px solid color-mix(in srgb, var(--border) 80%, transparent)" }
                      }
                    >
                      {isActive && (
                        <motion.span
                          layoutId="ba-tab"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${isActive ? "text-accent-foreground" : "text-foreground"}`}
                      >
                        {pair.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card-accent rounded-3xl p-4 shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ComparisonSlider
                  pair={active}
                  autoReveal={isInView && !reduce}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
