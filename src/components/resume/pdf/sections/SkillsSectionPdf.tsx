import { Text, View } from "@react-pdf/renderer";
import { RESUME_SKILLS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";
import { px } from "../px";

interface SkillsSectionPdfProps {
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

export function SkillsSectionPdf({ category, theme, mode }: SkillsSectionPdfProps) {
  const skills = filterByCategory(RESUME_SKILLS_DATA, category);
  const isDark = mode === "dark";
  const isModern = theme === "modern";

  if (skills.length === 0) return null;

  // ── Simple ─────────────────────────────────────────────────────────────────
  // Grouped "Category: skill, skill" lines — plain commas/colons parse more
  // reliably across ATS engines than per-item em-dash pairs.
  if (!isModern) {
    const textMain = isDark ? "#f0f0f0" : "#111111";
    const textSub = isDark ? "#999999" : "#555555";
    const ruleColor = isDark ? "#444444" : "#cccccc";
    const groups = groupBy(skills);

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
          Skills &amp; Tools
        </Text>

        <View>
          {Object.entries(groups).map(([groupName, items], idx) => (
            <Text key={groupName} style={{ fontSize: px(11), lineHeight: 1.5, marginTop: idx === 0 ? 0 : px(6) }}>
              <Text style={{ fontFamily: "Times-Bold", color: textMain }}>{groupName}: </Text>
              <Text style={{ fontFamily: "Times-Roman", color: textSub }}>
                {items.map((skill) => skill.name).join(", ")}
              </Text>
            </Text>
          ))}
        </View>
      </View>
    );
  }

  // ── Modern — sidebar style ─────────────────────────────────────────────────
  const accent = "#D32F2F";
  const tagText = isDark ? "#e8d5ff" : "#8B1A1A";
  const groupLabel = isDark ? "rgba(255,255,255,0.45)" : "#EF5350";
  const groups = groupBy(skills);

  return (
    <View style={{ marginBottom: px(24) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: px(14) }}>
        <View style={{ width: px(3), height: px(12), backgroundColor: accent, borderRadius: px(2), marginRight: px(6) }} />
        <Text
          style={{ fontSize: px(10), fontWeight: 800, textTransform: "uppercase", letterSpacing: px(1.6), color: accent }}
        >
          Skills &amp; Tools
        </Text>
      </View>

      <View>
        {Object.entries(groups).map(([groupName, items], idx) => (
          <View key={groupName} style={{ marginTop: idx === 0 ? 0 : px(12) }}>
            <Text
              style={{
                fontSize: px(9),
                fontWeight: 700,
                color: groupLabel,
                textTransform: "uppercase",
                letterSpacing: px(0.9),
                marginBottom: px(6),
              }}
            >
              {groupName}
            </Text>
            <Text style={{ fontSize: px(10), color: tagText, fontWeight: 500, lineHeight: 1.6 }}>
              {items.map((skill) => skill.name).join(" · ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
