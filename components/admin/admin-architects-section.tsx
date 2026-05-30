'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Plus, Trash2, User } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialArchitects = [
  {
    id: 1,
    name: 'Alexandra Sterling',
    title: 'Principal Architect',
    image: '/architect-1.jpg',
    bio: 'Award-winning architect with 15+ years of experience in luxury residential design.',
  },
  {
    id: 2,
    name: 'Elena Rossi',
    title: 'Design Director',
    image: '/architect-2.jpg',
    bio: 'Creative visionary specializing in contemporary and sustainable architecture.',
  },
  {
    id: 3,
    name: 'Marcus Chen',
    title: 'Lead Architect',
    image: '/architect-3.jpg',
    bio: 'Expert in innovative structural design and urban planning initiatives.',
  },
];

export function AdminArchitectsSection() {
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const architects = data.architects || [];

  const handleDeleteArchitect = async (architectId: string) => {
    if (confirm('Delete this architect?')) {
      try {
        const response = await fetch(`/api/architects/${architectId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Architect deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting architect: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting architect:', error);
        alert('Error deleting architect. Please try again.');
      }
    }
  };

  return (
    <section id="architects" className="py-20 px-6 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'architects',
              title: 'Meet Our Architects',
              description: 'Visionary professionals dedicated to creating spaces that inspire and endure.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Architects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visionary professionals dedicated to creating spaces that inspire and endure.
            </p>
          </div>
        </EditableWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {isEditMode && (
            <Card
              onClick={() => setSelectedItem({
                type: 'newArchitect',
                name: '',
                title: '',
                image: '',
                bio: '',
              })}
              className="overflow-hidden border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-blue-50/10 transition-all duration-300 flex items-center justify-center min-h-[400px] group"
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Add Architect</h3>
                <p className="text-sm text-muted-foreground">Click to add new team member</p>
              </div>
            </Card>
          )}

          {architects.map((architect: any, index: number) => (
            <div key={architect._id || architect.id || index} className="relative group">
              <EditableWrapper
                onEdit={() => setSelectedItem({ 
                  ...architect, 
                  type: 'architect', 
                  index,
                  onDelete: () => handleDeleteArchitect(architect._id)
                })}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-96 bg-muted">
                    {architect.image ? (
                      <Image
                        src={architect.image}
                        alt={architect.name}
                        fill
                        className="object-cover"
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
                  <div className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{architect.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{architect.title}</p>
                    <p className="text-muted-foreground text-sm">{architect.bio}</p>
                  </div>
                </Card>
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteArchitect(architect._id);
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
