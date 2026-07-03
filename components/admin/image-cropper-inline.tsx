'use client';

import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Loader2 } from 'lucide-react';

interface ImageCropperInlineProps {
  imageSrc: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    image.crossOrigin = 'anonymous';
    image.src = url;
  });
}

async function getCroppedImg(
  imageSrc: string,
  cropPixels: Area,
  rotation: number
): Promise<string> {
  const image = await createImage(imageSrc);
  const rotRad = (rotation * Math.PI) / 180;

  // Bounding box of the rotated image
  const bBoxWidth =
    Math.abs(Math.cos(rotRad) * image.width) +
    Math.abs(Math.sin(rotRad) * image.height);
  const bBoxHeight =
    Math.abs(Math.sin(rotRad) * image.width) +
    Math.abs(Math.cos(rotRad) * image.height);

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bBoxWidth);
  canvas.height = Math.round(bBoxHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  // Cap output size so the stored data URL stays reasonable
  const maxWidth = 900;
  const scale = Math.min(1, maxWidth / cropPixels.width);
  const outCanvas = document.createElement('canvas');
  outCanvas.width = Math.round(cropPixels.width * scale);
  outCanvas.height = Math.round(cropPixels.height * scale);
  const outCtx = outCanvas.getContext('2d');
  if (!outCtx) throw new Error('Canvas not supported');

  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);
  outCtx.drawImage(
    canvas,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    outCanvas.width,
    outCanvas.height
  );

  return new Promise((resolve, reject) => {
    outCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to export image'));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image'));
        reader.readAsDataURL(blob);
      },
      'image/jpeg',
      0.92
    );
  });
}

export function ImageCropperInline({
  imageSrc,
  onCrop,
  onCancel,
  aspectRatio = 3 / 4,
}: ImageCropperInlineProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCrop(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50/30 space-y-6">
      {/* Crop Area */}
      <div
        className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg"
        style={{ height: '500px' }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          showGrid
          zoomWithScroll
        />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Drag to move • Scroll or use the slider to zoom • The framed area is exactly what gets saved
      </p>

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
            <span className="text-xs text-muted-foreground">(1x - 3x)</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            min={1}
            max={3}
            step={0.05}
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
            step={1}
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
          disabled={isProcessing}
          className="flex-1 py-2"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 py-2"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleApplyCrop}
          disabled={isProcessing || !croppedAreaPixels}
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Apply Crop
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
