import * as ASSETS from "@/assets";
import { translate } from "@/lib";
import i18n from "@/i18n/server";
import { PATH } from "./path";
import {
  AboutMeContentInterface,
  NavLinksInterface,
  ProjectInterface,
  SkillsAndToolsInterface,
  SocialLinksInterface,
} from "./types";
import { TxKeyPath } from "@/i18n";
import moment from "moment";

export const locale =
  typeof window !== "undefined" ? navigator.language.split("-")[0] : "en";

/**
 * Locale-aware translation snapshot. Takes the current route locale
 * (e.g. from usePathname) rather than relying on module-load-time state,
 * since i18n/server.ts's instance is a fixed, un-mutated "en" instance
 * shared across requests — getFixedT reads a language without touching it.
 */
const getTranslations = (lng: string = "en") => {
  const t = i18n.getFixedT(lng);

  const getProjectInformationDescription = (
    project: "countryScape" | "scClaims" | "iqmk" | "yoo",
    section: "contribution" | "tools" | "challenge",
    count: number
  ) => {
    return Array.from({ length: count }, (_, i) =>
      translate(
        t,
        `project.information.${[project]}.${section}.${i + 1}` as TxKeyPath
      )
    );
  };

  return {
    work: {
      alliance: {
        title: translate(t, "about.work.experience.alliance.title"),
        companyName: translate(t, "about.work.experience.alliance.companyName"),
        description: {
          1: translate(t, "about.work.experience.alliance.description.1"),
          2: translate(t, "about.work.experience.alliance.description.2"),
          3: translate(t, "about.work.experience.alliance.description.3"),
          4: translate(t, "about.work.experience.alliance.description.4"),
          5: translate(t, "about.work.experience.alliance.description.5"),
        },
        imageAlt: translate(t, "about.work.experience.alliance.imageAlt"),
      },
      mach95: {
        title: translate(t, "about.work.experience.mach95.title"),
        companyName: translate(t, "about.work.experience.mach95.companyName"),
        description: {
          1: translate(t, "about.work.experience.mach95.description.1"),
          2: translate(t, "about.work.experience.mach95.description.2"),
          3: translate(t, "about.work.experience.mach95.description.3"),
          4: translate(t, "about.work.experience.mach95.description.4"),
        },
        imageAlt: translate(t, "about.work.experience.mach95.imageAlt"),
      },
      exodia: {
        title: translate(t, "about.work.experience.exodia.title"),
        companyName: translate(t, "about.work.experience.exodia.companyName"),
        description: {
          1: translate(t, "about.work.experience.exodia.description.1"),
          2: translate(t, "about.work.experience.exodia.description.2"),
          3: translate(t, "about.work.experience.exodia.description.3"),
          4: translate(t, "about.work.experience.exodia.description.4"),
        },
        imageAlt: translate(t, "about.work.experience.exodia.imageAlt"),
      },
    },
    education: {
      title: translate(t, "about.education.degree.computerEngineering.title"),
      subTitle: translate(
        t,
        "about.education.degree.computerEngineering.school"
      ),
      description: {
        1: translate(
          t,
          "about.education.degree.computerEngineering.description.1"
        ),
        2: translate(
          t,
          "about.education.degree.computerEngineering.description.2"
        ),
        3: translate(
          t,
          "about.education.degree.computerEngineering.description.3"
        ),
      },
      imageAlt: translate(
        t,
        "about.education.degree.computerEngineering.imageAlt"
      ),
    },
    certification: {
      dataAnalytics: {
        title: translate(
          t,
          "about.certificate.certificates.dataAnalytics.title"
        ),
        subTitle: translate(
          t,
          "about.certificate.certificates.dataAnalytics.organization"
        ),
        description: {
          1: translate(
            t,
            "about.certificate.certificates.dataAnalytics.description.1"
          ),
          2: translate(
            t,
            "about.certificate.certificates.dataAnalytics.description.2"
          ),
          3: translate(
            t,
            "about.certificate.certificates.dataAnalytics.description.3"
          ),
          4: translate(
            t,
            "about.certificate.certificates.dataAnalytics.description.4"
          ),
          5: translate(
            t,
            "about.certificate.certificates.dataAnalytics.description.5"
          ),
        },
        imageAlt: translate(
          t,
          "about.certificate.certificates.dataAnalytics.imageAlt"
        ),
      },
      systemAnalyst: {
        title: translate(
          t,
          "about.certificate.certificates.systemAnalyst.title"
        ),
        subTitle: translate(
          t,
          "about.certificate.certificates.systemAnalyst.organization"
        ),
        description: {
          1: translate(
            t,
            "about.certificate.certificates.systemAnalyst.description.1"
          ),
          2: translate(
            t,
            "about.certificate.certificates.systemAnalyst.description.2"
          ),
          3: translate(
            t,
            "about.certificate.certificates.systemAnalyst.description.3"
          ),
          4: translate(
            t,
            "about.certificate.certificates.systemAnalyst.description.4"
          ),
          5: translate(
            t,
            "about.certificate.certificates.systemAnalyst.description.5"
          ),
        },
        imageAlt: translate(
          t,
          "about.certificate.certificates.systemAnalyst.imageAlt"
        ),
      },
    },
    projects: {
      information: {
        title: {
          contribution: translate(t, "project.information.title.contribution"),
          tools: translate(t, "project.information.title.tools"),
          challenge: translate(t, "project.information.title.challenge"),
        },
        scClaims: {
          challenge: getProjectInformationDescription(
            "scClaims",
            "challenge",
            2
          ),
          contribution: getProjectInformationDescription(
            "scClaims",
            "contribution",
            5
          ),
          tools: getProjectInformationDescription("scClaims", "tools", 2),
        },
        yoo: {
          constribution: getProjectInformationDescription(
            "yoo",
            "contribution",
            5
          ),
          challenge: getProjectInformationDescription("yoo", "challenge", 2),
          tools: getProjectInformationDescription("yoo", "tools", 1),
        },
        countryScape: {
          contribution: getProjectInformationDescription(
            "countryScape",
            "contribution",
            4
          ),
          tools: getProjectInformationDescription("countryScape", "tools", 1),
          challenge: getProjectInformationDescription(
            "countryScape",
            "challenge",
            4
          ),
        },
        iqmk: {
          contribution: getProjectInformationDescription(
            "iqmk",
            "contribution",
            4
          ),
          tools: getProjectInformationDescription("iqmk", "tools", 1),
          challenge: getProjectInformationDescription("iqmk", "challenge", 3),
        },
      },
      scClaims: {
        title: translate(t, "project.projects.scClaims.title"),
        role: translate(t, "project.projects.scClaims.role"),
        description: translate(t, "project.projects.scClaims.description"),
      },
      yoo: {
        title: translate(t, "project.projects.yoo.title"),
        role: translate(t, "project.projects.yoo.role"),
        description: translate(t, "project.projects.yoo.description"),
      },
      countryScape: {
        title: translate(t, "project.projects.countryScape.title"),
        role: translate(t, "project.projects.countryScape.role"),
        description: translate(t, "project.projects.countryScape.description"),
      },
      iqmk: {
        title: translate(t, "project.projects.iqmk.title"),
        role: translate(t, "project.projects.iqmk.role"),
        description: translate(t, "project.projects.iqmk.description"),
      },
    },
  };
};

