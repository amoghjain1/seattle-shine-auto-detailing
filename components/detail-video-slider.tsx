"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  sources: readonly string[];
  /** When true, omits the “Gallery” cross-link (use on /gallery). */
  embeddedInGallery?: boolean;
};

const easeSmooth = [0.22, 1, 0.36, 1] as const;
const SWIPE_MIN_PX = 45;
const SWIPE_RATIO = 1.12;
const SWIPE_DEBOUNCE_MS = 420;

export function DetailVideoSlider({
  sources,
  embeddedInGallery = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const n = sources.length;
  const src = sources[index] ?? "";
  const slideLabel = (i: number) => `Video ${i + 1} of ${n}`;

  const go = useCallback(
    (next: number) => {
      const i = ((next % n) + n) % n;
      setIndex(i);
    },
    [n],
  );

  const carouselRef = useRef<HTMLDivElement>(null);
  const swipeLockRef = useRef(0);

  /** Native capture listeners: `<video>` often swallows bubbled React touch events (esp. iOS). */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || n === 0) return;

    let start: { x: number; y: number } | null = null;

    const trySwipe = (dx: number, dy: number) => {
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
      const now = Date.now();
      if (now - swipeLockRef.current < SWIPE_DEBOUNCE_MS) return;
      swipeLockRef.current = now;
      setIndex((i) => {
        const next = dx > 0 ? i - 1 : i + 1;
        return ((next % n) + n) % n;
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        start = null;
        return;
      }
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!start || e.changedTouches.length !== 1) {
        start = null;
        return;
      }
      const t = e.changedTouches[0];
      trySwipe(t.clientX - start.x, t.clientY - start.y);
      start = null;
    };

    const onTouchCancel = () => {
      start = null;
    };

    /** Pointer fallback: trackpads / some Android / mouse drag on desktop. */
    let pStart: { x: number; y: number } | null = null;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as HTMLElement)?.closest?.("button")) return;
      pStart = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!pStart) return;
      if (e.pointerType === "touch") {
        pStart = null;
        return;
      }
      trySwipe(e.clientX - pStart.x, e.clientY - pStart.y);
      pStart = null;
    };
    const onPointerCancel = () => {
      pStart = null;
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    el.addEventListener("touchstart", onTouchStart, opts);
    el.addEventListener("touchend", onTouchEnd, opts);
    el.addEventListener("touchcancel", onTouchCancel, opts);
    el.addEventListener("pointerdown", onPointerDown, { capture: true });
    el.addEventListener("pointerup", onPointerUp, { capture: true });
    el.addEventListener("pointercancel", onPointerCancel, { capture: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart, opts);
      el.removeEventListener("touchend", onTouchEnd, opts);
      el.removeEventListener("touchcancel", onTouchCancel, opts);
      el.removeEventListener("pointerdown", onPointerDown, { capture: true });
      el.removeEventListener("pointerup", onPointerUp, { capture: true });
      el.removeEventListener("pointercancel", onPointerCancel, { capture: true });
    };
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  if (n === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface/30 px-6 py-12 text-center text-sm text-muted">
        Add video paths to <code className="text-xs">DETAIL_VIDEO_SOURCES</code>{" "}
        in <code className="text-xs">lib/hero-media.ts</code>.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="sr-only" aria-live="polite">
        {slideLabel(index)}
      </p>

      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Detailing video edits"
      >
        <div
          ref={carouselRef}
          className="relative touch-pan-y overflow-hidden rounded-3xl border border-border/60 bg-black/90 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/5 dark:ring-white/10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/40 to-transparent" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="relative aspect-video w-full bg-black select-none"
            >
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
                aria-label={slideLabel(index)}
              >
                Your browser does not support embedded video.
              </video>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex w-14 items-center bg-gradient-to-r from-black/35 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex w-14 items-center justify-end bg-gradient-to-l from-black/35 to-transparent sm:w-20" />

          <button
            type="button"
            onClick={() => go(index - 1)}
            className="pointer-events-auto absolute left-2 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/75 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-background/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-4 sm:size-12"
            aria-label="Previous video"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="pointer-events-auto absolute right-2 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/75 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-background/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-4 sm:size-12"
            aria-label="Next video"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs font-medium tabular-nums text-muted backdrop-blur-sm">
            {index + 1} — {n}
          </span>
        </div>

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Select edit"
        >
          {sources.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Video ${i + 1} of ${n}`}
              onClick={() => go(i)}
              className={cn(
                "min-h-9 min-w-9 rounded-full transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                i === index
                  ? "h-2 w-10 bg-accent shadow-glow sm:w-12"
                  : "h-2 w-2 bg-border/90 hover:w-3 hover:bg-muted",
              )}
            />
          ))}
        </div>

        {!embeddedInGallery && (
          <p className="mt-8 text-center text-sm text-muted">
            More on the{" "}
            <Link href="/gallery" className="font-medium text-accent underline-offset-4 hover:underline">
              gallery
            </Link>{" "}
            and{" "}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              @{site.instagramHandle}
            </a>
            .
          </p>
        )}

        {embeddedInGallery && (
          <p className="mt-6 text-center text-xs text-muted">
            Swipe sideways on the video or use ← → keys to change clips. Audio is
            in the player controls.
          </p>
        )}
      </div>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
