'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Compass, Leaf, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';

const DEFAULT_ABOUT = {
  badge: 'Our Philosophy',
  title: 'We design spaces that breathe, inspire, and endure.',
  paragraph1:
    'At Space Archade, we believe architecture is the physical translation of environment, innovation, and human aspiration. We construct contemporary design frameworks that seamlessly integrate structures into their natural surroundings.',
  paragraph2:
    'Every structure is curated with structural integrity and clean minimalism at its core, creating a timeless visual narrative that respects local topography while breaking traditional limits of form.',
  estYear: 'Est. 2012',
  estLabel: 'Crafting Legacies',
  feature1Title: 'Eco-Conscious',
  feature1Desc: 'Sustainable materials and passive lighting structures at our core.',
  feature2Title: 'Timeless Detail',
  feature2Desc: 'Exquisite craftsmanship blending structural boldness with micro-refinement.',
  image: '/about-us.png',
};

export function AboutSection() {
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch('/api/settings?key=about');
        const json = await res.json();
        if (json.success && json.data && json.data.value) {
          setAbout({ ...DEFAULT_ABOUT, ...json.data.value });
        }
      } catch (err) {
        console.error('Error fetching about settings:', err);
      }
    }
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Premium Interactive Images */}
          <Reveal direction="left" className="lg:col-span-6 relative">
            <div className="relative aspect-square w-full max-w-[540px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border group">
              <Image
                src={about.image}
                alt="Contemporary architecture render of modern concrete villa"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            </div>

            {/* Overlapping Glassmorphism Badge */}
            <div className="absolute -bottom-6 -right-2 md:right-6 bg-background/80 backdrop-blur-xl border border-border p-5 rounded-xl shadow-xl flex items-center gap-4 max-w-[240px] animate-fade-in">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{about.estYear}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  {about.estLabel}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Detailed Premium Copy */}
          <Reveal direction="right" delay={150} className="lg:col-span-6 flex flex-col gap-6 lg:pl-4">
            <div>
              <p className="text-xs md:text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
                {about.badge}
              </p>
              <h2 className="text-4xl font-bold mb-6">
                {about.title}
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>{about.paragraph1}</p>
                <p>{about.paragraph2}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="#process">
                <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md">
                  Explore Our Process
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
