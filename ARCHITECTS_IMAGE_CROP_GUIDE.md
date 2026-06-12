# Architects Image Crop/Fit Feature - Implementation Guide

## Overview
Added image cropping and fitting functionality for architect photos in the admin panel. Users can now crop, zoom, and rotate images before uploading.

## Files Created

### 1. **Image Cropper Component** (`components/admin/image-cropper.tsx`)
A reusable component for cropping images with:
- Interactive canvas-based cropping
- Zoom control (0.5x to 3x)
- Rotation support (0° to 360°)
- Live preview
- Reset functionality

## Integration Steps

### Step 1: Update Edit Modal Import
Add to `components/admin/edit-modal.tsx` at the top:

```typescript
import { ImageCropper } from './image-cropper';
```

### Step 2: Add State Management for Cropper
Add these states to the `EditModal` component:

```typescript
const [showCropper, setShowCropper] = useState(false);
const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null);
const [cropKey, setCropKey] = useState<string>('image');
```

### Step 3: Create Enhanced Image Upload Handler
Replace or enhance the image upload handler:

```typescript
const handleImageChangeWithCrop = (e: React.ChangeEvent<HTMLInputElement>, key: string = 'image') => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      // For architects, show cropper
      if (item.type === 'newArchitect' || item.type === 'architect') {
        setTempImageForCrop(imageData);
        setCropKey(key);
        setShowCropper(true);
      } else {
        // For other items, use regular upload
        handleImageChange(e, key);
      }
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Error loading image:', error);
  }
};

const handleCropComplete = async (croppedImage: string) => {
  try {
    // Option 1: Save as data URL directly
    setEditedItem({ ...editedItem, [cropKey]: croppedImage });
    
    // Option 2: Upload to server (uncomment if you have upload endpoint)
    /*
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const uploadData = await uploadResponse.json();

    if (uploadData.success) {
      setEditedItem({ ...editedItem, [cropKey]: uploadData.url });
    }
    */
  } catch (error) {
    console.error('Error handling cropped image:', error);
  } finally {
    setShowCropper(false);
    setTempImageForCrop(null);
  }
};
```

### Step 4: Update Architect Image Upload Section
In the `newArchitect` section (around line 1086), replace:

```typescript
{renderImageUpload('image')}
```

With:

```typescript
<div>
  <Label>Photo</Label>
  <div className="mt-2">
    {editedItem.image ? (
      <div className="relative group">
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-border">
          <Image
            src={editedItem.image}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <label
            htmlFor="crop-input"
            className="bg-green-500 text-white rounded-lg px-3 py-1.5 cursor-pointer hover:bg-green-600 flex items-center gap-2 text-sm font-medium shadow-lg"
          >
            🖼️ Crop
          </label>
          <button
            type="button"
            onClick={() => setEditedItem({ ...editedItem, image: '' })}
            className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <label
            htmlFor="image-input"
            className="bg-blue-500 text-white rounded-lg px-3 py-1.5 cursor-pointer hover:bg-blue-600 flex items-center gap-2 text-sm font-medium shadow-lg"
          >
            <Upload className="h-4 w-4" />
            Replace
          </label>
        </div>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChangeWithCrop(e, 'image')}
          disabled={isLoading}
          className="hidden"
        />
        <input
          id="crop-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChangeWithCrop(e, 'image')}
          disabled={isLoading}
          className="hidden"
        />
      </div>
    ) : (
      <label
        htmlFor="image-input"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <Plus className="h-8 w-8" />
          </div>
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
          <p className="mb-2 text-sm font-semibold text-foreground">
            Click to upload photo
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChangeWithCrop(e, 'image')}
          disabled={isLoading}
          className="hidden"
        />
      </label>
    )}
    {isLoading && (
      <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
        Processing image...
      </div>
    )}
  </div>
</div>
```

### Step 5: Add Cropper Modal at the End
Add this before the closing of the EditModal component:

```typescript
{showCropper && tempImageForCrop && (
  <ImageCropper
    imageSrc={tempImageForCrop}
    onCrop={handleCropComplete}
    onCancel={() => {
      setShowCropper(false);
      setTempImageForCrop(null);
    }}
    aspectRatio={1}
  />
)}
```

## Features

✅ **Interactive Cropping**
- Click and drag to position image
- Click and drag outside crop area to move image

✅ **Zoom Control**
- Slider for smooth zooming (0.5x to 3x)
- Real-time preview

✅ **Rotation**
- 15° increments rotation control
- 0° to 360° range

✅ **User-Friendly**
- Visual crop area indicator
- Reset button to start over
- Cancel button to discard changes
- Apply crop button to confirm

✅ **Professional Preview**
- Live canvas preview
- Shows crop boundaries
- Dark overlay outside crop area

## How It Works

1. **Select Image**: User uploads an image
2. **Crop Interface Opens**: Interactive cropping modal appears
3. **Adjust Image**: 
   - Drag to move the image inside the crop box
   - Use zoom slider to enlarge/shrink
   - Rotate for proper orientation
4. **Apply**: Click "Apply Crop" to finalize
5. **Save**: The cropped image is saved to the form

## Benefits

- **Perfect Fit**: Ensures all architect photos have consistent dimensions
- **Better Control**: Users can frame the perfect shot
- **Professional Look**: Cropped images display uniformly in the grid
- **No Extra Dependencies**: Uses native Canvas API
- **Fast Processing**: Client-side cropping (no server overhead)

## Browser Support

Works on all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Future Enhancements

- Add filter options (brightness, contrast, saturation)
- Add aspect ratio presets (1:1, 16:9, 4:5, etc.)
- Add image compression options
- Add before/after comparison
- Save crop presets for consistency
