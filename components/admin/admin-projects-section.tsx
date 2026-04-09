'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EditableWrapper } from './editable-wrapper';
import { useEditContext } from '@/app/admin/page';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';

export function AdminProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setSelectedItem, isEditMode, data, refreshData } = useEditContext();
  const projects = data.projects;

  const filteredProjects = selectedCategory
    ? projects.filter((p: any) => p.category === selectedCategory)
    : projects;

  const categories = Array.from(new Set(projects.map((p: any) => p.category)));

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Project deleted successfully!');
          await refreshData();
        } else {
          alert('Error deleting project: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
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
                        onSave: async (updatedCategory: string) => {
                          // Update all projects with this category
                          const projectsToUpdate = projects.filter((p: any) => p.category === cat);
                          
                          for (const project of projectsToUpdate) {
                            await fetch(`/api/projects/${project._id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                ...project,
                                category: updatedCategory,
                              }),
                            });
                          }
                          
                          await refreshData();
                          alert('Category updated successfully!');
                        },
                      });
                    }}
                    className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm(`Delete category "${cat}" and all its projects?`)) {
                        // Delete all projects in this category
                        const projectsToDelete = projects.filter((p: any) => p.category === cat);
                        
                        for (const project of projectsToDelete) {
                          await fetch(`/api/projects/${project._id}`, {
                            method: 'DELETE',
                          });
                        }
                        
                        await refreshData();
                        if (selectedCategory === cat) {
                          setSelectedCategory(null);
                        }
                        alert('Category and all its projects deleted!');
                      }
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
            <>
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedItem({
                    type: 'newCategory',
                    name: '',
                    onSave: async (categoryName: string) => {
                      // Create a new project with this category
                      const response = await fetch('/api/projects', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          title: `New ${categoryName} Project`,
                          location: 'Location',
                          category: categoryName,
                          image: '/placeholder.jpg',
                          description: 'Add description here',
                        }),
                      });
                      
                      const result = await response.json();
                      if (result.success) {
                        await refreshData();
                        setSelectedCategory(categoryName);
                        alert(`Category "${categoryName}" created successfully!`);
                      } else {
                        alert('Error creating category: ' + (result.error || 'Unknown error'));
                      }
                    },
                  })
                }
                className="border-dashed border-2 border-green-400 hover:border-green-600 hover:bg-green-50/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleAddProject(selectedCategory)}
                className="border-dashed border-2 border-blue-400 hover:border-blue-600 hover:bg-blue-50/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </>
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

          {filteredProjects.map((project: any) => (
            <div key={project._id} className="relative group">
              <EditableWrapper
                onEdit={() =>
                  setSelectedItem({
                    ...project,
                    type: 'project',
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
                    handleDeleteProject(project._id);
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
