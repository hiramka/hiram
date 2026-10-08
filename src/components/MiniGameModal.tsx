import React, { useState, useEffect } from 'react';
import { X, Gamepad2, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MiniGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CARDS_DATA = [
  { id: 1, icon: '⚛️', name: 'React' },
  { id: 2, icon: '⚡', name: 'Vite' },
  { id: 3, icon: '🐍', name: 'Python' },
  { id: 4, icon: '🚀', name: 'Next.js' },
  { id: 5, icon: '🤖', name: 'Gemini AI' },
  { id: 6, icon: '🐳', name: 'Docker' },
];

export const MiniGameModal: React.FC<MiniGameModalProps> = ({ isOpen, onClose }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const duplicated = [...CARDS_DATA, ...CARDS_DATA]
      .map((item, index) => ({ ...item, uniqueId: index }))
      .sort(() => Math.random() - 0.5);

    setCards(duplicated);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    if (isOpen) {
      initGame();
    }
  }, [isOpen]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched((prev) => {
          const next = [...prev, first, second];
          if (next.length === cards.length) {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
          }
          return next;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  if (!isOpen) return null;

  const isGameOver = matched.length === cards.length && cards.length > 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase">
          <Gamepad2 size={16} /> Dev Memory Match Game
        </div>

        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
          Play a Quick Round 🎮
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Match pairs of tech stack icons! Can you beat it in under 10 moves?
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-mono">
          <span>Moves: <strong className="text-blue-600 dark:text-blue-400">{moves}</strong></span>
          <span>Matched: <strong className="text-emerald-600 dark:text-emerald-400">{matched.length / 2} / {CARDS_DATA.length}</strong></span>
          <button onClick={initGame} className="flex items-center gap-1 text-purple-600 hover:underline cursor-pointer">
            <RefreshCw size={12} /> Restart
          </button>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);

            return (
              <div
                key={card.uniqueId}
                onClick={() => handleCardClick(idx)}
                className={`h-20 rounded-xl flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300 transform ${
                  isFlipped
                    ? 'bg-blue-600 text-white shadow-lg rotate-0'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {isFlipped ? card.icon : '❓'}
              </div>
            );
          })}
        </div>

        {/* Victory Message */}
        {isGameOver && (
          <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <Trophy size={20} className="text-amber-500" /> YOU WON IN {moves} MOVES!
            </div>
            <p className="text-xs">Great focus! Ready to build something together?</p>
            <button
              onClick={onClose}
              className="mt-2 btn-primary bg-emerald-600 hover:bg-emerald-700 text-xs py-2 px-4 inline-block cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
