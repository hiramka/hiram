import React, { useState } from 'react';
import { Dock } from './components/Dock';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { CommunityImpact } from './components/CommunityImpact';
import { AboutTech } from './components/AboutTech';
import { EducationCerts } from './components/EducationCerts';
import { TicTacToeSection } from './components/TicTacToeSection';
import { Skills } from './components/Skills';
import { Writing } from './components/Writing';
import { ContactSection } from './components/ContactSection';
import { TerminalModal } from './components/TerminalModal';
import { MiniGameModal } from './components/MiniGameModal';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Folder, X, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  
  // Modals state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [miniGameOpen, setMiniGameOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'contact') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-blueprint transition-colors duration-300 ${darkMode ? 'dark' : 'light'}`}>
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Glowing Cursor Follower */}
      <CustomCursor />

      <div className="flex min-h-screen">
        {/* Vertical Left Navigation Dock */}
        <Dock
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Content Container */}
        <main className="flex-1 ml-0 md:ml-24 px-4 sm:px-8 py-4 max-w-7xl">
          <Hero
            onOpenContact={() => setContactOpen(true)}
            onOpenMiniGame={() => setMiniGameOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenFolder={() => setFolderOpen(true)}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />

          <Projects />
          <CommunityImpact />
          <AboutTech onOpenCerts={() => setResumeOpen(true)} />
          <EducationCerts />
          <TicTacToeSection />
          <Skills />
          <Writing />
          <ContactSection onOpenContactModal={() => setContactOpen(true)} />
          <Footer />
        </main>
      </div>

      {/* Floating Bottom Right Controls Pill */}
      <FloatingControls
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Modals & Interactive Overlays */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <MiniGameModal
        isOpen={miniGameOpen}
        onClose={() => setMiniGameOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Quick Folder Drawer */}
      {folderOpen && (
        <div className="modal-overlay">
          <div className="modal-content p-6 max-w-lg relative">
            <button
              onClick={() => setFolderOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4 text-blue-400 font-mono text-xs font-bold uppercase">
              <Folder size={18} /> Quick Project Files
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-4">
              Shipped Projects Directory
            </h3>

            <div className="space-y-3">
              {[
                { name: 'pastlens-v2.0/', desc: 'AI Digital Museum (1st Runner Up JKUAT)', link: 'https://pastlens.vercel.app/' },
                { name: 'sauti-ai-assistant/', desc: 'Swahili Voice Financial Assistant', link: 'https://sauti-ai-demo.vercel.app/' },
                { name: 'devpulse-analytics/', desc: 'Engineering Velocity Insights', link: 'https://devpulse.vercel.app/' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#121a2d] border border-[#1e2e4a] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold font-mono text-blue-400">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
