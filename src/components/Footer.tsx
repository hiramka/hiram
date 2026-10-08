import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Twitter, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nairobiTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(nairobiTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="mt-20 border-t border-[#1e2e4a] py-10 text-xs text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white font-display">Hiram Karomo (Hiram)</span>
          <span>© {new Date().getFullYear()} — All rights reserved.</span>
        </div>

        {/* Middle Nairobi clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1424] border border-[#1e2e4a] font-mono text-[11px]">
          <Clock size={12} className="text-blue-400" />
          <span>Nairobi Local Time: <strong className="text-white">{time || '11:57 AM'} EAT</strong></span>
        </div>

        {/* Social Icons (GitHub, LinkedIn, Instagram) */}
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0d1424] text-slate-400 hover:text-white border border-[#1e2e4a] hover:border-slate-400 transition-all"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0d1424] text-slate-400 hover:text-blue-400 border border-[#1e2e4a] hover:border-blue-500 transition-all"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0d1424] text-slate-400 hover:text-pink-400 border border-[#1e2e4a] hover:border-pink-500 transition-all"
            title="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
