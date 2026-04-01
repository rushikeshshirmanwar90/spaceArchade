'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const projects = [
  {
    id: 1,
    title: 'Minimalist Residence',
    location: 'California Coast',
    category: 'Residential',
    image: '/project-1.jpg',
    description: 'Contemporary luxury home with seamless indoor-outdoor living spaces',
  },
  {
    id: 2,
    title: 'Corporate Tower',
    location: 'Downtown Metro',
    category: 'Commercial',
    image: '/project-2.jpg',
    description: 'State-of-the-art office building with sustainable design principles',
  },
  {
    id: 3,
    title: 'Heritage Villa',
    location: 'Countryside Estate',
    category: 'Residential',
    image: '/project-3.jpg',
    description: 'Elegant property blending modern comfort with timeless architecture',
  },
  {
    id: 4,
    title: 'Mixed-Use Development',
    location: 'Urban District',
    category: 'Commercial',
    image: '/project-4.jpg',
    description: 'Integrated retail and residential complex transforming the neighborhood',
  },
  {
    id: 5,
    title: 'Luxury Penthouse',
    location: 'Skyline Heights',
    category: 'Residential',
    image: '/project-5.jpg',
    description: 'High-rise residence with panoramic views and premium finishes',
  },
  {
    id: 6,
    title: 'Boutique Hotel',
    location: 'Coastal Resort',
    category: 'Hospitality',
    image: '/project-6.jpg',
    description: 'Sustainable hospitality design with exceptional guest experiences',
  },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Design Showcases</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our portfolio of award-winning projects spanning residential, commercial, and hospitality sectors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? 'bg-primary text-primary-foreground' : ''}
          >
            All Projects
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-primary text-primary-foreground' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.location}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
