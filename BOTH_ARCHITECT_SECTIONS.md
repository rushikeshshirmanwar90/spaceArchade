# 🎯 Replace BOTH Architect Sections in edit-modal.tsx

## 📍 Two Sections to Update

### Section 1: NEW ARCHITECT (Lines ~1055-1105)

**Find:**
```typescript
// Handle new architect
if (item.type === 'newArchitect') {
  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Architect</h2>
          // ... rest of form
```

**Replace with:** First `if (item.type === 'newArchitect')` block from `/tmp/edit_modal_architect_update.tsx`

✅ After replacement: Add New Architect form will have image editor

---

### Section 2: EDIT ARCHITECT (Lines ~1120+)

**Find:**
```typescript
// Handle architect edit
if (item.type === 'architect') {
  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Architect</h2>
          // ... rest of form
```

**Replace with:** Second `if (item.type === 'architect')` block from `/tmp/edit_modal_architect_update.tsx`

✅ After replacement: Edit Architect form will have image editor

---

## 📋 What's in /tmp/edit_modal_architect_update.tsx

The file contains **complete replacement code for both sections**:

```typescript
// ===== SECTION 1 =====
if (item.type === 'newArchitect') {
  return (
    // Complete form with image editor
    // Upload, Crop, Edit, Remove buttons
  );
}

// ===== SECTION 2 =====
if (item.type === 'architect') {
  return (
    // Complete form with image editor
    // Same features as above
  );
}
```

---

## ✨ Both Forms Will Have:

| Feature | Add Architect | Edit Architect |
|---------|---------------|----------------|
| Photo Upload | ✅ | ✅ |
| Inline Cropper | ✅ | ✅ |
| Edit Button | ✅ | ✅ |
| Remove Button | ✅ | ✅ |
| Zoom Control | ✅ | ✅ |
| Rotate Control | ✅ | ✅ |
| Drag to Reposition | ✅ | ✅ |
| Reset Changes | ✅ | ✅ |

---

## 🔧 How to Find & Replace

### Step 1: Open `components/admin/edit-modal.tsx`

### Step 2: Find First Section
**Search for:** `// Handle new architect`
- Should be around line 1055
- Replace entire `if (item.type === 'newArchitect')` block

### Step 3: Find Second Section  
**Search for:** `// Handle architect edit` or `// Handle architect` (after newArchitect)
- Should be around line 1120
- Replace entire `if (item.type === 'architect')` block

### Step 4: Paste Code
From `/tmp/edit_modal_architect_update.tsx`:
- Copy first newArchitect section → paste in edit-modal.tsx
- Copy second architect section → paste in edit-modal.tsx

---

## 📐 Code Structure

```typescript
// FILE: components/admin/edit-modal.tsx

// ... other code ...

// ===== SECTION TO REPLACE #1 =====
if (item.type === 'newArchitect') {
  return ( ... );  // ← Replace this entire block
}

// ... other code ...

// ===== SECTION TO REPLACE #2 =====
if (item.type === 'architect') {
  return ( ... );  // ← Replace this entire block
}

// ... other code (testimonials, projects, etc) ...
```

---

## ✅ Complete Workflow

```
BEFORE:
├─ Add New Architect (old form, no image editor)
└─ Edit Architect (old form, no image editor)

AFTER REPLACEMENT:
├─ Add New Architect (with image editor ✨)
│  ├─ Upload
│  ├─ Crop inline
│  ├─ Edit button
│  ├─ Remove button
│  └─ Save
│
└─ Edit Architect (with image editor ✨)
   ├─ Show current image
   ├─ Edit button on hover
   ├─ Crop inline
   ├─ Remove and upload new
   └─ Update with new image
```

---

## 🎯 Quick Checklist

- [ ] Backup `edit-modal.tsx`
- [ ] Find `if (item.type === 'newArchitect')` section
- [ ] Replace with code from `/tmp/edit_modal_architect_update.tsx`
- [ ] Find `if (item.type === 'architect')` section
- [ ] Replace with code from `/tmp/edit_modal_architect_update.tsx`
- [ ] Test: Add new architect → works ✅
- [ ] Test: Edit existing architect → works ✅
- [ ] Test: Image editing in both → works ✅
- [ ] Test: Save changes → works ✅

---

## 📞 Important Notes

1. **Both sections are identical** in terms of image editing functionality
2. **Don't delete** any other sections (testimonials, projects, etc)
3. **Make sure** import and handlers are added first
4. **Test thoroughly** before deploying

---

## 🎓 Key Difference

**newArchitect:** User uploads new image from scratch
**architect:** User can keep, edit, or replace existing image

Both use same cropper component and controls!

---

## ✨ Result

After implementation, when editing an architect:

```
Form Opens
  ↓
Current Image Shows
  ↓
Hover → "✏️ Edit Image" button appears
  ↓
Click Edit → Cropper opens inline
  ↓
Adjust & Apply
  ↓
Image updated in form
  ↓
Click "Update Architect" → Saved!
```

---

**Both architect forms now support full image editing!** 🚀

