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
      {/* Floating Trigger Button when Collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-2xl bg-[#070e1b]/95 border border-[#1a2842] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-2xl backdrop-blur-xl cursor-pointer group transition-all"
          aria-label="Expand Navigation"
          title="Expand Navigation Bar"
        >
          <PanelLeftOpen size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0d1526] text-white text-xs font-mono border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Expand Sidebar
          </span>
        </button>
      )}

      {/* Main Collapsible Navigation Rail matching Screenshot */}
      <nav
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 p-2.5 bg-[#070e1b]/95 border border-[#1a2842] shadow-2xl backdrop-blur-2xl rounded-[32px] transition-all duration-300 ease-in-out ${
          isCollapsed 
            ? '-translate-x-32 opacity-0 pointer-events-none' 
            : 'translate-x-0 opacity-100'
        }`}
        aria-label="Main Left Navigation"
      >
        {/* Top Collapse Toggle Control */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="w-10 h-6 flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors cursor-pointer mb-1 group"
          title="Collapse Sidebar"
          aria-label="Collapse Navigation"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Items (Matching Screenshot layout) */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative group w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#162e52] text-[#38bdf8] border border-[#254b7c]/60 shadow-lg shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />

              {/* Active Cyan Dot Indicator matching Screenshot */}
              {isActive && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
              )}

              {/* Tooltip on Hover */}
              <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0d1526] text-white text-xs font-mono font-medium border border-[#203152] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Horizontal Divider Line matching Screenshot */}
        <div className="w-7 h-[1px] bg-[#1a2842] my-1" />

        {/* Résumé Action Button (Item #8 in Screenshot) */}
        <button
          onClick={onOpenResume}
          className="relative group w-11 h-11 flex items-center justify-center rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
          aria-label="Résumé PDF"
        >
          <FileText size={20} strokeWidth={1.8} />
          <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0d1526] text-white text-xs font-mono font-medium border border-[#203152] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50">
            Résumé PDF
          </span>
        </button>
      </nav>
    </>
  );
};
