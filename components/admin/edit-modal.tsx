'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { handleSingleImageUpload, handleImageUpload } from '@/lib/image-upload';
import Image from 'next/image';
import { ImageCropperInline } from './image-cropper-inline';

interface EditModalProps {
  item: any;
  onClose: () => void;
  onSave: (item: any) => void;
}

export function EditModal({ item, onClose, onSave }: EditModalProps) {
  const [editedItem, setEditedItem] = useState(item);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showImageCropper, setShowImageCropper] = useState(item.scrollToImage && item.image ? true : false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(item.scrollToImage && item.image ? item.image : null);

  const handleImageUploadForCrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setTempImageForCrop(imageData);
      setShowImageCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    setEditedItem({ ...editedItem, image: croppedImage });
    setShowImageCropper(false);
    setTempImageForCrop(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string = 'image') => {
    try {
      await handleSingleImageUpload(
        e,
        (url) => {
          setEditedItem({ ...editedItem, [key]: url });
        },
        setIsLoading
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleMultiImageChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string = 'images') => {
    try {
      await handleImageUpload(
        e,
        (urls: string[]) => {
          const currentImages = Array.isArray(editedItem[key]) ? editedItem[key] : [];
          setEditedItem({ ...editedItem, [key]: [...currentImages, ...urls] });
        },
        setIsLoading
      );
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Call the onSave prop which handles API save
      await onSave(editedItem);
      // Modal will be closed by parent after successful save
    } catch (error) {
      console.error('Save error:', error);
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (item.onDelete) {
      item.onDelete();
      onClose();
    }
  };

  // Render image upload field
  const renderImageUpload = (key: string) => {
    return (
      <div>
        <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
        <div className="mt-2">
          {editedItem[key] ? (
            <div className="relative group">
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-border">
                <Image
                  src={editedItem[key]}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setEditedItem({ ...editedItem, [key]: '' })}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <label
                htmlFor={`image-upload-${key}`}
                className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer hover:bg-blue-600 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Change Image
              </label>
              <input
                id={`image-upload-${key}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, key)}
                disabled={isLoading}
                className="hidden"
              />
            </div>
          ) : (
            <label
              htmlFor={`image-upload-${key}`}
              className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Click to upload image
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
              <input
                id={`image-upload-${key}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, key)}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          )}
          {isLoading && (
            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              Uploading image...
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render multi-image upload field
  const renderMultiImageUpload = (key: string) => {
    const images = Array.isArray(editedItem[key]) ? editedItem[key] : [];

    return (
      <div>
        <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
        <div className="mt-2 space-y-4">
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img: string, index: number) => (
                <div key={index} className="relative group h-32 rounded-lg overflow-hidden border-2 border-border">
                  <Image src={img} alt={`Preview ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setEditedItem({ ...editedItem, [key]: newImages });
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor={`multi-image-upload-${key}`}
            className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-6 w-6 text-muted-foreground mb-2 group-hover:text-blue-500 transition-colors" />
              <p className="mb-1 text-sm font-semibold text-foreground">
                Click to upload images
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
            <input
              id={`multi-image-upload-${key}`}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultiImageChange(e, key)}
              disabled={isLoading}
              className="hidden"
            />
          </label>
          
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              Uploading images...
            </div>
          )}
        </div>
      </div>
    );
  };

  // Handle About Us editing
  if (item.type === 'about') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit About Section</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            {renderImageUpload('image')}
            <div>
              <Label>Badge Text</Label>
              <Input
                value={editedItem.badge}
                onChange={(e) => setEditedItem({ ...editedItem, badge: e.target.value })}
                placeholder="e.g., Our Philosophy"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Section title"
              />
            </div>
            <div>
              <Label>Paragraph 1</Label>
              <Textarea
                value={editedItem.paragraph1}
                onChange={(e) => setEditedItem({ ...editedItem, paragraph1: e.target.value })}
                rows={3}
                placeholder="First paragraph"
              />
            </div>
            <div>
              <Label>Paragraph 2</Label>
              <Textarea
                value={editedItem.paragraph2}
                onChange={(e) => setEditedItem({ ...editedItem, paragraph2: e.target.value })}
                rows={3}
                placeholder="Second paragraph"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Est. Year</Label>
                <Input
                  value={editedItem.estYear}
                  onChange={(e) => setEditedItem({ ...editedItem, estYear: e.target.value })}
                  placeholder="e.g., Est. 2012"
                />
              </div>
              <div>
                <Label>Est. Label</Label>
                <Input
                  value={editedItem.estLabel}
                  onChange={(e) => setEditedItem({ ...editedItem, estLabel: e.target.value })}
                  placeholder="e.g., Crafting Legacies"
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle CTA editing
  if (item.type === 'cta') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit CTA Section</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="CTA heading"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={3}
                placeholder="CTA description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Button Label</Label>
                <Input
                  value={editedItem.primaryLabel}
                  onChange={(e) => setEditedItem({ ...editedItem, primaryLabel: e.target.value })}
                />
              </div>
              <div>
                <Label>Primary Button Link</Label>
                <Input
                  value={editedItem.primaryHref}
                  onChange={(e) => setEditedItem({ ...editedItem, primaryHref: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Secondary Button Label</Label>
                <Input
                  value={editedItem.secondaryLabel}
                  onChange={(e) => setEditedItem({ ...editedItem, secondaryLabel: e.target.value })}
                />
              </div>
              <div>
                <Label>Secondary Button Link</Label>
                <Input
                  value={editedItem.secondaryHref}
                  onChange={(e) => setEditedItem({ ...editedItem, secondaryHref: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle WhatsApp number editing
  if (item.type === 'whatsapp') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit WhatsApp Number</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>WhatsApp Number (with country code, no +)</Label>
              <Input
                value={editedItem.whatsappNumber}
                onChange={(e) => setEditedItem({ ...editedItem, whatsappNumber: e.target.value })}
                placeholder="e.g., 919579896842"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include country code without + sign. Example: 919579896842
              </p>
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Update Number'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle section header editing (contact header, etc.)
  if (item.type === 'sectionHeader') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Section Header</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Section title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={3}
                placeholder="Section description"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle edit category (all category edit types)
  if (item.type === 'editCategory' || item.type === 'category') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Category</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={editedItem.newName}
                onChange={(e) => setEditedItem({ ...editedItem, newName: e.target.value })}
                placeholder="e.g., Residential, Commercial"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editedItem.newName.trim()) {
                  item.onSave(editedItem.newName);
                  onClose();
                }
              }}
              className="flex-1 bg-primary"
              disabled={!editedItem.newName.trim()}
            >
              Update Category
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new category
  if (item.type === 'newCategory') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Category</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="e.g., Residential, Commercial"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editedItem.name.trim()) {
                  item.onSave(editedItem.name);
                  onClose();
                }
              }}
              className="flex-1 bg-primary"
              disabled={!editedItem.name.trim()}
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle footer brand
  if (item.type === 'footerBrand') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Brand Description</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={3}
                placeholder="Brand description"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle contact info
  if (item.type === 'contactInfo') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Contact Info</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={editedItem.email}
                onChange={(e) => setEditedItem({ ...editedItem, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={editedItem.phone}
                onChange={(e) => setEditedItem({ ...editedItem, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={editedItem.location}
                onChange={(e) => setEditedItem({ ...editedItem, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle copyright
  if (item.type === 'copyright') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Copyright</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Copyright Text</Label>
              <Input
                value={editedItem.text}
                onChange={(e) => setEditedItem({ ...editedItem, text: e.target.value })}
                placeholder="© 2024 Company Name. All rights reserved."
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new company link
  if (item.type === 'newCompanyLink') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Company Link</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={editedItem.label}
                onChange={(e) => setEditedItem({ ...editedItem, label: e.target.value })}
                placeholder="e.g., About"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editedItem.href}
                onChange={(e) => setEditedItem({ ...editedItem, href: e.target.value })}
                placeholder="e.g., /about or https://..."
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle company link
  if (item.type === 'companyLink' || item.type === 'legalLink') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Link</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={editedItem.label}
                onChange={(e) => setEditedItem({ ...editedItem, label: e.target.value })}
                placeholder="e.g., About"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editedItem.href}
                onChange={(e) => setEditedItem({ ...editedItem, href: e.target.value })}
                placeholder="e.g., /about or https://..."
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Update Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new legal link
  if (item.type === 'newLegalLink') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Legal Link</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Label</Label>
              <Input
                value={editedItem.label}
                onChange={(e) => setEditedItem({ ...editedItem, label: e.target.value })}
                placeholder="e.g., Privacy"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editedItem.href}
                onChange={(e) => setEditedItem({ ...editedItem, href: e.target.value })}
                placeholder="e.g., /privacy"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new social link
  if (item.type === 'newSocialLink') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Social Link</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Platform</Label>
              <Input
                value={editedItem.platform}
                onChange={(e) => setEditedItem({ ...editedItem, platform: e.target.value })}
                placeholder="e.g., Instagram"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editedItem.url}
                onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Icon</Label>
              <select
                value={editedItem.icon}
                onChange={(e) => setEditedItem({ ...editedItem, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Instagram">Instagram</option>
                <option value="Linkedin">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Youtube">YouTube</option>
              </select>
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Social Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle social link
  if (item.type === 'socialLink') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Social Link</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Platform</Label>
              <Input
                value={editedItem.platform}
                onChange={(e) => setEditedItem({ ...editedItem, platform: e.target.value })}
                placeholder="e.g., Instagram"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editedItem.url}
                onChange={(e) => setEditedItem({ ...editedItem, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Icon</Label>
              <select
                value={editedItem.icon}
                onChange={(e) => setEditedItem({ ...editedItem, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Instagram">Instagram</option>
                <option value="Linkedin">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Youtube">YouTube</option>
              </select>
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Update Social Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new service
  if (item.type === 'newService') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Service</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="e.g., Landscape Design"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editedItem.name.trim()) {
                  item.onSave(editedItem.name);
                  onClose();
                }
              }}
              className="flex-1 bg-primary"
              disabled={!editedItem.name.trim()}
            >
              Add Service
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle edit service
  if (item.type === 'editService') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Service</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={editedItem.newName}
                onChange={(e) => setEditedItem({ ...editedItem, newName: e.target.value })}
                placeholder="e.g., Landscape Design"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editedItem.newName.trim()) {
                  item.onSave(editedItem.newName);
                  onClose();
                }
              }}
              className="flex-1 bg-primary"
              disabled={!editedItem.newName.trim()}
            >
              Update Service
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle stat editing
  if (item.type === 'stat') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Stat</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>{item.label}</Label>
              <Input
                type="number"
                value={editedItem.value}
                onChange={(e) => setEditedItem({ ...editedItem, value: parseInt(e.target.value) || 0 })}
                placeholder="Enter value"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (item.onSave) {
                  item.onSave(editedItem.value);
                }
                onClose();
              }}
              className="flex-1 bg-primary"
            >
              Update Stat
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new hero slide
  if (item.type === 'newHeroSlide') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Hero Slide</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Slide title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={3}
                placeholder="Slide description"
              />
            </div>
            {renderImageUpload('image')}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Slide'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new architect
  if (item.type === 'newArchitect') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Architect</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <Label>Name</Label>
              <Input
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="Architect name"
              />
            </div>

            {/* Title Field */}
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="e.g., Principal Architect"
              />
            </div>

            {/* Bio Field */}
            <div>
              <Label>Bio</Label>
              <Textarea
                value={editedItem.bio}
                onChange={(e) => setEditedItem({ ...editedItem, bio: e.target.value })}
                rows={4}
                placeholder="Brief biography"
              />
            </div>

            {/* Image Upload with Edit Option */}
            <div>
              <Label>Photo</Label>
              
              {editedItem.image && !showImageCropper ? (
                <div className="mt-2 space-y-3">
                  <div className="relative group">
                    <div className="relative w-64 aspect-[3/4] mx-auto rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={editedItem.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* 3-button hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 rounded-lg w-64 mx-auto flex flex-col items-center justify-center gap-3 px-4">
                      {/* 1: Edit Image — opens cropper on CURRENT image */}
                      <button
                        type="button"
                        onClick={() => {
                          setTempImageForCrop(editedItem.image);
                          setShowImageCropper(true);
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        ✏️ Edit Image
                      </button>
                      {/* 2: Change Image — opens file picker to upload NEW image */}
                      <label
                        htmlFor="change-image-input-new"
                        className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium cursor-pointer transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        🔄 Change Image
                      </label>
                      <input
                        id="change-image-input-new"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUploadForCrop}
                        className="hidden"
                      />
                      {/* 3: Delete — removes the image */}
                      <button
                        type="button"
                        onClick={() => setEditedItem({ ...editedItem, image: '' })}
                        className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        🗑️ Delete Image
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Hover over image for options
                  </p>
                </div>
              ) : !editedItem.image && !showImageCropper ? (
                <label
                  htmlFor="architect-image-input-new"
                  className="mt-2 relative flex flex-col items-center justify-center w-64 aspect-[3/4] mx-auto border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <Plus className="h-6 w-6" />
                    </div>
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                    <p className="mb-1 text-xs font-semibold text-foreground">
                      Click to upload photo
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                  <input
                    id="architect-image-input-new"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadForCrop}
                    disabled={isLoading}
                    className="hidden"
                  />
                </label>
              ) : null}

              {/* Image Cropper */}
              {showImageCropper && tempImageForCrop && (
                <ImageCropperInline
                  imageSrc={tempImageForCrop}
                  onCrop={handleCropComplete}
                  onCancel={() => {
                    setShowImageCropper(false);
                    setTempImageForCrop(null);
                  }}
                  aspectRatio={3/4}
                />
              )}

              {isLoading && (
                <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  Processing image...
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading || !editedItem.name || !editedItem.title || !editedItem.bio}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Architect'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle edit architect
  if (item.type === 'architect') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Architect</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <Label>Name</Label>
              <Input
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="Architect name"
              />
            </div>

            {/* Title Field */}
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="e.g., Principal Architect"
              />
            </div>

            {/* Bio Field */}
            <div>
              <Label>Bio</Label>
              <Textarea
                value={editedItem.bio}
                onChange={(e) => setEditedItem({ ...editedItem, bio: e.target.value })}
                rows={4}
                placeholder="Brief biography"
              />
            </div>

            {/* Image Upload with Edit Option */}
            <div>
              <Label>Photo</Label>
              
              {editedItem.image && !showImageCropper ? (
                <div className="mt-2 space-y-3">
                  <div className="relative group">
                    <div className="relative w-64 aspect-[3/4] mx-auto rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={editedItem.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* 3-button hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 rounded-lg w-64 mx-auto flex flex-col items-center justify-center gap-3 px-4">
                      {/* 1: Edit Image — opens cropper on CURRENT image */}
                      <button
                        type="button"
                        onClick={() => {
                          setTempImageForCrop(editedItem.image);
                          setShowImageCropper(true);
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        ✏️ Edit Image
                      </button>
                      {/* 2: Change Image — opens file picker to upload NEW image */}
                      <label
                        htmlFor="change-image-input-edit"
                        className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium cursor-pointer transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        🔄 Change Image
                      </label>
                      <input
                        id="change-image-input-edit"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUploadForCrop}
                        className="hidden"
                      />
                      {/* 3: Delete — removes the image */}
                      <button
                        type="button"
                        onClick={() => setEditedItem({ ...editedItem, image: '' })}
                        className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        🗑️ Delete Image
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Hover over image for options
                  </p>
                </div>
              ) : !editedItem.image && !showImageCropper ? (
                <label
                  htmlFor="architect-image-input-edit"
                  className="mt-2 relative flex flex-col items-center justify-center w-64 aspect-[3/4] mx-auto border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                      <Plus className="h-6 w-6" />
                    </div>
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                    <p className="mb-1 text-xs font-semibold text-foreground">
                      Click to upload photo
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                  <input
                    id="architect-image-input-edit"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadForCrop}
                    disabled={isLoading}
                    className="hidden"
                  />
                </label>
              ) : null}

              {/* Image Cropper */}
              {showImageCropper && tempImageForCrop && (
                <ImageCropperInline
                  imageSrc={tempImageForCrop}
                  onCrop={handleCropComplete}
                  onCancel={() => {
                    setShowImageCropper(false);
                    setTempImageForCrop(null);
                  }}
                  aspectRatio={3/4}
                />
              )}

              {isLoading && (
                <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  Processing image...
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex-1"
              disabled={isSaving}
            >
              Delete Architect
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Update Architect'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new testimonial
  if (item.type === 'newTestimonial') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Testimonial</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="Client name"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                value={editedItem.position}
                onChange={(e) => setEditedItem({ ...editedItem, position: e.target.value })}
                placeholder="e.g., CEO"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={editedItem.company}
                onChange={(e) => setEditedItem({ ...editedItem, company: e.target.value })}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={editedItem.message}
                onChange={(e) => setEditedItem({ ...editedItem, message: e.target.value })}
                rows={4}
                placeholder="Testimonial message"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Testimonial'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new process step
  if (item.type === 'newProcessStep') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Process Step</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Step Number</Label>
              <Input
                type="number"
                value={editedItem.step}
                onChange={(e) => setEditedItem({ ...editedItem, step: parseInt(e.target.value) })}
                placeholder="Step number"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Step title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={4}
                placeholder="Step description"
              />
            </div>
            {renderImageUpload('image')}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Step
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new award
  if (item.type === 'newAward') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Award</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Award Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Award title"
              />
            </div>
            <div>
              <Label>Year</Label>
              <Input
                value={editedItem.year}
                onChange={(e) => setEditedItem({ ...editedItem, year: e.target.value })}
                placeholder="e.g., 2024"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={4}
                placeholder="Award description"
              />
            </div>
            {renderImageUpload('image')}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Award
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new additional award
  if (item.type === 'newAdditionalAward') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
          <div className="bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Recognition</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Recognition title"
              />
            </div>
            <div>
              <Label>Year</Label>
              <Input
                value={editedItem.year}
                onChange={(e) => setEditedItem({ ...editedItem, year: e.target.value })}
                placeholder="e.g., 2024"
              />
            </div>
          </div>

          <div className="bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Recognition
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new collection image
  if (item.type === 'newCollectionImage') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add Collection Image</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Alt Text</Label>
              <Input
                value={editedItem.alt}
                onChange={(e) => setEditedItem({ ...editedItem, alt: e.target.value })}
                placeholder="Image description"
              />
            </div>
            {renderImageUpload('src')}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary">
              Add Image
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new project
  if (item.type === 'newProject') {
    return (
      <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Project</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label>Title</Label>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={editedItem.location}
                onChange={(e) => setEditedItem({ ...editedItem, location: e.target.value })}
                placeholder="Project location"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={editedItem.category}
                onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
                placeholder="Category"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                rows={4}
                placeholder="Project description"
              />
            </div>
            {renderMultiImageUpload('images')}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Project'
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default edit modal for existing items
  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Content</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Dynamic form based on item type */}
          {Object.keys(editedItem).map((key) => {
            if (
              key === 'id' ||
              key === 'type' ||
              key === 'index' ||
              key === 'onSave' ||
              key === 'onDelete' ||
              key === '_id' ||
              key === '__v' ||
              key === 'createdAt' ||
              key === 'updatedAt'
            )
              return null;

            return (
              <div key={key}>
                {key === 'image' || key === 'src' ? (
                  renderImageUpload(key)
                ) : key === 'images' ? (
                  renderMultiImageUpload(key)
                ) : key === 'description' || key === 'bio' || key === 'message' ? (
                  <div>
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Textarea
                      value={editedItem[key]}
                      onChange={(e) => setEditedItem({ ...editedItem, [key]: e.target.value })}
                      rows={4}
                    />
                  </div>
                ) : (
                  <div>
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                      value={editedItem[key]}
                      onChange={(e) => setEditedItem({ ...editedItem, [key]: e.target.value })}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
          {item.onDelete && (
            <Button variant="destructive" onClick={handleDelete} className="mr-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-primary" disabled={isSaving || isLoading}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

