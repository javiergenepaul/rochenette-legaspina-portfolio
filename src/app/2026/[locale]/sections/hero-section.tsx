"use client";

import Link from "next/link";
import { useLoadingStore } from "@/store";
import { ResumeBuilderModal } from "@/components/resume/ResumeBuilderModal";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Send,
  Briefcase,
  Monitor,
  Wrench,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { HeroBackground } from "@/components/2026/hero-background";

export default function HeroSection2026() {
  const { setLoading } = useLoadingStore();
  const { t } = useTranslation();
  useEffect(() => { setLoading(false); }, [setLoading]);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center px-[7%] overflow-hidden bg-[#260000]"
    >
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8 pt-24 pb-20">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/7 border border-white/15 text-white/75 px-4 py-1.5 rounded-full text-caption font-semibold tracking-[0.8px] font-poppins w-fit">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          {translate(t, "portfolio2026.nav.openToOpportunities")}
        </div>

        {/* Heading */}
        <h1
          className="font-poppins font-extrabold text-white leading-[1.12] tracking-tight"
          style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}
        >
          {translate(t, "portfolio2026.hero.headingLine1")}
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#E57373,#FFCDD2)" }}>
            {translate(t, "portfolio2026.hero.headingLine2")}
          </span>
          <br />
          {translate(t, "portfolio2026.hero.headingLine3")}
        </h1>

        {/* Description */}
        <p className="text-white/62 text-normal leading-[1.8] max-w-lg">
          {translate(t, "portfolio2026.hero.description")}
        </p>

        {/* Trail pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { Icon: Monitor,   label: translate(t, "portfolio2026.hero.pill3d") },
            { Icon: Wrench,    label: translate(t, "portfolio2026.hero.pillUiux") },
            { Icon: Briefcase, label: translate(t, "portfolio2026.hero.pillSystems") },
          ].map(({ Icon, label }, i) => (
            <div key={label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} className="text-white/25" strokeWidth={1.75} />}
              <div className="flex items-center gap-1.5 bg-white/7 border border-white/12 text-white/80 px-3.5 py-1.5 rounded-full text-[0.78rem] font-poppins font-medium">
                <Icon size={13} className="text-amethyst-300" strokeWidth={1.75} />
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="#projects"
            className={cn(
              "inline-flex items-center gap-2 px-7 py-3 rounded-xl font-poppins font-bold text-[0.88rem] text-white no-underline",
              "bg-linear-to-br from-amethyst-500 to-amethyst-700",
              "shadow-[0_4px_18px_rgba(211,47,47,.45)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(211,47,47,.55)]",
            )}
          >
            <Briefcase size={15} strokeWidth={1.75} />
            {translate(t, "portfolio2026.hero.ctaWork")}
          </Link>
          <ResumeBuilderModal
            trigger={
              <button className={cn(
                "inline-flex items-center gap-2 px-7 py-3 rounded-xl font-poppins font-semibold text-[0.88rem] text-white",
                "border border-white/22 bg-transparent",
                "transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5",
              )}>
                <Send size={15} strokeWidth={1.75} />
                {translate(t, "portfolio2026.hero.ctaResume")}
              </button>
            }
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
          {[
            { val: "3+", label: translate(t, "portfolio2026.hero.statDisciplines") },
            { val: "5+", label: translate(t, "portfolio2026.hero.statProjects") },
            { val: "10+", label: translate(t, "portfolio2026.hero.statTools") },
            { val: "∞",  label: translate(t, "portfolio2026.hero.statCuriosity") },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-poppins font-extrabold text-white text-[1.6rem] leading-none">
                {val.replace(/\+$/, "")}
                <span className="text-amethyst-300">{val.endsWith("+") ? "+" : ""}</span>
              </span>
              <span className="text-[0.72rem] text-white/45 uppercase tracking-[1px]">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <span className="hidden sm:block text-white/60 text-[0.68rem] font-poppins font-semibold uppercase tracking-[2px]">{translate(t, "portfolio2026.hero.scroll")}</span>
        <div className="hidden sm:flex w-5 h-8 rounded-full border-2 border-white/50 justify-center pt-1.5" style={{ animation: "scroll-bob 2.4s ease-in-out infinite" }}>
          <div className="w-0.5 h-1.5 rounded-full bg-white/80" />
        </div>
        <div className="flex flex-col items-center -space-y-1.5" style={{ animation: "scroll-bob 2.4s ease-in-out infinite" }}>
          <ChevronDown size={14} strokeWidth={2.5} className="text-white/30" />
          <ChevronDown size={14} strokeWidth={2.5} className="text-white/55" />
        </div>
      </div>
    </section>
  );
}
