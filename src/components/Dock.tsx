import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  User, 
  Zap, 
  PenTool, 
  Phone, 
  FileText,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface DockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Dock: React.FC<DockProps> = ({ 
  activeSection, 
  onNavigate,
  onOpenResume 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Selected Work', icon: Briefcase },
    { id: 'experience', label: 'Community & Experience', icon: Users },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'skills', label: 'Tech Capabilities', icon: Zap },
    { id: 'writing', label: 'Writing & Notes', icon: PenTool },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      {/* Floating Trigger Button when Collapsed (Desktop only) */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="hidden md:flex fixed left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-2xl bg-[#070e1b]/95 border border-[#1a2842] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-2xl backdrop-blur-xl cursor-pointer group transition-all"
          aria-label="Expand Navigation"
          title="Expand Navigation Bar"
        >
          <PanelLeftOpen size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0d1526] text-white text-xs font-mono border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Expand Sidebar
          </span>
        </button>
      )}

      {/* Main Responsive Navigation Dock (Bottom bar on mobile, left rail on desktop) */}
      <nav
        className={`fixed z-50 transition-all duration-300 ease-in-out bg-[#070e1b]/95 border border-[#1a2842] shadow-2xl backdrop-blur-2xl
          /* Mobile styles: Bottom pill dock */
          bottom-3 left-1/2 -translate-x-1/2 flex flex-row items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full max-w-[96vw] overflow-x-auto
          /* Desktop styles: Left vertical rail */
          md:bottom-auto md:top-1/2 md:left-4 md:-translate-y-1/2 md:translate-x-0 md:flex-col md:rounded-[32px] md:p-2.5 md:overflow-visible
          ${
            isCollapsed 
              ? 'md:-translate-x-32 md:opacity-0 md:pointer-events-none' 
              : 'md:translate-x-0 md:opacity-100'
          }`}
        aria-label="Main Navigation"
      >
        {/* Desktop Collapse Toggle Control */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="hidden md:flex w-10 h-6 items-center justify-center text-slate-500 hover:text-slate-200 transition-colors cursor-pointer mb-1 group"
          title="Collapse Sidebar"
          aria-label="Collapse Navigation"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Items */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative group w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#162e52] text-[#38bdf8] border border-[#254b7c]/60 shadow-lg shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={18} className="sm:hidden" strokeWidth={isActive ? 2.2 : 1.8} />
              <Icon size={20} className="hidden sm:block" strokeWidth={isActive ? 2.2 : 1.8} />

              {/* Active Cyan Dot Indicator */}
              {isActive && (
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
              )}

              {/* Tooltip on Hover */}
              <span className="absolute hidden md:block left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0d1526] text-white text-xs font-mono font-medium border border-[#203152] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider Line (Vertical on mobile, horizontal on desktop) */}
        <div className="w-[1px] h-6 bg-[#1a2842] mx-1 md:w-7 md:h-[1px] md:my-1 md:mx-0 flex-shrink-0" />

        {/* Résumé Action Button */}
        <button
          onClick={onOpenResume}
          className="relative group w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
          aria-label="Résumé PDF"
          title="Résumé PDF"
        >
          <FileText size={18} className="sm:hidden" strokeWidth={1.8} />
          <FileText size={20} className="hidden sm:block" strokeWidth={1.8} />
          <span className="absolute hidden md:block left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0d1526] text-white text-xs font-mono font-medium border border-[#203152] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50">
            Résumé PDF
          </span>
        </button>
      </nav>
    </>
  );
};
