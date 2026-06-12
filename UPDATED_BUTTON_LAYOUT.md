# 🎯 Updated Button Layout for Edit Architect Card

## Current Layout (Screenshot)
```
Image Preview
├─ ✏️ Edit Image  |  🗑️ Remove  |  Change Image →
```

## Updated Layout (New)
```
Image Preview
├─ ← Change Image  |  🗑️ Remove  |  ✏️ Edit Image
```

The buttons are now mirrored with "Edit Image" on the right side.

---

## Updated Code Section

Replace the image upload section in the **architect (edit)** form with this:

```typescript
{/* Image Upload with Edit Option - Updated Layout */}
<div>
  <Label>Photo</Label>
  
  {editedItem.image && !showImageCropper ? (
    <div className="mt-2 space-y-3">
      <div className="relative group">
        <div className="relative w-full h-56 rounded-lg overflow-hidden border-2 border-border">
          <img
            src={editedItem.image}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Hover Buttons - Updated Layout */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 flex items-center justify-between px-3 rounded-lg">
          {/* Left: Change Image */}
          <label
            htmlFor="crop-edit-input"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-lg"
          >
            ↔️ Change Image
          </label>

          {/* Center: Remove */}
          <button
            type="button"
            onClick={() => setEditedItem({ ...editedItem, image: '' })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            🗑️ Remove
          </button>

          {/* Right: Edit Image */}
          <label
            htmlFor="crop-edit-input-2"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-lg"
          >
            ✏️ Edit Image
          </label>

          <input
            id="crop-edit-input"
            type="file"
            accept="image/*"
            onChange={handleImageUploadForCrop}
            className="hidden"
          />
          <input
            id="crop-edit-input-2"
            type="file"
            accept="image/*"
            onChange={handleImageUploadForCrop}
            className="hidden"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Hover over image to change, remove, or edit
      </p>
    </div>
  ) : !editedItem.image && !showImageCropper ? (
    <label
      htmlFor="architect-image-input"
      className="mt-2 relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group"
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
        id="architect-image-input"
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
      aspectRatio={1}
    />
  )}

  {isLoading && (
    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
      Processing image...
    </div>
  )}
</div>
```

---

## Visual Comparison

### Before:
```
┌─────────────────────────────────┐
│  Image Preview                  │
│ ✏️ Edit  🗑️ Remove  ↔️ Change  │
└─────────────────────────────────┘
```

### After:
```
┌─────────────────────────────────┐
│  Image Preview                  │
│ ↔️ Change  🗑️ Remove  ✏️ Edit  │
└─────────────────────────────────┘
```

---

## Changes Made

1. **Button Order** - Changed from "Edit → Remove → Change" to "Change → Remove → Edit"
2. **Button Colors** - Kept same (Blue for Change, Red for Remove, Green for Edit)
3. **Layout** - Used `flex items-center justify-between` for proper spacing
4. **Icons** - Added icons for clarity
5. **Alignment** - Left, Center, Right positioning

---

## For "Add New Architect" Form

Apply the **same change** to the `newArchitect` section. Just replace the image section with the updated code above.

---

## Button Layout Details

| Position | Button | Icon | Color | Action |
|----------|--------|------|-------|--------|
| Left | Change Image | ↔️ | Blue | Upload new image |
| Center | Remove | 🗑️ | Red | Delete current image |
| Right | Edit Image | ✏️ | Green | Crop/edit current |

---

## Updated Hover Text

The helper text now says:
> "Hover over image to change, remove, or edit"

Updated from the previous version to reflect the new button layout.

---

## Implementation Steps

1. Find the architect (edit) form image section
2. Replace with the updated code above
3. Do the same for newArchitect (add) form
4. Test hovering over image
5. Verify buttons appear in new order

---

## Result

Now when editing an architect and hovering over the image:

```
← Change Image  |  🗑️ Remove  |  ✏️ Edit Image
```

Much cleaner layout with Edit on the right side! ✨

