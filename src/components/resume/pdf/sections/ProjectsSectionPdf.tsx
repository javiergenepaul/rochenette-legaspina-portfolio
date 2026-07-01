import { Text, View } from "@react-pdf/renderer";
import { RESUME_PROJECTS_DATA } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { filterByCategory } from "@/utils/filterByCategory";
import { px } from "../px";

interface ProjectsSectionPdfProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
}

export function ProjectsSectionPdf({ category, theme, mode }: ProjectsSectionPdfProps) {
  const projects = filterByCategory(RESUME_PROJECTS_DATA, category);
  const isDark = mode === "dark";
  const isModern = theme === "modern";

  if (projects.length === 0) return null;

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
          Projects
        </Text>

        <View>
          {projects.map((project, idx) => (
            <View key={project.title} style={{ marginTop: idx === 0 ? 0 : px(16) }} wrap={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: px(12), fontFamily: "Times-Bold", color: textMain, flexGrow: 1 }}>
                  {project.title}
                  <Text style={{ fontSize: px(11.5), fontFamily: "Times-Roman", color: textSub }}>
                    {" "}— {project.role}
                  </Text>
                </Text>
                {project.period && (
                  <Text style={{ fontSize: px(10.5), color: textSub }}>{project.period}</Text>
                )}
              </View>

              {project.tools.length > 0 && (
                <Text style={{ fontSize: px(10), color: textSub, marginTop: px(4) }}>
                  {project.tools.join(" · ")}
                </Text>
              )}

              <View style={{ marginTop: px(4) }}>
                {project.bullets.resume.map((b, i) => (
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

  // ── Modern — card style in the main column ────────────────────────────────
  const textMain = isDark ? "#f0f0f0" : "#1a1a1a";
  const textSub = isDark ? "#bbbbbb" : "#555555";
  const bulletColor = isDark ? "#cccccc" : "#444444";
  const accent = "#D32F2F";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "#FFF0F0";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "#FFCDD2";
  const tagText = "#B71C1C";

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
          Projects
        </Text>
      </View>

      <View>
        {projects.map((project, idx) => (
          <View
            key={project.title}
            style={{
              backgroundColor: cardBg,
              borderWidth: 1,
              borderColor: cardBorder,
              borderRadius: px(6),
              padding: `${px(12)} ${px(14)}`,
              marginTop: idx === 0 ? 0 : px(12),
            }}
            wrap={false}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: px(6) }}>
              <Text style={{ fontSize: px(12.5), fontWeight: 700, color: accent, flexGrow: 1 }}>
                {project.title}
                <Text style={{ fontSize: px(11), fontWeight: 400, color: textSub }}> — {project.role}</Text>
              </Text>
              {project.period && (
                <Text style={{ fontSize: px(10), color: textSub }}>{project.period}</Text>
              )}
            </View>

            {project.tools.length > 0 && (
              <Text style={{ fontSize: px(9.5), fontWeight: 600, color: tagText, marginBottom: px(6) }}>
                {project.tools.join(" · ")}
              </Text>
            )}

            <View>
              {project.bullets.resume.map((b, i) => (
                <View key={i} style={{ flexDirection: "row", marginTop: i === 0 ? 0 : px(3) }}>
                  <Text style={{ fontSize: px(10), color: accent, marginRight: px(6) }}>•</Text>
                  <Text style={{ fontSize: px(10.5), color: bulletColor, lineHeight: 1.55, flexGrow: 1 }}>
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
