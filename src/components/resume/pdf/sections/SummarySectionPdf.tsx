import { Text, View } from "@react-pdf/renderer";
import { RESUME_SUMMARY } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { px } from "../px";

interface SummarySectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function SummarySectionPdf({ category, theme, mode }: SummarySectionPdfProps) {
  const isDark = mode === "dark";
  const isModern = theme === "modern";
  const summary = RESUME_SUMMARY[category];

  // ── Simple ─────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain = isDark ? "#f0f0f0" : "#111111";
    const ruleColor = isDark ? "#444444" : "#cccccc";

    return (
      <View style={{ marginBottom: px(22) }} wrap={false}>
        <Text
          style={{
            fontSize: px(11.5),
            fontFamily: "Times-Bold",
            textTransform: "uppercase",
            letterSpacing: px(1.4),
            color: textMain,
            borderBottomWidth: 1.5,
            borderBottomColor: ruleColor,
            paddingBottom: px(4),
            marginBottom: px(10),
          }}
        >
          Professional Summary
        </Text>
        <Text style={{ fontSize: px(11), color: textMain, lineHeight: 1.6 }}>{summary}</Text>
      </View>
    );
  }

  // ── Modern — main column, above Work Experience ─────────────────────────────
  const textMain = isDark ? "#f0f0f0" : "#1a1a1a";
  const accent = "#D32F2F";

  return (
    <View style={{ marginBottom: px(26) }} wrap={false}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(10) }}>
        <View style={{ width: px(3), height: px(14), backgroundColor: accent, borderRadius: px(2), marginRight: px(8) }} />
        <Text
          style={{
            fontSize: px(11),
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: px(1.6),
            color: accent,
          }}
        >
          Professional Summary
        </Text>
      </View>
      <Text style={{ fontSize: px(11), color: textMain, lineHeight: 1.6 }}>{summary}</Text>
    </View>
  );
}
