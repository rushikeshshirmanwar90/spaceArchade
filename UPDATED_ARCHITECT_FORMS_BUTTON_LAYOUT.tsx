// Updated Architect Forms with New Button Layout
// Replace the image section in BOTH newArchitect and architect sections

// ========== UPDATED IMAGE SECTION ==========
// Use this for BOTH forms in edit-modal.tsx

{/* Image Upload with Edit Option - New Layout */}
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
        
        {/* Hover Buttons - New Layout: Change | Remove | Edit */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 flex items-center justify-between px-3 rounded-lg">
          
          {/* LEFT: Change Image (Blue) */}
          <label
            htmlFor="change-image-input"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-lg"
          >
            ↔️ Change Image
          </label>

          {/* CENTER: Remove (Red) */}
          <button
            type="button"
            onClick={() => setEditedItem({ ...editedItem, image: '' })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            🗑️ Remove
          </button>

          {/* RIGHT: Edit Image (Green) */}
          <label
            htmlFor="edit-image-input"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-lg"
          >
            ✏️ Edit Image
          </label>

          {/* Hidden file inputs */}
          <input
            id="change-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUploadForCrop}
            className="hidden"
          />
          <input
            id="edit-image-input"
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

  {/* Image Cropper - Inline */}
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

  {/* Loading State */}
  {isLoading && (
    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
      Processing image...
    </div>
  )}
</div>
// ========== END UPDATED IMAGE SECTION ==========

