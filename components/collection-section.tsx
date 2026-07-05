'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface CollectionImage {
  _id: string;
  src: string;
  alt: string;
  order: number;
}

export function CollectionSection() {
  const [collectionImages, setCollectionImages] = useState<CollectionImage[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialCount = 6;

  // Fetch collection images from API
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/collection-images');
        const result = await response.json();
        if (result.success) {
          setCollectionImages(result.data);
        }
      } catch (error) {
        console.error('Error fetching collection images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);
  
  const displayedImages = showAll ? collectionImages : collectionImages.slice(0, initialCount);

  return (
    <section id="collection" className="py-20 px-6 bg-muted/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of architectural masterpieces and design inspirations.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : collectionImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collection images found</p>
          </div>
        ) : (
          <>
            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedImages.map((image) => (
                <div
                  key={image._id}
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
          </>
        )}
      </div>
    </section>
  );
}
