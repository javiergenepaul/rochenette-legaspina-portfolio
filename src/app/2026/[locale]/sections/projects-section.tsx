"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FolderOpen, Tag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "../data/portfolio-data";
import { thumbBg } from "@/lib/project-utils";
import Image from "next/image";

const SPRING = { type: "spring" as const, stiffness: 340, damping: 34 };

export default function ProjectsSection2026() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";

  return (
    <section
      id="projects"
      className="py-24 px-[7%] bg-woodsmoke-100 dark:bg-woodsmoke-900"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <FolderOpen size={13} strokeWidth={1.75} />
        Projects
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        Things I&apos;ve <span className="text-amethyst-500">Built &amp; Designed</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        A cross-disciplinary portfolio spanning systems analysis, UX design, and
        3D visualization.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.filter(p => !p.hidden).map((project, i) => (
          <motion.div
            key={project.title}
            style={{ borderRadius: 20 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, boxShadow: "0 12px 36px rgba(211,47,47,.15)" }}
            transition={{ ...SPRING, delay: i * 0.06 }}
            onClick={() => router.push(`/2026/${locale}/projects/${project.slug}`)}
            className={cn(
              "flex flex-col overflow-hidden cursor-pointer",
              "bg-white dark:bg-woodsmoke-800",
              "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
            )}
          >
            {/* Thumbnail */}
            <div
              className="h-43.75 relative flex items-center justify-center overflow-hidden"
              style={{ background: thumbBg(project.gradient) }}
            >
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              ) : (
                <FolderOpen size={48} className="text-white/65 relative z-10" strokeWidth={1.25} />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-white/18 backdrop-blur-sm border border-white/28 text-white px-2.5 py-1 rounded-full text-[0.68rem] font-poppins font-bold">
                <Tag size={11} strokeWidth={2} />
                {project.type}
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2.5 p-5 flex-1">
              <h3 className="font-poppins font-bold text-[0.9rem] text-woodsmoke-900 dark:text-woodsmoke-50">
                {project.title}
              </h3>
              <p className="text-[0.8rem] text-woodsmoke-500 dark:text-woodsmoke-400 leading-[1.6] line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="bg-amethyst-50 text-amethyst-500 dark:bg-amethyst-500/15 dark:text-amethyst-300 px-2 py-0.5 rounded-full text-[0.68rem] font-poppins font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-3 border-t border-woodsmoke-200 dark:border-woodsmoke-700">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-caption font-poppins font-bold",
                    "px-3 py-1.5 rounded-full border transition-all duration-200",
                    "text-amethyst-500 bg-amethyst-50 border-amethyst-100",
                    "dark:text-amethyst-300 dark:bg-amethyst-500/12 dark:border-amethyst-500/25",
                    "hover:bg-amethyst-500 hover:text-white hover:border-amethyst-500",
                  )}
                >
                  <ChevronRight size={12} strokeWidth={2.5} />
                  Find out more
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
