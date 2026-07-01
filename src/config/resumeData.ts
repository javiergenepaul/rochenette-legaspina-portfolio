/**
 * resumeData.ts — single source of truth for the resume builder.
 *
 * Content (names, descriptions, skills) is derived directly from constant.tsx
 * so any edit there is automatically reflected in the resume.
 *
 * Only resume-specific metadata lives here:
 *   - which resume categories each entry appears in
 *   - per-category role titles (e.g. "UI/UX Designer" vs "System Analyst")
 *   - certification years (not tracked in constant.tsx)
 */

import {
  WORK_EXPERIENCE,
  EDUCATION_EXPERIENCE,
  CERTIFICATION_EXPERIENCE,
  SKILLS_AND_TOOLS,
} from "@/config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ResumeCategory = "general" | "uiux" | "3d" | "systems";
export type ResumeTheme    = "simple"  | "modern";
export type ResumeMode     = "light"   | "dark";

// ---------------------------------------------------------------------------
// Personal Info  (resume-only — not tracked in constant.tsx)
// ---------------------------------------------------------------------------

export const RESUME_PERSONAL_INFO = {
  name:      "Rochenette Legaspina",
  email:     "rochenettelegaspina18@gmail.com",
  location:  "Alegria, Cebu",
  linkedin:  "linkedin.com/in/rochenette-legaspina-677a64263",
  portfolio: "rochenette-legaspina-portfolio.vercel.app/2026/en",
  titles: {
    general: "UI/UX Designer & System Analyst",
    uiux:    "UI/UX Designer",
    "3d":    "3D Modeller & UI/UX Designer",
    systems: "System Analyst & UI/UX Designer",
  } as Record<ResumeCategory, string>,
};

// ---------------------------------------------------------------------------
// Section config  (layout / ordering — not content)
// ---------------------------------------------------------------------------

export interface ResumeSectionConfig {
  key:        string;
  label:      string;
  component:  string;
  order:      number;
  visible:    boolean;
  categories: ResumeCategory[];
  variant?:   string;
  column:     "main" | "sidebar";
}

export const RESUME_SECTIONS: ResumeSectionConfig[] = [
  { key: "SummarySection",       label: "Professional Summary", component: "SummarySection",  order: 0, visible: true, categories: ["general","uiux","3d","systems"], column: "main"    },
  { key: "ExperienceSection",    label: "Work Experience", component: "ExperienceSection",    order: 1, visible: true, categories: ["general","uiux","3d","systems"], column: "main"    },
  { key: "ProjectsSection",      label: "Projects",        component: "ProjectsSection",      order: 2, visible: true, categories: ["general","uiux","3d","systems"], column: "main"    },
  { key: "SkillsSection",        label: "Skills & Tools",  component: "SkillsSection",        order: 3, visible: true, categories: ["general","uiux","3d","systems"], column: "sidebar" },
  { key: "EducationSection",     label: "Education",       component: "EducationSection",     order: 4, visible: true, categories: ["general","uiux","3d","systems"], column: "sidebar" },
  { key: "CertificationsSection",label: "Certifications",  component: "CertificationsSection",order: 5, visible: true, categories: ["general","uiux","systems"],      column: "sidebar" },
];

// ---------------------------------------------------------------------------
// Experience  — content from constant.tsx, metadata defined below
// ---------------------------------------------------------------------------

export interface ResumeExperienceEntry {
  company:    string;
  location:   string;
  period:     string;
  categories: ResumeCategory[];
  roles:      Record<ResumeCategory, string>;
  bullets:    { resume: string[] };
}

/** Resume-only metadata: which categories this job appears in + role title per category. */
const EXPERIENCE_META: {
  categories: ResumeCategory[];
  roles:      Record<ResumeCategory, string>;
}[] = [
  {
    // WORK_EXPERIENCE[0] — Alliance Software Inc.
    categories: ["general", "uiux", "systems"],
    roles: {
      general: "System Analyst & UI/UX Designer",
      uiux:    "UI/UX Designer",
      "3d":    "UI/UX Designer",
      systems: "System Analyst & UI/UX Designer",
    },
  },
  {
    // WORK_EXPERIENCE[1] — Mach95
    categories: ["general", "uiux", "3d"],
    roles: {
      general: "UI/UX Designer",
      uiux:    "UI/UX Designer",
      "3d":    "UI/UX Designer",
      systems: "UI/UX Designer",
    },
  },
  {
    // WORK_EXPERIENCE[2] — Exodia IT Solutions
    categories: ["general", "3d"],
    roles: {
      general: "3D Modeller & Substance Painter",
      uiux:    "3D Modeller & Substance Painter",
      "3d":    "3D Modeller & Substance Painter",
      systems: "3D Modeller & Substance Painter",
    },
  },
];

