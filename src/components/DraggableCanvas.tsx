import React, { useState, useRef } from 'react';
import {
  Coffee,
  Lightbulb,
  PhoneCall,
  Folder,
  Terminal as TerminalIcon,
  CheckCircle2,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface DraggableCanvasProps {
  onOpenTerminal: () => void;
  onOpenFolder: () => void;
}

export const DraggableCanvas: React.FC<DraggableCanvasProps> = ({
  onOpenTerminal,
  onOpenFolder,
}) => {
  // Initial positions for interactive desk items
  const [positions, setPositions] = useState<{ [key: string]: Position }>({
    stickyNote: { x: 20, y: 20 },
    coffee: { x: 240, y: 20 },
    lamp: { x: 440, y: 20 },
    phone: { x: 20, y: 160 },
    folder: { x: 220, y: 160 },
    terminal: { x: 420, y: 160 },
  });

  const [coffeeSips, setCoffeeSips] = useState(3);
  const [lampOn, setLampOn] = useState(false);
  const [phoneRinging, setPhoneRinging] = useState(false);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const resetPositions = () => {
    setPositions({
      stickyNote: { x: 20, y: 20 },
      coffee: { x: 240, y: 20 },
      lamp: { x: 440, y: 20 },
      phone: { x: 20, y: 160 },
      folder: { x: 220, y: 160 },
      terminal: { x: 420, y: 160 },
    });
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

    setPositions((prev) => ({
      ...prev,
      [id]: { x: Math.max(-20, Math.min(650, newX)), y: Math.max(-10, Math.min(320, newY)) },
    }));
  };

  const handlePointerUp = (id: string, e: React.PointerEvent) => {
    if (activeDrag === id) {
      setActiveDrag(null);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const drinkCoffee = () => {
    if (coffeeSips > 0) setCoffeeSips((s) => s - 1);
    else setCoffeeSips(3);
  };

  const ringPhone = () => {
    setPhoneRinging(true);
    setTimeout(() => setPhoneRinging(false), 2000);
  };

  return (
    <div className={`canvas-area bg-blueprint-dots relative min-h-[360px] overflow-hidden rounded-2xl transition-all ${lampOn ? 'ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-500/10' : ''}`}>
      {/* Top Banner Control */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-xs font-mono text-gray-500">
        <span className="flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles size={14} /> Interactive Blueprint Workspace
        </span>
        <button
          onClick={resetPositions}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
          title="Reset item layout"
        >
          <RotateCcw size={12} /> Reset Layout
        </button>
      </div>

      <div className="relative w-full h-[280px]">
        {/* 1. Sticky Note */}
        <div
          className="draggable-item sticky-note"
          style={{
            transform: `translate(${positions.stickyNote.x}px, ${positions.stickyNote.y}px) rotate(-3deg)`,
          }}
          onPointerDown={(e) => handlePointerDown('stickyNote', e)}
          onPointerMove={(e) => handlePointerMove('stickyNote', e)}
          onPointerUp={(e) => handlePointerUp('stickyNote', e)}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1">📌 Note:</div>
          <div className="text-xs leading-snug">
            Try dragging items around! Every widget is interactive. 🚀
          </div>
        </div>

        {/* 2. Coffee Cup */}
        <div
          className="draggable-item coffee-card cursor-pointer"
          style={{
            transform: `translate(${positions.coffee.x}px, ${positions.coffee.y}px)`,
          }}
          onPointerDown={(e) => handlePointerDown('coffee', e)}
          onPointerMove={(e) => handlePointerMove('coffee', e)}
          onPointerUp={(e) => handlePointerUp('coffee', e)}
          onClick={drinkCoffee}
        >
          <Coffee size={20} className="text-amber-700 dark:text-amber-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold">Coffee ({coffeeSips}/3 sips)</div>
            <div className="text-[10px] text-gray-500">Click to sip ☕</div>
          </div>
        </div>

        {/* 3. Desk Lamp */}
        <div
          className={`draggable-item p-3 rounded-xl border backdrop-blur-md cursor-pointer transition-colors ${lampOn
              ? 'bg-yellow-100/90 text-yellow-800 border-yellow-300 shadow-lg shadow-yellow-500/20'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700'
            }`}
          style={{
            transform: `translate(${positions.lamp.x}px, ${positions.lamp.y}px)`,
          }}
          onPointerDown={(e) => handlePointerDown('lamp', e)}
          onPointerMove={(e) => handlePointerMove('lamp', e)}
          onPointerUp={(e) => handlePointerUp('lamp', e)}
          onClick={() => setLampOn(!lampOn)}
        >
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className={lampOn ? 'text-yellow-600 fill-yellow-400' : 'text-gray-400'} />
            <div>
              <div className="text-xs font-bold">Desk Lamp</div>
              <div className="text-[10px] text-gray-500">{lampOn ? 'ON 💡' : 'OFF (Click to toggle)'}</div>
            </div>
          </div>
        </div>

        {/* 4. Phone Widget */}
        <div
          className={`draggable-item p-3 rounded-xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-md cursor-pointer ${phoneRinging ? 'animate-bounce border-green-500 text-green-600' : 'border-gray-200 dark:border-gray-700'
            }`}
          style={{
            transform: `translate(${positions.phone.x}px, ${positions.phone.y}px)`,
          }}
          onPointerDown={(e) => handlePointerDown('phone', e)}
          onPointerMove={(e) => handlePointerMove('phone', e)}
          onPointerUp={(e) => handlePointerUp('phone', e)}
          onClick={ringPhone}
        >
          <div className="flex items-center gap-2">
            <PhoneCall size={20} className={phoneRinging ? 'text-green-500 animate-spin' : 'text-blue-500'} />
            <div>
              <div className="text-xs font-bold">Hotline</div>
              <div className="text-[10px] text-gray-500">{phoneRinging ? 'Ring Ring! 📞' : 'Click to call'}</div>
            </div>
          </div>
        </div>

        {/* 5. Folder Widget */}
        <div
          className="draggable-item p-3 rounded-xl border bg-blue-50/90 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 cursor-pointer hover:scale-105 transition-transform"
          style={{
            transform: `translate(${positions.folder.x}px, ${positions.folder.y}px)`,
          }}
          onPointerDown={(e) => handlePointerDown('folder', e)}
          onPointerMove={(e) => handlePointerMove('folder', e)}
          onPointerUp={(e) => handlePointerUp('folder', e)}
          onClick={onOpenFolder}
          aria-label="Open folder"
        >
          <div className="flex items-center gap-2">
            <Folder size={22} className="text-blue-600 dark:text-blue-400 fill-blue-500/20" />
            <div>
              <div className="text-xs font-bold text-blue-900 dark:text-blue-200">Shipped Projects</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400">Open Folder 📂</div>
            </div>
          </div>
        </div>

        {/* 6. Terminal Launcher */}
        <div
          className="draggable-item p-3 rounded-xl border bg-slate-900 text-emerald-400 border-slate-700 cursor-pointer shadow-xl hover:scale-105 transition-transform"
          style={{
            transform: `translate(${positions.terminal.x}px, ${positions.terminal.y}px)`,
          }}
          onPointerDown={(e) => handlePointerDown('terminal', e)}
          onPointerMove={(e) => handlePointerMove('terminal', e)}
          onPointerUp={(e) => handlePointerUp('terminal', e)}
          onClick={onOpenTerminal}
        >
          <div className="flex items-center gap-2">
            <TerminalIcon size={20} className="text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-slate-100">zsh -- Hiram KaromoCLI</div>
              <div className="text-[10px] text-emerald-400">Click to run commands ⚡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
