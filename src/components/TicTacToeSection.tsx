import React, { useState } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

export const TicTacToeSection: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [starter, setStarter] = useState<'X' | 'O'>('X');
  const [score, setScore] = useState({ human: 0, ai: 0, draws: 0 });

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

  // Calibrated AI Move Engine (~45% Win Rate against humans)
  const getAIMove = (currentBoard: (string | null)[]): number => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const findCompleting = (mark: 'X' | 'O') => {
      for (const [a, b, c] of lines) {
        const vals = [currentBoard[a], currentBoard[b], currentBoard[c]];
        if (vals.filter((v) => v === mark).length === 2 && vals.includes(null)) {
          return [a, b, c].find((idx) => currentBoard[idx] === null);
        }
      }
      return null;
    };

    // 1. Immediate Win: AI always takes a completing winning move (100%)
    const winMove = findCompleting('O');
    if (winMove !== null && winMove !== undefined) return winMove;

    // 2. High-rate Block: 82% chance AI blocks the player's 3-in-a-row
    const blockMove = findCompleting('X');
    if (blockMove !== null && blockMove !== undefined && Math.random() < 0.82) {
      return blockMove;
    }

    // 3. Center Control (75% probability if available)
    if (currentBoard[4] === null && Math.random() < 0.75) {
      return 4;
    }

    // 4. Corner Control for forks & diagonal attacks (70% probability)
    const corners = [0, 2, 6, 8].filter((idx) => currentBoard[idx] === null);
    if (corners.length > 0 && Math.random() < 0.70) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Random fallback from remaining empty tiles
    const empty = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    return empty[Math.floor(Math.random() * empty.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const nextBoard = [...board];
    nextBoard[index] = 'X';
    setBoard(nextBoard);

    const win = calculateWinner(nextBoard);
    if (win) {
      setWinner(win);
      setScore((prev) => ({ ...prev, human: prev.human + 1 }));
      import('canvas-confetti').then((m) =>
        m.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      );
      return;
    }

    if (nextBoard.every((cell) => cell !== null)) {
      setWinner('DRAW');
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    // AI turn (O)
    setIsXNext(false);
    setTimeout(() => {
      const aiIndex = getAIMove(nextBoard);

      if (aiIndex !== null && aiIndex !== undefined) {
        nextBoard[aiIndex] = 'O';
        setBoard(nextBoard);

        const aiWin = calculateWinner(nextBoard);
        if (aiWin) {
          setWinner(aiWin);
          setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
        } else if (nextBoard.every((cell) => cell !== null)) {
          setWinner('DRAW');
          setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
      }
      setIsXNext(true);
    }, 450);
  };

  const resetGame = () => {
    const nextStarter = starter === 'X' ? 'O' : 'X';
    setStarter(nextStarter);
    setWinner(null);

    const emptyBoard = Array(9).fill(null);

    if (nextStarter === 'O') {
      // AI starts this round
      setIsXNext(false);
      setBoard(emptyBoard);
      setTimeout(() => {
        // AI chooses center or corner on turn 1
        const initialMoves = [4, 0, 2, 6, 8];
        const firstMove = initialMoves[Math.floor(Math.random() * initialMoves.length)];
        const b = Array(9).fill(null);
        b[firstMove] = 'O';
        setBoard(b);
        setIsXNext(true);
      }, 400);
    } else {
      // Human starts this round
      setBoard(emptyBoard);
      setIsXNext(true);
    }
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
          A short break from case studies. You're X, Hiram is playing O — balanced AI with a ~45% win rate challenge. Take turns and see who removes the last bit of friction.
        </p>

        {/* Live Score Counter Badge */}
        <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-[#101828] border border-[#1e2e4a] text-xs font-mono shadow-md">
          <span className="text-blue-400 font-bold">You (X): {score.human}</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">Hiram (O): {score.ai}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Ties: {score.draws}</span>
        </div>

        {/* Turn & Match Status */}
        <div className="text-xs font-mono font-bold text-blue-400 pt-1">
          {winner ? (
            winner === 'DRAW' ? (
              <span className="text-yellow-400">It's a draw! 🤝</span>
            ) : winner === 'X' ? (
              <span className="text-emerald-400">🎉 You Won! Impressive move.</span>
            ) : (
              <span className="text-rose-400">Hiram (O) won this round! 🏆</span>
            )
          ) : isXNext ? (
            <span>Your turn — you're <span className="text-blue-400">X</span> {starter === 'O' ? '(Hiram opened)' : ''}</span>
          ) : (
            <span className="text-slate-400 animate-pulse">Hiram is thinking...</span>
          )}
        </div>

        {/* Game Board Container */}
        <div className="w-[320px] h-[320px] mx-auto my-5 p-3 rounded-2xl border-2 border-slate-200/80 bg-[#12192b] shadow-2xl">
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

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetGame}
            className="px-5 py-2.5 rounded-full bg-[#121a2d] border border-[#1e2e4a] text-slate-300 hover:text-white hover:border-blue-500 transition-all cursor-pointer shadow-lg inline-flex items-center gap-2 text-xs font-mono font-bold btn-tactile"
            title="Reset Game and alternate starter"
          >
            <RefreshCw size={15} /> Play Next Round ({starter === 'X' ? 'Hiram starts' : 'You start'})
          </button>
        </div>
      </div>
    </section>
  );
};
