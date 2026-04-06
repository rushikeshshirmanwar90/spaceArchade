# Step-by-Step Font Download Guide

## Quick Links
Open these links in your browser to download the fonts:

1. **Milara**: https://www.dafont.com/milara.font
2. **Apollo**: https://www.dafont.com/apollo.font
3. **Driftune**: https://www.dafont.com/driftune.font
4. **Moonrising**: https://www.dafont.com/moonrising.font

## Download Instructions

### For Each Font:

1. **Click the link** above to open the font page on DaFont
2. **Click the "Download" button** (usually on the right side)
3. **Extract the ZIP file** that downloads
4. **Find the font file** inside (look for `.ttf` or `.otf` files)
5. **Rename the file** to match the exact name:
   - `Milara.ttf` (or `Milara.otf`)
   - `Apollo.ttf` (or `Apollo.otf`)
   - `Driftune.ttf` (or `Driftune.otf`)
   - `Moonrising.ttf` (or `Moonrising.otf`)
6. **Move the file** to: `public/fonts/` directory in your project

## After Downloading All Fonts

Run the verification script:
```bash
./setup-fonts.sh
```

If all fonts are found, restart your development server:
```bash
pnpm dev
```

## Where to See Each Font

Once the server is running, visit http://localhost:3000 and scroll through:

- **Hero Section** (top of page) → Milara font
- **Design Showcases** (projects) → Apollo font
- **Our Design Process** → Driftune font
- **Client Testimonials** → Moonrising font

## Troubleshooting

### Font not displaying?
1. Check the file name matches exactly (case-sensitive)
2. Make sure the file is in `public/fonts/` directory
3. Restart your development server
4. Clear browser cache (Cmd+Shift+R on Mac)

### Can't find the font file after extracting?
- Look for files ending in `.ttf`, `.otf`, or `.woff`
- Some fonts may be in subfolders within the ZIP
- Use the largest/main font file if multiple versions exist

### Still having issues?
Run the verification script to see which fonts are missing:
```bash
./setup-fonts.sh
```
