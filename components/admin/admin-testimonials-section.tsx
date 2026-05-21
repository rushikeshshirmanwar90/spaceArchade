'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialTestimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    position: 'CEO',
    company: 'Tech Innovation Inc.',
    message: 'Working with Space Archade transformed our vision into reality. Their attention to detail and innovative approach exceeded all expectations. Our home is now a masterpiece.',
  },
  {
    id: 2,
    name: 'James Richardson',
    position: 'Founder',
    company: 'GreenTech Solutions',
    message: 'The team\'s expertise in sustainable design helped us create an office that\'s both beautiful and environmentally responsible. Highly recommended!',
  },
  {
    id: 3,
    name: 'Lucia Colombo',
    position: 'Director',
    company: 'Hospitality Group',
    message: 'Exceptional professionalism and creativity. Space Archade delivered a luxury resort that has become our most profitable property. They truly understand luxury.',
  },
];

export function AdminTestimonialsSection() {
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const testimonials = data.testimonials || [];

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (confirm('Delete this testimonial?')) {
      try {
        const response = await fetch(`/api/testimonials/${testimonialId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Testimonial deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting testimonial: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial. Please try again.');
      }
    }
  };

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'testimonials',
              title: 'Client Testimonials',
              description: 'Hear from our satisfied clients about their transformative architectural experiences.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied clients about their transformative architectural experiences.
            </p>
          </div>
        </EditableWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {isEditMode && (
            <Card
              onClick={() => setSelectedItem({
                type: 'newTestimonial',
                name: '',
                position: '',
                company: '',
                message: '',
              })}
              className="p-8 border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-blue-50/10 transition-all duration-300 flex items-center justify-center min-h-[300px] group"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Add Testimonial</h3>
                <p className="text-sm text-muted-foreground">Click to add new review</p>
              </div>
            </Card>
          )}

          {testimonials.map((testimonial: any, index: number) => (
            <div key={testimonial._id || testimonial.id || index} className="relative group">
              <EditableWrapper
                onEdit={() => setSelectedItem({ 
                  ...testimonial, 
                  type: 'testimonial', 
                  index,
                  onDelete: () => handleDeleteTestimonial(testimonial._id)
                })}
              >
                <Card className="p-8 hover:shadow-lg transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    &quot;{testimonial.message}&quot;
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </Card>
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTestimonial(testimonial._id);
                  }}
                  className="absolute top-2 left-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
