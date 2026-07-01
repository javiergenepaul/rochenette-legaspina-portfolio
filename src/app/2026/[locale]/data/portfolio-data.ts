// ─── 2026 Portfolio Static Data ──────────────────────────────────────────────

import i18nServer from "@/i18n/server";
import { translate } from "@/lib";

export const SKILLS = [
  {
    category: "3D & Creative",
    items: [
      { name: "Blender",       logo: "/logos/blender.png" },
      { name: "Substance",     icon: "🎭" },
      { name: "Unreal Engine", icon: "🎮" },
      { name: "Quixel",        icon: "🌉" },
    ],
  },
  {
    category: "UI/UX & Design",
    items: [
      { name: "Figma",        logo: "/logos/figma.png" },
      { name: "Photoshop",    logo: "/logos/photoshop.png" },
      { name: "Illustrator",  logo: "/logos/illustrator.png" },
      { name: "Trello",       icon: "📋" },
    ],
  },
  {
    category: "Systems & Analysis",
    items: [
      { name: "Tableau",           icon: "📉" },
      { name: "Google Analytics",  icon: "📈" },
      { name: "Power BI",          icon: "📊" },
      { name: "TFS",               icon: "🔧" },
      { name: "Microsoft Apps",    icon: "🪟" },
      { name: "Trello",            icon: "📋" },
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Polytechnic University of the Philippines",
    year: "2020 – 2024",
    description:
      "Focused on software development, systems analysis, and database management. Graduated with honors.",
  },
  {
    degree: "UI/UX Design Professional Certificate",
    institution: "Google — Coursera",
    year: "2023",
    description:
      "Completed end-to-end product design course covering research, wireframing, prototyping, and usability testing.",
  },
  {
    degree: "3D Modeling & Animation Fundamentals",
    institution: "Blender Guru / Self-Directed",
    year: "2019 – 2020",
    description:
      "Self-taught Blender through structured courses and personal projects, building a foundation in 3D art and rendering.",
  },
  {
    degree: "Systems Analysis & Design",
    institution: "DICT — Department of ICT",
    year: "2024",
    description:
      "Professional development course in enterprise systems analysis, process modeling, and requirements engineering.",
  },
];

export type ProjectType = "Web App" | "UI/UX" | "3D / Visualization" | "Systems" | "Full-Stack";

export interface Portfolio2026Project {
  slug: string;
  title: string;
  type: ProjectType;
  role: string;
  description: string;
  stack: string[];
  gradient: string;
  thumbnail?: string;
  hidden?: boolean;
  mockups: { label: string; image?: string; note?: string }[];
  link?: string;
  credit?: string;
  carouselLabel?: string;
}

// Project titles/roles/stack/mockup labels are proper nouns / tool names and
// stay in English across locales — only type, description, credit, and the
// Exodia carousel label are translated (translations.projects.<slug>.*).
export function getProjects2026(lng: string = "en"): Portfolio2026Project[] {
  const t = i18nServer.getFixedT(lng);
  const p = (key: string) => translate(t, `portfolio2026.projects.${key}` as never);

  return [
    {
      slug: "sc-claims",
      title: "Senior Citizen Discount Claims System",
      type: p("scClaims.type") as ProjectType,
      role: "Systems Analyst & UI/UX Designer",
      description: p("scClaims.description"),
      stack: ["Figma", "Moqups", "Systems Analysis"],
      gradient: "from-blue-900 to-sky-600",
      thumbnail: "/projects/sc-claims/preview.png",
      mockups: [
        { label: "Main Mockup",  image: "/projects/sc-claims/mockup.png" },
        { label: "Screen 1",     image: "/projects/sc-claims/mockup-1.png" },
        { label: "Screen 2",     image: "/projects/sc-claims/mockup-2.png" },
      ],
    },
    {
      slug: "yoo",
      title: "YOO — Food Delivery & Transport App",
      type: p("yoo.type") as ProjectType,
      role: "UI/UX Designer",
      description: p("yoo.description"),
      stack: ["Figma", "User Research", "Prototyping"],
      gradient: "from-emerald-900 to-teal-600",
      thumbnail: "/projects/yoo/preview.png",
      mockups: [
        { label: "Main Mockup",  image: "/projects/yoo/mockup.png" },
        { label: "Screen 1",     image: "/projects/yoo/mockup-1.png" },
        { label: "Screen 2",     image: "/projects/yoo/mockup-2.png" },
        { label: "Screen 3",     image: "/projects/yoo/mockup-3.png" },
      ],
    },
    {
      slug: "iqmk",
      title: "IQMK Global — Wellness & Business App",
      type: p("iqmk.type") as ProjectType,
      role: "UI/UX Designer",
      description: p("iqmk.description"),
      stack: ["Figma", "UI Design", "UX Research"],
      gradient: "from-violet-900 to-purple-600",
      thumbnail: "/projects/iqmk/preview.png",
      mockups: [
        { label: "Main Mockup",  image: "/projects/iqmk/mockup.png" },
        { label: "Screen 1",     image: "/projects/iqmk/mockup-1.png" },
        { label: "Screen 2",     image: "/projects/iqmk/mockup-2.png" },
        { label: "Screen 3",     image: "/projects/iqmk/mockup-3.png" },
      ],
    },
    {
      slug: "countryscape",
      title: "CountryScape — Hotel Booking Platform",
      type: p("countryscape.type") as ProjectType,
      role: "UI/UX Designer",
      description: p("countryscape.description"),
      stack: ["Figma", "Wireframing", "Prototyping"],
      gradient: "from-cyan-900 to-blue-600",
      thumbnail: "/projects/countryscape/preview.png",
      mockups: [
        { label: "Main Mockup",  image: "/projects/countryscape/mockup.png" },
        { label: "Screen 1",     image: "/projects/countryscape/mockup-1.png" },
        { label: "Screen 2",     image: "/projects/countryscape/mockup-2.png" },
        { label: "Screen 3",     image: "/projects/countryscape/mockup-3.png" },
      ],
    },
    {
      hidden: true,
      slug: "clinictrack",
      title: "ClinicTrack — Hospital Management System",
      type: p("clinictrack.type") as ProjectType,
      role: "Systems Analyst & Frontend Dev",
      description: p("clinictrack.description"),
      stack: ["Next.js", "PostgreSQL", "Tailwind", "Zustand"],
      gradient: "from-red-700 to-red-400",
      mockups: [
        { label: "Dashboard Overview" },
        { label: "Patient Records" },
        { label: "Appointment Scheduler" },
        { label: "Billing Module" },
      ],
    },
    {
      hidden: true,
      slug: "lumina",
      title: "Lumina — E-Commerce Redesign",
      type: p("lumina.type") as ProjectType,
      role: "Lead UX Designer",
      description: p("lumina.description"),
      stack: ["Figma", "User Research", "Prototyping"],
      gradient: "from-rose-800 to-red-500",
      mockups: [
        { label: "Homepage Redesign" },
        { label: "Product Detail Page" },
        { label: "Cart & Checkout Flow" },
        { label: "Mobile View" },
      ],
    },
    {
      hidden: true,
      slug: "archviz-studio",
      title: "ArchViz Studio — 3D Product Render",
      type: p("archvizStudio.type") as ProjectType,
      role: "3D Artist",
      description: p("archvizStudio.description"),
      stack: ["Blender", "Cycles", "Substance Painter"],
      gradient: "from-red-900 to-orange-600",
      mockups: [
        { label: "Living Room Scene" },
        { label: "Chair Close-up" },
        { label: "Material Detail" },
        { label: "Studio Lighting" },
      ],
    },
    {
      hidden: true,
      slug: "flowmap",
      title: "FlowMap — Business Process Analyzer",
      type: p("flowmap.type") as ProjectType,
      role: "Business Analyst",
      description: p("flowmap.description"),
      stack: ["Visio", "BPMN 2.0", "Power BI", "Confluence"],
      gradient: "from-purple-900 to-red-700",
      mockups: [
        { label: "AS-IS Process Map" },
        { label: "TO-BE Flow Diagram" },
        { label: "Power BI Dashboard" },
        { label: "Bottleneck Analysis" },
      ],
    },
    {
      hidden: true,
      slug: "portfolio-2025",
      title: "Portfolio 2025 — Personal Site",
      type: p("portfolio2025.type") as ProjectType,
      role: "Developer & Designer",
      description: p("portfolio2025.description"),
      stack: ["Next.js", "Tailwind v4", "TypeScript", "Zustand"],
      gradient: "from-red-700 to-pink-700",
      mockups: [
        { label: "Hero Section" },
        { label: "Projects Page" },
        { label: "Dark Mode" },
        { label: "Mobile Responsive" },
      ],
    },
    {
      slug: "exodia-3d-game-assets",
      title: "Exodia VR Platform — 3D Game Assets",
      type: p("exodia3dGameAssets.type") as ProjectType,
      role: "3D Modeller & Substance Painter",
      description: p("exodia3dGameAssets.description"),
      stack: ["Blender", "Substance Painter", "Retopology", "PBR Texturing"],
      gradient: "from-orange-800 to-amber-500",
      credit: p("exodia3dGameAssets.credit"),
      carouselLabel: p("exodia3dGameAssets.carouselLabel"),
      mockups: [
        {
          label: "VR Spacecraft",
          image: "/projects/exodia/spacecraft.jpg",
        },
        {
          label: "Spartan Battle Helmet",
          image: "/projects/exodia/spartan-helmet.jpg",
        },
        {
          label: "Silvana's Scepter",
          image: "/projects/exodia/silvana-scepter.jpg",
          note: "Rochenette's contribution — Silvana's Scepter (spiral weapon). Other assets in scene by Exodia team.",
        },
      ],
    },
  ];
}

export const PROJECTS: Portfolio2026Project[] = getProjects2026("en");

// Titles/authors are proper nouns and stay in English — tag/insight/takeaway
// are translated (translations.books.<key>.*).
export function getBooks(lng: string = "en") {
  const t = i18nServer.getFixedT(lng);
  const b = (key: string) => translate(t, `portfolio2026.books.${key}` as never);

  return [
    {
      title: "The Design of Everyday Things",
      author: "Don Norman",
      tag: b("designOfEverydayThings.tag"),
      insight: b("designOfEverydayThings.insight"),
      gradient: "from-red-700 to-rose-400",
      takeaway: b("designOfEverydayThings.takeaway"),
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      tag: b("thinkingFastAndSlow.tag"),
      insight: b("thinkingFastAndSlow.insight"),
      gradient: "from-purple-900 to-red-700",
      takeaway: b("thinkingFastAndSlow.takeaway"),
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      tag: b("atomicHabits.tag"),
      insight: b("atomicHabits.insight"),
      gradient: "from-red-800 to-orange-600",
      takeaway: b("atomicHabits.takeaway"),
    },
    {
      hidden: true,
      title: "Clean Code",
      author: "Robert C. Martin",
      tag: b("cleanCode.tag"),
      insight: b("cleanCode.insight"),
      gradient: "from-rose-900 to-red-600",
      takeaway: b("cleanCode.takeaway"),
    },
    {
      hidden: true,
      title: "The Lean Startup",
      author: "Eric Ries",
      tag: b("leanStartup.tag"),
      insight: b("leanStartup.insight"),
      gradient: "from-red-900 to-pink-700",
      takeaway: b("leanStartup.takeaway"),
    },
  ];
}

export const BOOKS = getBooks("en");

export const TESTIMONIALS = [
  {
    text: "Rochenette has a rare ability to bridge the gap between creative design and analytical rigor. Her process documentation alone saved our team weeks of rework.",
    name: "James Reyes",
    role: "Project Manager, TechCorp PH",
    initials: "JR",
    avatarColor: "bg-red-700",
    stars: 5,
  },
  {
    text: "Working with her on our clinic system was a pleasure. She asked the right questions, surfaced requirements we hadn't considered, and delivered wireframes our developers actually loved.",
    name: "Dr. Maria Santos",
    role: "Medical Director, LifeClinic",
    initials: "MS",
    avatarColor: "bg-rose-800",
    stars: 5,
  },
  {
    text: "Her 3D visualization work elevated our product catalog entirely. Attention to lighting and material detail was exceptional — clients kept asking if the renders were photos.",
    name: "Carlos Vega",
    role: "Creative Director, Moderno Furniture",
    initials: "CV",
    avatarColor: "bg-red-900",
    stars: 5,
  },
  {
    text: "One of the strongest analysts I've mentored. She doesn't just document processes — she understands them, questions them, and improves them.",
    name: "Prof. Alicia Tan",
    role: "Faculty, PUP College of IT",
    initials: "AT",
    avatarColor: "bg-purple-800",
    stars: 5,
  },
];

export function getApproachSteps(lng: string = "en") {
  const t = i18nServer.getFixedT(lng);
  const a = (key: string) => translate(t, `portfolio2026.approach.${key}` as never);

  return [
    { number: "01", title: a("discover.title"), description: a("discover.description") },
    { number: "02", title: a("design.title"), description: a("design.description") },
    { number: "03", title: a("analyze.title"), description: a("analyze.description") },
    { number: "04", title: a("deliver.title"), description: a("deliver.description") },
  ];
}

export const APPROACH_STEPS = getApproachSteps("en");
