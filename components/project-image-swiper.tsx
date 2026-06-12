'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImageSwiperProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ProjectImageSwiper({ images, alt, className = 'relative h-64 overflow-hidden bg-muted' }: ProjectImageSwiperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  // Single image – no carousel chrome needed
  if (images.length <= 1) {
    return (
      <div className={className}>
        <Image
          src={images[0] || '/placeholder.jpg'}
          alt={alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    );
  }

  return (
    <div className={`${className} group/swiper`}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover/swiper:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover/swiper:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={(e) => scrollTo(i, e)}
            className={`h-1.5 rounded-full transition-all ${i === selectedIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Image count badge */}
      <div className="absolute top-2 right-2 z-10 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}
