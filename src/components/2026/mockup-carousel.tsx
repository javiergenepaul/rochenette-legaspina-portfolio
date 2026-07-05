"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { thumbBg } from "@/lib/project-utils";

export { thumbBg } from "@/lib/project-utils";

export default function MockupCarousel({
  mockups,
  gradient,
  label = "Mockups & Screenshots",
}: {
  mockups: { label: string; image?: string; note?: string }[];
  gradient: string;
  label?: string;
}) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = mockups.length;

  function go(next: number) {
    setDirection(next > slide ? 1 : -1);
    setSlide(next);
  }
  function prev() { go((slide - 1 + total) % total); }
  function next() { go((slide + 1) % total); }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const current = mockups[slide];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.68rem] text-amethyst-500 font-poppins font-bold uppercase tracking-wide">
        {label}
      </p>

      <div className="relative rounded-[14px] overflow-hidden bg-woodsmoke-950 aspect-video select-none">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={slide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {current.image ? (
              <Image src={current.image} alt={current.label} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col" style={{ background: thumbBg(gradient) }}>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="ml-2 flex-1 h-4 rounded bg-white/10 max-w-45" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3 opacity-60">
                  <div className="h-5 rounded bg-white/25 w-2/5" />
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <div className="rounded-lg bg-white/15 col-span-2" />
                    <div className="flex flex-col gap-2">
                      <div className="rounded-lg bg-white/15 flex-1" />
                      <div className="rounded-lg bg-white/10 flex-1" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 rounded bg-white/20 w-1/3" />
                    <div className="h-3 rounded bg-white/15 w-1/4" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Monitor size={10} className="text-white/70" />
                  <span className="text-white/80 font-poppins font-semibold text-[0.65rem]">
                    {current.label}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous mockup"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Next mockup"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {mockups.map((m, i) => (
            <button
              key={m.label}
              onClick={() => go(i)}
              aria-label={`Go to ${m.label}`}
              aria-current={i === slide}
              className={cn(
                "transition-all duration-200 rounded-full",
                i === slide
                  ? "w-5 h-1.5 bg-amethyst-500"
                  : "w-1.5 h-1.5 bg-woodsmoke-300 dark:bg-woodsmoke-600 hover:bg-amethyst-300",
              )}
            />
          ))}
        </div>
      )}

      {current.note && (
        <p className="text-[0.72rem] text-woodsmoke-400 dark:text-woodsmoke-500 leading-snug italic px-1">
          {current.note}
        </p>
      )}
    </div>
  );
}
