import React, { useRef, useState, useEffect } from 'react';

interface StickyStackCardProps {
  index: number;
  totalCards: number;
  topOffset?: number;
  children: React.ReactNode;
}

export const StickyStackCard: React.FC<StickyStackCardProps> = ({
  index,
  totalCards,
  topOffset = 100,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'scale(1) translateY(0px)',
    opacity: 1,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      // If card is sticky pinned at topOffset
      const cardHeight = rect.height || 400;
      
      // Calculate how far past topOffset the card container has scrolled
      const distancePastTop = topOffset - rect.top;

      if (distancePastTop > 0 && index < totalCards - 1) {
        // Progress between 0 and 1 as user scrolls past this card
        const progress = Math.min(1, distancePastTop / (cardHeight * 0.8));
        
        const scale = 1 - progress * 0.08;       // 1.0 -> 0.92
        const opacity = 1 - progress * 0.35;     // 1.0 -> 0.65
        const translateY = -progress * 18;       // 0px -> -18px

        setStyle({
          transform: `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(1)}px)`,
          opacity: Number(opacity.toFixed(3)),
        });
      } else {
        setStyle({
          transform: 'scale(1) translateY(0px)',
          opacity: 1,
        });
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [index, totalCards, topOffset, isMobile]);

  return (
    <div
      ref={cardRef}
      className="sticky-stack-card transition-all duration-150 ease-out mb-8 sm:mb-20"
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : `${topOffset}px`,
        zIndex: index + 10,
        willChange: isMobile ? 'auto' : 'transform, opacity',
        ...(isMobile ? {} : style),
      }}
    >
      {children}
    </div>
  );
};
