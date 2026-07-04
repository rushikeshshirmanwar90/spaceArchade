'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  direction?: Direction;
}

export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'reveal',
        direction !== 'up' && `reveal-${direction}`,
        revealed && 'is-revealed',
        className
      )}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
