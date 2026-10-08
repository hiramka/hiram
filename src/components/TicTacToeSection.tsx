import React, { useState } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TicTacToeSection: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]            // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const nextBoard = [...board];
    nextBoard[index] = 'X';
    setBoard(nextBoard);

    const win = calculateWinner(nextBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      return;
    }

    if (nextBoard.every((cell) => cell !== null)) {
      setWinner('DRAW');
      return;
    }

    // AI turn (O)
    setIsXNext(false);
    setTimeout(() => {
      const emptyIndices = nextBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null) as number[];

      if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        nextBoard[randomIndex] = 'O';
        setBoard(nextBoard);

        const aiWin = calculateWinner(nextBoard);
        if (aiWin) {
          setWinner(aiWin);
        } else if (nextBoard.every((cell) => cell !== null)) {
          setWinner('DRAW');
        }
      }
      setIsXNext(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <section id="writing" className="py-16 border-t border-[#1e2e4a] text-center">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
          LET'S PLAY WITH ME
        </div>

        <h2 className="text-4xl font-extrabold font-display text-white">
          Tic-tac-toe, on the house.
        </h2>

        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          A short break from case studies. You're X, Hiram is playing O — take turns and see who removes the last bit of friction.
        </p>

        {/* Turn Status */}
        <div className="text-xs font-mono font-bold text-blue-400 pt-2">
          {winner ? (
            winner === 'DRAW' ? (
              <span className="text-yellow-400">It's a draw! 🤝</span>
            ) : winner === 'X' ? (
              <span className="text-emerald-400">🎉 You Won!</span>
            ) : (
              <span className="text-red-400">Hiram (O) won this round!</span>
            )
          ) : isXNext ? (
            "Your turn — you're X."
          ) : (
            "Hiram is thinking..."
          )}
        </div>

        {/* Game Board Container matching Screenshot 5 */}
        <div className="w-[320px] h-[320px] mx-auto my-6 p-3 rounded-2xl border-2 border-slate-200/80 bg-[#12192b] shadow-2xl">
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full border border-blue-500/30 rounded-xl overflow-hidden divide-x divide-y divide-blue-500/30">
            {board.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                className="flex items-center justify-center text-4xl font-bold font-mono transition-colors hover:bg-blue-500/10 cursor-pointer"
              >
                <span className={cell === 'X' ? 'text-blue-400' : 'text-emerald-400'}>
                  {cell}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={resetGame}
          className="p-3 rounded-full bg-[#121a2d] border border-[#1e2e4a] text-slate-300 hover:text-white hover:border-blue-500 transition-all cursor-pointer shadow-lg inline-flex items-center justify-center"
          title="Restart Game"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </section>
  );
};
