# ✏️ Image Edit Option in Edit Architect Card

## ✅ Good News!

The **image editing is already included** in both forms:
- ✅ **Add New Architect** form
- ✅ **Edit Architect** form

Both have the same inline cropper functionality!

---

## 📋 What to Update

In your `components/admin/edit-modal.tsx`, there are **TWO architect sections**:

### Section 1: `newArchitect` (Adding new architect)
Lines ~1055 onwards
- Upload image
- Crop inline
- Edit button appears after upload
- Can edit multiple times

### Section 2: `architect` (Editing existing architect)
Lines ~1120 onwards (ALSO NEEDS UPDATE!)
- Upload new image
- Crop inline
- Edit button appears after upload
- Can replace existing image
- Can edit multiple times

---

## 🔧 Implementation

Both sections use **THE SAME CODE**:

**Replace BOTH sections with code from:**
```
/tmp/edit_modal_architect_update.tsx
```

This file contains:
- `if (item.type === 'newArchitect')` section ← Add new architect
- `if (item.type === 'architect')` section ← Edit existing architect ⭐

---

## 🎯 Edit Architect Form Features

When editing an existing architect, users can:

### ✨ **Option 1: Keep Existing Image**
- No change to image
- Just edit name/title/bio

### ✨ **Option 2: Replace Image**
- Remove current image
- Upload new image
- Crop and adjust
- Save with new image

### ✨ **Option 3: Edit Current Image**
- Keep the current image but...
- Change how it's cropped
- Adjust zoom/rotation
- Reposition it
- Save with adjusted crop

---

## 📱 User Flow for Edit Architect

```
Click Edit Architect
       ↓
Form opens with current data
       ↓
Hover over current image → "Edit Image" button appears
       ↓
Click "Edit Image" → Cropper opens inline
       ↓
Adjust zoom/rotate/position
       ↓
Click "Apply Crop" → Image updated in form
       ↓
Or click "Remove" → Delete and upload new image
       ↓
Fill other fields (name, title, bio)
       ↓
Click "Update Architect" → Save changes
```

---

## 🔍 Code Location

**File:** `components/admin/edit-modal.tsx`

**Find this section:**
```typescript
if (item.type === 'architect') {
  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      // ... existing architect edit form
    </div>
  );
}
```

**Replace ENTIRE section** with architect code from:
`/tmp/edit_modal_architect_update.tsx`

---

## ✅ Checklist for Edit Architect

- [ ] Find the `architect` section (line ~1120)
- [ ] Replace entire section with new code
- [ ] Verify states exist: `showImageCropper`, `tempImageForCrop`
- [ ] Verify handlers exist: `handleImageUploadForCrop`, `handleCropComplete`
- [ ] Test opening edit architect form
- [ ] Test image appears with edit button on hover
- [ ] Test clicking edit button opens cropper
- [ ] Test crop adjustments work
- [ ] Test apply saves changes
- [ ] Test form submits with updated image

---

## 🎨 What Architect (Edit) Form Shows

### Current State:
```
┌──────────────────────────────────┐
│ Edit Architect                   │
├──────────────────────────────────┤
│ Name: [Current Name]             │
│ Title: [Current Title]           │
│ Bio: [Current Bio]               │
│                                  │
│ Photo:  ┌────────────────────┐   │
│         │ [Current Photo]    │   │
│         │                    │   │
│         │ ✏️ Edit  🗑️ Remove │   │
│         └────────────────────┘   │
│         (Hover to show buttons)   │
│                                  │
│ [Delete] [Cancel] [Update]       │
└──────────────────────────────────┘
```

### While Editing Image:
```
┌──────────────────────────────────┐
│ Photo:  ┌────────────────────┐   │
│         │ Crop Canvas        │   │
│         │ [Crop Box Preview] │   │
│         │                    │   │
│         │ Zoom:   [●────]    │   │
│         │ Rotate: [──●──]    │   │
│         │                    │   │
│         │ [Reset][Cancel][✓] │   │
│         └────────────────────┘   │
└──────────────────────────────────┘
```

---

## 💡 Key Points

✨ **Same functionality** for both Add and Edit
✨ **Hover to reveal** Edit and Remove buttons
✨ **Edit multiple times** - no limit
✨ **Remove and re-upload** - start fresh
✨ **Keep current image** - just edit other fields

---

## 🚀 Implementation Summary

### What You Need to Do:

1. ✅ Copy `image-cropper-inline.tsx` (already done)
2. ✅ Add import to edit-modal.tsx (already in guide)
3. ✅ Add states to edit-modal.tsx (already in guide)
4. ✅ Add handlers to edit-modal.tsx (already in guide)
5. ✅ **Replace BOTH architect sections** with code from `/tmp/edit_modal_architect_update.tsx`

---

## 📂 Both Sections in One File

The `/tmp/edit_modal_architect_update.tsx` file contains:

```
// Line 1: if (item.type === 'newArchitect') { ... }
// Add new architect form with image editor

// Line 100+: if (item.type === 'architect') { ... }
// Edit existing architect form with image editor

// Both have identical image editing sections!
```

---

## ✅ Final Checklist

**Before:**
- [ ] Read this file
- [ ] Backup edit-modal.tsx

**During:**
- [ ] Copy image-cropper-inline.tsx ✅
- [ ] Add import ✅
- [ ] Add states ✅
- [ ] Add handlers ✅
- [ ] Replace newArchitect section ✅
- [ ] Replace architect section ✅ ← Don't forget!

**After:**
- [ ] Test add new architect
- [ ] Test edit existing architect
- [ ] Test image editing in both forms
- [ ] Test on mobile

---

## 🎯 Result

**Users can now edit architect images in:**
✅ Add New Architect form
✅ Edit Existing Architect form

**Both with:**
✅ Upload option
✅ Crop inline
✅ Edit button
✅ Remove button
✅ Full zoom/rotate/drag controls

---

**The code is ready - just make sure to replace BOTH architect sections!** ✨

