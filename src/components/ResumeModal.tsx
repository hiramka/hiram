import React, { useState } from 'react';
import {
  ArrowLeft,
  Lightbulb,
  Copy,
  Check,
  Download,
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  Award,
  GraduationCap,
  Code
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const experienceItems = [
    {
      role: 'Network Support & ICT Operations (Attaché)',
      company: 'Kenya Pipeline Company (KPC), Nakuru Station',
      period: 'Attaché',
      points: [
        'Provided first-line network support and troubleshooting for the ICT department, contributing to a 3-month uninterrupted uptime record across critical pipeline operations systems.',
        'Diagnosed and resolved over 15 LAN/WAN connectivity incidents, applying TCP/IP, DNS, DHCP, and IP addressing knowledge in a live enterprise environment.',
        "Assisted in the configuration and maintenance of routers, switches, and network devices across KPC's Nakuru station infrastructure.",
        'Supported real-time network performance monitoring, identifying and escalating faults to reduce average fault resolution time within the ICT team.',
      ],
    },
    {
      role: 'Project Manager',
      company: 'KEMU Students Research Center, Meru, Kenya',
      period: 'Academic Period',
      points: [
        'Led a team of 4 students, coordinating activities and delivering 3 academic projects on time within a 7-month period.',
        'Managed end-to-end documentation and task delegation, improving team output consistency across concurrent projects.',
        'Successfully incubated 2 student-led projects from ideation through to full maturity and stakeholder presentation.',
      ],
    },
    {
      role: 'Lead Full Stack Engineer & Founder',
      company: 'Ascendancy Solutions, Nairobi, Kenya',
      period: '2024 — Present',
      points: [
        'Architecting production React 19 & NestJS web applications, Safaricom Daraja M-Pesa STK Push pipelines, and RESTful microservices.',
        'Delivering healthcare POS systems, sports logistics portals, and high-converting enterprise digital applications.',
      ],
    },
  ];

  const accomplishments = [
    {
      title: '🏆 1st Runner-Up @ National AI Hackathon',
      description: 'Built PastLens — AI digital museum & cultural heritage archiving platform with WebGL artifacts & Gemini AI.',
    },
    {
      title: '🛡️ Cisco Certified Security & Network Specialist',
      description: 'Completed Cisco Ethical Hacker, Cisco Networking Essentials, and Cisco CPA Programming in C++ certifications.',
    },
    {
      title: '🚀 Founder & Lead Developer @ Ascendancy Solutions',
      description: 'Building enterprise full-stack healthcare POS, e-commerce monorepos, and speech AI integrations for clients.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070a13]/95 backdrop-blur-2xl text-slate-200">
      {/* Top Bar Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070a13]/90 backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 hover:text-white uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> BACK
        </button>

        <h2 className="text-sm font-bold font-display text-white tracking-wide">
          {PORTFOLIO_DATA.personal.name} — Official Curriculum Vitae
        </h2>

        <button
          onClick={onToggleTheme}
          className="p-2 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          <Lightbulb size={18} />
        </button>
      </div>

      {/* Main 2-Column Container */}
      <div className="max-w-6xl mx-auto min-h-[calc(100vh-65px)] grid grid-cols-1 md:grid-cols-[320px_1fr]">

        {/* Left Column: Profile Card & Quick Actions */}
        <div className="p-8 border-r border-slate-800/80 space-y-6 flex flex-col items-center text-center bg-[#0a0f1d]/50">

          {/* Avatar with Blue Cursor Indicator Badge */}
          <div className="relative w-36 h-36 mx-auto rounded-full p-1 border border-slate-700">
            <img
              src="/images/me-small.jpg"
              alt={PORTFOLIO_DATA.personal.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute top-2 right-2 pointer-events-none transform translate-x-2 -translate-y-1">
              <svg className="w-7 h-7 text-[#2563eb] fill-current filter drop-shadow-md transform -rotate-12" viewBox="0 0 24 24">
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
            </div>
          </div>

          {/* Name & Email */}
          <div className="space-y-1">
            <h1 className="text-xl font-bold font-display text-white">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Nairobi, Kenya · 0715 641 618
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 pt-1">
              <span>{PORTFOLIO_DATA.personal.email}</span>
              <button
                onClick={handleCopyEmail}
                className="hover:text-white transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Download Resume Button */}
          <a
            href="/Hiram_Karomo_CV.pdf"
            download="Hiram_Karomo_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-[#161d2f] hover:bg-[#1e273e] text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-slate-700 shadow-xl transition-all cursor-pointer"
          >
            <Download size={14} /> DOWNLOAD RESUME PDF
          </a>

          {/* Contact me on */}
          <div className="w-full space-y-2 pt-2 text-left">
            <span className="text-[11px] font-mono text-slate-400 font-semibold block">
              Contact me on
            </span>
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#121929] border border-slate-800">
              <a
                href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}?text=${encodeURIComponent(PORTFOLIO_DATA.personal.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-3 rounded-full bg-[#00d084] text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md hover:brightness-110 transition-all"
              >
                <MessageSquare size={13} className="fill-slate-950" /> W.app
              </a>
              <a
                href="tel:0715641618"
                className="flex-1 py-1.5 px-3 rounded-full bg-[#1e293b] text-slate-200 font-bold text-xs flex items-center justify-center gap-1 hover:bg-slate-700 transition-colors"
              >
                <Phone size={13} /> Call
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex-1 py-1.5 px-3 rounded-full bg-[#0f172a] text-slate-200 font-bold text-xs flex items-center justify-center gap-1 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <Mail size={13} /> Email
              </a>
            </div>
          </div>

          {/* Follow me on */}
          <div className="w-full space-y-2 pt-2 text-left">
            <span className="text-[11px] font-mono text-slate-400 font-semibold block">
              Follow me on
            </span>
            <div className="flex items-center gap-2">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#121929] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
                title="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#121929] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#121929] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
                title="Instagram Profile"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Full CV, Accomplishments, Education & Skills */}
        <div className="p-8 sm:p-12 space-y-10 bg-[#070a13]">

          {/* Professional Summary */}
          <div className="p-5 rounded-2xl bg-[#0d1526] border border-[#1e2d4a] space-y-2">
            <h3 className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              IT professional with practical experience in ICT support, network operations and software engineering, with hands-on exposure gained at Kenya Pipeline Company and in software development environments. Skilled in application support and maintenance, Microsoft 365 administration, database support, network troubleshooting, and cybersecurity monitoring fundamentals.
            </p>
          </div>

          {/* 1. WORK EXPERIENCE SECTION */}
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                WORK EXPERIENCE
              </h3>
            </div>

            <div className="space-y-8">
              {experienceItems.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-800 space-y-2 group">
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#070a13] group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold font-display text-white">
                      {item.role}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {item.period}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-blue-400 font-semibold">
                    {item.company}
                  </div>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-300 leading-relaxed">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold select-none">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. CISCO CERTIFICATIONS & EDUCATION (DEDUPLICATED) */}
          <div className="space-y-4">
            <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <GraduationCap size={14} className="text-emerald-400" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                CISCO CERTIFICATIONS & EDUCATION (DEDUPLICATED)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div key={cert.id} className="p-4 rounded-2xl bg-[#0d1526] border border-[#1e2d4a] flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {cert.badge}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{cert.title}</h4>
                    <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">{cert.issueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. HONORS & ACCOMPLISHMENTS */}
          <div className="space-y-4">
            <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <Award size={14} className="text-yellow-400" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                HONORS & ACCOMPLISHMENTS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {accomplishments.map((acc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0d1526] border border-[#1e2d4a] space-y-2">
                  <h4 className="text-xs font-bold font-mono text-white leading-snug">
                    {acc.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {acc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. TECHNICAL SKILLS & STACK */}
          <div className="space-y-3">
            <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <Code size={14} className="text-cyan-400" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                CORE TECHNICAL STACK & TOOLS
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {PORTFOLIO_DATA.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-[#0e1628] border border-slate-800 text-slate-300 font-mono text-xs font-semibold flex items-center gap-1.5 hover:border-slate-600 transition-colors"
                >
                  <span className="text-xs">{tech.badge}</span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
