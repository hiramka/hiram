import React from 'react';
import { Award, Users, Code, Presentation, Sparkles, Terminal, Flame, BookOpen } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const CommunityImpact: React.FC = () => {
  const row1 = [
    { title: 'JKUAT Hackathon 1st Runner-Up', category: 'HACKATHON', icon: Award, color: 'text-amber-400', badgeBg: 'bg-amber-500/10 border-amber-500/30' },
    { title: 'Volunteer Dev Community Mentor', category: 'MENTORSHIP', icon: Users, color: 'text-emerald-400', badgeBg: 'bg-emerald-500/10 border-emerald-500/30' },
    { title: 'Campus Coding Workshop', category: 'WORKSHOP', icon: Code, color: 'text-cyan-400', badgeBg: 'bg-cyan-500/10 border-cyan-500/30' },
    { title: 'PastLens Team Lead Presentation', category: 'PRESENTATION', icon: Presentation, color: 'text-purple-400', badgeBg: 'bg-purple-500/10 border-purple-500/30' },
  ];

  const row2 = [
    { title: 'Certified Fullstack Engineer Award', category: 'CERTIFICATION', icon: Sparkles, color: 'text-blue-400', badgeBg: 'bg-blue-500/10 border-blue-500/30' },
    { title: 'Ascendancy Solutions Founder Keynote', category: 'KEYNOTE', icon: Flame, color: 'text-orange-400', badgeBg: 'bg-orange-500/10 border-orange-500/30' },
    { title: 'Data Structures & Algos Bootcamp', category: 'BOOTCAMP', icon: BookOpen, color: 'text-rose-400', badgeBg: 'bg-rose-500/10 border-rose-500/30' },
    { title: 'AI Model Training & Systems Demo', category: 'SYSTEMS DEMO', icon: Terminal, color: 'text-indigo-400', badgeBg: 'bg-indigo-500/10 border-indigo-500/30' },
  ];

  // Duplicate items for infinite seamless marquee loop
  const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="experience" className="py-16 border-t border-[#1e2e4a] overflow-hidden">
      <ScrollReveal>
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            COMMUNITY IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
            Product Meetings and events I impacted outside the codebase
          </h2>
          <p className="text-xs font-mono text-slate-400">
            ← Hover to pause • Continuous opposite horizontal scroll →
          </p>
        </div>
      </ScrollReveal>

      {/* Row 1: Infinite Marquee Moving LEFT */}
      <div className="mb-6 relative w-full overflow-hidden mask-gradient-x">
        <div className="animate-marquee-left flex gap-4">
          {marqueeRow1.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-72 sm:w-80 flex-shrink-0 p-5 rounded-2xl bg-[#0c1425] border border-[#1e2e4a] shadow-xl hover:border-blue-500/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${item.badgeBg} ${item.color}`}>
                    {item.category}
                  </span>
                  <div className={`p-2 rounded-xl bg-[#121b30] border border-[#203152] ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-sm font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-[#1a2842] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Community Event</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Infinite Marquee Moving RIGHT */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        <div className="animate-marquee-right flex gap-4">
          {marqueeRow2.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-72 sm:w-80 flex-shrink-0 p-5 rounded-2xl bg-[#0c1425] border border-[#1e2e4a] shadow-xl hover:border-emerald-500/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${item.badgeBg} ${item.color}`}>
                    {item.category}
                  </span>
                  <div className={`p-2 rounded-xl bg-[#121b30] border border-[#203152] ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-sm font-bold font-display text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-[#1a2842] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Community Event</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
