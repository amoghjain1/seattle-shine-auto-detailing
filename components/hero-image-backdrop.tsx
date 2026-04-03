"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, startTransition } from "react";

const ROTATE_MS = 6500;
const FADE_S = 0.75;

type Props = {
  sources: readonly string[];
  fallbackSrc: string;
  fallbackAlt: string;
};

export function HeroImageBackdrop({
  sources,
  fallbackSrc,
  fallbackAlt,
}: Props) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const list = sources.length > 0 ? sources : [fallbackSrc];
  const shouldRotate =
    mounted && list.length > 1 && !reduceMotion && sources.length > 0;

  useEffect(() => {
    if (!shouldRotate) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, [shouldRotate, list.length]);

  const showIndex = reduceMotion || sources.length === 0 ? 0 : index;

  return (
    <div className="absolute inset-0 z-0">
      {list.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          aria-hidden={i !== showIndex}
          animate={{
            opacity: i === showIndex ? 1 : 0,
            zIndex: i === showIndex ? 1 : 0,
          }}
          transition={{ duration: FADE_S, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={
              list.length === 1
                ? fallbackAlt
                : `${fallbackAlt} — slide ${i + 1} of ${list.length}`
            }
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      ))}
    </div>
  );
}
