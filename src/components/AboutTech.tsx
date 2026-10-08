import React from 'react';

export const AboutTech: React.FC<{ onOpenCerts: () => void }> = ({ onOpenCerts }) => {
  const col1 = [
    { name: 'JAVASCRIPT', color: 'text-yellow-400', badge: 'JS' },
    { name: 'NODE.JS', color: 'text-emerald-500', badge: '⬢' },
    { name: 'MYSQL', color: 'text-blue-400', badge: '🐬' },
    { name: 'PRISMA', color: 'text-[#5a67d8]', badge: '◬' },
    { name: 'GIT', color: 'text-orange-500', badge: '⌥' },
    { name: 'LARAVEL', color: 'text-red-500', badge: 'L' },
    { name: 'REACT', color: 'text-cyan-400', badge: '⚛' },
  ];

  const col2 = [
    { name: 'THREE.JS', color: 'text-white', badge: '3D' },
    { name: 'NEXT.JS', color: 'text-white', badge: 'N' },
    { name: 'TYPESCRIPT', color: 'text-blue-500', badge: 'TS' },
    { name: 'DJANGO', color: 'text-emerald-600', badge: 'dj' },
    { name: 'POSTGRES', color: 'text-blue-400', badge: '🐘' },
    { name: 'TENSORFLOW', color: 'text-orange-400', badge: '⚙' },
    { name: 'GITHUB', color: 'text-slate-200', badge: '🐙' },
  ];

  const col3 = [
    { name: 'TAILWIND', color: 'text-sky-400', badge: '≈' },
    { name: 'MONGODB', color: 'text-emerald-400', badge: '🍃' },
    { name: 'HTML5', color: 'text-orange-600', badge: '5' },
    { name: 'PHP', color: 'text-indigo-400', badge: 'ele' },
    { name: 'C++', color: 'text-blue-500', badge: 'C++' },
    { name: 'PYTHON', color: 'text-blue-400', badge: '🐍' },
    { name: 'GOLANG', color: 'text-cyan-400', badge: 'Go' },
  ];

  // Tripled lists for seamless 33.333% looping
  const marqueeCol1 = [...col1, ...col1, ...col1];
  const marqueeCol2 = [...col2, ...col2, ...col2];
  const marqueeCol3 = [...col3, ...col3, ...col3];

  return (
    <section id="about" className="py-16 border-t border-[#1e2e4a]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: About Me */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            LITTLE ABOUT ME
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-tight">
            Still early, already shipping what I build.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            I'm a full stack developer based in Nairobi — founder of <strong className="text-white">Ascendancy Solutions</strong>, where I build AI automations and MVPs for people who need something shipped, not just demoed. Outside of client work, I go deep on systems programming and database internals for the sake of understanding how the tools I use every day actually work.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
            >
              MORE ABOUT ME
            </a>
            <button
              onClick={onOpenCerts}
              className="px-6 py-3 rounded-full bg-[#10172a] border border-[#223252] text-white font-bold text-xs shadow-lg hover:bg-[#16223d] transition-transform hover:scale-105 cursor-pointer"
            >
              EDUCATION & CERTS
            </button>
          </div>
        </div>

        {/* Right Side: 3-Column Dual-Direction Infinite Vertical Marquee Container */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span>TECH I WORK WITH</span>
            <span className="text-[10px] text-slate-500">Hover to pause</span>
          </div>

          {/* Marquee Wrapper with Top/Bottom Gradient Mask */}
          <div className="h-[430px] overflow-hidden mask-gradient-y rounded-2xl bg-[#0a1120]/70 border border-[#1e2e4a] p-3 backdrop-blur-xl relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
              
              {/* Column 1: Scrolls UP ↑ */}
              <div className="overflow-hidden">
                <div className="animate-marquee-up">
                  {marqueeCol1.map((tech, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className="p-3 rounded-xl bg-[#121a2d] border border-[#1e2e4a] flex items-center gap-2.5 hover:border-blue-500/60 transition-all group cursor-pointer shadow-md hover:scale-[1.02]"
                    >
                      <span className={`text-sm font-black font-mono ${tech.color}`}>
                        {tech.badge}
                      </span>
                      <span className="text-xs font-bold font-mono text-slate-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Scrolls DOWN ↓ (Opposite Direction) */}
              <div className="overflow-hidden">
                <div className="animate-marquee-down">
                  {marqueeCol2.map((tech, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className="p-3 rounded-xl bg-[#121a2d] border border-[#1e2e4a] flex items-center gap-2.5 hover:border-emerald-500/60 transition-all group cursor-pointer shadow-md hover:scale-[1.02]"
                    >
                      <span className={`text-sm font-black font-mono ${tech.color}`}>
                        {tech.badge}
                      </span>
                      <span className="text-xs font-bold font-mono text-slate-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Scrolls UP ↑ (Same direction as Column 1) */}
              <div className="overflow-hidden hidden sm:block">
                <div className="animate-marquee-up">
                  {marqueeCol3.map((tech, idx) => (
                    <div
                      key={`col3-${idx}`}
                      className="p-3 rounded-xl bg-[#121a2d] border border-[#1e2e4a] flex items-center gap-2.5 hover:border-cyan-500/60 transition-all group cursor-pointer shadow-md hover:scale-[1.02]"
                    >
                      <span className={`text-sm font-black font-mono ${tech.color}`}>
                        {tech.badge}
                      </span>
                      <span className="text-xs font-bold font-mono text-slate-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