export const LINK_URL = {
  linkedIn: "https://www.linkedin.com/in/rochenette-legaspina-677a64263/",
  behance: "https://www.behance.net/rochenelegaspi/analytics",
  UC: "https://www.universityofcebu.net/",
  alliance: "https://www.alliance.com.ph/",
  mach95: "https://mach95.com/",
  exodia: "https://exodiagamedev.com/",
  figma: "https://www.figma.com/",
  blender: "https://www.blender.org/",
  word: "https://www.microsoft.com/en-us/microsoft-365/word",
  excel: "https://www.microsoft.com/en-us/microsoft-365/excel",
  upwork: "https://www.upwork.com/freelancers/~018a61313da14e7d96",
};

export function getWorkExperience(lng: string = "en"): AboutMeContentInterface[] {
  const translations = getTranslations(lng);
  return [
    // Alliance
    {
      title: translations.work.alliance.title,
      subTitle: translations.work.alliance.companyName,
      description: [
        translations.work.alliance.description[1],
        translations.work.alliance.description[2],
        translations.work.alliance.description[3],
        translations.work.alliance.description[4],
        translations.work.alliance.description[5],
      ],
      image: ASSETS.AllianceLogo,
      imageAlt: translations.work.alliance.imageAlt,
      backgroundColor: "bg-[#FFDADA]",
      url: LINK_URL.alliance,
      startDate: moment("2023"),
      endDate: moment("2025"),
    },
    // Mach95
    {
      title: translations.work.mach95.title,
      subTitle: translations.work.mach95.companyName,
      description: [
        translations.work.mach95.description[1],
        translations.work.mach95.description[2],
        translations.work.mach95.description[3],
        translations.work.mach95.description[4],
      ],
      image: ASSETS.Mach95Logo,
      imageAlt: translations.work.mach95.imageAlt,
      backgroundColor: "bg-[#D0CFFF]",
      url: LINK_URL.mach95,
      startDate: moment("2021"),
      endDate: moment("2023"),
    },
    // Exodia
    {
      title: translations.work.exodia.title,
      subTitle: translations.work.exodia.companyName,
      description: [
        translations.work.exodia.description[1],
        translations.work.exodia.description[2],
        translations.work.exodia.description[3],
        translations.work.exodia.description[4],
      ],
      image: ASSETS.ExodiaLogo,
      imageAlt: translations.work.exodia.imageAlt,
      backgroundColor: "bg-[#FBCBB2]",
      url: LINK_URL.exodia,
      startDate: moment("2019"),
      endDate: moment("2021"),
    },
  ];
}

