'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const collectionImages = [
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

export function CollectionSection() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 6;
  
  const displayedImages = showAll ? collectionImages : collectionImages.slice(0, initialCount);

  return (
    <section id="collection" className="py-20 px-6 bg-muted/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of architectural masterpieces and design inspirations.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && collectionImages.length > initialCount && (
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

        {/* Show Less Button */}
        {showAll && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
