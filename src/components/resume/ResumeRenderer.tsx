"use client";

import { RESUME_SECTIONS } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { HeaderSection } from "./sections/HeaderSection";
import { SummarySection } from "./sections/SummarySection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { EducationSection } from "./sections/EducationSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { SkillsSection } from "./sections/SkillsSection";

const sectionComponentMap: Record<
  string,
  React.ComponentType<{ category: ResumeCategory; theme: ResumeTheme; mode: ResumeMode }>
> = {
  HeaderSection,
  SummarySection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  CertificationsSection,
  SkillsSection,
};

interface ResumeRendererProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
  visibleSections: string[];
}

// ─── Simple theme ────────────────────────────────────────────────────────────
function SimpleLayout({ category, theme, mode, activeSections }: ResumeRendererProps & {
  activeSections: typeof RESUME_SECTIONS;
}) {
  const isDark = mode === "dark";
  return (
    <div
      id="resume-content"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "48px 52px",
        boxSizing: "border-box",
        backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        color: isDark ? "#f0f0f0" : "#111",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <HeaderSection category={category} theme={theme} mode={mode} />
      {activeSections.map((s) => {
        const Component = sectionComponentMap[s.component];
        return Component ? (
          <Component key={s.key} category={category} theme={theme} mode={mode} />
        ) : null;
      })}
    </div>
  );
}

// ─── Modern theme ─────────────────────────────────────────────────────────────
function ModernLayout({ category, theme, mode, activeSections }: ResumeRendererProps & {
  activeSections: typeof RESUME_SECTIONS;
}) {
  const isDark = mode === "dark";

  const mainSections    = activeSections.filter((s) => s.column === "main");
  const sidebarSections = activeSections.filter((s) => s.column === "sidebar");

  // ── Colour tokens via CSS variables (year-aware) ──────────────────────────
  const headerBg      = isDark ? "#3A0000" : "#651313";
  const sidebarBg     = isDark ? "#3A0000" : "#FFF0F0";
  const mainBg        = isDark ? "#18151f"              : "#ffffff";
  const bodyBg        = isDark ? "#18151f"              : "#ffffff";

  return (
    <div
      id="resume-content"
      style={{
        width: "794px",
        minHeight: "1123px",
        boxSizing: "border-box",
        backgroundColor: bodyBg,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Full-bleed header ─────────────────────────────────────────────── */}
      <div style={{ backgroundColor: headerBg }}>
        <HeaderSection category={category} theme={theme} mode={mode} />
      </div>

      {/* ── Two-column body ───────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "220px",
            flexShrink: 0,
            backgroundColor: sidebarBg,
            padding: "28px 20px",
            boxSizing: "border-box",
          }}
        >
          {sidebarSections.length > 0
            ? sidebarSections.map((s) => {
                const Component = sectionComponentMap[s.component];
                return Component ? (
                  <Component key={s.key} category={category} theme={theme} mode={mode} />
                ) : null;
              })
            : null}
        </div>

        {/* Main */}
        <div
          style={{
            flex: 1,
            backgroundColor: mainBg,
            padding: "28px 28px 28px 24px",
            boxSizing: "border-box",
          }}
        >
          {mainSections.length > 0
            ? mainSections.map((s) => {
                const Component = sectionComponentMap[s.component];
                return Component ? (
                  <Component key={s.key} category={category} theme={theme} mode={mode} />
                ) : null;
              })
            : null}
        </div>
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────
export function ResumeRenderer({ category, theme, mode, visibleSections }: ResumeRendererProps) {
  const activeSections = RESUME_SECTIONS.filter(
    (s) => s.categories.includes(category) && visibleSections.includes(s.key)
  ).sort((a, b) => a.order - b.order);

  if (theme === "modern") {
    return (
      <ModernLayout
        category={category}
        theme={theme}
        mode={mode}
        visibleSections={visibleSections}
        activeSections={activeSections}
      />
    );
  }

  return (
    <SimpleLayout
      category={category}
      theme={theme}
      mode={mode}
      visibleSections={visibleSections}
      activeSections={activeSections}
    />
  );
}
