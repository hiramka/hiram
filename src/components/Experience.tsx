import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, Zap } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: 'Lead Full Stack & AI Systems Engineer',
      company: 'Tech Ventures & Independent Projects',
      location: 'Nairobi, Kenya',
      period: '2024 — Present',
      type: 'Full-time / Client Work',
      description: 'Architecting high-performance web applications, voice-enabled AI assistants, and resilient backend microservices.',
      achievements: [
        'Built full-stack React & Next.js web applications serving 10,000+ monthly active users',
        'Integrated LLM reasoning, OpenAI Whisper voice transcription, and Google Gemini API for custom client workflows',
        'Optimized database queries and API response times by 45% using Redis caching and PostgreSQL indexes',
      ],
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'FastAPI', 'Google Gemini API', 'PostgreSQL', 'Docker'],
    },
    {
      role: 'AI & Systems Developer',
      company: 'PastLens Project',
      location: 'Nairobi, Kenya',
      period: '2024 — 2025',
      type: 'Hackathon & Open Source',
      description: 'Co-creator and technical architect for PastLens, an AI-powered digital heritage archiving platform.',
      achievements: [
        'Awarded 1st Runner-Up at Kemu Tech Hackathon 2025 among 40+ engineering teams',
        'Implemented WebGL hardware-accelerated gallery rendering for 3D historical artifacts',
        'Constructed automated AI metadata generation pipeline using Google Gemini Vision API',
      ],
      skills: ['React', 'TypeScript', 'WebGL', 'Prisma', 'MongoDB', 'Gemini Vision', 'Express', 'Tailwind CSS'],
    },
    {
      role: 'Tech project manager Lead & Developer Mentor',
      company: 'KEMU innovators Community',
      location: 'Meru, Kenya',
      period: '2025 — 2026',
      type: 'Leadership & Community',
      description: 'Led technical workshops, peer code reviews, and developer bootcamps for student engineers.',
      achievements: [
        'Mentored 30+ aspiring software developers in Python, JavaScript,Java, React, and Git workflows',
        'Organized 2 campus hackathons focused on civic tech and fintech innovation',
        'Coauthored open-source starter templates adopted across university project teams',
      ],
      skills: ['Community Building', 'Git & GitHub', 'Technical Mentorship', 'System Architecture'],
    },
    {
      role: 'Frontend & Full Stack Engineer',
      company: 'Digital Solutions Agency',
      location: 'Nairobi, Kenya',
      period: '2024 — 2026',
      type: 'Contract',
      description: 'Delivered pixel-perfect frontends and custom web interfaces for retail, fintech, and media clients.',
      achievements: [
        'Delivered 8+ client websites on tight 2-week deadlines with 100% client satisfaction',
        'Implemented responsive, accessible design systems complying with WCAG standards',
        'Streamlined CI/CD deployment pipelines on Vercel and Netlify',
      ],
      skills: ['React', 'CSS3', 'JavaScript (ES6+)', 'REST APIs', 'Vercel', 'Tailwind CSS'],
    },
  ];

  return (
    <section id="experience" className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-10">
        <span className="section-tag">
          <Zap size={14} /> EXPERIENCE & IMPACT
        </span>
        <h2 className="section-title">Where I've Built</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl">
          Track record of shipping software across startups, community leadership, and hackathon projects.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-blue-500/30 ml-4 sm:ml-6 space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950 group-hover:scale-125 transition-transform" />

            <div className="glass-panel p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span>{exp.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 font-normal flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {exp.description}
              </p>

              {/* Bullet Achievements */}
              <div className="space-y-2 mb-4">
                {exp.achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/50 dark:border-gray-800/50">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
