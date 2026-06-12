'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, RotateCcw, Check, X } from 'lucide-react';

interface ImageCropperInlineProps {
  imageSrc: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export function ImageCropperInline({
  imageSrc,
  onCrop,
  onCancel,
  aspectRatio = 1,
}: ImageCropperInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleCrop = () => {
    try {
      const container = containerRef.current;
      if (!container) return;

      const canvas = document.createElement('canvas');
      // Match architect card aspect ratio (3:4)
      const cropWidth = 400;
      const cropHeight = 533;
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        try {
          // Set canvas background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Apply transformations
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(zoom, zoom);
          ctx.translate(offsetX / zoom, offsetY / zoom);
          ctx.translate(-img.width / 2, -img.height / 2);
          ctx.drawImage(img, 0, 0);
          ctx.restore();

          // Export using toBlob (safer than toDataURL)
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result as string;
                  onCrop(result);
                };
                reader.readAsDataURL(blob);
              }
            },
            'image/jpeg',
            0.95
          );
        } catch (error) {
          console.error('Error during crop:', error);
          alert('Error processing image. Please try again.');
        }
      };

      img.onerror = () => {
        console.error('Failed to load image');
        alert('Failed to load image');
      };

      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
    } catch (error) {
      console.error('Error in handleCrop:', error);
      alert('Error processing image. Please try again.');
    }
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50/30 space-y-6">
      {/* Large Preview Area */}
      <div
        ref={containerRef}
        className="relative w-full bg-black rounded-lg overflow-hidden cursor-move select-none shadow-lg"
        style={{
          aspectRatio: '3/4',
          minHeight: '500px',
          maxHeight: '700px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Crop box outline - 3:4 aspect ratio */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white z-20 pointer-events-none shadow-lg"
          style={{
            aspectRatio: '3/4',
            width: '80%',
            height: '80%',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Corner guides */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white"></div>
        </div>

        {/* Image with transformations */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          <img
            src={imageSrc}
            alt="Crop preview"
            className="max-w-4xl max-h-4xl pointer-events-none"
            crossOrigin="anonymous"
            style={{
              userSelect: 'none',
            }}
          />
        </div>

        {/* Help text */}
        <div className="absolute bottom-4 left-4 right-4 z-30 text-white text-xs opacity-70">
          <p>Click & drag to move • Use sliders to zoom & rotate</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        {/* Zoom Control */}
        <div className="bg-white/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ZoomOut className="h-4 w-4 text-foreground" />
              <label className="text-sm font-semibold text-foreground">
                Zoom: {(zoom * 100).toFixed(0)}%
              </label>
              <ZoomIn className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">(0.5x - 3x)</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            min={0.5}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Rotation Control */}
        <div className="bg-white/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Rotate: {rotation}°
            </label>
            <span className="text-xs text-muted-foreground">(0° - 360°)</span>
          </div>
          <Slider
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0])}
            min={0}
            max={360}
            step={15}
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-blue-200">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="flex-1 py-2"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 py-2"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleCrop}
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="h-4 w-4 mr-2" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
}
