"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  HERO_BACKGROUND_SOURCES,
  HERO_FALLBACK_IMAGE,
  HERO_FALLBACK_IMAGE_ALT,
} from "@/lib/hero-media";

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || useImageFallback) return;
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [reduceMotion, useImageFallback]);

  if (reduceMotion || useImageFallback) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_FALLBACK_IMAGE}
          alt={HERO_FALLBACK_IMAGE_ALT}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full origin-center object-cover object-center animate-[kenburns_20s_ease-in-out_infinite_alternate]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onError={() => setUseImageFallback(true)}
      >
        {HERO_BACKGROUND_SOURCES.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
      </video>
    </div>
  );
}
