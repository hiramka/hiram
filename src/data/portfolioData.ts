export interface PersonalInfo {
  name: string;
  title: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineAccent1: string;
  headlineMiddle: string;
  headlineAccent2: string;
  location: string;
  timeZone: string;
  bio: string;
  aboutHeadline: string;
  aboutText: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  category: '0 → 1' | 'RESEARCH' | 'GROWTH';
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  awardBadge?: string;
  imageUrl: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issueDate: string;
  badge: 'CERTIFICATION' | 'COURSE' | 'CERTIFICATE' | 'BOOTCAMP';
  imageUrl: string;
  issuer: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  link: string;
}

export interface TechnologyItem {
  name: string;
  badge: string;
  color: string;
}

export const PORTFOLIO_DATA: {
  personal: PersonalInfo;
  projects: ProjectItem[];
  certifications: CertificationItem[];
  articles: ArticleItem[];
  technologies: TechnologyItem[];
} = {
  personal: {
    name: "Hiram Karomo",
    title: "Software Engineer · Full Stack & Systems Developer",
    eyebrow: "SOFTWARE ENGINEER · NAIROBI, KENYA",
    headlinePrefix: "I turn ideas into ",
    headlineAccent1: "clear custom direction",
    headlineMiddle: " & ship with cross-functional teams software that ",
    headlineAccent2: "scales.",
    location: "Nairobi, Kenya",
    timeZone: "Africa/Nairobi",
    bio: "Full stack engineer who ships fast and digs deep into systems. Specializing in modern web applications, AI integration, and sleek interactive frontends.",
    aboutHeadline: "High-Converting Websites, Mobile Apps & Digital Growth",
    aboutText: "I'm Hiram Karomo — Full Stack & Systems Engineer and Founder of Ascendancy Solutions. We engineer high-converting custom websites, powerful cross-platform mobile apps, bespoke visual branding, and AI-driven workflow automations that transform ideas into scalable revenue.",
    whatsappNumber: "254715641618",
    whatsappMessage: "Hello Hiram, From your portfolio, Let's talk business",
    email: "hiramkaromo139@gmail.com",
    github: "https://github.com/hiramka",
    linkedin: "https://linkedin.com/in/hiramkaromo",
    twitter: "https://x.com/hiramkaromo",
    instagram: "https://www.instagram.com/ascendancysolutions/",
  },

  projects: [
    {
      id: 'sportsman',
      title: 'Sportsman.ke',
      year: '2025',
      category: '0 → 1',
      tagline: 'Full-Stack Sports E-Commerce & Logistics Platform',
      description: 'Developed a full-stack monorepo sports e-commerce application featuring a React frontend and NestJS backend. Built a Safaricom Daraja M-Pesa STK Push payment pipeline, a role-based access control (RBAC) portal for Admins, Warehouse Staff, and Delivery Agents, automated PDF receipt generation, and real-time order fulfillment tracking from warehouse packing to courier delivery.',
      highlights: [
        'Safaricom Daraja M-Pesa STK Push automated payment pipeline',
        'Multi-role RBAC portal for Admins, Warehouse Staff & Couriers',
        'Real-time order fulfillment tracking & automated PDF receipt generator',
      ],
      techStack: ['React 19', 'Vite', 'Tailwind CSS', 'NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'M-Pesa API'],
      githubUrl: 'https://github.com/hiramka/sportsman',
      liveUrl: 'https://sportsman.ke/',
      imageUrl: '/images/cs/covers/sportsman-cover.png',
    },
    {
      id: 'citycare',
      title: 'CityCare Hospital POS & Outpatient Billing System',
      year: '2025',
      category: 'RESEARCH',
      tagline: 'Enterprise Healthcare POS & Outpatient Management',
      description: 'A full-stack, enterprise-grade healthcare POS and outpatient management system tailored for Kenyan medical centers. Features FEFO (First Expiry, First Out) inventory management, automated stock movement reconciliation, multi-role RBAC (Doctor, Pharmacist, Cashier, Receptionist), M-Pesa/Cash payment processing, and real-time audit logging.',
      highlights: [
        'FEFO (First Expiry, First Out) pharmacy inventory & stock reconciliation',
        'Multi-role RBAC (Doctor, Pharmacist, Cashier, Receptionist)',
        'M-Pesa & Cash payment processing with real-time audit logging',
      ],
      techStack: ['Python', 'Flask', 'React', 'Vite', 'PostgreSQL', 'MySQL', 'Flask-SQLAlchemy', 'Alembic', 'JWT Auth', 'Docker'],
      githubUrl: 'https://github.com/hiramka/citycare-pos',
      imageUrl: '/images/cs/covers/citycare-cover.png',
    },
    {
      id: 'ascendancy-agency',
      title: 'Ascendancy Solutions Digital Agency App',
      year: '2025',
      category: 'GROWTH',
      tagline: 'High-Converting Digital Agency & Case Study Engine',
      description: 'A high-converting, ultra-fast digital agency portfolio web application built with React 19 and Vite. Features modern glassmorphic design, hardware-accelerated animations, interactive case study popups, live lead capture integration, and production-grade SEO optimizations.',
      highlights: [
        'Hardware-accelerated animations & glassmorphic UI design system',
        'Interactive case study popups & live lead capture integration',
        'Production-grade SEO optimizations & high-converting funnel layout',
      ],
      techStack: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Node.js', 'Vercel'],
      githubUrl: 'https://github.com/hiramka/ascendancy-solutions',
      liveUrl: 'https://ascendancy-solutions.app/',
      imageUrl: '/images/cs/covers/ascendancy-cover.png',
    },
    {
      id: 'pastlens',
      title: 'PastLens AI Digital Museum',
      year: '2025',
      category: '0 → 1',
      tagline: 'Building an AI-powered digital museum, 1st Runner-Up at KeMU',
      description: 'An interactive digital museum experience bringing African heritage and historical artifacts to life using generative AI contextualization and smooth WebGL renderings.',
      highlights: [
        'AI-generated historical/cultural context per artifact (Google Gemini API)',
        'Contribution flow for uploading and cataloguing artifacts',
        'Smooth-scroll, animated UI (Lenis + Framer Motion + WebGL via OGL)',
      ],
      techStack: [
        'React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 
        'Lenis', 'OGL (WebGL)', 'Express', 'MongoDB', 'Google Gemini API', 'Redis'
      ],
      githubUrl: 'https://github.com/Past-Lens/past_lens',
      liveUrl: 'https://pastlens.vercel.app/',
      awardBadge: '🏆 1st Runner-Up @ KeMU',
      imageUrl: '/images/cs/covers/pastlens-cover.png',
    },
  ],

  certifications: [
    {
      id: 'cisco-ethical-hacker',
      title: 'Ethical Hacker',
      issueDate: 'Issued 02 Dec 2025',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-ethical-hacker.png',
      issuer: 'Cisco Networking Academy',
    },
    {
      id: 'cisco-networking-essentials',
      title: 'Networking Essentials',
      issueDate: 'Issued 23 Apr 2024',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-networking-essentials.png',
      issuer: 'Cisco Networking Academy',
    },
    {
      id: 'cisco-cpp-essentials',
      title: 'Partner: CPA - Programming Essentials in C++',
      issueDate: 'Issued 23 Nov 2023',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-cpp-essentials.png',
      issuer: 'Cisco Networking Academy',
    },
  ],

  articles: [
    {
      id: 'art-1',
      title: 'Everyday Git — A Beginner\'s Complete Guide',
      date: 'Mar 2025',
      readTime: '5 min read',
      category: 'DEVOPS',
      summary: 'Essential Git workflow patterns, branching strategies, and interactive rebase tips for software engineers.',
      link: 'https://dev.to/waithaka_dev/building-real-time-apps-with-websockets-44md',
    },
    {
      id: 'art-2',
      title: 'React Performance Optimization Techniques ⚡',
      date: 'Feb 2025',
      readTime: '7 min read',
      category: 'REACT',
      summary: 'How to diagnose component re-renders, leverage memoization, virtualize large lists, and optimize WebGL shaders.',
      link: 'https://medium.com/@waithakaoffices/react-performance-optimization-techniques-3e57b944aa4b',
    },
    {
      id: 'art-3',
      title: 'TypeScript Best Practices for Production Code 🛡️',
      date: 'Jan 2025',
      readTime: '6 min read',
      category: 'DEVELOPMENT',
      summary: 'Strict type patterns, utility types, and schema validation with Zod to eliminate runtime bugs.',
      link: 'https://medium.com/@waithakaoffices/typescript-best-practices-for-production-code-%EF%B8%8F-920c7838bfa8',
    },
  ],

  technologies: [
    { name: 'JAVASCRIPT', color: 'text-yellow-400', badge: 'JS' },
    { name: 'NEXT.JS', color: 'text-white', badge: 'N' },
    { name: 'PYTHON', color: 'text-blue-400', badge: '🐍' },
    { name: 'NODE.JS', color: 'text-emerald-500', badge: '⬢' },
    { name: 'TYPESCRIPT', color: 'text-blue-500', badge: 'TS' },
    { name: 'GOLANG', color: 'text-cyan-400', badge: 'Go' },
    { name: 'MYSQL', color: 'text-blue-400', badge: '🐬' },
    { name: 'DJANGO', color: 'text-emerald-600', badge: 'dj' },
    { name: 'TAILWIND', color: 'text-sky-400', badge: '≈' },
    { name: 'PRISMA', color: 'text-[#5a67d8]', badge: '◬' },
    { name: 'POSTGRES', color: 'text-blue-400', badge: '🐘' },
    { name: 'MONGODB', color: 'text-emerald-400', badge: '🍃' },
    { name: 'GIT', color: 'text-orange-500', badge: '⌥' },
    { name: 'TENSORFLOW', color: 'text-orange-400', badge: '⚙' },
    { name: 'HTML5', color: 'text-orange-600', badge: '5' },
    { name: 'LARAVEL', color: 'text-red-500', badge: 'L' },
    { name: 'GITHUB', color: 'text-slate-200', badge: '🐙' },
    { name: 'PHP', color: 'text-indigo-400', badge: 'ele' },
    { name: 'REACT', color: 'text-cyan-400', badge: '⚛' },
    { name: 'C++', color: 'text-blue-500', badge: 'C++' },
  ],
};
