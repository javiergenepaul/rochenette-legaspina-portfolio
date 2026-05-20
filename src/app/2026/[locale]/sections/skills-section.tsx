import { Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILLS } from "../data/portfolio-data";
import Image from "next/image";

export default function SkillsSection2026() {
  return (
    <section
      id="skills"
      className="py-24 px-[7%] bg-woodsmoke-100 dark:bg-woodsmoke-900"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <Wrench size={13} strokeWidth={1.75} />
        Skills &amp; Tools
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        My <span className="text-amethyst-500">Toolkit</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        Tools and technologies I&apos;ve used across 3D modeling, design, and
        systems analysis.
      </p>

      <div className="flex flex-col gap-11">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            {/* Category heading */}
            <div className="flex items-center gap-2.5 font-poppins font-bold text-[0.85rem] text-woodsmoke-900 dark:text-woodsmoke-100 mb-5">
              <Wrench
                size={16}
                className="text-amethyst-500"
                strokeWidth={1.75}
              />
              {category}
              <span className="flex-1 h-px bg-woodsmoke-200 dark:bg-woodsmoke-700" />
            </div>

            {/* Tool pills */}
            <div className="flex flex-wrap gap-3.5">
              {items.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2",
                    "bg-white dark:bg-woodsmoke-800",
                    "border border-woodsmoke-200 dark:border-woodsmoke-700",
                    "rounded-2xl px-3.5 py-4 min-w-22 cursor-default",
                    "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
                    "transition-all duration-300",
                    "hover:border-amethyst-500 hover:shadow-[0_12px_36px_rgba(211,47,47,.13)] hover:-translate-y-1",
                  )}
                >
                  {"logo" in item && item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[1.7rem] leading-none">{"icon" in item ? item.icon : ""}</span>
                  )}
                  <span className="text-[0.7rem] font-poppins font-semibold text-woodsmoke-500 dark:text-woodsmoke-400 text-center leading-[1.3]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
