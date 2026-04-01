import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const architects = [
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

export function ArchitectsSection() {
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
          {architects.map((architect) => (
            <Card key={architect.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-72 bg-muted">
                <Image
                  src={architect.image}
                  alt={architect.name}
                  fill
                  className="object-cover"
                />
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
          ))}
        </div>
      </div>
    </section>
  );
}
