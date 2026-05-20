"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib";
import { twJoin, twMerge } from "tailwind-merge";

interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string | StaticImageData;
  imageAlt: string;
  className?: string;
  height?: number;
  width?: number;
  leftClass?: string;
  url?: string;
}

export const AnimatedTooltip = ({ items }: { items: TooltipItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = (event.target as HTMLImageElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const onClickEvent = (item: TooltipItem) => {
    if (!isDragged && item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <>
      {items.map((item) => (
        <motion.div
          drag
          dragSnapToOrigin
          className={twJoin(
            "-mr-4 relative group select-none cursor-grab",
            item.url && "cursor-pointer",
            isGrabbed ? "cursor-grabbing" : "cursor-grab"
          )}
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onClickEvent(item)}
          onDragStart={() => {
            setIsGrabbed(true);
            setIsDragged(true);
          }}
          onDragEnd={() => {
            setIsGrabbed(false);
            setTimeout(() => setIsDragged(false), 300);
          }}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className={twMerge(
                  "absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-[8px] bg-amethyst-200 dark:bg-woodsmoke-600 z-50 shadow-xl px-4 py-2",
                  item.leftClass
                )}
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-linear-to-r from-transparent via-amethyst-300 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-linear-to-r from-transparent via-amethyst-700 to-transparent h-px " />
                <div className="font-bold dark:text-woodsmoke-50 text-woodsmoke-500 relative z-30 text-base">
                  {item.name}
                </div>
                <div className="dark:text-woodsmoke-50 text-woodsmoke-500 text-xs">
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            draggable={false}
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.imageAlt}
            style={{ height: `${item.height}px`, width: `${item.width}px` }}
            className={cn(
              `object-cover select-none m-0! p-0! object-top group-hover:scale-105 group-hover:z-30 relative transition duration-500`,
              item.className
            )}
          />
        </motion.div>
      ))}
    </>
  );
};
