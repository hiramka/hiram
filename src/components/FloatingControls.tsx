import React, { useState } from 'react';
import { Lightbulb, ChevronUp, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface FloatingControlsProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ darkMode, onToggleTheme }) => {
  const [muted, setMuted] = useState(soundFx.getMuted());

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const isNowMuted = soundFx.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundFx.playLampSwitch();
    }
  };

  return (
    <div className="floating-widget-pill">
      {/* Lightbulb Theme Toggle */}
      <button
        onClick={() => {
          soundFx.playLampSwitch();
          onToggleTheme();
        }}
        className="text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
        title={darkMode ? "Switch to Light Mode 💡" : "Switch to Dark Mode 🌙"}
      >
        <Lightbulb size={18} className={darkMode ? 'text-yellow-400 fill-yellow-400/20' : 'text-slate-500'} />
      </button>

      <span className="text-slate-700">|</span>

      {/* Audio Sound Effects Toggle */}
      <button
        onClick={toggleSound}
        className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        title={muted ? "Unmute Sound Effects" : "Mute Sound Effects"}
      >
        {muted ? <VolumeX size={18} className="text-rose-400" /> : <Volume2 size={18} className="text-cyan-400" />}
      </button>

      <span className="text-slate-700">|</span>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        title="Scroll to Top"
      >
        <ChevronUp size={18} />
      </button>

      <span className="text-slate-700">|</span>

      {/* WhatsApp Chat */}
      <a
        href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}?text=${encodeURIComponent(PORTFOLIO_DATA.personal.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-emerald-400 transition-colors"
        title="WhatsApp Chat"
      >
        <MessageSquare size={18} />
      </a>
    </div>
  );
};
