// All portfolio content lives here. Edit this file to change text, links, projects and skills.

export const profile = {
  name: "Afsana Noor Keya",
  shortName: "Keya",
  initials: "AK",
  // Your photo lives in /public. Leave "" to show the AK initials instead.
  photo: "/keya-2.jpg",
  role: "Full-Stack Developer",
  location: "Dhaka, Bangladesh",
  tz: "UTC+6",
  intro:
    "I build web apps with Next.js, Node.js and MongoDB or PostgreSQL. By day I help bootcamp students land their first developer jobs. I'm now looking for a remote frontend or full-stack role.",
  github: "https://github.com/webafsanakeya",
  linkedin: "https://www.linkedin.com/in/web-afsana-noor-keya-",
  // Optional: shown in Contact and Footer when filled in, hidden when "". Example: "you@gmail.com"
  email: "",
  siteUrl: "https://latest-portfolio-lemon.vercel.app",
};

export const nav = {
  main: [
    { href: "#about", label: "About me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ],
  more: [
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ],
};

export const stats = [
  { value: "82", label: "students placed" },
  { value: "100+", label: "final interviews" },
  { value: "200+", label: "students supported" },
];

export const coreTech = ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"];

export type Experience = {
  abbr: string;
  title: string;
  org: string;
  date: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    abbr: "PH",
    title: "Talent Development Executive",
    org: "Programming Hero",
    date: "Jan 2026 – Present",
    bullets: [
      "Support 7 to 8 bootcamp students one to one every day with resume reviews, mock interviews and project-presentation practice.",
      "Of 300 students, 82 were placed in jobs and more than 100 reached final interviews.",
      "Run hiring partner outreach and build career-prep and teaching materials for the bootcamp.",
      "Researched Canada-focused tech job datasets and dashboards for market insight.",
    ],
  },
  {
    abbr: "WN",
    title: "Frontend Intern",
    org: "WebNex IT, remote",
    date: "Sep 2025 – Apr 2026",
    bullets: [
      "Built frontend features as part of a remote team.",
      "My first professional experience shipping production web code.",
    ],
  },
];

export type Project = {
  title: string;
  kind: string;
  text: string;
  tags: string[];
  links: { label: string; href: string; main?: boolean }[];
  // Shown as bullet points in the "View details" window.
  highlights: string[];
  // Optional screenshot: save it in public/projects/ and set e.g. image: "/projects/renovation.png"
  image?: string;
  art: string; // gradient used for the preview when there is no screenshot
  status?: string;
};

export const projects: Project[] = [
  {
    title: "Crafting Renovation",
    kind: "Next.js · CMS",
      image: "/projects/renovation.png",
    text: "A home renovation and carpentry site with an admin CMS. Version 2 added form validation, SEO structured data, a secure login and a stats dashboard. Lighthouse on mobile: 94, 100, 100, 100.",
    tags: ["Next.js 16", "TypeScript", "MongoDB Atlas", "Tailwind", "shadcn/ui"],
    art: "from-[#3b1d8f] to-[#0e7490]",
    highlights: [
      "Admin CMS to create, edit and delete projects and blog posts.",
      "Admin dashboard with site stats, behind a secure login.",
      "Contact form validation, including phone number checks.",
      "SEO work: page metadata and JSON-LD structured data.",
      "Lighthouse on mobile (Slow 4G): 94 performance, 100 accessibility, 100 best practices, 100 SEO.",
    ],
    links: [
      { label: "Live demo", href: "https://renovation-swart.vercel.app", main: true },
      { label: "Code", href: "https://github.com/webafsanakeya/renovation-site" },
    ],
  },
  {
    title: "AI-first CRM for healthcare professionals",
    kind: "AI · Full-stack",
    image: "/projects/crm.png",
    text: "Built from scratch for an AIVOA.AI technical assignment. A split screen turns a chat with a LangGraph agent into a structured interaction form. Deployed on Vercel, Render and Neon.",
    tags: ["FastAPI", "LangGraph", "Groq", "React Redux", "PostgreSQL"],
    art: "from-[#5b21b6] to-[#be185d]",
    highlights: [
      "Split-screen interface: chat with an AI agent on one side, a structured interaction form on the other.",
      "LangGraph agent tools with a Groq LLM turn conversation into form data.",
      "FastAPI backend with PostgreSQL, and a React Redux frontend.",
      "Deployed on Vercel, Render and Neon, and published on GitHub.",
      "Built in June 2026 as a technical assignment for AIVOA.AI.",
    ],
    links: [{ label: "GitHub profile", href: "https://github.com/webafsanakeya", main: true }],
  },
  {
    title: "QuickChat",
    kind: "Real-time",
    image: "/projects/quickchat.png",
    text: "A real-time chat application with live messaging over Socket.IO and JWT authentication.",
    tags: ["Socket.IO", "JWT", "Node.js"],
    art: "from-[#1e3a8a] to-[#6d28d9]",
    highlights: [
      "Real-time messaging between users over Socket.IO.",
      "JWT authentication for sign-in and protected routes.",
      "Separate frontend and backend repositories.",
    ],
    links: [
      { label: "Live demo", href: "https://chat-app-frontend-delta-seven.vercel.app/login", main: true },
      { label: "Frontend", href: "https://github.com/webafsanakeya/chat-app-frontend" },
      { label: "Backend", href: "https://github.com/webafsanakeya/chat-app-backend" },
    ],
  },
  {
    title: "Perfume e-commerce platform",
    kind: "E-commerce",
    image: "/projects/perfume.png",
    text: "A full-stack store with a shopping cart and an admin dashboard for managing the catalogue.",
    tags: ["Full-stack", "Cart", "Admin dashboard"],
    art: "from-[#7c2d12] to-[#7e22ce]",
    highlights: [
      "Full-stack e-commerce flow with a shopping cart.",
      "Admin dashboard for managing the product catalogue.",
      "Deployed on Vercel with the source on GitHub.",
    ],
    links: [
      { label: "Live demo", href: "https://perfume-omega-seven.vercel.app", main: true },
      { label: "Code", href: "https://github.com/webafsanakeya/perfume" },
    ],
  },
  {
    title: "FindLost",
    kind: "Role-based",
    image: "/projects/findlost.png",
    text: "A lost-and-found recovery app with role-based accounts, so people can report items and get them back.",
    tags: ["Role-based access", "Full-stack"],
    art: "from-[#064e3b] to-[#3730a3]",
    highlights: [
      "Role-based accounts, with different access for each type of user.",
      "People can report lost or found items and recover them.",
      "Separate frontend and server repositories, deployed on Netlify.",
    ],
    links: [
      { label: "Live demo", href: "https://findlost-app.netlify.app", main: true },
      { label: "Frontend", href: "https://github.com/webafsanakeya/findLost-app" },
      { label: "Server", href: "https://github.com/webafsanakeya/findLost-app-server" },
    ],
  },
  {
    title: "Course platform (LMS)",
    kind: "In progress",
    status: "Building next",
    text: "Student, instructor and admin roles, with course creation and enrollment. It starts with Postgres, Prisma and role-based auth.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Supabase"],
    art: "from-[#312e81] to-[#164e63]",
    highlights: [
      "Three roles: student, instructor and admin.",
      "Course creation by instructors and enrollment by students.",
      "Starts with Postgres on Supabase, Prisma and role-based authentication.",
    ],
    links: [],
  },
];

