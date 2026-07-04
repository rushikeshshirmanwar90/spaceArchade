'use client';

import { useEffect, useRef, useState } from 'react';

const WORDS = ['SPACE', 'ARCHADE'];
const TAGLINE = 'Contemporary Architectural Design';

/** Content starts lifting away — the curtain follows right behind */
const EXIT_AT = 2200;
/** Overlay fully gone and removed from the DOM */
const DONE_AT = 3700;

interface WelcomeIntroProps {
  onFinish?: () => void;
}

export function WelcomeIntro({ onFinish }: WelcomeIntroProps) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    // Skip the intro entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      onFinishRef.current?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = '';
      onFinishRef.current?.();
    }, EXIT_AT);

    const doneTimer = setTimeout(() => setHidden(true), DONE_AT);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (hidden) return null;

  // Global letter index across both words, for one continuous stagger
  let letterIndex = 0;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true">
      {/* Accent panel — a warm sliver revealed as the dark panel lifts */}
      <div
        className={`absolute inset-0 bg-primary ${exiting ? 'animate-intro-lift' : ''}`}
        style={exiting ? { animationDelay: '300ms' } : undefined}
      />

      {/* Main dark panel — always dark regardless of theme (wordmark is white) */}
      <div
        className={`absolute inset-0 bg-[oklch(0.22_0_0)] overflow-hidden ${
          exiting ? 'animate-intro-lift' : ''
        }`}
        style={exiting ? { animationDelay: '150ms' } : undefined}
      >
        {/* Faint architectural grid */}
        <div className="absolute inset-0 bg-grid-pattern text-white opacity-[0.04] pointer-events-none" />

        {/* Warm glow breathing behind the wordmark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl animate-intro-glow pointer-events-none" />

        {/* Content — lifts away with a blur just before the curtain moves */}
        <div
          className={`relative h-full flex flex-col items-center justify-center px-6 ${
            exiting ? 'animate-intro-content-exit' : ''
          }`}
        >
          {/* Wordmark — settles from a slow zoom while letters dissolve in */}
          <div className="animate-intro-zoom flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-8 text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] md:tracking-[0.35em]">
              {WORDS.map((word) => (
                <span key={word} className="flex">
                  {word.split('').map((letter, i) => {
                    const delay = 150 + letterIndex++ * 50;
                    return (
                      <span
                        key={i}
                        className="inline-block animate-intro-letter"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              ))}
            </div>

            {/* Thin rule draws outward from the center */}
            <div
              className="mt-8 h-px w-48 md:w-72 bg-primary/70 animate-intro-line"
              style={{ animationDelay: '850ms' }}
            />

            {/* Tagline */}
            <p
              className="mt-6 text-white/60 text-[10px] md:text-xs uppercase tracking-[0.4em] text-center animate-intro-fade"
              style={{ animationDelay: '1100ms' }}
            >
              {TAGLINE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
