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

/** Resume-only metadata: display year and which categories this cert appears in. */
const CERTIFICATION_META: { period?: string; categories: ResumeCategory[] }[] = [
  {
    // CERTIFICATION_EXPERIENCE[0] — Data Analytics Course
    period:     "2023",
    categories: ["general", "uiux", "systems"],
  },
];

export const RESUME_CERTIFICATIONS_DATA: ResumeCertificationEntry[] =
  CERTIFICATION_EXPERIENCE.map((cert, i) => ({
    title:      cert.title,
    org:        cert.subTitle,
    period:     CERTIFICATION_META[i]?.period,
    categories: CERTIFICATION_META[i]?.categories ?? ["general"],
    bullets:    { resume: cert.description },
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

export const RESUME_SKILLS_DATA: ResumeSkillEntry[] = SKILLS_AND_TOOLS.map(
  (skill, i) => ({
    name:       skill.title,       // "Figma", "Blender", …
    category:   skill.name,        // "UI/UX Design", "3D Modelling", …
    categories: SKILL_META[i]?.categories ?? ["general"],
  }),
);

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
