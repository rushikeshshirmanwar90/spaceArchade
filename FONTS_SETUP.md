# Custom Fonts Integration Guide

## Overview
Four custom fonts have been integrated into different sections of the website to showcase them to your client.

## Font Distribution

### 1. Milara Font
- **Section**: Hero Section
- **Download**: https://www.dafont.com/milara.font
- **Applied to**: Main hero titles and descriptions
- **CSS Class**: `font-milara`

### 2. Apollo Font
- **Section**: Projects Section (Design Showcases)
- **Download**: https://www.dafont.com/apollo.font
- **Applied to**: Project titles, descriptions, categories, and section headings
- **CSS Class**: `font-apollo`

### 3. Driftune Font
- **Section**: Process Section (Our Design Process)
- **Download**: https://www.dafont.com/driftune.font
- **Applied to**: Process step titles, descriptions, and section headings
- **CSS Class**: `font-driftune`

### 4. Moonrising Font
- **Section**: Testimonials Section
- **Download**: https://www.dafont.com/moonrising.font
- **Applied to**: Testimonial text, client names, and section headings
- **CSS Class**: `font-moonrising`

## Installation Steps

1. **Download the fonts** from the links above
2. **Place font files** in the `public/fonts/` directory with these names:
   - `Milara.ttf` or `Milara.otf`
   - `Apollo.ttf` or `Apollo.otf`
   - `Driftune.ttf` or `Driftune.otf`
   - `Moonrising.ttf` or `Moonrising.otf`

3. **Font files are already configured** in `app/globals.css` with @font-face declarations

4. **Restart your development server** after adding the font files

## Testing

Visit your website and scroll through these sections to see each font in action:
- Hero Section → Milara
- Projects Section → Apollo
- Process Section → Driftune
- Testimonials Section → Moonrising

## Notes

- Fonts will fallback to system sans-serif if files are not found
- Make sure font file names match exactly (case-sensitive)
- Both .ttf and .otf formats are supported
- Fonts are loaded with `font-display: swap` for better performance
