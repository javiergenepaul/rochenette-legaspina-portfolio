import { Document, Page, View } from "@react-pdf/renderer";
import { RESUME_SECTIONS } from "@/config/resumeData";
import type { ResumeCategory, ResumeTheme, ResumeMode } from "@/config/resumeData";
import { registerResumeFonts } from "./fonts";
import { HeaderSectionPdf } from "./sections/HeaderSectionPdf";
import { SummarySectionPdf } from "./sections/SummarySectionPdf";
import { ExperienceSectionPdf } from "./sections/ExperienceSectionPdf";
import { ProjectsSectionPdf } from "./sections/ProjectsSectionPdf";
import { EducationSectionPdf } from "./sections/EducationSectionPdf";
import { CertificationsSectionPdf } from "./sections/CertificationsSectionPdf";
import { SkillsSectionPdf } from "./sections/SkillsSectionPdf";
import { px } from "./px";

registerResumeFonts();

const sectionComponentMap: Record<
  string,
  React.ComponentType<{ category: ResumeCategory; theme: ResumeTheme; mode: ResumeMode }>
> = {
  SummarySection: SummarySectionPdf,
  ExperienceSection: ExperienceSectionPdf,
  ProjectsSection: ProjectsSectionPdf,
  EducationSection: EducationSectionPdf,
  CertificationsSection: CertificationsSectionPdf,
  SkillsSection: SkillsSectionPdf,
};

interface ResumeDocumentProps {
  category: ResumeCategory;
  theme: ResumeTheme;
  mode: ResumeMode;
  visibleSections: string[];
}

export function ResumeDocument({ category, theme, mode, visibleSections }: ResumeDocumentProps) {
  const isDark = mode === "dark";
  const isModern = theme === "modern";

  const activeSections = RESUME_SECTIONS.filter(
    (s) => s.categories.includes(category) && visibleSections.includes(s.key),
  ).sort((a, b) => a.order - b.order);

  if (isModern) {
    const mainSections = activeSections.filter((s) => s.column === "main");
    const sidebarSections = activeSections.filter((s) => s.column === "sidebar");
    const bodyBg = isDark ? "#18151f" : "#ffffff";
    const sidebarBg = isDark ? "#3A0000" : "#FFF0F0";
    const headerBg = isDark ? "#3A0000" : "#651313";

    return (
      <Document title={`Rochenette Legaspina — Resume (${category})`}>
        <Page size="A4" style={{ fontFamily: "Inter", backgroundColor: bodyBg }}>
          {/*
            Fixed, full-page-height colour panels — repeat automatically on
            every page at a constant size. Keeps the sidebar tint from
            stretching into an empty block on pages where its own content
            has already run out (a plain flex column re-measures per page
            and would otherwise stay as tall as the taller sibling column).
          */}
          <View fixed style={{ position: "absolute", top: 0, left: 0, width: px(220), height: "100%", backgroundColor: sidebarBg }} />
          <View fixed style={{ position: "absolute", top: 0, left: px(220), right: 0, height: "100%", backgroundColor: bodyBg }} />

          <View style={{ backgroundColor: headerBg }}>
            <HeaderSectionPdf category={category} theme={theme} mode={mode} />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: px(220), padding: `${px(28)} ${px(20)}` }}>
              {sidebarSections.map((s) => {
                const Component = sectionComponentMap[s.component];
                return Component ? (
                  <Component key={s.key} category={category} theme={theme} mode={mode} />
                ) : null;
              })}
            </View>

            <View style={{ flexGrow: 1, padding: `${px(28)} ${px(28)} ${px(28)} ${px(24)}` }}>
              {mainSections.map((s) => {
                const Component = sectionComponentMap[s.component];
                return Component ? (
                  <Component key={s.key} category={category} theme={theme} mode={mode} />
                ) : null;
              })}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  const bg = isDark ? "#1a1a1a" : "#ffffff";

  return (
    <Document title={`Rochenette Legaspina — Resume (${category})`}>
      <Page
        size="A4"
        style={{
          fontFamily: "Times-Roman",
          backgroundColor: bg,
          padding: `${px(48)} ${px(52)}`,
        }}
      >
        <HeaderSectionPdf category={category} theme={theme} mode={mode} />
        {activeSections.map((s) => {
          const Component = sectionComponentMap[s.component];
          return Component ? (
            <Component key={s.key} category={category} theme={theme} mode={mode} />
          ) : null;
        })}
      </Page>
    </Document>
  );
}
