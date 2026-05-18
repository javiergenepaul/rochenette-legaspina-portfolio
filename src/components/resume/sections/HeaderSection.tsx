"use client";

import { RESUME_PERSONAL_INFO } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";

interface HeaderSectionProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function HeaderSection({ category, theme, mode }: HeaderSectionProps) {
  const info  = RESUME_PERSONAL_INFO;
  const title = info.titles[category];
  const isDark = mode === "dark";

  // ── Simple ─────────────────────────────────────────────────────────────────
  if (theme === "simple") {
    const textMain = isDark ? "#f0f0f0" : "#111";
    const textSub  = isDark ? "#aaa"    : "#555";
    const border   = isDark ? "#444"    : "#ccc";
    return (
      <header style={{ borderBottom: `1px solid ${border}`, paddingBottom: "12px", marginBottom: "20px" }}>
        <div style={{ fontSize: "24px", fontWeight: 700, color: textMain }}>{info.name}</div>
        <div style={{ fontSize: "12.5px", color: textSub, margin: "3px 0 10px", fontWeight: 500 }}>{title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", fontSize: "10.5px", color: textSub }}>
          {[info.email, info.location, info.linkedin, info.portfolio].map((v, i, arr) => (
            <span key={v} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              {v}{i < arr.length - 1 && <span style={{ opacity: 0.4 }}>•</span>}
            </span>
          ))}
        </div>
      </header>
    );
  }

  // ── Modern — full-bleed dark header, always renders on the coloured bg ─────
  // Text colours are always light (the bg is always dark amethyst/year-dark)
  const contactItems = [
    { label: "Email",     value: info.email },
    { label: "Location",  value: info.location },
    { label: "LinkedIn",  value: info.linkedin },
    { label: "Portfolio", value: info.portfolio },
  ];

  return (
    <header
      style={{
        padding: "36px 28px 28px 28px",
        boxSizing: "border-box",
      }}
    >
      {/* Name */}
      <div
        style={{
          fontSize: "30px",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.5px",
          lineHeight: 1.05,
          marginBottom: "6px",
        }}
      >
        {info.name}
      </div>

      {/* Role pill */}
      <div
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--amethyst-200)",
          textTransform: "uppercase",
          letterSpacing: "1.4px",
          marginBottom: "18px",
        }}
      >
        {title}
      </div>

      {/* Divider line */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.18)",
          marginBottom: "14px",
        }}
      />

      {/* Contact row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 0",
          fontSize: "10px",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {contactItems.map((item, i) => (
          <span key={item.label} style={{ display: "inline-flex", alignItems: "center" }}>
            {i > 0 && (
              <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.25)" }}>|</span>
            )}
            <span style={{ color: "var(--amethyst-300)", marginRight: "4px", fontWeight: 600 }}>
              {item.label}:
            </span>
            <span>{item.value}</span>
          </span>
        ))}
      </div>
    </header>
  );
}
