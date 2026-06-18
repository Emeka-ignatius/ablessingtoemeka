'use client';
import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  /** Characters revealed per tick */
  speed?: number;
  /** Milliseconds between ticks */
  interval?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ 
  text, 
  speed = 1, 
  interval = 45, 
  className = '',
  onComplete
}: TypewriterTextProps) => {
  const [visibleLength, setVisibleLength] = useState(0);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Reset when text changes
    setVisibleLength(0);
  }, [text]);

  useEffect(() => {
    if (visibleLength >= text.length && text.length > 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setVisibleLength((prev) => {
        const next = Math.min(prev + speed, text.length);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [visibleLength, text.length, speed, interval]);

  // Auto-scroll to keep the cursor in view
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.closest('[data-letter-scroll]');
      if (parent) {
        parent.scrollTop = parent.scrollHeight;
      }
    }
  }, [visibleLength]);

  const revealed = text.slice(0, visibleLength);
  const isTyping = visibleLength < text.length;

  return (
    <p ref={containerRef} className={className}>
      {revealed}
      {isTyping && (
        <span className="inline-block w-[2px] h-[1em] bg-space-sepia/70 ml-[1px] align-text-bottom animate-pulse" />
      )}
    </p>
  );
};
