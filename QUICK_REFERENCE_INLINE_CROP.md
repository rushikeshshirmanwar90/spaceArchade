# ⚡ Quick Reference - Inline Image Cropper

## 📂 Files Created
✅ `components/admin/image-cropper-inline.tsx` - Ready to use
✅ `components/admin/image-cropper.tsx` - Alternative option
✅ Documentation files

## 4-Step Integration

### 1️⃣ Import Component
**File:** `components/admin/edit-modal.tsx` (Top of file)
```typescript
import { ImageCropperInline } from './image-cropper-inline';
```

### 2️⃣ Add State Management
**File:** `components/admin/edit-modal.tsx` (Inside EditModal function)
```typescript
const [showImageCropper, setShowImageCropper] = useState(false);
const [tempImageForCrop, setTempImageForCrop] = useState<string | null>(null);
```

### 3️⃣ Add Event Handlers
**File:** `components/admin/edit-modal.tsx` (Inside EditModal function)
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

### 4️⃣ Update Architect Sections
**File:** `components/admin/edit-modal.tsx` (Lines ~1055 and onward)

Use the complete code from: `/tmp/edit_modal_architect_update.tsx`

The file contains both `newArchitect` and `architect` (edit) sections with:
- Image upload zone
- Preview with edit/remove buttons
- Inline cropper
- Form validation

---

## 🎮 How It Works

```
User uploads image
       ↓
Handler reads file
       ↓
Cropper opens inline
       ↓
User adjusts (zoom/rotate/drag)
       ↓
User clicks "Apply Crop"
       ↓
Image saved to form
       ↓
Hover shows "Edit Image" button
       ↓
Can edit again or continue
```

---

## 📱 What Users See

### Before Upload:
```
Photo: ┌────────────────────────┐
       │ 📤 Click to upload photo│
       │ PNG, JPG, WEBP up to10MB
       └────────────────────────┘
```

### After Upload (hover):
```
Photo: ┌────────────────────────┐
       │ ✏️ Edit Image 🗑️ Remove │ ← Appears on hover
       │    [Cropped Image]     │
       │                        │
       └────────────────────────┘
```

### While Editing:
```
Photo: ┌────────────────────────┐
       │   Canvas Preview       │
       │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
       │  ▓ [Crop Box] ▓       │
       │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
       │                        │
       │ Zoom: ─●──────────    │
       │ Rotate: ──────●─────   │
       │                        │
       │ [Reset] [Cancel] [✓]  │
       └────────────────────────┘
```

---

## ✅ Checklist

- [ ] Import ImageCropperInline
- [ ] Add showImageCropper state
- [ ] Add tempImageForCrop state
- [ ] Add handleImageUploadForCrop function
- [ ] Add handleCropComplete function
- [ ] Replace newArchitect section
- [ ] Replace architect section
- [ ] Test upload flow
- [ ] Test edit button
- [ ] Test remove button
- [ ] Test zoom control
- [ ] Test rotation
- [ ] Verify save works

---

## 🔗 Key Features

| Feature | Code | How to Use |
|---------|------|-----------|
| **Upload** | `handleImageUploadForCrop` | Click upload zone |
| **Preview** | Canvas element | Shows in real-time |
| **Zoom** | Slider 0.5-3x | Drag slider or click |
| **Rotate** | Slider 0-360° | Drag slider by 15° |
| **Drag** | Canvas mouse handlers | Click+drag on canvas |
| **Edit** | Edit button (hover) | Click to re-crop |
| **Remove** | Remove button (hover) | Delete image |
| **Reset** | Reset button | Revert changes |
| **Apply** | Apply Crop button | Save crop |

---

## 🎯 Pro Tips

1. **Zoom before dragging** - Zoom in for precise cropping
2. **Rotate for portraits** - Rotate 90° for vertical images
3. **Edit multiple times** - Click Edit button to adjust again
4. **Remove & re-upload** - Start over with Remove button
5. **Test on mobile** - Sliders work great on touch devices

---

## 📍 Line Numbers (Approximate)

| Action | File | Location |
|--------|------|----------|
| Imports | edit-modal.tsx | Top (Line 1-30) |
| States | edit-modal.tsx | Inside EditModal (~Line 20-30) |
| Handlers | edit-modal.tsx | Inside EditModal (~Line 50-100) |
| newArchitect | edit-modal.tsx | ~Line 1055 |
| architect | edit-modal.tsx | ~Line 1120 |

---

## 🚀 Done!

Once integrated, your form will have professional image editing built-in.
No external dependencies, no server overhead, all client-side! 

---

**Questions?** Check:
- `ARCHITECT_IMAGE_EDIT_INLINE.md` (Setup guide)
- `ARCHITECTS_IMAGE_CROP_GUIDE.md` (Detailed reference)
- `/tmp/edit_modal_architect_update.tsx` (Complete code)

