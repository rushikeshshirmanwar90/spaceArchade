'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';

interface EditPanelProps {
  selectedSection: string | null;
}

export function EditPanel({ selectedSection }: EditPanelProps) {
  if (!selectedSection) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-card border-l border-border shadow-2xl z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold capitalize">Edit {selectedSection}</h2>
        </div>

        {selectedSection === 'hero' && (
          <div className="space-y-4">
            <div>
              <Label>Slide Title</Label>
              <Input placeholder="Enter title" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Enter description" rows={3} />
            </div>
            <div>
              <Label>Background Image</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload & Update
            </Button>
          </div>
        )}

        {selectedSection === 'projects' && (
          <div className="space-y-4">
            <div>
              <Label>Project Title</Label>
              <Input placeholder="Enter project title" />
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="Enter location" />
            </div>
            <div>
              <Label>Category</Label>
              <Input placeholder="Residential/Commercial/etc" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Enter description" rows={3} />
            </div>
            <div>
              <Label>Project Image</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button className="w-full">Add New Project</Button>
          </div>
        )}

        {selectedSection === 'stats' && (
          <div className="space-y-4">
            <div>
              <Label>Projects Completed</Label>
              <Input type="number" defaultValue={150} />
            </div>
            <div>
              <Label>Years Experience</Label>
              <Input type="number" defaultValue={25} />
            </div>
            <div>
              <Label>Team Members</Label>
              <Input type="number" defaultValue={45} />
            </div>
            <div>
              <Label>Awards Won</Label>
              <Input type="number" defaultValue={32} />
            </div>
            <Button className="w-full">Update Stats</Button>
          </div>
        )}

        {selectedSection === 'contact' && (
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" defaultValue="hello@spacearchade.com" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <Label>Location</Label>
              <Input defaultValue="San Francisco, CA" />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input defaultValue="919579896842" />
            </div>
            <Button className="w-full">Update Contact Info</Button>
          </div>
        )}

        {selectedSection === 'collection' && (
          <div className="space-y-4">
            <div>
              <Label>Upload Collection Images</Label>
              <Input type="file" accept="image/*" multiple />
            </div>
            <Button className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
            <p className="text-sm text-muted-foreground">
              Click on images in the collection to remove them
            </p>
          </div>
        )}

        {selectedSection === 'architects' && (
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Enter name" />
            </div>
            <div>
              <Label>Title</Label>
              <Input placeholder="e.g., Principal Architect" />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Enter bio" rows={3} />
            </div>
            <div>
              <Label>Profile Image</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button className="w-full">Add Team Member</Button>
          </div>
        )}

        {selectedSection === 'testimonials' && (
          <div className="space-y-4">
            <div>
              <Label>Client Name</Label>
              <Input placeholder="Enter name" />
            </div>
            <div>
              <Label>Position</Label>
              <Input placeholder="e.g., CEO" />
            </div>
            <div>
              <Label>Company</Label>
              <Input placeholder="Enter company" />
            </div>
            <div>
              <Label>Testimonial</Label>
              <Textarea placeholder="Enter testimonial" rows={4} />
            </div>
            <Button className="w-full">Add Testimonial</Button>
          </div>
        )}
      </div>
    </div>
  );
}
