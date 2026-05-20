"use client";

import { RESUME_SKILLS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";

interface SkillsSectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

function groupBy<T extends { category: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}

export function SkillsSection({ category, theme, mode }: SkillsSectionProps) {
  const skills   = filterByCategory(RESUME_SKILLS_DATA, category);
  const isDark   = mode === "dark";
  const isModern = theme === "modern";

  if (skills.length === 0) return null;

  // ── Simple ────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain  = isDark ? "#f0f0f0" : "#111";
    const textSub   = isDark ? "#999"    : "#555";
    const ruleColor = isDark ? "#444"    : "#ccc";
    return (
      <section style={{ marginBottom: "22px" }}>
        <h2 style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.4px",
          color: textMain, borderBottom: `1.5px solid ${ruleColor}`, paddingBottom: "4px", marginBottom: "14px", marginTop: 0 }}>
          Skills &amp; Tools
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 24px" }}>
          {skills.map((skill) => (
            <div key={skill.name} style={{ fontSize: "11px", color: textMain, display: "flex", gap: "4px" }}>
              <strong>{skill.name}</strong>
              <span style={{ color: textSub }}>— {skill.category}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Modern — sidebar style ─────────────────────────────────────────────────
  // Sidebar is narrow (~220px), so stack groups vertically
  const accent     = "#D32F2F";
  const textMain   = isDark ? "#e8d5ff" : "#651313";
  const textSub    = isDark ? "#bbb"    : "#B71C1C";
  const tagBg      = isDark ? "rgba(255,255,255,0.10)" : "#fff";
  const tagBorder  = isDark ? "rgba(255,255,255,0.15)" : "#EF9A9A";
  const tagText    = isDark ? "#e8d5ff" : "#8B1A1A";
  const groupLabel = isDark ? "rgba(255,255,255,0.45)" : "#EF5350";

  const groups = groupBy(skills);

  return (
    <section style={{ marginBottom: "24px" }}>
      {/* Section heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
        <div style={{ width: "3px", height: "12px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px", color: accent, margin: 0 }}>
          Skills &amp; Tools
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName}>
            {/* Group label */}
            <div style={{ fontSize: "9px", fontWeight: 700, color: groupLabel, textTransform: "uppercase",
              letterSpacing: "0.9px", marginBottom: "6px" }}>
              {groupName}
            </div>
            {/* Tags */}
            <div style={{ fontSize: "10px", color: tagText, fontWeight: 500, lineHeight: 1.6 }}>
              {items.map((skill) => skill.name).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
