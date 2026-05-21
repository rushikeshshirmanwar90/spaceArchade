'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

export function AdminHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const slides = data.heroSlides;

  const handleDeleteSlide = async (slideId: string) => {
    if (confirm('Delete this hero slide?')) {
      try {
        const response = await fetch(`/api/hero-slides/${slideId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Hero slide deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting hero slide: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting hero slide:', error);
        alert('Error deleting hero slide. Please try again.');
      }
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Reset current slide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  if (slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-muted">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No hero slides yet</p>
          {isEditMode && (
            <Button
              onClick={() => setSelectedItem({
                type: 'newHeroSlide',
                image: '',
                title: '',
                description: '',
              })}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Slide
            </Button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <EditableWrapper
          key={slide._id}
          onEdit={() => setSelectedItem({ 
            ...slide, 
            type: 'heroSlide', 
            index,
            onDelete: () => handleDeleteSlide(slide._id)
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 pointer-events-none"></div>
        </EditableWrapper>
      ))}

      <div className="relative z-20 text-center text-white px-4 max-w-2xl">
        {isEditMode && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-center gap-3 whitespace-nowrap">
            <button
              onClick={() => setSelectedItem({
                type: 'newHeroSlide',
                image: '',
                title: '',
                description: '',
              })}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add Slide
            </button>
            <button
              onClick={() => handleDeleteSlide(slides[currentSlide]._id)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
            >
              <Trash2 className="h-4 w-4" />
              Delete Slide
            </button>
          </div>
        )}
        
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              ...slides[currentSlide],
              type: 'heroSlide',
              onDelete: () => handleDeleteSlide(slides[currentSlide]._id)
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
