import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view'>('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isProjectCard = target.closest('.project-card-interactive') || target.closest('.project-banner');
      const isInteractive = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a');

      if (isProjectCard) {
        setCursorState('view');
      } else if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`custom-cursor ${
        cursorState === 'view' ? 'hovering w-14 h-14 bg-blue-600/40 border-blue-400 flex items-center justify-center text-[10px] font-bold font-mono text-white tracking-widest' : cursorState === 'hover' ? 'hovering' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorState === 'view' && 'VIEW'}
    </div>
  );
};
