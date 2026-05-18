import Image from "next/image";
import { Briefcase, Building2, Calendar, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WORK_EXPERIENCE } from "@/config";

const ROLE_TAGS = [
  ["Systems Analysis", "UI/UX Design", "Product Design"],
  ["UI/UX Design", "Figma", "Brand Identity"],
  ["3D Modeling", "Substance Painter", "Blender"],
];

export default function WorkSection2026() {
  return (
    <section
      id="work"
      className="relative py-24 px-[7%] bg-[#0d0000] overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(211,47,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(211,47,47,1) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-md h-112 bg-amethyst-500/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-amethyst-500/4 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[3px] mb-3">
          <Briefcase size={12} className="text-amethyst-500" strokeWidth={1.75} />
          <span className="text-white/30">$</span>
          <span className="text-amethyst-400">experience</span>
          <span className="text-white/25">--list</span>
        </div>
        <h2
          className="font-poppins font-bold text-white mb-2"
          style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
        >
          Professional <span className="text-amethyst-500">Journey</span>
        </h2>
        <p className="text-white/45 text-[0.92rem] leading-[1.75] max-w-140 mb-16">
          Roles and responsibilities that shaped my expertise across systems analysis, design, and 3D art.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[1.9rem] top-4 bottom-4 w-px bg-linear-to-b from-amethyst-500/70 via-amethyst-500/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8">
            {WORK_EXPERIENCE.map((exp, index) => (
              <div key={index} className="flex gap-6 md:gap-10 items-start">

                {/* Timeline node */}
                <div className="hidden md:flex flex-col items-center shrink-0 pt-2">
                  <div
                    className="w-3.75 h-3.75 rounded-full bg-amethyst-500 border-[3px] border-[#0d0000] shrink-0 z-10"
                    style={{
                      boxShadow: "0 0 10px rgba(211,47,47,0.9), 0 0 22px rgba(211,47,47,0.4)",
                    }}
                  />
                </div>

                {/* Card */}
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex-1 group no-underline relative overflow-hidden",
                    "rounded-[18px] border border-white/8 bg-white/[0.035] backdrop-blur-md",
                    "p-5 sm:p-6 transition-all duration-300",
                    "hover:border-amethyst-500/40 hover:bg-white/6",
                    "hover:shadow-[0_0_48px_rgba(211,47,47,0.09)]"
                  )}
                >
                  {/* Left glow bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-amethyst-500/70 to-transparent" />

                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                    <div className="flex items-center gap-3">
                      {/* Faded index */}
                      <span className="font-mono font-black text-[1.8rem] leading-none text-white/[0.07] select-none w-9 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Logo */}
                      <div className="w-11 h-11 rounded-[10px] overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
                        <Image
                          src={exp.image}
                          alt={exp.imageAlt}
                          width={44}
                          height={44}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      {/* Title block */}
                      <div>
                        <h3 className="font-poppins font-bold text-[0.92rem] text-white leading-snug">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-1 text-amethyst-400 text-[0.73rem] font-medium mt-0.5">
                          <Building2 size={11} strokeWidth={1.75} />
                          {exp.subTitle}
                        </div>
                      </div>
                    </div>

                    {/* Date + external link */}
                    <div className="flex items-center gap-1 font-mono text-[0.66rem] text-white/30 whitespace-nowrap">
                      <Calendar size={11} className="text-amethyst-500/50" strokeWidth={1.75} />
                      {exp.startDate?.format("YYYY")} — {exp.endDate?.format("YYYY")}
                      <ExternalLink
                        size={10}
                        className="ml-0.5 opacity-0 group-hover:opacity-60 transition-opacity text-amethyst-400"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/6 mb-4" />

                  {/* Bullet descriptions */}
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {exp.description.map((item, i) => (
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

                  {/* Role tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {(ROLE_TAGS[index] ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.62rem] px-2.5 py-1 rounded-full border border-amethyst-500/22 text-amethyst-400/80 bg-amethyst-500/7 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
