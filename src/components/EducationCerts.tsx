import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const EducationCerts: React.FC = () => {
  const certs = [
    {
      title: 'Ethical Hacker',
      issueDate: 'Issued 02 Dec 2025',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-ethical-hacker.png',
      issuer: 'Cisco Networking Academy',
    },
    {
      title: 'Networking Essentials',
      issueDate: 'Issued 23 Apr 2024',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-networking-essentials.png',
      issuer: 'Cisco Networking Academy',
    },
    {
      title: 'Partner: CPA - Programming Essentials in C++',
      issueDate: 'Issued 23 Nov 2023',
      badge: 'CERTIFICATION',
      imageUrl: '/images/education/cisco-cpp-essentials.png',
      issuer: 'Cisco Networking Academy',
    },
  ];

  // Duplicated 4x for seamless infinite marquee loop
  const marqueeCerts = [...certs, ...certs, ...certs, ...certs];

  return (
    <section id="experience" className="py-16 border-t border-[#1e2e4a] overflow-hidden">
      <ScrollReveal>
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
              EDUCATION & CERTIFICATIONS
            </span>
            <span className="text-[10px] text-slate-500">← Hover to pause continuous scroll →</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Always still learning.
          </h2>
        </div>
      </ScrollReveal>

      {/* Infinite Horizontal Auto-Scrolling Marquee Row */}
      <div className="relative w-full overflow-hidden mask-gradient-x py-2">
        <div className="animate-marquee-left flex gap-6">
          {marqueeCerts.map((c, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[350px] flex-shrink-0 rounded-2xl bg-[#141d33] border border-[#1e2e4a] overflow-hidden shadow-xl hover:border-blue-500/60 transition-all group flex flex-col justify-between hover:-translate-y-1.5 duration-300 cursor-pointer"
            >
              {/* Top Preview Image with Overlay Tag */}
              <div className="relative h-44 w-full overflow-hidden bg-[#0d1424]">
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/85 text-slate-200 backdrop-blur-md border border-slate-800">
                  {c.issueDate}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 bg-[#141d33] space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#1e2d4a] text-blue-400 inline-block">
                    {c.badge}
                  </span>
                  <h3 className="text-sm font-bold font-display text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {c.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-slate-400 pt-2 border-t border-[#1e2d4a]">
                  {c.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
