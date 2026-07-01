import { Text, View } from "@react-pdf/renderer";
import { RESUME_EXPERIENCE_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";
import { px } from "../px";

interface ExperienceSectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function ExperienceSectionPdf({ category, theme, mode }: ExperienceSectionPdfProps) {
  const entries = filterByCategory(RESUME_EXPERIENCE_DATA, category);
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
          Work Experience
        </Text>

        <View style={{ display: "flex", flexDirection: "column" }}>
          {entries.map((entry, idx) => (
            <View key={entry.company} style={{ marginTop: idx === 0 ? 0 : px(16) }} wrap={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexGrow: 1 }}>
                  <Text style={{ fontSize: px(12), fontFamily: "Times-Bold", color: textMain }}>
                    {entry.roles[category]}
                    <Text style={{ fontSize: px(11.5), fontFamily: "Times-Roman", color: textSub }}>
                      {" "}— {entry.company}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: px(10.5), color: textSub, marginTop: px(1) }}>
                    {entry.location}
                  </Text>
                </View>
                <Text style={{ fontSize: px(10.5), color: textSub }}>{entry.period}</Text>
              </View>

              <View style={{ marginTop: px(6) }}>
                {entry.bullets.resume.map((b, i) => (
                  <Text
                    key={i}
                    style={{
                      fontSize: px(11),
                      color: bulletColor,
                      lineHeight: 1.55,
                      marginTop: i === 0 ? 0 : px(2),
                    }}
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

  // ── Modern — timeline style in the main column ─────────────────────────────
  const textMain = isDark ? "#f0f0f0" : "#1a1a1a";
  const textSub = isDark ? "#bbbbbb" : "#555555";
  const bulletColor = isDark ? "#cccccc" : "#444444";
  const accent = "#D32F2F";

  return (
    <View style={{ marginBottom: px(26) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(16) }}>
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
          Work Experience
        </Text>
      </View>

      <View>
        {entries.map((entry, idx) => (
          <View
            key={entry.company}
            style={{
              borderLeftWidth: 1.5,
              borderLeftColor: "#EF9A9A",
              paddingLeft: px(14),
              marginTop: idx === 0 ? 0 : px(18),
            }}
            wrap={false}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexGrow: 1 }}>
                <Text style={{ fontSize: px(12.5), fontWeight: 700, color: accent }}>
                  {entry.roles[category]}
                </Text>
                <Text style={{ fontSize: px(11.5), fontWeight: 600, color: textMain, marginTop: px(1) }}>
                  {entry.company}
                </Text>
                <Text style={{ fontSize: px(10), color: textSub, marginTop: px(1) }}>
                  {entry.location}
                </Text>
              </View>
              <Text style={{ fontSize: px(10), color: accent, fontWeight: 600 }}>{entry.period}</Text>
            </View>

            <View style={{ marginTop: px(8) }}>
              {entry.bullets.resume.map((b, i) => (
                <View key={i} style={{ flexDirection: "row", marginTop: i === 0 ? 0 : px(3) }}>
                  <Text style={{ fontSize: px(10), color: accent, marginRight: px(6) }}>•</Text>
                  <Text style={{ fontSize: px(11), color: bulletColor, lineHeight: 1.55, flexGrow: 1 }}>
                    {b}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
