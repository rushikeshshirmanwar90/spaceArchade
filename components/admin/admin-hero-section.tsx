'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialSlides = [
  {
    id: 1,
    image: '/hero.jpg',
    title: 'Contemporary Architectural Excellence',
    description: 'Transforming spaces into extraordinary experiences through innovative design',
  },
  {
    id: 2,
    image: '/project-1.jpg',
    title: 'Luxury Residential Design',
    description: 'Creating dream homes with seamless indoor-outdoor living spaces',
  },
  {
    id: 3,
    image: '/project-2.jpg',
    title: 'Commercial Architecture',
    description: 'State-of-the-art buildings with sustainable design principles',
  },
  {
    id: 4,
    image: '/project-4.jpg',
    title: 'Urban Development',
    description: 'Integrated spaces transforming neighborhoods and communities',
  },
];

export function AdminHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(initialSlides);
  const { setSelectedItem, isEditMode } = useEditContext();

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <EditableWrapper
          key={slide.id}
          onEdit={() => setSelectedItem({ 
            ...slide, 
            type: 'heroSlide', 
            index,
            onSave: (updatedSlide: any) => {
              const newSlides = [...slides];
              newSlides[index] = { ...updatedSlide, id: slide.id };
              setSlides(newSlides);
            },
            onDelete: () => {
              if (confirm('Delete this slide?')) {
                setSlides(slides.filter((s) => s.id !== slide.id));
                if (currentSlide >= slides.length - 1) {
                  setCurrentSlide(0);
                }
              }
            }
          })}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/20 pointer-events-none"></div>
        </EditableWrapper>
      ))}

      <div className="relative z-20 text-center text-white px-4 max-w-2xl">
        {isEditMode && (
          <button
            onClick={() => setSelectedItem({
              type: 'newHeroSlide',
              image: '',
              title: '',
              description: '',
              onSave: (newSlide: any) => {
                setSlides([...slides, { ...newSlide, id: Date.now() }]);
              }
            })}
            className="absolute -top-20 right-0 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Slide
          </button>
        )}
        
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'heroText',
              title: slides[currentSlide].title,
              description: slides[currentSlide].description,
              slideIndex: currentSlide,
            })
          }
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 text-balance">
            {slides[currentSlide].description}
          </p>
        </EditableWrapper>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            } rounded-full`}
          />
        ))}
      </div>
    </section>
  );
}
