# ⚡ Quick Update: New Button Layout

## What Changed

**Old Layout:**
```
← Hover over image →
✏️ Edit Image  |  🗑️ Remove  |  ↔️ Change Image
```

**New Layout:**
```
← Hover over image →
↔️ Change Image  |  🗑️ Remove  |  ✏️ Edit Image
```

---

## How to Update

### Step 1: Find the Image Section
In `components/admin/edit-modal.tsx`, find the image section for architect forms (both `newArchitect` and `architect`)

Look for:
```typescript
{editedItem.image && !showImageCropper ? (
  <div className="mt-2 space-y-3">
    <div className="relative group">
      {/* ... image preview ... */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 ...">
        {/* REPLACE THIS BUTTON SECTION */}
      </div>
    </div>
  </div>
```

### Step 2: Copy New Button Code
Replace just the hover buttons section with the new code from `UPDATED_ARCHITECT_FORMS_BUTTON_LAYOUT.tsx`

The new section has:
- **LEFT:** Change Image (Blue)
- **CENTER:** Remove (Red)  
- **RIGHT:** Edit Image (Green)

### Step 3: Apply to Both Forms
Update BOTH:
- `if (item.type === 'newArchitect')` form
- `if (item.type === 'architect')` form

### Step 4: Test
Hover over an image and verify button order is:
```
Change Image | Remove | Edit Image
```

---

## Visual Result

### Before:
```
┌─────────────────────────────────┐
│ [Image Preview]                 │
│ ✏️ Edit  🗑️ Remove  ↔️ Change  │  (on hover)
└─────────────────────────────────┘
```

### After:
```
┌─────────────────────────────────┐
│ [Image Preview]                 │
│ ↔️ Change  🗑️ Remove  ✏️ Edit  │  (on hover)
└─────────────────────────────────┘
```

---

## Code Changes Summary

| Part | Changed | Details |
|------|---------|---------|
| Left Button | ✏️ Edit → ↔️ Change | Moved Change to left |
| Center Button | 🗑️ Remove | Stayed in center |
| Right Button | ↔️ Change → ✏️ Edit | Moved Edit to right |
| Layout | Same | Still uses `justify-between` |
| Colors | Same | Blue, Red, Green |

---

## Files to Update

```
edit-modal.tsx
├── newArchitect section
│   └── Replace image hover buttons
│
└── architect section
    └── Replace image hover buttons
```

---

## Copy & Paste Locations

**Find in edit-modal.tsx:**
```typescript
{/* LEFT: Edit Image (Green) */}
<label
  htmlFor="crop-edit-input"
```

**Replace with:**
```typescript
{/* LEFT: Change Image (Blue) */}
<label
  htmlFor="change-image-input"
```

And so on for other buttons.

---

## ✅ Verification

After update, hovering over architect image shows:

```
[Change Image] [Remove] [Edit Image]
   (Blue)       (Red)     (Green)
```

Perfect! ✨

---

## Time to Update

- **Copy code:** 1 minute
- **Find sections:** 1 minute
- **Replace both forms:** 2 minutes
- **Test:** 1 minute
- **Total:** ~5 minutes

---

**That's it! New button layout is live!** 🚀

