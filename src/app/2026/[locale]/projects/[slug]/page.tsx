import { notFound } from "next/navigation";
import Link from "next/link";
import { FolderOpen, User2, Tag, Layers, ChevronRight, Users } from "lucide-react";
import i18nServer from "@/i18n/server";
import { translate } from "@/lib";
import { PROJECTS, getProjects2026 } from "../../data/portfolio-data";
import MockupCarousel from "@/components/2026/mockup-carousel";
import { thumbBg } from "@/lib/project-utils";
import { cn } from "@/lib/utils";
import BackToProjects from "@/components/2026/back-to-projects";

export async function generateStaticParams() {
  return PROJECTS.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = i18nServer.getFixedT(locale);
  const PROJECTS = getProjects2026(locale);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const rotations = [-0.8, 0.6, -0.4, 0.9, -0.3];

  return (
    <main className="min-h-screen bg-woodsmoke-100 dark:bg-woodsmoke-900 py-24 px-[7%] pt-32">

      {/* ── Back button ────────────────────────────────────────────────────── */}
      <BackToProjects locale={locale} />

      {/* ── Page heading ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <FolderOpen size={13} strokeWidth={1.75} />
        {translate(t, "portfolio2026.projectsSection.eyebrow")}
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-10"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        {translate(t, "portfolio2026.projectDetail.overviewHeadingPre")} <span className="text-amethyst-500">{translate(t, "portfolio2026.projectDetail.overviewHeadingHighlight")}</span>
      </h2>

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── Left: expanded project card ─────────────────────────────────── */}
        <div
          className={cn(
            "lg:w-[58%] w-full overflow-hidden border rounded-3xl",
            "bg-white dark:bg-woodsmoke-800",
            "border-woodsmoke-200 dark:border-woodsmoke-700",
            "shadow-[0_16px_56px_rgba(211,47,47,.18)]",
          )}
        >
          {/* Gradient header — type badge only */}
          <div
            className="flex items-center px-5 py-3 shrink-0"
            style={{ background: thumbBg(project.gradient) }}
          >
            <div className="flex items-center gap-1.5 bg-white/18 backdrop-blur-sm border border-white/28 text-white px-3 py-1 rounded-full text-[0.68rem] font-poppins font-bold">
              <Tag size={11} strokeWidth={2} />
              {project.type}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-4">
            <h3
              className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50"
              style={{ fontSize: "clamp(1.1rem,2vw,1.3rem)" }}
            >
              {project.title}
            </h3>

            {/* Role + Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-amethyst-50 dark:bg-amethyst-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <User2 size={13} className="text-amethyst-500" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[0.62rem] text-amethyst-500 font-poppins font-bold uppercase tracking-wide mb-0.5">
                    {translate(t, "portfolio2026.projectDetail.roleLabel")}
                  </p>
                  <p className="text-[0.8rem] text-woodsmoke-700 dark:text-woodsmoke-200 font-medium leading-snug">
                    {project.role}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-amethyst-50 dark:bg-amethyst-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers size={13} className="text-amethyst-500" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[0.62rem] text-amethyst-500 font-poppins font-bold uppercase tracking-wide mb-0.5">
                    {translate(t, "portfolio2026.projectDetail.typeLabel")}
                  </p>
                  <p className="text-[0.8rem] text-woodsmoke-700 dark:text-woodsmoke-200 font-medium leading-snug">
                    {project.type}
                  </p>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-[0.62rem] text-amethyst-500 font-poppins font-bold uppercase tracking-wide mb-1">
                {translate(t, "portfolio2026.projectDetail.aboutLabel")}
              </p>
              <p className="text-[0.84rem] text-woodsmoke-600 dark:text-woodsmoke-300 leading-[1.7]">
                {project.description}
              </p>
            </div>

            {/* Stack */}
            <div>
              <p className="text-[0.62rem] text-amethyst-500 font-poppins font-bold uppercase tracking-wide mb-2">
                {translate(t, "portfolio2026.projectDetail.techToolsLabel")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="bg-amethyst-50 text-amethyst-500 dark:bg-amethyst-500/15 dark:text-amethyst-300 px-2.5 py-0.5 rounded-full text-[0.72rem] font-poppins font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Credit */}
            {project.credit && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amethyst-50 dark:bg-amethyst-500/10 border border-amethyst-100 dark:border-amethyst-500/25">
                <Users size={14} className="text-amethyst-500 shrink-0" strokeWidth={1.75} />
                <p className="text-[0.78rem] text-amethyst-600 dark:text-amethyst-300 font-medium">
                  {project.credit}
                </p>
              </div>
            )}

            {/* Mockup carousel */}
            <MockupCarousel mockups={project.mockups} gradient={project.gradient} label={project.carouselLabel} />
          </div>
        </div>

        {/* ── Right: all projects — active indicator on current ───────────── */}
        <div className="lg:w-[38%] w-full">
          <p className="text-[0.72rem] font-poppins font-bold text-woodsmoke-400 uppercase tracking-[2px] mb-5">
            {translate(t, "portfolio2026.projectDetail.allProjectsLabel")}
          </p>
          <div
            className="relative"
            style={{ height: `${PROJECTS.filter(p => !p.hidden).length * 56 + 104}px` }}
          >
            {PROJECTS.filter(p => !p.hidden).map((p, i) => {
              const isActive = p.slug === slug;
              return isActive ? (
                /* ── Active project — not a link, highlighted ── */
                <div
                  key={p.slug}
                  className={cn(
                    "absolute w-full rounded-2xl overflow-hidden border",
                    "bg-amethyst-50 dark:bg-amethyst-500/10",
                    "border-amethyst-400 dark:border-amethyst-500/60",
                    "shadow-[0_0_0_3px_rgba(211,47,47,.15)]",
                  )}
                  style={{
                    top: `${i * 56}px`,
                    zIndex: PROJECTS.length - i,
                    rotate: `${rotations[i] ?? 0}deg`,
                  }}
                >
                  <div className="flex items-center gap-3 p-4">
                    <div
                      className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: thumbBg(p.gradient) }}
                    >
                      <FolderOpen size={18} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins font-bold text-[0.8rem] text-amethyst-600 dark:text-amethyst-300 truncate">
                        {p.title}
                      </p>
                      <p className="text-[0.7rem] text-amethyst-400 font-medium truncate mt-0.5">
                        {p.role}
                      </p>
                    </div>
                    {/* Active dot indicator */}
                    <span className="w-2 h-2 rounded-full bg-amethyst-500 shrink-0" />
                  </div>
                </div>
              ) : (
                /* ── Other projects — clickable ── */
                <Link
                  key={p.slug}
                  href={`/2026/${locale}/projects/${p.slug}`}
                  className={cn(
                    "absolute w-full rounded-2xl overflow-hidden border",
                    "bg-white dark:bg-woodsmoke-800",
                    "border-woodsmoke-200 dark:border-woodsmoke-700",
                    "hover:-translate-y-1 transition-transform duration-200",
                  )}
                  style={{
                    top: `${i * 56}px`,
                    zIndex: PROJECTS.length - i,
                    rotate: `${rotations[i] ?? 0}deg`,
                    boxShadow: `0 ${4 + i * 3}px ${12 + i * 8}px rgba(0,0,0,${0.06 + i * 0.025})`,
                  }}
                >
                  <div className="flex items-center gap-3 p-4">
                    <div
                      className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: thumbBg(p.gradient) }}
                    >
                      <FolderOpen size={18} className="text-white/80" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins font-bold text-[0.8rem] text-woodsmoke-900 dark:text-woodsmoke-50 truncate">
                        {p.title}
                      </p>
                      <p className="text-[0.7rem] text-woodsmoke-400 font-medium truncate mt-0.5">
                        {p.role}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-woodsmoke-300 dark:text-woodsmoke-600 shrink-0"
                      strokeWidth={2}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
