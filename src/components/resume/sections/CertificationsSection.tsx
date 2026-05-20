"use client";

import { RESUME_CERTIFICATIONS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";

interface CertificationsSectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function CertificationsSection({ category, theme, mode }: CertificationsSectionProps) {
  const entries  = filterByCategory(RESUME_CERTIFICATIONS_DATA, category);
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
          Certifications
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {entries.map((entry) => (
            <div key={entry.title}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "12px", color: textMain }}>{entry.title}</div>
                  <div style={{ fontSize: "11px", color: textSub, marginTop: "2px" }}>{entry.org}</div>
                </div>
                {entry.period && (
                  <span style={{ fontSize: "10.5px", color: textSub, whiteSpace: "nowrap", flexShrink: 0, paddingTop: "1px" }}>{entry.period}</span>
                )}
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

  // ── Modern — compact sidebar style ────────────────────────────────────────
  const accent     = "#D32F2F";
  const textMain   = isDark ? "#e8d5ff" : "#651313";
  const textSub    = isDark ? "#bbb"    : "#B71C1C";
  const textBody   = isDark ? "#ccc"    : "#8B1A1A";
  const cardBg     = isDark ? "rgba(255,255,255,0.05)" : "#fff";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "#EF9A9A";

  return (
    <section style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
        <div style={{ width: "3px", height: "12px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px", color: accent, margin: 0 }}>
          Certifications
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {entries.map((entry) => (
          <div
            key={entry.title}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "5px",
              padding: "10px 12px",
              breakInside: "avoid",
              pageBreakInside: "avoid",
            }}
          >
            <div style={{ fontSize: "10.5px", fontWeight: 700, color: textMain }}>{entry.title}</div>
            <div style={{ fontSize: "9.5px", color: textSub, marginTop: "2px" }}>{entry.org}</div>
            {entry.period && (
              <div style={{ fontSize: "9px", fontWeight: 600, color: accent, marginTop: "3px" }}>
                {entry.period}
              </div>
            )}
            <ul style={{ margin: "6px 0 0", paddingLeft: 0, listStyleType: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {entry.bullets.resume.map((b, i) => (
                <li key={i} style={{ fontSize: "9.5px", color: textBody, lineHeight: 1.5, display: "flex", gap: "5px", alignItems: "flex-start" }}>
                  <span style={{ color: accent, flexShrink: 0, marginTop: "2px" }}>▸</span>
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
