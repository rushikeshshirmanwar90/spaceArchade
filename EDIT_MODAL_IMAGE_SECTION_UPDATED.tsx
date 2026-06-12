// Updated Image Section for Edit Modal
// Replace the image section in BOTH newArchitect and architect forms in edit-modal.tsx

{/* Image Upload with Edit & Change Options */}
<div>
  <Label className="text-base font-semibold mb-4 block">Photo</Label>
  
  {editedItem.image && !showImageCropper ? (
    // Image Preview with Change Option
    <div className="mt-4 space-y-4">
      <div className="relative w-full rounded-lg overflow-hidden border-2 border-border shadow-lg" style={{ aspectRatio: '3/4', minHeight: '400px' }}>
        <img
          src={editedItem.image}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Change Image Button */}
        <label
          htmlFor="change-image-input"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          ↔️ Change Image
        </label>

        {/* Edit Image Button - Opens Cropper */}
        <label
          htmlFor="edit-image-input"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          ✏️ Edit Image
        </label>

        {/* Remove Image Button */}
        <button
          type="button"
          onClick={() => setEditedItem({ ...editedItem, image: '' })}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-lg"
        >
          🗑️ Remove
        </button>

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

      <p className="text-xs text-muted-foreground text-center">
        💡 Click "Edit Image" to crop/zoom, or "Change Image" to upload a new photo
      </p>
    </div>
  ) : !editedItem.image && !showImageCropper ? (
    // Upload Area
    <label
      htmlFor="architect-image-input"
      className="mt-4 relative flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all group border-2 border-dashed border-blue-400"
      style={{ aspectRatio: '3/4', minHeight: '400px' }}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
          <Plus className="h-8 w-8" />
        </div>
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

  {/* Image Cropper - Shows when editing */}
  {showImageCropper && tempImageForCrop && (
    <div className="mt-6 space-y-4">
      {/* Hint */}
      <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          📐 <strong>Crop Your Image:</strong> Adjust zoom & rotation below, then click "Apply Crop"
        </p>
      </div>

      {/* Cropper Component */}
      <ImageCropperInline
        imageSrc={tempImageForCrop}
        onCrop={handleCropComplete}
        onCancel={() => {
          setShowImageCropper(false);
          setTempImageForCrop(null);
        }}
        aspectRatio={1}
      />
    </div>
  )}

  {isLoading && (
    <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
      Processing image...
    </div>
  )}
</div>
