'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';

const initialImages = [
  { id: 1, src: '/project-1.jpg', alt: 'Collection Image 1' },
  { id: 2, src: '/project-2.jpg', alt: 'Collection Image 2' },
  { id: 3, src: '/project-3.jpg', alt: 'Collection Image 3' },
  { id: 4, src: '/project-4.jpg', alt: 'Collection Image 4' },
  { id: 5, src: '/project-5.jpg', alt: 'Collection Image 5' },
  { id: 6, src: '/project-6.jpg', alt: 'Collection Image 6' },
  { id: 7, src: '/process-1.jpg', alt: 'Collection Image 7' },
  { id: 8, src: '/process-2.jpg', alt: 'Collection Image 8' },
  { id: 9, src: '/process-3.jpg', alt: 'Collection Image 9' },
  { id: 10, src: '/hero.jpg', alt: 'Collection Image 10' },
  { id: 11, src: '/architect-1.jpg', alt: 'Collection Image 11' },
  { id: 12, src: '/architect-2.jpg', alt: 'Collection Image 12' },
];

export function AdminCollectionSection() {
  const [showAll, setShowAll] = useState(false);
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const images = data.collectionImages || [];
  const initialCount = 6;

  const handleDeleteImage = async (imageId: string) => {
    if (confirm('Delete this image?')) {
      try {
        const response = await fetch(`/api/collection-images/${imageId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Image deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting image: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image. Please try again.');
      }
    }
  };
  
  const displayedImages = showAll ? images : images.slice(0, initialCount);

  return (
    <section id="collection" className="py-20 px-6 bg-muted/10">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'collection',
              title: 'Our Collection',
              description: 'Explore our curated collection of architectural masterpieces and design inspirations.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of architectural masterpieces and design inspirations.
            </p>
          </div>
        </EditableWrapper>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isEditMode && (
            <div
              onClick={() => setSelectedItem({
                type: 'newCollectionImage',
                src: '',
                alt: '',
              })}
              className="relative aspect-square border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-blue-50/10 transition-all duration-300 flex items-center justify-center group rounded-lg"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium">Add Image</p>
              </div>
            </div>
          )}

          {displayedImages.map((image: any, index: number) => (
            <div key={image._id || image.id || index} className="relative group">
              <EditableWrapper
                onEdit={() => setSelectedItem({ 
                  ...image, 
                  type: 'collectionImage', 
                  index,
                  onDelete: () => handleDeleteImage(image._id)
                })}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image.src || '/placeholder.jpg'}
                    alt={image.alt || 'Collection Image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image._id);
                  }}
                  className="absolute top-2 left-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {!showAll && images.length > initialCount && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setShowAll(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Show More
            </Button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={() => setShowAll(false)}>
              Show Less
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
