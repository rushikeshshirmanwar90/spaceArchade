'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Star, User } from 'lucide-react';

interface Architect {
  _id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
}

export function ArchitectsSection() {
  const [architects, setArchitects] = useState<Architect[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch architects from API
  useEffect(() => {
    async function fetchArchitects() {
      try {
        const response = await fetch('/api/architects');
        const result = await response.json();
        if (result.success) {
          setArchitects(result.data);
        }
      } catch (error) {
        console.error('Error fetching architects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArchitects();
  }, []);
  return (
    <section id="architects" className="py-20 px-6 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Architects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visionary professionals dedicated to creating spaces that inspire and endure.
          </p>
        </div>

        {/* Architects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : architects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No architects found</p>
            </div>
          ) : (
            architects.map((architect) => (
              <Card key={architect._id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative w-full aspect-[3/4] bg-muted">
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