export const WORK_EXPERIENCE: AboutMeContentInterface[] = getWorkExperience("en");

export const SKILLS_AND_TOOLS: SkillsAndToolsInterface[] = [
  {
    image: ASSETS.FigmaLogo,
    title: "Figma",
    url: LINK_URL.figma,
    alt: "Figma Logo",
    name: "UI/UX Design",
    designation: "Figma",
  },
  {
    image: ASSETS.BlenderLogo,
    title: "Blender",
    url: LINK_URL.blender,
    alt: "Blender Logo",
    name: "3D Modelling",
    designation: "Blender",
  },
  {
    image: ASSETS.PsLogo,
    title: "Photoshop",
    url: LINK_URL.blender,
    alt: "Photoshop Logo",
    name: "Photo Editing",
    designation: "Photoshop",
  },
  {
    image: ASSETS.AiLogo,
    title: "Adobe Illustrator",
    url: LINK_URL.blender,
    alt: "Adobe Illustrator Logo",
    name: "Logo Creation",
    designation: "Adobe Illustrator",
  },
  {
    image: ASSETS.WordLogo,
    title: "Microsoft Word",
    url: LINK_URL.word,
    alt: "MS Word Logo",
    name: "Document Editing",
    designation: "MS Word",
  },
  {
    image: ASSETS.ExcelLogo,
    title: "Excel",
    url: LINK_URL.excel,
    alt: "Excel Logo",
    name: "Data Management",
    designation: "MS Excel",
  },
];

export function getEducationExperience(lng: string = "en"): AboutMeContentInterface[] {
  const translations = getTranslations(lng);
  return [
    {
      title: translations.education.title,
      subTitle: translations.education.subTitle,
      description: [
        translations.education.description[1],
        translations.education.description[2],
        translations.education.description[3],
      ],
      image: ASSETS.UCLogo,
      imageAlt: translations.education.imageAlt,
      startDate: moment("2016"),
      endDate: moment("2021"),
    },
  ];
}

export const EDUCATION_EXPERIENCE: AboutMeContentInterface[] = getEducationExperience("en");

export function getCertificationExperience(lng: string = "en"): AboutMeContentInterface[] {
  const translations = getTranslations(lng);
  return [
    {
      title: translations.certification.dataAnalytics.title,
      subTitle: translations.certification.dataAnalytics.subTitle,
      description: [
        translations.certification.dataAnalytics.description[1],
        translations.certification.dataAnalytics.description[2],
        translations.certification.dataAnalytics.description[3],
        translations.certification.dataAnalytics.description[4],
        translations.certification.dataAnalytics.description[5],
      ],
      image: ASSETS.CITLogo,
      imageAlt: translations.certification.dataAnalytics.imageAlt,
      backgroundColor: "#FDEEBA",
    },
    // {
    //   title: translations.certification.systemAnalyst.title,
    //   subTitle: translations.certification.systemAnalyst.subTitle,
    //   description: [
    //     translations.certification.systemAnalyst.description[1],
    //     translations.certification.systemAnalyst.description[2],
    //     translations.certification.systemAnalyst.description[3],
    //     translations.certification.systemAnalyst.description[4],
    //     translations.certification.systemAnalyst.description[5],
    //   ],
    //   image: ASSETS.CITLogo,
    //   imageAlt: translations.certification.systemAnalyst.imageAlt,
    //   backgroundColor: "#FDEEBA",
    // },
  ];
}

