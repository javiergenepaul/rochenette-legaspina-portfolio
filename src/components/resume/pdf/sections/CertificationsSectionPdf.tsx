import { Text, View } from "@react-pdf/renderer";
import { RESUME_CERTIFICATIONS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";
import { px } from "../px";

interface CertificationsSectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function CertificationsSectionPdf({ category, theme, mode }: CertificationsSectionPdfProps) {
  const entries = filterByCategory(RESUME_CERTIFICATIONS_DATA, category);
  const isDark = mode === "dark";
  const isModern = theme === "modern";

  if (entries.length === 0) return null;

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
          Certifications
        </Text>

        <View>
          {entries.map((entry, idx) => (
            <View key={entry.title} style={{ marginTop: idx === 0 ? 0 : px(14) }} wrap={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ fontSize: px(12), fontFamily: "Times-Bold", color: textMain }}>
                    {entry.title}
                  </Text>
                  <Text style={{ fontSize: px(11), color: textSub, marginTop: px(2) }}>{entry.org}</Text>
                </View>
                {entry.period && <Text style={{ fontSize: px(10.5), color: textSub }}>{entry.period}</Text>}
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

  // ── Modern — compact sidebar cards ────────────────────────────────────────
  const accent = "#D32F2F";
  const textMain = isDark ? "#e8d5ff" : "#651313";
  const textSub = isDark ? "#bbbbbb" : "#B71C1C";
  const textBody = isDark ? "#cccccc" : "#8B1A1A";
  const cardBg = isDark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "#EF9A9A";

  return (
    <View style={{ marginBottom: px(24) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(14) }}>
        <View style={{ width: px(3), height: px(12), backgroundColor: accent, borderRadius: px(2), marginRight: px(6) }} />
        <Text
          style={{ fontSize: px(10), fontWeight: 800, textTransform: "uppercase", letterSpacing: px(1.6), color: accent }}
        >
          Certifications
        </Text>
      </View>

      <View>
        {entries.map((entry, idx) => (
          <View
            key={entry.title}
            style={{
              backgroundColor: cardBg,
              borderWidth: 1,
              borderColor: cardBorder,
              borderRadius: px(5),
              padding: `${px(10)} ${px(12)}`,
              marginTop: idx === 0 ? 0 : px(10),
            }}
            wrap={false}
          >
            <Text style={{ fontSize: px(10.5), fontWeight: 700, color: textMain }}>{entry.title}</Text>
            <Text style={{ fontSize: px(9.5), color: textSub, marginTop: px(2) }}>{entry.org}</Text>
            {entry.period && (
              <Text style={{ fontSize: px(9), fontWeight: 600, color: accent, marginTop: px(3) }}>
                {entry.period}
              </Text>
            )}
            <View style={{ marginTop: px(6) }}>
              {entry.bullets.resume.map((b, i) => (
                <View key={i} style={{ flexDirection: "row", marginTop: i === 0 ? 0 : px(2) }}>
                  <Text style={{ fontSize: px(9.5), color: accent, marginRight: px(5) }}>•</Text>
                  <Text style={{ fontSize: px(9.5), color: textBody, lineHeight: 1.5, flexGrow: 1 }}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
