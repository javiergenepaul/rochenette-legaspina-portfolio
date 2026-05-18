"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PHOTOS: { src: string; alt: string }[] = [
  { src: "/gallery/explore-1.jpeg",  alt: "Explorer 1" },
  { src: "/gallery/explore-2.jpeg",  alt: "Explorer 2" },
  { src: "/gallery/explore-3.jpeg",  alt: "Explorer 3" },
  { src: "/gallery/explore-4.jpeg",  alt: "Explorer 4" },
  { src: "/gallery/explore-5.jpeg",  alt: "Explorer 5" },
  { src: "/gallery/explore-6.jpeg",  alt: "Explorer 6" },
  { src: "/gallery/explore-7.jpeg",  alt: "Explorer 7" },
  { src: "/gallery/explore-8.jpeg",  alt: "Explorer 8" },
  { src: "/gallery/explore-9.jpeg",  alt: "Explorer 9" },
  { src: "/gallery/explore-10.jpeg", alt: "Explorer 10" },
  { src: "/gallery/explore-11.jpeg", alt: "Explorer 11" },
  { src: "/gallery/explore-12.jpeg", alt: "Explorer 12" },
];

const GRADIENTS = [
  "from-orange-900 to-amber-700",
  "from-teal-900 to-cyan-700",
  "from-violet-900 to-purple-700",
  "from-rose-900 to-pink-700",
  "from-emerald-900 to-green-700",
  "from-blue-900 to-indigo-700",
  "from-yellow-900 to-orange-700",
  "from-red-900 to-rose-700",
  "from-cyan-900 to-teal-700",
  "from-purple-900 to-violet-700",
];

function PhotoCard({ photo, index }: { photo: { src: string; alt: string }; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative shrink-0 w-52 h-80 rounded-2xl overflow-hidden group transition-transform duration-400 ease-out hover:scale-110 hover:z-10 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
      <div className={cn("absolute inset-0 bg-linear-to-br opacity-40", GRADIENTS[index % GRADIENTS.length])} />

      {!imgError && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="208px"
          onError={() => setImgError(true)}
          className="object-cover transition-transform duration-400 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}

function MarqueeRow({
  photos,
  direction,
  duration = 30,
}: {
  photos: { src: string; alt: string }[];
  direction: "left" | "right";
  duration?: number;
}) {
  // Triple the array so the loop is seamless even with few photos
  const looped = [...photos, ...photos, ...photos];
  const from = direction === "left" ? "0%" : `-${100 / 3}%`;
  const to   = direction === "left" ? `-${100 / 3}%` : "0%";

  return (
    <div className="py-6">
      <motion.div
        className="flex gap-4"
        animate={{ x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {looped.map((photo, i) => (
          <PhotoCard key={`${photo.src}-${i}`} photo={photo} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

export default function GallerySection() {
  const rowOne = PHOTOS;
  const rowTwo = [...PHOTOS].reverse();

  return (
    <section id="gallery" className="py-24 bg-woodsmoke-100 dark:bg-woodsmoke-900 overflow-x-hidden">
      <div className="px-[7%]">
        <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
          <Compass size={13} strokeWidth={1.75} />
          Life Beyond the Screen
        </div>
        <h2
          className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-3"
          style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
        >
          The <span className="text-amethyst-500">Explorer</span> in Me
        </h2>
        <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.92rem] leading-[1.75] max-w-120 mb-12">
          Outside of work, I embark on adventures that push me further — because the best experiences are usually the ones you almost didn&apos;t do.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow photos={rowOne} direction="left"  duration={28} />
        <MarqueeRow photos={rowTwo} direction="right" duration={32} />
      </div>
    </section>
  );
}
