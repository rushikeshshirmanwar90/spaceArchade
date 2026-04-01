'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';

const initialProjects = [
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

export function AdminProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const { setSelectedItem, isEditMode } = useEditContext();

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const handleDeleteCategory = (category: string) => {
    if (confirm(`Delete category "${category}" and all its projects?`)) {
      setProjects(projects.filter((p) => p.category !== category));
      if (selectedCategory === category) {
        setSelectedCategory(null);
      }
    }
  };

  const handleAddProject = (category: string | null) => {
    setSelectedItem({
      type: 'newProject',
      category: category || 'Uncategorized',
      title: '',
      location: '',
      image: '',
      description: '',
      onSave: (newProject: any) => {
        setProjects([...projects, { ...newProject, id: Date.now() }]);
      },
    });
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <EditableWrapper
          onEdit={() =>
            setSelectedItem({
              type: 'sectionHeader',
              section: 'projects',
              title: 'Design Showcases',
              description: 'Discover our portfolio of award-winning projects spanning residential, commercial, and hospitality sectors.',
            })
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Design Showcases</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our portfolio of award-winning projects spanning residential, commercial, and hospitality sectors.
            </p>
          </div>
        </EditableWrapper>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? 'bg-primary text-primary-foreground' : ''}
          >
            All Projects
          </Button>
          
          {categories.map((cat) => (
            <div key={cat} className="relative group">
              <Button
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={`${selectedCategory === cat ? 'bg-primary text-primary-foreground' : ''} ${
                  isEditMode ? 'pr-16' : ''
                }`}
              >
                {cat}
              </Button>
              
              {isEditMode && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem({
                        type: 'editCategory',
                        oldName: cat,
                        newName: cat,
                        onSave: (updatedCategory: string) => {
                          setProjects(
                            projects.map((p) =>
                              p.category === cat ? { ...p, category: updatedCategory } : p
                            )
                          );
                        },
                      });
                    }}
                    className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat);
                    }}
                    className="bg-red-500 text-white rounded p-1 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {isEditMode && (
            <Button
              variant="outline"
              onClick={() =>
                setSelectedItem({
                  type: 'newCategory',
                  name: '',
                  onSave: (categoryName: string) => {
                    const newProject = {
                      id: Date.now(),
                      title: 'New Project',
                      location: 'Location',
                      category: categoryName,
                      image: '/placeholder.jpg',
                      description: 'Description',
                    };
                    setProjects([...projects, newProject]);
                    setSelectedCategory(categoryName);
                  },
                })
              }
              className="border-dashed border-2 border-blue-400 hover:border-blue-600 hover:bg-blue-50/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add New Project Card - At the beginning */}
          {isEditMode && (
            <Card
              onClick={() => handleAddProject(selectedCategory)}
              className="overflow-hidden border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer hover:bg-linear-to-br hover:from-blue-50/20 hover:to-blue-100/20 transition-all duration-300 flex items-center justify-center min-h-[400px] group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-center p-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Add New Project</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedCategory ? `Add to ${selectedCategory}` : 'Add to All Projects'}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-blue-600 font-medium">
                  <Upload className="h-4 w-4" />
                  Click to upload and create
                </div>
              </div>
            </Card>
          )}

          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <EditableWrapper
                onEdit={() =>
                  setSelectedItem({
                    ...project,
                    type: 'project',
                    onSave: (updatedProject: any) => {
                      const newProjects = [...projects];
                      const projectIndex = projects.findIndex((p) => p.id === project.id);
                      newProjects[projectIndex] = updatedProject;
                      setProjects(newProjects);
                    },
                    onDelete: () => {
                      if (confirm('Delete this project?')) {
                        setProjects(projects.filter((p) => p.id !== project.id));
                      }
                    },
                  })
                }
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
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
              </EditableWrapper>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this project?')) {
                      setProjects(projects.filter((p) => p.id !== project.id));
                    }
                  }}
                  className="absolute top-2 left-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
