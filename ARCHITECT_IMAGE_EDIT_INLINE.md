# Add Inline Image Editing to Architect Form

## Quick Setup (5 minutes)

### Step 1: Add Import
At the top of `components/admin/edit-modal.tsx`, add:

```typescript
import { ImageCropperInline } from './image-cropper-inline';
```

### Step 2: Add States
Inside the `EditModal` function, add these states:

```typescript
const [showImageCropper, setShowImageCropper] = useState(false);
const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null);
```

### Step 3: Add Handlers
Inside `EditModal`, add these functions:

```typescript
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
```

### Step 4: Replace Architecture Sections
Find the `newArchitect` section (around line 1055) and the `architect` section, then replace them with the code from `/tmp/edit_modal_architect_update.tsx`.

---

## What You Get

### Upload Flow:
1. Click to upload image → Image cropper opens inline
2. Adjust with zoom, rotate, drag
3. Click "Apply Crop" → Image saved in form
4. Hover over image → "Edit Image" button appears
5. Click "Edit Image" → Cropper opens again
6. Or click "Remove" → Delete image
7. Fill form → Save architect

### Features:
✅ Inline cropping in same modal  
✅ Edit button after upload  
✅ Zoom (0.5x - 3x)  
✅ Rotate (0° - 360°)  
✅ Reset functionality  
✅ Remove button  
✅ Visual crop boundary  
✅ Mobile friendly  

### UI Elements:
- 📤 **Upload Zone**: Dashed border, drag-and-drop ready
- 📷 **Preview**: Shows uploaded image
- ✏️ **Edit Button**: Hover over image to see
- 🖼️ **Crop Panel**: Inline with controls
- ⬅️ **Reset**: Start over
- ❌ **Cancel**: Discard changes
- ✅ **Apply**: Confirm crop

---

## Component Files Used

1. **ImageCropperInline** (`components/admin/image-cropper-inline.tsx`)
   - Smaller, inline version
   - Canvas-based cropping
   - No external dependencies

2. **EditModal** (`components/admin/edit-modal.tsx`)
   - Updated architect sections
   - New state management
   - Enhanced image handling

---

## Testing Checklist

- [ ] Upload new image
- [ ] Cropper appears inline
- [ ] Zoom slider works
- [ ] Rotate slider works
- [ ] Reset clears changes
- [ ] Apply crop saves image
- [ ] Edit button appears on hover
- [ ] Can edit image again after save
- [ ] Remove button deletes image
- [ ] Form validation works
- [ ] Save button saves architect

---

## Image Format Support

- PNG ✅
- JPG ✅
- WebP ✅
- GIF ✅
- Up to 10MB ✅

---

## Performance

- Client-side cropping (no server load)
- Canvas API (native browser)
- Optimized JPEG output
- Smooth animations
- No extra npm dependencies

