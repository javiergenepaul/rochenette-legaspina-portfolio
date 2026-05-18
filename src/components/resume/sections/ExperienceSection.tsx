"use client";

import { RESUME_EXPERIENCE_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";

interface ExperienceSectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function ExperienceSection({ category, theme, mode }: ExperienceSectionProps) {
  const entries  = filterByCategory(RESUME_EXPERIENCE_DATA, category);
  const isDark   = mode === "dark";
  const isModern = theme === "modern";

  if (entries.length === 0) return null;

  // ── Simple ────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain    = isDark ? "#f0f0f0" : "#111";
    const textSub     = isDark ? "#999"    : "#555";
    const bulletColor = isDark ? "#ccc"    : "#333";
    const ruleColor   = isDark ? "#444"    : "#ccc";
    return (
      <section style={{ marginBottom: "22px" }}>
        <h2 style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.4px",
          color: textMain, borderBottom: `1.5px solid ${ruleColor}`, paddingBottom: "4px", marginBottom: "14px", marginTop: 0 }}>
          Work Experience
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {entries.map((entry) => (
            <div key={entry.company}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: "12px", color: textMain }}>{entry.roles[category]}</span>
                  <span style={{ fontSize: "11.5px", color: textSub, marginLeft: "6px" }}>— {entry.company}</span>
                  <div style={{ fontSize: "10.5px", color: textSub, marginTop: "1px" }}>{entry.location}</div>
                </div>
                <span style={{ fontSize: "10.5px", color: textSub, whiteSpace: "nowrap", flexShrink: 0, paddingTop: "1px" }}>
                  {entry.period}
                </span>
              </div>
              <ul style={{ margin: "6px 0 0", paddingLeft: "14px", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "2px" }}>
                {entry.bullets.resume.map((b, i) => (
                <li key={i} style={{ fontSize: "11px", color: bulletColor, lineHeight: 1.55 }}>{b}</li>
              ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Modern — timeline style in the main column ─────────────────────────────
  const textMain    = isDark ? "#f0f0f0" : "#1a1a1a";
  const textSub     = isDark ? "#bbb"    : "#555";
  const bulletColor = isDark ? "#ccc"    : "#444";
  const accent      = "var(--amethyst-500)";
  const accentLight = isDark ? "var(--amethyst-800)" : "var(--amethyst-100)";

  return (
    <section style={{ marginBottom: "26px" }}>
      {/* Section heading with left accent bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <div style={{ width: "3px", height: "14px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px",
          color: accent, margin: 0 }}>
          Work Experience
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {entries.map((entry) => (
          <div
            key={entry.company}
            style={{
              borderLeft: `2px solid var(--amethyst-200)`,
              paddingLeft: "14px",
              position: "relative",
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "-5px",
                top: "4px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: accent,
                flexShrink: 0,
              }}
            />

            {/* Role + period row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "12.5px", color: accent }}>
                  {entry.roles[category]}
                </div>
                <div style={{ fontSize: "11.5px", color: textMain, fontWeight: 600, marginTop: "1px" }}>
                  {entry.company}
                </div>
                <div style={{ fontSize: "10px", color: textSub, marginTop: "1px" }}>{entry.location}</div>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "#fff",
                  backgroundColor: accent,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                {entry.period}
              </span>
            </div>

            {/* Bullets */}
            <ul style={{ margin: "8px 0 0", paddingLeft: "14px", listStyleType: "none", display: "flex", flexDirection: "column", gap: "3px" }}>
              {entry.bullets.resume.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: bulletColor,
                    lineHeight: 1.55,
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: accent, fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>▸</span>
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