// `icon` keys map to react-icons in components/Skills.tsx.
export const skills = [
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "Next.js", icon: "next", color: "#FFFFFF" },
  { name: "TypeScript", icon: "ts", color: "#3A86E0" },
  { name: "JavaScript", icon: "js", color: "#F7DF1E" },
  { name: "HTML5", icon: "html", color: "#E34F26" },
  { name: "CSS3", icon: "css", color: "#2D8CE0" },
  { name: "Tailwind CSS", icon: "tailwind", color: "#38BDF8" },
  { name: "Redux", icon: "redux", color: "#A47BE0" },
  { name: "shadcn/ui", icon: "shadcn", color: "#FFFFFF" },
  { name: "Node.js", icon: "node", color: "#6CC24A" },
  { name: "Express", icon: "express", color: "#FFFFFF" },
  { name: "FastAPI", icon: "fastapi", color: "#14B8A6" },
  { name: "Socket.IO", icon: "socket", color: "#FFFFFF" },
  { name: "MongoDB", icon: "mongo", color: "#47A248" },
  { name: "PostgreSQL", icon: "postgres", color: "#5B8DEF" },
  { name: "Prisma", icon: "prisma", color: "#A5B4FC" },
  { name: "Firebase", icon: "firebase", color: "#FFCA28" },
  { name: "LangChain", icon: "langchain", color: "#34D399" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
  { name: "Git", icon: "git", color: "#F05032" },
  { name: "Vercel", icon: "vercel", color: "#FFFFFF" },
  { name: "WordPress", icon: "wordpress", color: "#4AA3DF" },
];

export const education = [
  {
    abbr: "PH",
    title: "MERN stack web development bootcamp",
    org: "Programming Hero",
    note: "Where I moved into tech, and where I now help the next students.",
    status: "Completed",
  },
  {
    abbr: "BU",
    title: "Bachelor of Pharmacy (B.Pharm)",
    org: "Bangladesh University",
    note: "Degree completed in 2013, before my career change into web development.",
    status: "Graduated 2013",
  },
];

export type Achievement = {
  title: string;
  text: string;
  num?: string;
  gauges?: number[];
  // Optional certificate image: save it in public/certificates/ and set e.g. "/certificates/wordpress.png"
  image?: string;
};

export const achievements: Achievement[] = [
  {
    num: "82",
    title: "Student placements",
    text: "Out of 300 students at Programming Hero, 82 have been placed in jobs, and more than 100 reached final interviews.",
  },
  {
    gauges: [94, 100, 100, 100],
    title: "Near-perfect Lighthouse",
    text: "Crafting Renovation scores 94, 100, 100 and 100 on mobile with a Slow 4G profile.",
  },
  {
    num: "AI",
    title: "Shipped an AI agent app",
    text: "Delivered a full CRM module with a LangGraph agent, a FastAPI backend and a React Redux frontend as a technical assignment.",
  },
  {
    num: "WP",
    title: "WordPress certificate",
    text: "Certified in WordPress, which I use for fast client sites alongside my MERN work.",
  },
];