export const CERTIFICATION_EXPERIENCE: AboutMeContentInterface[] = getCertificationExperience("en");

export const SOCIAL_LINKS: SocialLinksInterface[] = [
  // Linkedin
  {
    name: "LinkedIn",
    image: ASSETS.LinkedInIcon,
    url: LINK_URL.linkedIn,
    alt: "LinkedIn Icon",
    sidebarIcon: (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1117 0.5H0.885937C0.396094 0.5 0 0.886719 0 1.36484V11.6328C0 12.1109 0.396094 12.5 0.885937 12.5H11.1117C11.6016 12.5 12 12.1109 12 11.6352V1.36484C12 0.886719 11.6016 0.5 11.1117 0.5ZM3.56016 10.7258H1.77891V4.99766H3.56016V10.7258ZM2.66953 4.21719C2.09766 4.21719 1.63594 3.75547 1.63594 3.18594C1.63594 2.61641 2.09766 2.15469 2.66953 2.15469C3.23906 2.15469 3.70078 2.61641 3.70078 3.18594C3.70078 3.75312 3.23906 4.21719 2.66953 4.21719ZM10.2258 10.7258H8.44687V7.94141C8.44687 7.27813 8.43516 6.42266 7.52109 6.42266C6.59531 6.42266 6.45469 7.14688 6.45469 7.89453V10.7258H4.67813V4.99766H6.38437V5.78047H6.40781C6.64453 5.33047 7.22578 4.85469 8.09063 4.85469C9.89297 4.85469 10.2258 6.04063 10.2258 7.58281V10.7258V10.7258Z"
          fill="#645C6D"
        />
      </svg>
    ),
    darkSidebarIcon: (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1117 0.5H0.885937C0.396094 0.5 0 0.886719 0 1.36484V11.6328C0 12.1109 0.396094 12.5 0.885937 12.5H11.1117C11.6016 12.5 12 12.1109 12 11.6352V1.36484C12 0.886719 11.6016 0.5 11.1117 0.5ZM3.56016 10.7258H1.77891V4.99766H3.56016V10.7258ZM2.66953 4.21719C2.09766 4.21719 1.63594 3.75547 1.63594 3.18594C1.63594 2.61641 2.09766 2.15469 2.66953 2.15469C3.23906 2.15469 3.70078 2.61641 3.70078 3.18594C3.70078 3.75312 3.23906 4.21719 2.66953 4.21719ZM10.2258 10.7258H8.44687V7.94141C8.44687 7.27813 8.43516 6.42266 7.52109 6.42266C6.59531 6.42266 6.45469 7.14688 6.45469 7.89453V10.7258H4.67813V4.99766H6.38437V5.78047H6.40781C6.64453 5.33047 7.22578 4.85469 8.09063 4.85469C9.89297 4.85469 10.2258 6.04063 10.2258 7.58281V10.7258V10.7258Z"
          fill="#FBF4FF"
        />
      </svg>
    ),
  },
  // Upwork
  {
    name: "Upwork",
    image: ASSETS.UpworkIcon,
    url: LINK_URL.upwork,
    alt: "Upwork Icon",
    sidebarIcon: (
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.2803 5.04572C8.72841 5.04572 8.21132 4.82603 7.74146 4.46845L7.85582 3.96363L7.86079 3.94493C7.96271 3.40739 8.2859 2.50526 9.2803 2.50526C10.0261 2.50526 10.6327 3.07552 10.6327 3.77666C10.6302 4.47546 10.0236 5.04572 9.2803 5.04572ZM9.2803 1.2175C8.00995 1.2175 7.02549 1.99343 6.62524 3.2695C6.01368 2.4071 5.55128 1.37175 5.28031 0.5H3.913V3.84444C3.913 4.50351 3.34122 5.04105 2.64016 5.04105C1.93911 5.04105 1.36732 4.50351 1.36732 3.84444V0.5H1.55784e-05V3.84444C-0.00495645 5.21399 1.18087 6.33815 2.63768 6.33815C4.09448 6.33815 5.28031 5.21399 5.28031 3.84444V3.28352C5.54631 3.8047 5.87198 4.33056 6.26725 4.79798L5.42947 8.5H6.82909L7.43568 5.81464C7.96769 6.13482 8.57925 6.33582 9.2803 6.33582C10.7794 6.33582 12 5.18127 12 3.77198C12 2.36503 10.7794 1.2175 9.2803 1.2175Z"
          fill="#645C6D"
        />
      </svg>
    ),
    darkSidebarIcon: (
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.2803 5.04572C8.72841 5.04572 8.21132 4.82603 7.74146 4.46845L7.85582 3.96363L7.86079 3.94493C7.96271 3.40739 8.2859 2.50526 9.2803 2.50526C10.0261 2.50526 10.6327 3.07552 10.6327 3.77666C10.6302 4.47546 10.0236 5.04572 9.2803 5.04572ZM9.2803 1.2175C8.00995 1.2175 7.02549 1.99343 6.62524 3.2695C6.01368 2.4071 5.55128 1.37175 5.28031 0.5H3.913V3.84444C3.913 4.50351 3.34122 5.04105 2.64016 5.04105C1.93911 5.04105 1.36732 4.50351 1.36732 3.84444V0.5H1.55784e-05V3.84444C-0.00495645 5.21399 1.18087 6.33815 2.63768 6.33815C4.09448 6.33815 5.28031 5.21399 5.28031 3.84444V3.28352C5.54631 3.8047 5.87198 4.33056 6.26725 4.79798L5.42947 8.5H6.82909L7.43568 5.81464C7.96769 6.13482 8.57925 6.33582 9.2803 6.33582C10.7794 6.33582 12 5.18127 12 3.77198C12 2.36503 10.7794 1.2175 9.2803 1.2175Z"
          fill="white"
        />
      </svg>
    ),
  },
  // Behance
  {
    name: "Behance",
    image: ASSETS.BehanceIcon,
    url: LINK_URL.behance,
    alt: "Behance Icon",
    sidebarIcon: (
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.81 1.06055H7.82214V1.82435H10.81V1.06055Z"
          fill="#645C6D"
        />
        <path
          d="M8.48448 6.96368C8.61168 7.08158 8.76152 7.17239 8.92491 7.2306C9.08829 7.2888 9.2618 7.31318 9.43489 7.30226C9.7093 7.30919 9.97838 7.22571 10.2007 7.06466C10.3815 6.94707 10.5185 6.77306 10.5902 6.56965H11.8827C11.745 7.14873 11.4087 7.66123 10.9323 8.01805C10.4753 8.3214 9.93515 8.47503 9.38688 8.45761C8.99557 8.46275 8.60722 8.38918 8.24489 8.2413C7.91714 8.10461 7.62319 7.898 7.38358 7.6359C7.14487 7.36126 6.96149 7.04307 6.84352 6.69885C6.71111 6.31408 6.64629 5.90929 6.65195 5.50241C6.64954 5.10236 6.71653 4.70491 6.84996 4.32775C7.02921 3.79716 7.37193 3.33699 7.82895 3.01328C8.28598 2.68957 8.8338 2.51895 9.39381 2.52592C9.80726 2.51728 10.2161 2.61404 10.5818 2.80709C10.9124 2.98836 11.1976 3.24223 11.4159 3.5496C11.6393 3.87213 11.7993 4.23412 11.8877 4.61634C11.9845 5.02679 12.0191 5.44948 11.9901 5.8702H8.14045C8.10925 6.26549 8.23258 6.65746 8.48448 6.96368V6.96368ZM10.1734 4.00897C10.0657 3.90122 9.93615 3.8178 9.79346 3.76435C9.65078 3.7109 9.4983 3.68864 9.34629 3.69909C9.14462 3.6914 8.94441 3.73608 8.76515 3.82879C8.62303 3.90702 8.49759 4.01229 8.39587 4.13866C8.30573 4.25715 8.23857 4.39146 8.19787 4.53467C8.16119 4.6541 8.13827 4.77733 8.12955 4.90197H10.514C10.4932 4.57707 10.3749 4.266 10.1744 4.00946L10.1734 4.00897Z"
          fill="#645C6D"
        />
        <path
          d="M3.47348 0.541708C3.79772 0.535688 4.1215 0.56893 4.43775 0.64071C4.70403 0.698844 4.95684 0.807023 5.18274 0.959496C5.39138 1.11111 5.55646 1.31495 5.66142 1.55054C5.78204 1.84023 5.84023 2.15211 5.83219 2.46581C5.84589 2.81026 5.75792 3.15112 5.57924 3.44592C5.39127 3.72436 5.13145 3.94672 4.82733 4.08944C5.24004 4.2007 5.59951 4.45556 5.8411 4.80819C6.07303 5.18182 6.1896 5.61556 6.17623 6.05512C6.18388 6.40558 6.11141 6.75316 5.96436 7.07137C5.82844 7.34896 5.62941 7.59087 5.38322 7.77775C5.12976 7.96257 4.84453 8.09931 4.54171 8.18118C4.22767 8.26805 3.90326 8.31169 3.57743 8.31087H0V0.541708H3.47348ZM3.26706 3.68402C3.52182 3.69453 3.7726 3.61826 3.97839 3.46771C4.07694 3.37997 4.1536 3.2704 4.20225 3.14775C4.2509 3.02509 4.27018 2.89276 4.25856 2.76133C4.26516 2.60782 4.23459 2.45498 4.16946 2.31582C4.11421 2.20502 4.0283 2.11241 3.92196 2.04901C3.81424 1.97922 3.69322 1.93253 3.56654 1.91189C3.42909 1.88527 3.28923 1.87315 3.14925 1.87576H1.62066V3.69095H3.26706V3.68402ZM3.35616 6.99167C3.51023 6.99376 3.66398 6.97714 3.81404 6.94217C3.95118 6.91189 4.08124 6.85559 4.19718 6.77634C4.31076 6.69714 4.40253 6.59056 4.46399 6.46647C4.53525 6.30824 4.56799 6.13538 4.55953 5.96205C4.57498 5.80411 4.55406 5.64472 4.49837 5.4961C4.44268 5.34749 4.35371 5.2136 4.23827 5.1047C3.99358 4.92448 3.69373 4.83521 3.39032 4.85225H1.62066V6.99167H3.35616Z"
          fill="#645C6D"
        />
      </svg>
    ),
    darkSidebarIcon: (
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.81 1.06055H7.82214V1.82435H10.81V1.06055Z"
          fill="#F7F7F8"
        />
        <path
          d="M8.48442 6.96368C8.61162 7.08158 8.76146 7.17239 8.92485 7.2306C9.08823 7.2888 9.26174 7.31318 9.43483 7.30226C9.70924 7.30919 9.97832 7.22571 10.2006 7.06466C10.3815 6.94707 10.5184 6.77306 10.5902 6.56965H11.8827C11.7449 7.14873 11.4086 7.66123 10.9322 8.01805C10.4752 8.3214 9.93509 8.47503 9.38682 8.45761C8.99551 8.46275 8.60716 8.38918 8.24483 8.2413C7.91708 8.10461 7.62312 7.898 7.38352 7.6359C7.14481 7.36126 6.96143 7.04307 6.84346 6.69885C6.71104 6.31408 6.64623 5.90929 6.65189 5.50241C6.64948 5.10236 6.71647 4.70491 6.8499 4.32775C7.02914 3.79716 7.37187 3.33699 7.82889 3.01328C8.28592 2.68957 8.83374 2.51895 9.39375 2.52592C9.8072 2.51728 10.216 2.61404 10.5818 2.80709C10.9124 2.98836 11.1975 3.24223 11.4159 3.5496C11.6392 3.87213 11.7993 4.23412 11.8876 4.61634C11.9845 5.02679 12.019 5.44948 11.9901 5.8702H8.14038C8.10919 6.26549 8.23252 6.65746 8.48442 6.96368V6.96368ZM10.1734 4.00897C10.0657 3.90122 9.93609 3.8178 9.7934 3.76435C9.65072 3.7109 9.49823 3.68864 9.34622 3.69909C9.14456 3.6914 8.94435 3.73608 8.76509 3.82879C8.62297 3.90702 8.49753 4.01229 8.39581 4.13866C8.30567 4.25715 8.23851 4.39146 8.1978 4.53467C8.16113 4.6541 8.13821 4.77733 8.12949 4.90197H10.514C10.4932 4.57707 10.3748 4.266 10.1744 4.00946L10.1734 4.00897Z"
          fill="#F7F7F8"
        />
        <path
          d="M3.47348 0.541708C3.79772 0.535688 4.1215 0.56893 4.43775 0.64071C4.70403 0.698844 4.95684 0.807023 5.18274 0.959496C5.39138 1.11111 5.55646 1.31495 5.66142 1.55054C5.78204 1.84023 5.84023 2.15211 5.83219 2.46581C5.84589 2.81026 5.75792 3.15112 5.57924 3.44592C5.39127 3.72436 5.13145 3.94672 4.82733 4.08944C5.24004 4.2007 5.59951 4.45556 5.8411 4.80819C6.07303 5.18182 6.1896 5.61556 6.17623 6.05512C6.18388 6.40558 6.11141 6.75316 5.96436 7.07137C5.82844 7.34896 5.62941 7.59087 5.38322 7.77775C5.12976 7.96257 4.84453 8.09931 4.54171 8.18118C4.22767 8.26805 3.90326 8.31169 3.57743 8.31087H0V0.541708H3.47348ZM3.26706 3.68402C3.52182 3.69453 3.7726 3.61826 3.97839 3.46771C4.07694 3.37997 4.1536 3.2704 4.20225 3.14775C4.2509 3.02509 4.27018 2.89276 4.25856 2.76133C4.26516 2.60782 4.23459 2.45498 4.16946 2.31582C4.11421 2.20502 4.0283 2.11241 3.92196 2.04901C3.81424 1.97922 3.69322 1.93253 3.56654 1.91189C3.42909 1.88527 3.28923 1.87315 3.14925 1.87576H1.62066V3.69095H3.26706V3.68402ZM3.35616 6.99167C3.51023 6.99376 3.66398 6.97714 3.81404 6.94217C3.95118 6.91189 4.08124 6.85559 4.19718 6.77634C4.31076 6.69714 4.40253 6.59056 4.46399 6.46647C4.53525 6.30824 4.56799 6.13538 4.55953 5.96205C4.57498 5.80411 4.55406 5.64472 4.49837 5.4961C4.44268 5.34749 4.35371 5.2136 4.23827 5.1047C3.99358 4.92448 3.69373 4.83521 3.39032 4.85225H1.62066V6.99167H3.35616Z"
          fill="#F7F7F8"
        />
      </svg>
    ),
  },
];