export const RESUME_EXPERIENCE_DATA: ResumeExperienceEntry[] = WORK_EXPERIENCE.map(
  (exp, i) => ({
    company:    exp.subTitle,
    location:   "Cebu, Philippines",
    period:     `${exp.startDate?.format("YYYY")} – ${exp.endDate?.format("YYYY")}`,
    categories: EXPERIENCE_META[i]?.categories ?? ["general"],
    roles:      EXPERIENCE_META[i]?.roles ?? { general: exp.title, uiux: exp.title, "3d": exp.title, systems: exp.title },
    bullets:    { resume: exp.description },
  }),
);

// ---------------------------------------------------------------------------
// Education  — content fully from constant.tsx
// ---------------------------------------------------------------------------

export interface ResumeEducationEntry {
  degree:  string;
  school:  string;
  period:  string;
  bullets: { resume: string[] };
}

export const RESUME_EDUCATION_DATA: ResumeEducationEntry[] = EDUCATION_EXPERIENCE.map(
  (edu) => ({
    degree:  edu.title,
    school:  edu.subTitle,
    period:  `${edu.startDate?.format("YYYY")} – ${edu.endDate?.format("YYYY")}`,
    bullets: { resume: edu.description },
  }),
);

// ---------------------------------------------------------------------------
// Certifications  — content from constant.tsx, year + categories defined below
// ---------------------------------------------------------------------------

export interface ResumeCertificationEntry {
  title:      string;
  org:        string;
  period?:    string;
  categories: ResumeCategory[];
  bullets:    { resume: string[] };
}

/**
 * Resume-only metadata: display year, which categories this cert appears in,
 * and an optional condensed bullet override. A one-time seminar doesn't need
 * the full 5-bullet About-page writeup on a resume — ATS reviewers read a
 * disproportionately long entry for a short course as padding, so this trims
 * it down using only the same underlying facts (no new claims added).
 */
const CERTIFICATION_META: { period?: string; categories: ResumeCategory[]; bullets?: string[] }[] = [
  {
    // CERTIFICATION_EXPERIENCE[0] — Data Analytics Course
    period:     "2023",
    categories: ["general", "uiux", "systems"],
    bullets: [
      "8-hour seminar at Alliance Software covering data visualization, dashboard analytics, and business intelligence reporting.",
    ],
  },
];

export const RESUME_CERTIFICATIONS_DATA: ResumeCertificationEntry[] =
  CERTIFICATION_EXPERIENCE.map((cert, i) => ({
    title:      cert.title,
    org:        cert.subTitle,
    period:     CERTIFICATION_META[i]?.period,
    categories: CERTIFICATION_META[i]?.categories ?? ["general"],
    bullets:    { resume: CERTIFICATION_META[i]?.bullets ?? cert.description },
  }));

// ---------------------------------------------------------------------------
// Skills  — content from constant.tsx, category filter defined below
// ---------------------------------------------------------------------------

export interface ResumeSkillEntry {
  name:       string;
  category:   string;
  categories: ResumeCategory[];
}

/** Resume-only metadata: which resume categories each skill appears in. */
const SKILL_META: { categories: ResumeCategory[] }[] = [
  { categories: ["general", "uiux", "systems"] }, // Figma
  { categories: ["general", "3d"]               }, // Blender
  { categories: ["general", "uiux", "3d"]       }, // Photoshop
  { categories: ["general", "uiux", "3d"]       }, // Adobe Illustrator
  { categories: ["general", "systems"]           }, // Microsoft Word
  { categories: ["general", "systems"]           }, // MS Excel
];

/**
 * Resume-only skills — process methods and tools confirmed by Rochenette
 * that aren't part of the site's icon carousel (no logo asset needed here,
 * this only feeds the resume's text-based skills list). Grouped under
 * "UX Process" to keep raw tool proficiency and design methodology scannable
 * as separate, ATS-matchable keyword groups.
 */
const RESUME_ONLY_SKILLS: ResumeSkillEntry[] = [
  { name: "Wireframing",           category: "UX Process",   categories: ["general", "uiux", "3d"] },
  { name: "Prototyping",           category: "UX Process",   categories: ["general", "uiux", "3d"] },
  { name: "User Research",         category: "UX Process",   categories: ["general", "uiux", "3d"] },
  { name: "Usability Testing",     category: "UX Process",   categories: ["general", "uiux", "3d"] },
  { name: "Design Systems",        category: "UX Process",   categories: ["general", "uiux", "3d"] },
  { name: "Web & Mobile App Design", category: "UX Process", categories: ["general", "uiux", "3d"] },
  { name: "Sketch",                category: "UI/UX Design", categories: ["general", "uiux", "3d"] },
  { name: "InVision",              category: "UI/UX Design", categories: ["general", "uiux", "3d"] },
  { name: "Zeplin",                category: "UI/UX Design", categories: ["general", "uiux", "3d"] },
];

