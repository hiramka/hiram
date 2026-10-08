import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Folder
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface HeroProps {
  onOpenContact: () => void;
  onOpenMiniGame: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenFolder: () => void;
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

interface Position {
  x: number;
  y: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onOpenMiniGame,
  onOpenResume,
  onOpenTerminal,
  onOpenFolder,
  darkMode = true,
  onToggleTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive layout computation to prevent overlaps on any viewport
  const getInitialPositions = (): { [key: string]: Position } => {
    const width = typeof window !== 'undefined' ? Math.min(window.innerWidth - 64, 1100) : 1000;

    if (width < 640) {
      // Mobile positioning (scaled down, non-overlapping)
      return {
        coffee: { x: 10, y: 10 },
        profileCard: { x: 105, y: 10 },
        stickyNote: { x: 10, y: 310 },
        lamp: { x: 220, y: 310 },
        phone: { x: 10, y: 530 },
        folder: { x: 120, y: 530 },
        terminal: { x: 10, y: 640 },
      };
    }

    if (width < 960) {
      // Tablet / Medium screens
      return {
        coffee: { x: 15, y: 15 },
        profileCard: { x: 110, y: 15 },
        stickyNote: { x: 410, y: 15 },
        lamp: { x: 630, y: 15 },
        phone: { x: 20, y: 440 },
        folder: { x: 160, y: 440 },
        terminal: { x: 450, y: 410 },
      };
    }

    // Large desktop standard blueprint layout
    return {
      coffee: { x: 20, y: 20 },
      profileCard: { x: 140, y: 15 },
      stickyNote: { x: 460, y: 20 },
      lamp: { x: 710, y: 20 },
      phone: { x: 20, y: 450 },
      folder: { x: 170, y: 450 },
      terminal: { x: 570, y: 410 },
    };
  };

  const [positions, setPositions] = useState<{ [key: string]: Position }>(getInitialPositions);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lampOn, setLampOn] = useState(true);
  const [phoneRinging, setPhoneRinging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Only adjust if not dragging
      if (!activeDrag) {
        setPositions(getInitialPositions());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeDrag]);

  const resetPositions = () => {
    setPositions(getInitialPositions());
  };

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    setActiveDrag(id);
    dragStartRef.current = {
      x: e.clientX - positions[id].x,
      y: e.clientY - positions[id].y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (id: string, e: React.PointerEvent) => {
    if (activeDrag !== id) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    const maxW = containerRef.current ? containerRef.current.clientWidth - 100 : 1000;
    const maxH = containerRef.current ? containerRef.current.clientHeight - 80 : 700;

    setPositions((prev) => ({
      ...prev,
      [id]: { x: Math.max(-10, Math.min(maxW, newX)), y: Math.max(-10, Math.min(maxH, newY)) },
    }));
  };

  const handlePointerUp = (id: string, e: React.PointerEvent) => {
    if (activeDrag === id) {
      setActiveDrag(null);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section id="home" className="relative min-h-[720px] w-full pt-4 pb-12 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
          <Sparkles size={14} /> CANVAS BLUEPRINT WORKSPACE
        </span>
        <button
          onClick={resetPositions}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer btn-tactile"
        >
          <RotateCcw size={12} /> Reset Canvas Items
        </button>
      </div>

      {/* Main Interactive Blueprint Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[660px] rounded-3xl border border-slate-800/80 bg-[#070a13]/70 backdrop-blur-xl p-4 sm:p-8 overflow-hidden"
      >
        {/* 1. Coffee Cup */}
        <div
          className="draggable-item text-center group z-20"
          style={{
            transform: `translate3d(${positions.coffee.x}px, ${positions.coffee.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('coffee', e)}
          onPointerMove={(e) => handlePointerMove('coffee', e)}
          onPointerUp={(e) => handlePointerUp('coffee', e)}
          onClick={() => {
            soundFx.playCoffeeSip();
            confetti({ particleCount: 40, spread: 50, origin: { x: 0.2, y: 0.2 } });
          }}
          title="Click for coffee ☕"
        >
          <div className="animate-float-slow">
            <div className="relative w-16 h-20 mx-auto flex items-center justify-center filter drop-shadow-2xl hover:scale-110 transition-transform cursor-grab active:cursor-grabbing">
              <img
                src="/images/coffee1.png"
                alt="Coffee Cup"
                className="w-14 h-18 object-contain pointer-events-none"
              />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 inline-block mt-1">
              Move me around
            </span>
          </div>
        </div>

        {/* 2. Official Profile Card Widget */}
        <div
          className="draggable-item z-30"
          style={{
            transform: `translate3d(${positions.profileCard.x}px, ${positions.profileCard.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('profileCard', e)}
          onPointerMove={(e) => handlePointerMove('profileCard', e)}
          onPointerUp={(e) => handlePointerUp('profileCard', e)}
        >
          <div className="relative w-[270px] p-5 rounded-[28px] bg-[#0d1526]/95 border-2 border-[#1e2d4a] shadow-2xl shadow-blue-950/40 text-center space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="absolute -top-5 -left-5 z-40 pointer-events-none">
              <svg className="w-8 h-8 text-[#2563eb] fill-current filter drop-shadow-md transform -rotate-12" viewBox="0 0 24 24">
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
            </div>

            <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden ring-2 ring-blue-500/30">
              <img
                src="/images/me-small.jpg"
                alt={PORTFOLIO_DATA.personal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-lg font-bold font-display text-white">{PORTFOLIO_DATA.personal.name}</h2>
                <span className="w-5 h-5 rounded-full bg-[#00d084] text-slate-950 text-xs font-bold flex items-center justify-center shadow-md">✓</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={onOpenContact}
                className="btn-tactile px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1 cursor-pointer"
              >
                LET'S TALK <ArrowUpRight size={14} className="arrow-icon" />
              </button>
              <a
                href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}?text=${encodeURIComponent(PORTFOLIO_DATA.personal.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile w-9 h-9 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-lg"
                title="WhatsApp Direct"
              >
                <MessageSquare size={16} className="fill-emerald-600 text-emerald-600" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Sticky Post-it Note Widget */}
        <div
          className="draggable-item text-center z-20"
          style={{
            transform: `translate3d(${positions.stickyNote.x}px, ${positions.stickyNote.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('stickyNote', e)}
          onPointerMove={(e) => handlePointerMove('stickyNote', e)}
          onPointerUp={(e) => handlePointerUp('stickyNote', e)}
        >
          <div className="animate-float-medium">
            <div className="relative w-[210px] p-5 rounded-2xl bg-white border border-slate-200 shadow-2xl text-left font-sans text-xs space-y-1.5 text-slate-900">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-900 rounded-sm shadow-sm" />

              <div className="font-semibold text-slate-900 pt-1 text-sm">Ship it.</div>
              <div className="font-semibold text-slate-900 text-sm">Ask why twice.</div>
              <div className="font-semibold text-slate-900 text-sm">Fewer moving parts.</div>
              <div className="text-[#ff5533] italic font-bold text-sm pt-1">3+ Years of experience</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 inline-block mt-2">
              Move me around
            </span>
          </div>
        </div>

        {/* 4. Desk Lamp (Light/Dark Mode Toggle) */}
        <div
          className="draggable-item text-center z-30"
          style={{
            transform: `translate3d(${positions.lamp.x}px, ${positions.lamp.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('lamp', e)}
          onPointerMove={(e) => handlePointerMove('lamp', e)}
          onPointerUp={(e) => handlePointerUp('lamp', e)}
          onClick={() => {
            soundFx.playLampSwitch();
            onToggleTheme?.();
          }}
          title={darkMode ? "Switch to Light Mode 💡" : "Switch to Dark Mode 🌙"}
        >
          <div className="animate-float-reverse">
            <div className="relative group cursor-pointer inline-block">
              {darkMode && (
                <div className="absolute -inset-8 bg-yellow-400/30 rounded-full blur-2xl pointer-events-none" />
              )}
              <img
                src="/images/bluelamp1.png"
                alt="Desk Lamp"
                className={`w-26 h-26 object-contain filter drop-shadow-2xl transition-all ${darkMode ? 'brightness-125 scale-105' : 'brightness-90 opacity-80'}`}
              />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 block w-max mx-auto mt-1 cursor-pointer hover:border-yellow-400 transition-colors">
              Switch the mood
            </span>
          </div>
        </div>

        {/* 5. Vintage Phone (Hotline / Contact Page Link) */}
        <div
          className="draggable-item text-center z-30"
          style={{
            transform: `translate3d(${positions.phone.x}px, ${positions.phone.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('phone', e)}
          onPointerMove={(e) => handlePointerMove('phone', e)}
          onPointerUp={(e) => handlePointerUp('phone', e)}
          onClick={() => {
            soundFx.playPhoneRing();
            setPhoneRinging(true);
            onOpenContact();
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => setPhoneRinging(false), 2000);
          }}
          title="Click to open Contact 📞"
        >
          <div className="animate-float-slow">
            <div className="relative inline-block cursor-pointer">
              <div className={`${phoneRinging ? 'animate-bounce' : 'hover:scale-110 transition-transform'}`}>
                <img
                  src="/images/blue_phone.png"
                  alt="Retro Phone"
                  className="w-22 h-22 object-contain filter drop-shadow-2xl"
                />
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 block w-max mx-auto mt-1">
              Get in touch
            </span>
          </div>
        </div>

        {/* 6. Blue Tech Stack Folder / Envelope */}
        <div
          className="draggable-item text-center z-30"
          style={{
            transform: `translate3d(${positions.folder.x}px, ${positions.folder.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('folder', e)}
          onPointerMove={(e) => handlePointerMove('folder', e)}
          onPointerUp={(e) => handlePointerUp('folder', e)}
          onClick={() => {
            soundFx.playFolderOpen();
            onOpenFolder();
            const el = document.getElementById('skills');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          title="Click to open Tech Stack 📁"
        >
          <div className="animate-float-medium">
            <div className="cursor-pointer hover:scale-110 transition-transform inline-block">
              <div className="w-20 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-400 border-2 border-sky-300 shadow-xl shadow-sky-500/30 flex items-center justify-center">
                <Folder size={32} className="text-white fill-white/80" />
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 block w-max mx-auto mt-2">
              My Tech Stack
            </span>
          </div>
        </div>

        {/* 7. Interactive Terminal Window */}
        <div
          className="draggable-item text-center z-30"
          style={{
            transform: `translate3d(${positions.terminal.x}px, ${positions.terminal.y}px, 0)`,
          }}
          onPointerDown={(e) => handlePointerDown('terminal', e)}
          onPointerMove={(e) => handlePointerMove('terminal', e)}
          onPointerUp={(e) => handlePointerUp('terminal', e)}
          onClick={() => {
            soundFx.playTerminalClack();
            onOpenTerminal();
          }}
        >
          <div className="relative w-[280px] p-4 rounded-2xl bg-[#e0f2fe]/95 border border-sky-300 shadow-2xl font-mono text-xs cursor-pointer space-y-2 hover:border-sky-400 transition-colors text-left">
            <div className="flex items-center justify-between border-b border-sky-200 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              </div>
              <span className="text-[11px] text-sky-800 font-bold">Hiram ~ zsh</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-blue-600 font-bold">~ $ who_am_i</span>
                <p className="text-slate-800 font-medium pl-2">Full Stack Engineer · Founder, Ascendancy Solutions · Nairobi · 2+ years</p>
              </div>
              <div>
                <span className="text-blue-600 font-bold">~ $ focus</span>
                <p className="text-slate-800 font-medium pl-2">Go, systems programming, database internals, system & app development,automations </p>
              </div>
              <div className="text-blue-600 font-bold animate-pulse">~ $ _</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#0d1424] text-white text-[10px] font-mono font-bold shadow-xl border border-slate-700/80 inline-block mt-2">
            Move me around
          </span>
        </div>

        {/* Center Main Editorial Headline */}
        <div className="pt-48 sm:pt-60 md:pt-64 pb-12 max-w-3xl mx-auto text-center space-y-4 relative z-10 pointer-events-auto">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            • {PORTFOLIO_DATA.personal.eyebrow}
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.18] tracking-tight">
            I turn ideas into{' '}
            <span className="font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              clear custom
            </span>
            <br />
            direction
            <br />
            & ship with cross-functional
            <br />
            teams software that
            <br />
            <span className="text-[#ff5533] font-extrabold block">sells.</span>
            <span className="text-[#ff5533] font-extrabold block opacity-60 text-2xl sm:text-4xl -mt-1">converts.</span>
          </h1>

          {/* Action Buttons Below Headline */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={onOpenMiniGame}
              className="btn-tactile px-6 py-3 rounded-full bg-[#18181b] text-white font-bold text-xs shadow-xl cursor-pointer flex items-center gap-1.5 hover:bg-black"
            >
              PLAY A ROUND ↓
            </button>
            <button
              onClick={onOpenResume}
              className="btn-tactile px-6 py-3 rounded-full bg-white/60 backdrop-blur-md border border-slate-300 text-slate-900 font-bold text-xs shadow-sm cursor-pointer flex items-center gap-1.5 hover:bg-white"
            >
              ↓ RÉSUMÉ
            </button>
          </div>

          <p className="text-[11px] font-mono text-slate-500 pt-2">
            try dragging items around.
          </p>
        </div>
      </div>
    </section>
  );
};
