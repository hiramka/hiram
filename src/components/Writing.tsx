import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Writing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const articles = PORTFOLIO_DATA.articles;

  const filteredArticles = activeCategory === 'ALL'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <section id="writing" className="py-16 border-t border-[#1e2e4a]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <BookOpen size={14} className="text-blue-400" />
            I CAN WRITE, TOO
          </div>
          <h2 className="text-4xl font-extrabold font-display text-white">
            Notes from building things
          </h2>
        </div>

        {/* Category Filter Pills (Requirement #15) */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'DEVELOPMENT', 'REACT', 'DEVOPS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-slate-950 shadow-lg scale-105'
                  : 'bg-[#121a2d] text-slate-400 border border-[#223252] hover:text-white hover:border-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="rounded-2xl bg-[#141d33] border border-[#1e2e4a] p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-[#1e2d4a] text-blue-400 border border-blue-500/30">
                  {art.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {art.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-400 transition-colors mb-2">
                {art.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1e2e4a] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{art.date}</span>
              <a
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                READ <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
