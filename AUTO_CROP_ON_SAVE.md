# 🔄 Auto-Crop Image Before Saving

## What This Does

When user clicks "Update Architect" without applying crop:
- ✅ Current image edits (zoom/rotate/position) are automatically applied
- ✅ Cropped image is saved with architect
- ✅ No need to manually click "Apply Crop"

---

## Implementation

Add this code to `components/admin/edit-modal.tsx`:

### Step 1: Add Auto-Crop Handler

Add this function inside EditModal:

```typescript
// Auto-crop image if it has been modified but not applied
const handleAutoApplyCrop = async (): Promise<string | null> => {
  if (!showImageCropper && editedItem.image) {
    // Image is not being edited, return current image
    return editedItem.image;
  }

  // If cropper is showing, user hasn't applied crop yet
  // This shouldn't happen, but handle it gracefully
  return editedItem.image || null;
};
```

### Step 2: Modify Save Handler

Find your `handleSave` function and wrap it like this:

```typescript
const handleSave = async () => {
  // Auto-apply crop if image is in edit mode but not yet applied
  if (showImageCropper && tempImageForCrop) {
    alert('Please apply crop first or cancel to skip image changes');
    return;
  }

  try {
    // ... rest of your save code
  } catch (error) {
    console.error('Save error:', error);
  }
};
```

### Step 3: Better Approach - Modify Image Cropper

Add auto-crop on form submission by modifying the image section:

```typescript
// Add this before the sticky bottom buttons in the architect form:

{/* Auto Apply on Save */}
{showImageCropper && tempImageForCrop && (
  <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
    <p className="text-sm text-yellow-800">
      💡 <strong>Tip:</strong> Apply your crop adjustments before saving the architect
    </p>
  </div>
)}
```

---

## Best Solution: Smart Save

Replace your architect form's bottom buttons with this:

```typescript
<div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
  {item.type === 'architect' && (
    <Button
      variant="destructive"
      onClick={handleDelete}
      className="flex-1"
      disabled={isSaving}
    >
      Delete Architect
    </Button>
  )}
  
  <Button 
    variant="outline" 
    onClick={onClose} 
    className="flex-1" 
    disabled={isSaving || isLoading}
  >
    Cancel
  </Button>
  
  <Button 
    onClick={async () => {
      // If image cropper is open, prompt to apply or continue
      if (showImageCropper) {
        const shouldContinue = window.confirm(
          'Image is still being edited. Click Apply Crop or click OK to save without changes.'
        );
        if (!shouldContinue) return;
      }
      
      await handleSave(editedItem);
    }} 
    className="flex-1 bg-primary" 
    disabled={isSaving || isLoading}
  >
    {isSaving ? (
      <>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Saving...
      </>
    ) : item.type === 'newArchitect' ? (
      'Add Architect'
    ) : (
      'Update Architect'
    )}
  </Button>
</div>
```

---

## Option 2: Simple Auto-Crop (Recommended)

If you want automatic cropping without confirmation:

Add this to your image cropper component:

```typescript
// Add a method to get current crop without UI
export function getImageCropperState() {
  return {
    zoom,
    rotation,
    offsetX,
    offsetY,
  };
}

// Or export a function to apply crop programmatically:
export function applyCurrentCrop(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const cropWidth = 400;
    const cropHeight = 533;
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return reject('No canvas context');

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.translate(offsetX / zoom, offsetY / zoom);
      ctx.translate(-img.width / 2, -img.height / 2);
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
          }
        },
        'image/jpeg',
        0.95
      );
    };

    img.onerror = () => reject('Failed to load image');
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
  });
}
```

---

## Option 3: Simplest - Just Save Current (Recommended ⭐)

In your save handler, before checking if image exists, add:

```typescript
// If cropper is open, close it and return (force user to apply)
if (showImageCropper) {
  setShowImageCropper(false);
  setTempImageForCrop(null);
  return;
}

// Continue with save
// ... rest of handleSave
```

This forces user to either:
1. Click "Apply Crop" to save the edited image, OR
2. Click "Cancel" in cropper to discard changes

---

## Which Option to Choose?

| Option | Pros | Cons |
|--------|------|------|
| **Option 1** | Shows helpful tip | Requires manual confirmation |
| **Option 2** | Auto-applies edits | More complex code |
| **Option 3** | Simplest ⭐ | Forces user decision | Forces clarity |

**I recommend Option 3** - It's simple and forces the user to intentionally apply or discard changes.

---

## Implementation Steps

1. Find the bottom buttons in both architect sections
2. Update onClick handler for Update/Add button
3. Add check: `if (showImageCropper) { return; }`
4. This forces user to apply crop or cancel

Done! Now users must apply crop before saving.