export const getNavLinks = (year: string, locale: string): NavLinksInterface[] => {
  const t = i18n.getFixedT(locale);
  return [
    { label: translate(t, "navigation.home"), to: PATH.HOME.getPath(year, locale) },
    { label: translate(t, "navigation.about"), to: PATH.ABOUT.getPath(year, locale) },
    { label: translate(t, "navigation.project"), to: PATH.PROJECT.getPath(year, locale) },
    { label: translate(t, "navigation.contact"), to: PATH.CONTACT.getPath(year, locale) },
  ];
};

export function getProjects(lng: string = "en"): ProjectInterface[] {
  const translations = getTranslations(lng);
  return [
    // SC Claims
    {
      title: translations.projects.scClaims.title,
      role: translations.projects.scClaims.role,
      desciption: translations.projects.scClaims.description,
      information: [
        {
          title: translations.projects.information.title.challenge,
          description: translations.projects.information.scClaims.challenge,
        },
        {
          title: translations.projects.information.title.tools,
          description: translations.projects.information.scClaims.tools,
        },
        {
          title: translations.projects.information.title.contribution,
          description: translations.projects.information.scClaims.contribution,
        },
      ],
      sectionId: "sc-claims",
      mockup: ASSETS.ScClaimsMockup,
      mockupAlt: "SC Claims Mockup",
      mockups: [
        { image: ASSETS.ScClaimsMockup1, alt: "SC Claims Mockup 1" },
        { image: ASSETS.ScClaimsMockup2, alt: "SC Claims Mockup 2" },
        { image: ASSETS.ScClaimsMockup1, alt: "SC Claims Mockup 3" },
      ],
    },
    // yoo
    {
      title: translations.projects.yoo.title,
      role: translations.projects.yoo.role,
      desciption: translations.projects.yoo.description,
      information: [
        {
          title: translations.projects.information.title.challenge,
          description: translations.projects.information.yoo.challenge,
        },
        {
          title: translations.projects.information.title.tools,
          description: translations.projects.information.yoo.tools,
        },
        {
          title: translations.projects.information.title.contribution,
          description: translations.projects.information.yoo.constribution,
        },
      ],
      sectionId: "yoo",
      mockup: ASSETS.YooMockup,
      mockupAlt: "YOO Mockup",
      mockups: [
        { image: ASSETS.YooMockup1, alt: "YOO Mockup 1" },
        { image: ASSETS.YooMockup2, alt: "YOO Mockup 2" },
        { image: ASSETS.YooMockup3, alt: "YOO Mockup 3" },
      ],
    },
    // IQMK
    {
      title: translations.projects.iqmk.title,
      role: translations.projects.iqmk.role,
      desciption: translations.projects.iqmk.description,
      information: [
        {
          title: translations.projects.information.title.contribution,
          description: translations.projects.information.iqmk.contribution,
        },
        {
          title: translations.projects.information.title.tools,
          description: translations.projects.information.iqmk.tools,
        },

        {
          title: translations.projects.information.title.challenge,
          description: translations.projects.information.iqmk.challenge,
        },
      ],
      sectionId: "iqmk-app",
      mockup: ASSETS.IQMKMockUp,
      mockupAlt: "IQMK Mockup",
      mockups: [
        { image: ASSETS.IQMKMockUp1, alt: "IQMK Mockup 1" },
        { image: ASSETS.IQMKMockUp2, alt: "IQMK Mockup 2" },
        { image: ASSETS.IQMKMockUp3, alt: "IQMK Mockup 3" },
      ],
    },

    // Exodia VR Platform — 3D Game Assets (not sourced from translations — see note below)
    {
      title: "Exodia Studio — 3D Modelling Activities",
      role: "3D Modeller & Substance Painter",
      desciption:
        "A sample of my 3D model contributions from the company that helped me mold my skills in 3D modelling.",
      information: [
        {
          title: "Contribution",
          description: [
            "Created 3D models from scratch using Blender.",
            "Applied full 3D workflows including modelling, UV unwrapping, texturing, and rendering.",
          ],
        },
        {
          title: "Tools",
          description: ["Blender", "Substance Painter", "Retopology"],
        },
        {
          title: "Challenge",
          description: [
            "Keeping clean quad-based topology by avoiding extra vertices that could distort the surface.",
            "Keeping planes properly placed to avoid texture issues during rendering, retopology, UV mapping, and texturing in Substance Painter.",
          ],
        },
      ],
      sectionId: "exodia-3d",
      mockup: ASSETS.ExodiaSpacecraft,
      mockupAlt: "Exodia VR Spacecraft",
      mockups: [
        { image: ASSETS.ExodiaSpacecraft,    alt: "VR Spacecraft" },
        { image: ASSETS.ExodiaSpartanHelmet, alt: "Spartan Battle Helmet" },
        { image: ASSETS.ExodiaSilvanaScepter, alt: "Silvana's Scepter" },
      ],
    },

    // Country Scapes
    {
      title: translations.projects.countryScape.title,
      role: translations.projects.countryScape.role,
      desciption: translations.projects.countryScape.description,
      information: [
        {
          title: translations.projects.information.title.contribution,
          description:
            translations.projects.information.countryScape.contribution,
        },
        {
          title: translations.projects.information.title.tools,
          description: translations.projects.information.countryScape.tools,
        },

        {
          title: translations.projects.information.title.challenge,
          description: translations.projects.information.countryScape.challenge,
        },
      ],
      sectionId: "countryscape",
      mockup: ASSETS.CountryScapeMockup,
      mockupAlt: "CountryScape Mockup",
      mockups: [
        { image: ASSETS.CountryScapeMockup1, alt: "CountryScape Mockup 1" },
        { image: ASSETS.CountryScapeMockup2, alt: "CountryScape Mockup 2" },
        { image: ASSETS.CountryScapeMockup3, alt: "CoutryScape Mockup 3" },
      ],
    },
  ];
}

export const PROJECTS: ProjectInterface[] = getProjects("en");
