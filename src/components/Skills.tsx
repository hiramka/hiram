import React from 'react';
import { Code, Server, Database, Cpu, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TiltCard } from './TiltCard';

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend & UI Engineering',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL', 'Zustand', 'HTML5/CSS3', 'Responsive Design', 'PWA'],
    },
    {
      title: 'Backend & AI Systems',
      icon: Server,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'Google Gemini API', 'OpenAI Whisper', 'RESTful APIs', 'WebSockets', 'JWT Auth'],
    },
    {
      title: 'Databases & Infrastructure',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis', 'Docker', 'Vercel', 'Git & GitHub', 'Linux / Bash', 'Cloudinary'],
    },
  ];

  return (
    <section id="skills" className="py-16 border-t border-[#1e2e4a]">
      <ScrollReveal>
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            TECH STACK & CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Tools of the Trade
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-normal">
            Technologies and tools I use to take projects from concept to production-grade applications.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-container">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <ScrollReveal key={idx} delay={idx * 100}>
              <TiltCard maxTilt={5}>
                <div className={`p-6 rounded-3xl bg-[#0d1424] border ${cat.borderColor} flex flex-col justify-between h-full shadow-2xl hover:border-blue-500/50 transition-all`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl ${cat.bgColor} ${cat.color} border border-white/5`}>
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-bold font-display text-white">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#121a2d] text-slate-300 border border-[#223252] shadow-sm hover:border-blue-500 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1e2e4a] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Production Ready</span>
                    <Sparkles size={12} className={cat.color} />
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
