"use client";

import { RESUME_PROJECTS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";

interface ProjectsSectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function ProjectsSection({ category, theme, mode }: ProjectsSectionProps) {
  const projects = filterByCategory(RESUME_PROJECTS_DATA, category);
  const isDark   = mode === "dark";
  const isModern = theme === "modern";

  if (projects.length === 0) return null;

  // ── Simple ────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain    = isDark ? "#f0f0f0" : "#111";
    const textSub     = isDark ? "#999"    : "#555";
    const bulletColor = isDark ? "#ccc"    : "#333";
    const ruleColor   = isDark ? "#444"    : "#ccc";
    const tagBg       = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
    return (
      <section style={{ marginBottom: "22px" }}>
        <h2 style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.4px",
          color: textMain, borderBottom: `1.5px solid ${ruleColor}`, paddingBottom: "4px", marginBottom: "14px", marginTop: 0 }}>
          Projects
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {projects.map((project) => (
            <div key={project.title}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: "12px", color: textMain }}>{project.title}</span>
                  <span style={{ fontSize: "11.5px", color: textSub, marginLeft: "6px" }}>— {project.role}</span>
                </div>
                {project.period && (
                  <span style={{ fontSize: "10.5px", color: textSub, whiteSpace: "nowrap", flexShrink: 0 }}>{project.period}</span>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", margin: "5px 0" }}>
                {project.tools.map((t) => (
                  <span key={t} style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "3px",
                    backgroundColor: tagBg, color: textSub, border: `1px solid ${isDark ? "#555" : "#ccc"}`, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
              <ul style={{ margin: "2px 0 0", paddingLeft: "14px", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "2px" }}>
                {project.bullets.resume.map((b, i) => (
                  <li key={i} style={{ fontSize: "11px", color: bulletColor, lineHeight: 1.55 }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Modern — card style in the main column ────────────────────────────────
  const textMain    = isDark ? "#f0f0f0" : "#1a1a1a";
  const textSub     = isDark ? "#bbb"    : "#555";
  const bulletColor = isDark ? "#ccc"    : "#444";
  const accent      = "#D32F2F";
  const cardBg      = isDark ? "rgba(255,255,255,0.04)" : "#FFF0F0";
  const cardBorder  = isDark ? "rgba(255,255,255,0.08)" : "#FFCDD2";
  const tagBg       = isDark ? "rgba(255,255,255,0.08)" : "#fff";
  const tagBorder   = "#E57373";
  const tagText     = "#B71C1C";

  return (
    <section style={{ marginBottom: "26px" }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{ width: "3px", height: "14px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px", color: accent, margin: 0 }}>
          Projects
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {projects.map((project) => (
          <div
            key={project.title}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "6px",
              padding: "12px 14px",
              breakInside: "avoid",
              pageBreakInside: "avoid",
            }}
          >
            {/* Title row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: "12.5px", color: accent }}>{project.title}</span>
                <span style={{ fontSize: "11px", color: textSub, marginLeft: "6px" }}>— {project.role}</span>
              </div>
              {project.period && (
                <span style={{ fontSize: "10px", color: textSub, whiteSpace: "nowrap", flexShrink: 0 }}>{project.period}</span>
              )}
            </div>

            {/* Tool tags */}
            {project.tools.length > 0 && (
              <div style={{ fontSize: "9.5px", color: tagText, fontWeight: 600, marginBottom: "6px" }}>
                {project.tools.join(" · ")}
              </div>
            )}

            {/* Bullets */}
            <ul style={{ margin: 0, paddingLeft: 0, listStyleType: "none", display: "flex", flexDirection: "column", gap: "3px" }}>
              {project.bullets.resume.map((b, i) => (
                <li key={i} style={{ fontSize: "10.5px", color: bulletColor, lineHeight: 1.55, display: "flex", gap: "6px", alignItems: "flex-start" }}>
                  <span style={{ color: accent, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
