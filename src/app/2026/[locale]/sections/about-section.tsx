"use client";

import Image from "next/image";
import {
  User,
  Clock,
  TrendingUp,
  MapPin,
  Lightbulb,
  Smile,
  RefreshCw,
  Users,
  Search,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { RochenetteLegaspina2026 } from "@/assets/2026";
import { Typewriter } from "@/components/2026/typewriter";

export default function AboutSection2026() {
  const { t } = useTranslation();

  const CHAPTERS = [
    {
      Icon: Clock,
      title: translate(t, "portfolio2026.about.chapter1Title"),
      body: translate(t, "portfolio2026.about.chapter1Body"),
    },
    {
      Icon: TrendingUp,
      title: translate(t, "portfolio2026.about.chapter2Title"),
      body: translate(t, "portfolio2026.about.chapter2Body"),
    },
    {
      Icon: MapPin,
      title: translate(t, "portfolio2026.about.chapter3Title"),
      body: translate(t, "portfolio2026.about.chapter3Body"),
    },
  ];

  const SOFT_SKILLS = [
    { Icon: Lightbulb, label: translate(t, "portfolio2026.about.soft1") },
    { Icon: Smile, label: translate(t, "portfolio2026.about.soft2") },
    { Icon: RefreshCw, label: translate(t, "portfolio2026.about.soft3") },
    { Icon: Users, label: translate(t, "portfolio2026.about.soft4") },
    { Icon: Search, label: translate(t, "portfolio2026.about.soft5") },
    { Icon: Star, label: translate(t, "portfolio2026.about.soft6") },
  ];

  return (
    <section
      id="about"
      className="py-24 px-[7%] bg-white dark:bg-woodsmoke-800"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <User size={13} strokeWidth={1.75} />
        {translate(t, "portfolio2026.about.eyebrow")}
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        {translate(t, "portfolio2026.about.headingPre")}{" "}
        <span className="text-amethyst-500">{translate(t, "portfolio2026.about.headingHighlight")}</span>{" "}
        {translate(t, "portfolio2026.about.headingPost")}
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-14">
        {translate(t, "portfolio2026.about.intro")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.7fr] gap-8 md:gap-16 items-center">
        {/* Photo */}
        <div className="group relative">

          {/* Subtle border wrapper — barely-there gradient ring */}
          <div
            className="relative rounded-[22px] p-0.5 transition-all duration-500
              shadow-[0_4px_24px_rgba(0,0,0,.10),0_8px_32px_rgba(211,47,47,.10),inset_0_1px_0_rgba(255,255,255,.18)]
              group-hover:shadow-[0_8px_36px_rgba(0,0,0,.13),0_16px_48px_rgba(211,47,47,.16),inset_0_1px_0_rgba(255,255,255,.22)]
              group-hover:-translate-y-2"
            style={{
              background: "linear-gradient(145deg,rgba(255,255,255,.18) 0%,rgba(211,47,47,.18) 50%,rgba(255,255,255,.06) 100%)",
            }}
          >
            {/* Inner image container */}
            <div className="relative rounded-[20px] overflow-hidden aspect-4/5 cursor-pointer">

              {/* Image */}
              <Image
                src={RochenetteLegaspina2026}
                alt="Rochenette Legaspina"
                fill
                className="object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 500px"
                quality={100}
                priority
              />

              {/* Subtle top catch-light */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              {/* Red tint overlay */}
              <div className="absolute inset-0 bg-amethyst-500/0 group-hover:bg-amethyst-500/12 transition-colors duration-500" />

              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute bottom-0 right-0 bg-amethyst-500 text-white px-4 py-3 rounded-[20px_0_20px_0] font-poppins font-bold text-[0.72rem] leading-normal flex flex-col gap-1 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                <Typewriter
                  words={[
                    translate(t, "portfolio2026.about.badgeRole1"),
                    translate(t, "portfolio2026.about.badgeRole2"),
                    translate(t, "portfolio2026.about.badgeRole3"),
                  ]}
                  className="min-w-25 inline-block"
                />
                <span className="opacity-70 text-[0.65rem]">
                  {translate(t, "portfolio2026.about.badgeSub")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters + soft skills */}
        <div>
          {CHAPTERS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className={cn(
                "flex gap-4 items-start mb-5 p-4 rounded-[14px] border-l-[3px] border-amethyst-500",
                "bg-woodsmoke-50 dark:bg-woodsmoke-900",
                "transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,.06)] hover:translate-x-1",
              )}
            >
              <div className="min-w-9.5 h-9.5 bg-amethyst-50 dark:bg-amethyst-500/15 rounded-[10px] flex items-center justify-center shrink-0">
                <Icon
                  size={18}
                  className="text-amethyst-500"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-[0.87rem] text-woodsmoke-900 dark:text-woodsmoke-50 mb-1">
                  {title}
                </h4>
                <p className="text-[0.82rem] text-woodsmoke-500 dark:text-woodsmoke-400 leading-[1.6] m-0">
                  {body}
                </p>
              </div>
            </div>
          ))}

          {/* Soft skill pills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {SOFT_SKILLS.map(({ Icon, label }) => (
              <span
                key={label}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full",
                  "text-[0.76rem] font-poppins font-semibold cursor-default",
                  "border border-transparent transition-all duration-300",
                  "bg-amethyst-50 text-amethyst-500 hover:bg-amethyst-500 hover:text-white",
                  "dark:bg-amethyst-500/12 dark:text-amethyst-300 dark:border-amethyst-500/20 dark:hover:bg-amethyst-500 dark:hover:text-white",
                )}
              >
                <Icon size={13} strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
