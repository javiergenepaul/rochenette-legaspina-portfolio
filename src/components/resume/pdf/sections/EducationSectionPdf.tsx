import { Text, View } from "@react-pdf/renderer";
import { RESUME_EDUCATION_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { px } from "../px";

interface EducationSectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function EducationSectionPdf({ theme, mode }: EducationSectionPdfProps) {
  const entries = RESUME_EDUCATION_DATA;
  const isDark = mode === "dark";
  const isModern = theme === "modern";

  // ── Simple ─────────────────────────────────────────────────────────────────
  if (!isModern) {
    const textMain = isDark ? "#f0f0f0" : "#111111";
    const textSub = isDark ? "#999999" : "#555555";
    const bulletColor = isDark ? "#cccccc" : "#333333";
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
            marginBottom: px(14),
          }}
        >
          Education
        </Text>

        <View>
          {entries.map((entry, idx) => (
            <View key={entry.school} style={{ marginTop: idx === 0 ? 0 : px(14) }} wrap={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ fontSize: px(12), fontFamily: "Times-Bold", color: textMain }}>
                    {entry.degree}
                  </Text>
                  <Text style={{ fontSize: px(11), color: textSub, marginTop: px(2) }}>
                    {entry.school} · Cebu, PH
                  </Text>
                </View>
                <Text style={{ fontSize: px(10.5), color: textSub }}>{entry.period}</Text>
              </View>

              <View style={{ marginTop: px(6) }}>
                {entry.bullets.resume.map((b, i) => (
                  <Text
                    key={i}
                    style={{ fontSize: px(11), color: bulletColor, lineHeight: 1.55, marginTop: i === 0 ? 0 : px(2) }}
                  >
                    •  {b}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // ── Modern — compact sidebar style ────────────────────────────────────────
  const accent = "#D32F2F";
  const textMain = isDark ? "#e8d5ff" : "#651313";
  const textSub = isDark ? "#bbbbbb" : "#B71C1C";
  const textBody = isDark ? "#cccccc" : "#8B1A1A";
  const groupLabel = isDark ? "rgba(255,255,255,0.45)" : "#EF5350";

  return (
    <View style={{ marginBottom: px(24) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(14) }}>
        <View style={{ width: px(3), height: px(12), backgroundColor: accent, borderRadius: px(2), marginRight: px(6) }} />
        <Text
          style={{ fontSize: px(10), fontWeight: 800, textTransform: "uppercase", letterSpacing: px(1.6), color: accent }}
        >
          Education
        </Text>
      </View>

      <View>
        {entries.map((entry, idx) => (
          <View key={entry.school} style={{ marginTop: idx === 0 ? 0 : px(14) }} wrap={false}>
            <Text style={{ fontSize: px(11), fontWeight: 700, color: textMain, lineHeight: 1.3 }}>
              {entry.degree}
            </Text>
            <Text style={{ fontSize: px(10), color: textSub, marginTop: px(3) }}>{entry.school}</Text>
            <Text style={{ fontSize: px(10), color: groupLabel, marginTop: px(1) }}>Cebu, Philippines</Text>
            <Text style={{ fontSize: px(9.5), fontWeight: 600, color: accent, marginTop: px(3) }}>
              {entry.period}
            </Text>

            <View style={{ marginTop: px(8) }}>
              {entry.bullets.resume.map((b, i) => (
                <View key={i} style={{ flexDirection: "row", marginTop: i === 0 ? 0 : px(3) }}>
                  <Text style={{ fontSize: px(10), color: accent, marginRight: px(5) }}>•</Text>
                  <Text style={{ fontSize: px(10), color: textBody, lineHeight: 1.5, flexGrow: 1 }}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
