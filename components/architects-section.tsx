'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star, User } from 'lucide-react';
import { Reveal } from '@/components/reveal';

interface Architect {
  _id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
}

export function ArchitectsSection() {
  const [architects, setArchitects] = useState<Architect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArchitect, setSelectedArchitect] = useState<Architect | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setScrollCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Fetch architects from API
  useEffect(() => {
    async function fetchArchitects() {
      try {
        const response = await fetch('/api/architects');
        const result = await response.json();
        if (result.success) {
          setArchitects(result.data);
        }
      } catch (error) {
        console.error('Error fetching architects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArchitects();
  }, []);

  return (
    <section id="architects" className="py-20 px-6 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Architects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visionary professionals dedicated to creating spaces that inspire and endure.
          </p>
        </Reveal>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : architects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No architects found</p>
          </div>
        ) : (
          <Reveal delay={100}>
          <Carousel
            opts={{ align: 'start', loop: architects.length > 3 }}
            setApi={setApi}
            className="px-2"
          >
            <CarouselContent>
              {architects.map((architect) => (
                <CarouselItem
                  key={architect._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative w-full aspect-[3/4] bg-muted shrink-0 overflow-hidden">
                      {architect.image ? (
                        <Image
                          src={architect.image}
                          alt={architect.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-secondary/40">
                          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-12 h-12 text-primary/50" />
                          </div>
                          <p className="text-sm text-muted-foreground">No photo</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{architect.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{architect.title}</p>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {architect.bio}
                      </p>
                      {architect.bio && architect.bio.length > 120 && (
                        <button
                          onClick={() => setSelectedArchitect(architect)}
                          className="text-primary text-sm font-medium mt-2 text-left hover:underline"
                        >
                          Read more...
                        </button>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          </Reveal>
        )}

        {scrollCount > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: scrollCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? 'w-6 bg-primary' : 'w-2.5 bg-primary/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedArchitect}
        onOpenChange={(open) => !open && setSelectedArchitect(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedArchitect?.name}</DialogTitle>
          </DialogHeader>
          <p className="text-primary text-sm font-medium -mt-2">{selectedArchitect?.title}</p>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {selectedArchitect?.bio}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
