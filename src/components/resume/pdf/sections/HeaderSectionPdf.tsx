import { Text, View } from "@react-pdf/renderer";
import { RESUME_PERSONAL_INFO } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { px } from "../px";

interface HeaderSectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function HeaderSectionPdf({ category, theme, mode }: HeaderSectionPdfProps) {
  const info = RESUME_PERSONAL_INFO;
  const title = info.titles[category];
  const isDark = mode === "dark";

  // ── Simple ─────────────────────────────────────────────────────────────────
  if (theme === "simple") {
    const textMain = isDark ? "#f0f0f0" : "#111111";
    const textSub = isDark ? "#aaaaaa" : "#555555";
    const border = isDark ? "#444444" : "#cccccc";
    const contactItems = [info.email, info.location, info.linkedin, info.portfolio];

    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: border,
          paddingBottom: px(12),
          marginBottom: px(20),
        }}
      >
        <Text style={{ fontSize: px(24), fontFamily: "Times-Bold", color: textMain }}>
          {info.name}
        </Text>
        <Text
          style={{
            fontSize: px(12.5),
            color: textSub,
            marginTop: px(3),
            marginBottom: px(10),
            fontFamily: "Times-Roman",
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: px(10.5), color: textSub, fontFamily: "Times-Roman" }}>
          {contactItems.join("   •   ")}
        </Text>
      </View>
    );
  }

  // ── Modern — full-bleed dark header, always light text on a dark bg ────────
  const contactItems = [
    { label: "Email", value: info.email },
    { label: "Location", value: info.location },
    { label: "LinkedIn", value: info.linkedin },
    { label: "Portfolio", value: info.portfolio },
  ];

  return (
    <View style={{ padding: `${px(36)} ${px(28)} ${px(28)} ${px(28)}` }}>
      <Text
        style={{
          fontSize: px(30),
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: px(-0.5),
          lineHeight: 1.05,
          marginBottom: px(6),
        }}
      >
        {info.name}
      </Text>

      <Text
        style={{
          fontSize: px(11),
          fontWeight: 600,
          color: "#EF9A9A",
          textTransform: "uppercase",
          letterSpacing: px(1.4),
          marginBottom: px(18),
        }}
      >
        {title}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "rgba(255,255,255,0.18)",
          marginBottom: px(14),
        }}
      />

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {contactItems.map((item, i) => (
          <View key={item.label} style={{ flexDirection: "row", alignItems: "center" }}>
            {i > 0 && (
              <Text style={{ fontSize: px(10), color: "rgba(255,255,255,0.25)", marginHorizontal: px(10) }}>
                |
              </Text>
            )}
            <Text style={{ fontSize: px(10), fontWeight: 600, color: "#E57373", marginRight: px(4) }}>
              {item.label}:
            </Text>
            <Text style={{ fontSize: px(10), color: "rgba(255,255,255,0.7)" }}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
