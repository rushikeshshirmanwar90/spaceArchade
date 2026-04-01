'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialAwards = [
  {
    id: 1,
    title: 'International Design Excellence Award',
    year: '2024',
    description: 'Recognized globally for innovation and creativity in contemporary architecture and design methodology.',
    image: '/award-1.jpg',
  },
  {
    id: 2,
    title: 'Sustainable Architecture Award',
    year: '2023',
    description: 'Excellence in green building design and environmentally responsible architectural solutions.',
    image: '/award-2.jpg',
  },
];

const initialAdditionalAwards = [
  { id: 1, title: 'Architectural Digest Hall of Fame', year: '2022-2024' },
  { id: 2, title: 'World Architecture News - Top 10 Firms', year: '2023' },
  { id: 3, title: 'American Institute of Architecture Excellence', year: '2024' },
  { id: 4, title: 'European Design Award - Platinum', year: '2023' },
];

export function AdminAwardsSection() {
  const [awards, setAwards] = useState(initialAwards);
  const [additionalAwards, setAdditionalAwards] = useState(initialAdditionalAwards);
  const { setSelectedItem, isEditMode } = useEditContext();

  return (
    <section id="awards" className="py-20 px-6 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'awards',
              title: 'Awards & Recognition',
              description: 'Industry-leading recognition for architectural excellence and innovative design.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-leading recognition for architectural excellence and innovative design.
            </p>
          </div>
        </EditableWrapper>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {isEditMode && (
            <div
              onClick={() => setSelectedItem({
                type: 'newAward',
                title: '',
                year: '',
                description: '',
                image: '',
                onSave: (newAward: any) => {
                  setAwards([...awards, { ...newAward, id: Date.now() }]);
                }
              })}
              className="border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-blue-50/10 transition-all duration-300 flex items-center justify-center min-h-[200px] group rounded-lg"
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Add Award</h3>
                <p className="text-sm text-muted-foreground">Click to add new award</p>
              </div>
            </div>
          )}

          {awards.map((award, index) => (
            <div key={award.id} className="relative group">
              <EditableWrapper
                onEdit={() =>
                  setSelectedItem({
                    ...award,
                    type: 'award',
                    index,
                    onSave: (updatedAward: any) => {
                      const newAwards = [...awards];
                      newAwards[index] = { ...updatedAward, id: award.id };
                      setAwards(newAwards);
                    },
                    onDelete: () => {
                      if (confirm('Delete this award?')) {
                        setAwards(awards.filter((a) => a.id !== award.id));
                      }
                    }
                  })
                }
              >
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                    <Image src={award.image} alt={award.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                    <p className="text-primary font-medium mb-2">{award.year}</p>
                    <p className="text-muted-foreground">
                      {award.description}
                    </p>
                  </div>
                </div>
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this award?')) {
                      setAwards(awards.filter((a) => a.id !== award.id));
                    }
                  }}
                  className="absolute top-2 left-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-background rounded-lg p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Additional Recognition</h3>
            {isEditMode && (
              <button
                onClick={() => setSelectedItem({
                  type: 'newAdditionalAward',
                  title: '',
                  year: '',
                  onSave: (newAward: any) => {
                    setAdditionalAwards([...additionalAwards, { ...newAward, id: Date.now() }]);
                  }
                })}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
              >
                <Plus className="h-4 w-4" />
                Add Recognition
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalAwards.map((award, index) => (
              <div key={award.id} className="relative group">
                <EditableWrapper
                  onEdit={() => setSelectedItem({ 
                    ...award, 
                    type: 'additionalAward', 
                    index,
                    onSave: (updatedAward: any) => {
                      const newAwards = [...additionalAwards];
                      newAwards[index] = { ...updatedAward, id: award.id };
                      setAdditionalAwards(newAwards);
                    },
                    onDelete: () => {
                      if (confirm('Delete this recognition?')) {
                        setAdditionalAwards(additionalAwards.filter((a) => a.id !== award.id));
                      }
                    }
                  })}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary text-xl mt-1">✓</div>
                    <div>
                      <p className="font-semibold">{award.title}</p>
                      <p className="text-sm text-muted-foreground">{award.year}</p>
                    </div>
                  </div>
                </EditableWrapper>

                {isEditMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this recognition?')) {
                        setAdditionalAwards(additionalAwards.filter((a) => a.id !== award.id));
                      }
                    }}
                    className="absolute top-0 left-0 z-20 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
