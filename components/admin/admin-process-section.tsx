'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialProcessSteps = [
  {
    id: 1,
    step: 1,
    title: 'Concept & Planning',
    description: 'We begin with in-depth consultations to understand your vision, goals, and unique requirements for your project.',
    image: '/process-1.jpg',
  },
  {
    id: 2,
    step: 2,
    title: 'Design & Development',
    description: 'Our team creates detailed renderings and 3D models, iterating with your feedback until perfection is achieved.',
    image: '/process-2.jpg',
  },
  {
    id: 3,
    step: 3,
    title: 'Execution & Delivery',
    description: 'We oversee every detail of construction, ensuring quality standards and timely completion of your project.',
    image: '/process-3.jpg',
  },
];

export function AdminProcessSection() {
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const processSteps = data.processSteps || [];

  const handleDeleteProcessStep = async (stepId: string) => {
    if (confirm('Delete this process step?')) {
      try {
        const response = await fetch(`/api/process-steps/${stepId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Process step deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting process step: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting process step:', error);
        alert('Error deleting process step. Please try again.');
      }
    }
  };

  return (
    <section id="process" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'process',
              title: 'Our Design Process',
              description: 'A systematic approach to creating exceptional architectural solutions tailored to your vision.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to creating exceptional architectural solutions tailored to your vision.
            </p>
          </div>
        </EditableWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {isEditMode && (
            <div
              onClick={() => setSelectedItem({
                type: 'newProcessStep',
                step: processSteps.length + 1,
                title: '',
                description: '',
                image: '',
              })}
              className="border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-blue-50/10 transition-all duration-300 flex items-center justify-center min-h-[400px] group rounded-lg"
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Add Process Step</h3>
                <p className="text-sm text-muted-foreground">Click to add new step</p>
              </div>
            </div>
          )}

          {processSteps.map((processStep: any, index: number) => (
            <div key={processStep._id || processStep.id || index} className="relative group">
              <EditableWrapper
                onEdit={() =>
                  setSelectedItem({
                    ...processStep,
                    type: 'processStep',
                    index,
                    onDelete: () => handleDeleteProcessStep(processStep._id)
                  })
                }
              >
                <div className="flex flex-col">
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={processStep.image || '/placeholder.jpg'}
                      alt={processStep.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {processStep.step}
                      </div>
                      <h3 className="text-xl font-semibold">{processStep.title}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {processStep.description}
                    </p>
                  </div>
                </div>
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProcessStep(processStep._id);
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
