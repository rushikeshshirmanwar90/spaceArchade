'use client';

import { useState, useRef, useEffect } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Enable CORS
    img.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = img.src;
        setImageLoaded(true);
        drawCanvas();
      }
    };
    img.onerror = () => {
      console.error('Failed to load image');
      // Fallback: try loading without CORS
      if (imageRef.current) {
        imageRef.current.src = imageSrc;
        setImageLoaded(true);
        drawCanvas();
      }
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [zoom, rotation, offset, imageLoaded]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Save context
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(-image.width / 2 + offset.x / zoom, -image.height / 2 + offset.y / zoom);
    ctx.drawImage(image, 0, 0);
    ctx.restore();

    // Draw crop box
    const cropSize = Math.min(width, height) * 0.65;
    const cropX = (width - cropSize) / 2;
    const cropY = (height - cropSize) / 2;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropSize, cropSize);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(cropX, cropY, cropSize, cropSize);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !imageLoaded) return;

    try {
      const cropCanvas = document.createElement('canvas');
      const cropSize = Math.min(canvas.width, canvas.height) * 0.65;
      cropCanvas.width = cropSize;
      cropCanvas.height = cropSize;

      const ctx = cropCanvas.getContext('2d');
      if (!ctx) return;

      // Set crossOrigin for the crop canvas too
      ctx.save();
      ctx.translate(cropSize / 2, cropSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.translate(-image.width / 2 + offset.x / zoom, -image.height / 2 + offset.y / zoom);
      ctx.drawImage(image, 0, 0);
      ctx.restore();

      // Export as blob first, then convert to data URL (handles CORS better)
      cropCanvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const croppedImage = e.target?.result as string;
              onCrop(croppedImage);
            };
            reader.readAsDataURL(blob);
          }
        },
        'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Error cropping image:', error);
      // Fallback: Try direct toDataURL
      try {
        const cropCanvas = document.createElement('canvas');
        const cropSize = Math.min(canvas.width, canvas.height) * 0.65;
        cropCanvas.width = cropSize;
        cropCanvas.height = cropSize;

        const ctx = cropCanvas.getContext('2d');
        if (!ctx) return;

        ctx.save();
        ctx.translate(cropSize / 2, cropSize / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);
        ctx.translate(-image.width / 2 + offset.x / zoom, -image.height / 2 + offset.y / zoom);
        ctx.drawImage(image, 0, 0);
        ctx.restore();

        const croppedImage = cropCanvas.toDataURL('image/jpeg', 0.95);
        onCrop(croppedImage);
      } catch (fallbackError) {
        console.error('Fallback crop failed:', fallbackError);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  if (!imageLoaded) {
    return (
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50/30 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading image...</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50/30 space-y-4">
      <div className="bg-black rounded-lg overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-move"
        />
        <img
          ref={imageRef}
          alt="Crop"
          style={{ display: 'none' }}
          crossOrigin="anonymous"
        />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-foreground">Zoom: {(zoom * 100).toFixed(0)}%</label>
            <div className="flex gap-1">
              <ZoomOut className="h-3 w-3 text-muted-foreground" />
              <ZoomIn className="h-3 w-3 text-muted-foreground" />
            </div>
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-foreground">Rotate: {rotation}°</label>
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

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex-1"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="flex-1"
        >
          <X className="h-3 w-3 mr-1" />
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleCrop}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Check className="h-3 w-3 mr-1" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
}
