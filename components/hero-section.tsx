'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  _id: string;
  image: string;
  title: string;
  description: string;
  order: number;
}

interface HeroSectionProps {
  /** When false, the text entrance is held until the welcome intro's curtain lifts */
  introDone?: boolean;
}

export function HeroSection({ introDone = true }: HeroSectionProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch slides from API
  useEffect(() => {
    async function fetchSlides() {
      try {
        const response = await fetch('/api/hero-slides');
        const result = await response.json();
        if (result.success) {
          setSlides(result.data);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  if (loading || slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover ${index === currentSlide ? 'animate-ken-burns' : ''}`}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>
      ))}

      {/* Content — held until the intro curtain lifts, then re-keyed per slide
          so text gently rises in on every change */}
      {introDone && (
      <div key={currentSlide} className="relative z-20 text-center text-white px-4 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance animate-hero-rise">
          {slides[currentSlide].title}
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 text-white/90 text-balance animate-hero-rise"
          style={{ animationDelay: '150ms' }}
        >
          {slides[currentSlide].description}
        </p>
        <div className="animate-hero-rise" style={{ animationDelay: '300ms' }}>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group"
          >
            Explore Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      {introDone && (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 animate-hero-rise" style={{ animationDelay: '450ms' }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-125'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      )}
    </section>
  );
}