export const RESUME_SKILLS_DATA: ResumeSkillEntry[] = [
  ...SKILLS_AND_TOOLS.map((skill, i) => ({
    name:       skill.title,       // "Figma", "Blender", …
    category:   skill.name,        // "UI/UX Design", "3D Modelling", …
    categories: SKILL_META[i]?.categories ?? ["general"],
  })),
  ...RESUME_ONLY_SKILLS,
];

// ---------------------------------------------------------------------------
// Projects  — resume-specific; no equivalent in constant.tsx
// ---------------------------------------------------------------------------

export interface ResumeProjectEntry {
  title:      string;
  role:       string;
  tools:      string[];
  period?:    string;
  categories: ResumeCategory[];
  bullets:    { resume: string[] };
}

export const RESUME_PROJECTS_DATA: ResumeProjectEntry[] = [
  {
    title:      "SC Claims",
    role:       "UI/UX Designer & System Analyst",
    tools:      ["Moqups", "Figma"],
    period:     "2023",
    categories: ["general", "uiux", "systems"],
    bullets: {
      resume: [
        "Served as System Analyst and UI/UX Designer.",
        "Designed workflow to replace manual discount calculation process.",
        "Performed QA testing to ensure system met requirements.",
      ],
    },
  },
  {
    title:      "YOO",
    role:       "UI/UX Designer",
    tools:      ["Figma"],
    period:     "2022",
    categories: ["general", "uiux"],
    bullets: {
      resume: [
        "Created system flow and wireframes from scratch.",
        "Provided high-fidelity designs for a food delivery and transport app.",
      ],
    },
  },
  {
    title:      "IQMK",
    role:       "UI/UX Designer",
    tools:      ["Figma"],
    period:     "2022",
    categories: ["general", "uiux"],
    bullets: {
      resume: [
        "Designed a wellness and financial goals app while maintaining brand identity.",
        "Focused on design clarity and intuitive user flow.",
      ],
    },
  },
  {
    title:      "CountryScape",
    role:       "UI/UX Designer",
    tools:      ["Figma"],
    period:     "2021",
    categories: ["general", "uiux"],
    bullets: {
      resume: [
        "Gathered requirements to align UI with user needs.",
        "Streamlined design process for intuitive hotel booking UX.",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Professional Summary — ATS-friendly lead paragraph, front-loads role +
// years of experience + core tools so keyword scanners hit a match early.
// Years are computed from RESUME_EXPERIENCE_DATA (not hand-typed) so this
// stays accurate as the work history changes.
// ---------------------------------------------------------------------------

function getExperienceYears(category: ResumeCategory): number {
  const years = RESUME_EXPERIENCE_DATA
    .filter((e) => e.categories.includes(category))
    .flatMap((e) => e.period.match(/\d{4}/g) ?? [])
    .map(Number);
  return years.length ? Math.max(...years) - Math.min(...years) : 0;
}

export const RESUME_SUMMARY: Record<ResumeCategory, string> = {
  general: `UI/UX Designer & System Analyst with ${getExperienceYears("general")}+ years of experience spanning product design, requirements documentation, and system analysis. Skilled in wireframing, prototyping, and user research, using Figma, Adobe Illustrator, and Microsoft Word to translate business requirements into functional specifications and user-centered interface designs.`,
  uiux: `UI/UX Designer with ${getExperienceYears("uiux")}+ years of experience designing web and mobile interfaces for e-commerce, logistics, and enterprise platforms. Skilled in wireframing, prototyping, user research, and usability testing, building consistent design systems with Figma, Sketch, and Adobe Illustrator.`,
  "3d": `3D Modeller & UI/UX Designer with ${getExperienceYears("3d")}+ years of experience across 3D asset creation, texturing, and interface design. Skilled in Blender and Substance Painter for 3D work, and Figma for wireframing and prototyping, with experience supporting VR platform development.`,
  systems: `System Analyst & UI/UX Designer with ${getExperienceYears("systems")}+ years of experience documenting functional specifications and analyzing business requirements. Combines systems analysis with UI/UX design skills — wireframing and design systems in Figma alongside Microsoft Word and Excel — to bridge technical and design workflows.`,
};
