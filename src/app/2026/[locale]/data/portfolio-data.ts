// ─── 2026 Portfolio Static Data ──────────────────────────────────────────────

export const SKILLS = [
  {
    category: "3D & Creative",
    items: [
      { name: "Blender", icon: "🎨" },
      { name: "Substance", icon: "🎭" },
      { name: "Unreal Engine", icon: "🎮" },
      { name: "Pixel Bridge", icon: "🌉" },
    ],
  },
  {
    category: "UI/UX & Design",
    items: [
      { name: "Figma", icon: "✏️" },
      { name: "Photoshop", icon: "🖼️" },
      { name: "Illustrator", icon: "🔷" },
      { name: "Trello", icon: "📋" },
    ],
  },
  {
    category: "Systems & Analysis",
    items: [
      { name: "Tableau", icon: "📉" },
      { name: "Google Analytics", icon: "📈" },
      { name: "Power BI", icon: "📊" },
      { name: "TFS", icon: "🔧" },
      { name: "Microsoft Apps", icon: "🪟" },
      { name: "Trello", icon: "📋" },
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

export const PROJECTS: {
  slug: string;
  title: string;
  type: ProjectType;
  role: string;
  description: string;
  stack: string[];
  gradient: string;
  mockups: { label: string; image?: string; note?: string }[];
  link?: string;
  credit?: string;
  carouselLabel?: string;
}[] = [
  {
    slug: "clinictrack",
    title: "ClinicTrack — Hospital Management System",
    type: "Web App",
    role: "Systems Analyst & Frontend Dev",
    description:
      "End-to-end clinic management system covering patient records, appointments, billing, and reporting.",
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
    slug: "lumina",
    title: "Lumina — E-Commerce Redesign",
    type: "UI/UX",
    role: "Lead UX Designer",
    description:
      "Full UX audit and redesign of an e-commerce platform, reducing cart abandonment by 34% in A/B testing.",
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
    slug: "archviz-studio",
    title: "ArchViz Studio — 3D Product Render",
    type: "3D / Visualization",
    role: "3D Artist",
    description:
      "Photorealistic 3D product visualizations for a furniture brand — modeled, textured, and rendered in Blender.",
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
    slug: "flowmap",
    title: "FlowMap — Business Process Analyzer",
    type: "Systems",
    role: "Business Analyst",
    description:
      "Mapped and documented AS-IS / TO-BE processes for a logistics firm, identifying 6 bottlenecks and reducing cycle time by 22%.",
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
    slug: "portfolio-2025",
    title: "Portfolio 2025 — Personal Site",
    type: "Full-Stack",
    role: "Developer & Designer",
    description:
      "Designed and built my 2025 portfolio using Next.js 15, Tailwind v4, and a custom multi-year routing architecture.",
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
    type: "3D / Visualization",
    role: "3D Modeller & Substance Painter",
    description:
      "A sample of my 3D model contributions from the company that helped me mold my skills in 3D modelling.",
    stack: ["Blender", "Substance Painter", "Retopology", "PBR Texturing"],
    gradient: "from-orange-800 to-amber-500",
    credit: "In collaboration with Exodia Game Development Studio",
    carouselLabel: "Daily Activities at the Studio",
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

export const BOOKS = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    tag: "UX Design",
    insight:
      "Taught me that <em>good design is invisible</em> — when things work, people don't notice the design; they only notice when it fails.",
    gradient: "from-red-700 to-rose-400",
    takeaway: "Design for discoverability and feedback",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    tag: "Decision Science",
    insight:
      "Reframed how I approach user research — understanding that users operate on <em>intuition first</em>, logic second.",
    gradient: "from-purple-900 to-red-700",
    takeaway: "Design for System 1 thinking",
  },
  {
    title: "Sprint",
    author: "Jake Knapp",
    tag: "Product Design",
    insight:
      "The 5-day design sprint changed how I prototype — <em>answer big questions fast</em> with a structured, time-boxed process.",
    gradient: "from-red-800 to-orange-600",
    takeaway: "Validate before you build",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    tag: "Engineering",
    insight:
      "Even as a designer-analyst, understanding clean code principles made me a <em>better systems thinker</em> and collaborator.",
    gradient: "from-rose-900 to-red-600",
    takeaway: "Clarity over cleverness",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    tag: "Product Strategy",
    insight:
      "Build–Measure–Learn loops shaped how I frame <em>every design and analysis deliverable</em> as a hypothesis to test.",
    gradient: "from-red-900 to-pink-700",
    takeaway: "Validated learning over vanity metrics",
  },
];

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

export const APPROACH_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "Stakeholder interviews, competitive analysis, and requirements gathering. I ask uncomfortable questions until the real problem is visible.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Low-fi sketches → wireframes → interactive prototypes. Each iteration validated with real users before moving to high-fidelity.",
  },
  {
    number: "03",
    title: "Analyze",
    description:
      "Process models, data flows, and system specifications. Translating fuzzy requirements into precise, actionable documentation.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Handoff-ready specs, developer collaboration, and post-launch analysis. The work doesn't end at delivery — it starts there.",
  },
];
