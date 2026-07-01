"use client";

import { RESUME_SUMMARY } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";

interface SummarySectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function SummarySection({ category, theme, mode }: SummarySectionProps) {
  const isDark = mode === "dark";
  const isModern = theme === "modern";
  const summary = RESUME_SUMMARY[category];

  // ── Simple ─────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain = isDark ? "#f0f0f0" : "#111";
    const ruleColor = isDark ? "#444" : "#ccc";
    return (
      <section style={{ marginBottom: "22px" }}>
        <h2 style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.4px",
          color: textMain, borderBottom: `1.5px solid ${ruleColor}`, paddingBottom: "4px", marginBottom: "10px", marginTop: 0 }}>
          Professional Summary
        </h2>
        <p style={{ fontSize: "11px", color: textMain, lineHeight: 1.6, margin: 0 }}>{summary}</p>
      </section>
    );
  }

  // ── Modern — main column, above Work Experience ─────────────────────────────
  const textMain = isDark ? "#f0f0f0" : "#1a1a1a";
  const accent = "#D32F2F";

  return (
    <section style={{ marginBottom: "26px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "3px", height: "14px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px", color: accent, margin: 0 }}>
          Professional Summary
        </h2>
      </div>
      <p style={{ fontSize: "11px", color: textMain, lineHeight: 1.6, margin: 0 }}>{summary}</p>
    </section>
  );
}
