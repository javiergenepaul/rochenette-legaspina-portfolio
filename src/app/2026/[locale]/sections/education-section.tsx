"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GraduationCap, Award, Building2, Calendar, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { getEducationExperience, getCertificationExperience, LINK_URL } from "@/config";

export default function EducationSection2026() {
  const locale = usePathname().split("/")[2] ?? "en";
  const EDUCATION_EXPERIENCE = getEducationExperience(locale);
  const CERTIFICATION_EXPERIENCE = getCertificationExperience(locale);
  const edu = EDUCATION_EXPERIENCE[0];
  const { t } = useTranslation();

  return (
    <section
      id="education"
      className="relative py-24 px-[7%] bg-woodsmoke-950 overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(211,47,47,1) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-[15%] w-80 h-80 bg-amethyst-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[3px] mb-3">
          <Terminal size={12} className="text-amethyst-500" strokeWidth={1.75} />
          <span className="text-white/30">$</span>
          <span className="text-amethyst-400">{translate(t, "portfolio2026.education.eyebrow")}</span>
          <span className="text-white/25">{translate(t, "portfolio2026.education.eyebrowFlag")}</span>
        </div>
        <h2
          className="font-poppins font-bold text-white mb-2"
          style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
        >
          {translate(t, "portfolio2026.education.headingPre")} <span className="text-amethyst-500">{translate(t, "portfolio2026.education.headingHighlight")}</span>
        </h2>
        <p className="text-white/45 text-[0.92rem] leading-[1.75] max-w-140 mb-12">
          {translate(t, "portfolio2026.education.intro")}
        </p>

        {/* ── Degree ────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 font-mono text-[0.66rem] text-white/30 uppercase tracking-[2px] mb-4">
            <GraduationCap size={12} className="text-amethyst-500" strokeWidth={1.75} />
            <span>{translate(t, "portfolio2026.education.degreeLabel")}</span>
            <span className="flex-1 h-px bg-white/7" />
          </div>

          <a
            href={LINK_URL.UC}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex sm:flex-row flex-col gap-5 p-5 sm:p-6 rounded-[18px] no-underline group",
              "relative overflow-hidden",
              "border border-amethyst-500/18 bg-white/3 backdrop-blur-sm",
              "transition-all duration-300",
              "hover:border-amethyst-500/45 hover:bg-white/6",
              "hover:shadow-[0_0_48px_rgba(211,47,47,0.10)]"
            )}
          >
            {/* Left glow bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-amethyst-500 to-transparent" />

            {/* Logo */}
            <div className="shrink-0 flex items-start justify-center sm:justify-start">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src={edu.image}
                  alt={edu.imageAlt}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3 className="font-poppins font-bold text-[0.95rem] text-white">
                    {edu.title}
                  </h3>
                  <div className="flex items-center gap-1 text-amethyst-400 font-medium text-[0.74rem] mt-0.5">
                    <Building2 size={11} strokeWidth={1.75} />
                    {edu.subTitle}
                  </div>
                </div>
                <span className="font-mono text-[0.66rem] text-white/30 flex items-center gap-1 whitespace-nowrap">
                  <Calendar size={11} className="text-amethyst-500/50" strokeWidth={1.75} />
                  {edu.startDate?.format("YYYY")} — {edu.endDate?.format("YYYY")}
                </span>
              </div>

              <div className="h-px bg-white/6 my-1" />

              <ul className="flex flex-col gap-1.5">
                {edu.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[0.79rem] text-white/50 leading-[1.65]"
                  >
                    <ChevronRight
                      size={13}
                      className="text-amethyst-500 shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        </div>

        {/* ── Certifications ────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 font-mono text-[0.66rem] text-white/30 uppercase tracking-[2px] mb-4">
            <Award size={12} className="text-amethyst-500" strokeWidth={1.75} />
            <span>{translate(t, "portfolio2026.education.certificationsLabel")}</span>
            <span className="flex-1 h-px bg-white/7" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATION_EXPERIENCE.map((cert, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-4 p-5 rounded-[18px] relative overflow-hidden",
                  "border border-white/7 bg-white/3",
                  "transition-all duration-300",
                  "hover:border-amethyst-500/35 hover:bg-white/6",
                  "hover:shadow-[0_0_32px_rgba(211,47,47,0.08)]"
                )}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-amethyst-500/50 to-transparent" />

                {/* Logo */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-[10px] overflow-hidden bg-white/10 flex items-center justify-center">
                    <Image
                      src={cert.image}
                      alt={cert.imageAlt}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-poppins font-bold text-[0.88rem] text-white">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1 text-amethyst-400 text-[0.73rem] font-medium">
                    <Building2 size={11} strokeWidth={1.75} />
                    {cert.subTitle}
                  </div>
                  <div className="h-px bg-white/6 my-0.5" />
                  <ul className="flex flex-col gap-1">
                    {cert.description.slice(0, 3).map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-caption text-white/45 leading-[1.6]"
                      >
                        <ChevronRight
                          size={12}
                          className="text-amethyst-500/70 shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
