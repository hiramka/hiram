import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  cmd: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      cmd: 'welcome',
      output: (
        <div>
          <p className="text-emerald-400 font-bold">Hiram Karomo Interactive Shell v2.4.0</p>
          <p className="text-gray-400 text-xs mt-1">Type <span className="text-yellow-300 font-bold">'help'</span> to see available commands.</p>
        </div>
      ),
    },
  ]);

  const [matrixMode, setMatrixMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    if (!cleanCmd) return;

    let outputNode: React.ReactNode = null;

    switch (cleanCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-yellow-300 font-bold">Available Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">whoami</span> — Display engineer bio & profile</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">projects</span> — List shipped production projects</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">skills</span> — Display tech stack matrix</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">contact</span> — Get direct contact channels</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">matrix</span> — Toggle digital rain mode 🕶️</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">sudo hire</span> — Hire Hiram Karomo🎉</p>
            <p><span className="text-emerald-400 w-24 inline-block font-bold">clear</span> — Clear terminal output</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-xs space-y-1">
            <p className="text-blue-400 font-bold">Hiram Karomo (Full Stack & Systems Engineer)</p>
            <p className="text-gray-300">Location: Nairobi, Kenya 🇰🇪</p>
            <p className="text-gray-300">Passionate about building fast web apps, AI voice agents, and high-impact digital experiences.</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs space-y-1">
            <p className="text-purple-400 font-bold">🚀 Top Shipped Projects:</p>
            <p>1. <span className="text-emerald-400 font-bold">pastlens</span> — AI Digital Museum (1st Runner-Up @ JKUAT)</p>
            <p>2. <span className="text-emerald-400 font-bold">Sauti AI</span> — Swahili Voice Assistant for Merchants</p>
            <p>3. <span className="text-emerald-400 font-bold">sportsman.ke</span> — AI Sports Data Analytics Platform</p>
            <p>4. <span className="text-emerald-400 font-bold">KibandaPay</span> — POS & Instant Settlement PWA</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-1">
            <p className="text-cyan-400 font-bold">🛠 Tech Stack:</p>
            <p>Frontend: React, Next.js, TypeScript, Tailwind CSS, WebGL</p>
            <p>Backend: Node.js, Express, Python, FastAPI, Google Gemini API</p>
            <p>Database: PostgreSQL, MongoDB, Prisma ORM, Redis</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1">
            <p className="text-emerald-400 font-bold">📬 Reach Out:</p>
            <p>Email: <a href="mailto:waithaka.dev@gmail.com" className="underline text-blue-400">waithaka.dev@gmail.com</a></p>
            <p>WhatsApp: +254 725 676 491</p>
            <p>GitHub: github.com/waithaka</p>
          </div>
        );
        break;

      case 'matrix':
        setMatrixMode(!matrixMode);
        outputNode = <p className="text-emerald-400 font-mono">Matrix digital rain {matrixMode ? 'disabled' : 'activated'} 🟢</p>;
        break;

      case 'sudo hire':
      case 'hire':
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        outputNode = (
          <div className="text-xs p-2 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold">
            🎉 EXCELLENT DECISION! Let's build something extraordinary together. Email: waithaka.dev@gmail.com
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs">
            command not found: '{cleanCmd}'. Type <span className="text-yellow-300 font-bold">'help'</span> for list of commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { cmd: input, output: outputNode }]);
    setInput('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content overflow-hidden border border-slate-700 bg-slate-950 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 ml-2">
              <TerminalIcon size={14} className="text-emerald-400" /> waithaka@dev-machine:~
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className={`p-5 font-mono text-sm h-[360px] overflow-y-auto space-y-4 ${matrixMode ? 'bg-black text-emerald-400' : 'bg-slate-950'}`}>
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">waithaka@dev:~$</span>
                <span>{log.cmd}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}

          {/* Prompt Form */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold text-xs">waithaka@dev:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command ('help', 'projects', 'sudo hire')..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-white font-mono placeholder-slate-600"
              autoFocus
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
