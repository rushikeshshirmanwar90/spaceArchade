#!/bin/bash

# Font Setup Verification Script
echo "================================"
echo "Custom Fonts Setup Verification"
echo "================================"
echo ""

# Check if fonts directory exists
if [ ! -d "public/fonts" ]; then
    echo "✗ public/fonts directory not found"
    echo "  Creating directory..."
    mkdir -p public/fonts
    echo "✓ Directory created"
else
    echo "✓ public/fonts directory exists"
fi

echo ""
echo "Checking for font files..."
echo ""

# Check each font
fonts=("Milara" "Apollo" "Driftune" "Moonrising")
missing_fonts=()

for font in "${fonts[@]}"; do
    if [ -f "public/fonts/${font}.ttf" ] || [ -f "public/fonts/${font}.otf" ]; then
        echo "✓ ${font} font found"
    else
        echo "✗ ${font} font missing"
        missing_fonts+=("$font")
    fi
done

echo ""
if [ ${#missing_fonts[@]} -eq 0 ]; then
    echo "================================"
    echo "✓ All fonts are installed!"
    echo "================================"
    echo ""
    echo "You can now run: npm run dev (or pnpm dev)"
else
    echo "================================"
    echo "Missing fonts: ${#missing_fonts[@]}"
    echo "================================"
    echo ""
    echo "Please download the following fonts:"
    echo ""
    for font in "${missing_fonts[@]}"; do
        case $font in
            "Milara")
                echo "• Milara: https://www.dafont.com/milara.font"
                ;;
            "Apollo")
                echo "• Apollo: https://www.dafont.com/apollo.font"
                ;;
            "Driftune")
                echo "• Driftune: https://www.dafont.com/driftune.font"
                ;;
            "Moonrising")
                echo "• Moonrising: https://www.dafont.com/moonrising.font"
                ;;
        esac
    done
    echo ""
    echo "After downloading:"
    echo "1. Extract the font files (.ttf or .otf)"
    echo "2. Rename them to match: ${missing_fonts[@]}.ttf (or .otf)"
    echo "3. Place them in the public/fonts/ directory"
    echo "4. Run this script again to verify"
fi

echo ""
