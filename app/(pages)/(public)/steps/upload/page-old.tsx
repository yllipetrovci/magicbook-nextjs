
'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/Button';
import { playMagicSound } from '@/app/utils/audio';
import { PhotoGuide } from '@/app/components/photo-upload/PhotoGuide';
import { UploadCard } from '@/app/components/photo-upload/UploadCard';

interface PhotoUploadSectionProps {
  heroName: string;
  includeParent: boolean;
  relationship: string;
  initialHeroImage?: string | null;
  initialParentImage?: string | null;
  onHeroImageUpdate: (image: string) => void;
  onParentImageUpdate: (image: string) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

/**
 * Optimizes an image file by converting it to WebP with 80% lossy compression.
 */
const optimizeImage = (file: File | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/webp', 0.8));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    if (typeof file === 'string') {
      img.src = file;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => (img.src = e.target?.result as string);
      reader.readAsDataURL(file);
    }
  });
};

/**
 * Captures the current visual state of the crop UI and renders it to a 4:3 canvas.
 */
const performMagicCrop = (
    imageSrc: string, 
    zoom: number, 
    pos: { x: number, y: number }
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject();

            // Target aspect ratio is 4:3
            const targetWidth = 800;
            const targetHeight = 600;
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // Fill background with black (for any gaps)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            // Logic to calculate how to draw the "contained" image with zoom and pan
            const imgAspect = img.width / img.height;
            const containerAspect = targetWidth / targetHeight;

            let drawW, drawH;
            if (imgAspect > containerAspect) {
                drawW = targetWidth;
                drawH = targetWidth / imgAspect;
            } else {
                drawH = targetHeight;
                drawW = targetHeight * imgAspect;
            }

            // Apply Zoom
            const finalW = drawW * zoom;
            const finalH = drawH * zoom;

            // Center + Panning
            // Note: Since the visual UI uses CSS transforms on a 4:3 container, 
            // we map the pixel offsets relative to the container size.
            const centerX = targetWidth / 2;
            const centerY = targetHeight / 2;
            
            // We draw from the center point, applying the pan offset
            ctx.drawImage(
                img, 
                centerX - (finalW / 2) + pos.x, 
                centerY - (finalH / 2) + pos.y, 
                finalW, 
                finalH
            );

            resolve(canvas.toDataURL('image/webp', 0.8));
        };
        img.src = imageSrc;
    });
};

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  heroName,
  includeParent,
  relationship,
  initialHeroImage,
  initialParentImage,
  onHeroImageUpdate,
  onParentImageUpdate,
  onBack,
  onNext,
  onSkip
}) => {
  const [heroPreview, setHeroPreview] = useState<string | null>(initialHeroImage || null);
  const [parentPreview, setParentPreview] = useState<string | null>(initialParentImage || null);
  
  const [processingTarget, setProcessingTarget] = useState<'hero' | 'parent' | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [cropMode, setCropMode] = useState<'hero' | 'parent' | null>(null);
  
  // Crop State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const processFile = async (file: File, target: 'hero' | 'parent') => {
    setProcessingTarget(target);
    try {
      const optimizedImage = await optimizeImage(file);
      if (target === 'hero') {
        setHeroPreview(optimizedImage);
        onHeroImageUpdate(optimizedImage);
      } else {
        setParentPreview(optimizedImage);
        onParentImageUpdate(optimizedImage);
      }
    } catch (error) {
      console.error("Processing failed:", error);
      alert("Oops! Magic failed. Try another photo.");
    } finally {
      setProcessingTarget(null);
    }
  };

  const startCrop = (target: 'hero' | 'parent') => {
      setCropMode(target);
      setZoomLevel(1);
      setCropPos({ x: 0, y: 0 });
  };

  const saveCrop = async () => {
      if (!cropMode) return;
      const target = cropMode;
      const originalImage = target === 'hero' ? heroPreview : parentPreview;
      
      if (originalImage) {
          setProcessingTarget(target);
          setCropMode(null); // Close UI
          try {
              const cropped = await performMagicCrop(originalImage, zoomLevel, cropPos);
              if (target === 'hero') {
                  setHeroPreview(cropped);
                  onHeroImageUpdate(cropped);
              } else {
                  setParentPreview(cropped);
                  onParentImageUpdate(cropped);
              }
          } catch (e) {
              console.error("Crop failed", e);
          } finally {
              setProcessingTarget(null);
          }
      }
  };

  const cancelCrop = () => {
      setCropMode(null);
  };

  // --- Drag & Pan Handlers ---
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      setDragStart({ x: clientX - cropPos.x, y: clientY - cropPos.y });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      setCropPos({
          x: clientX - dragStart.x,
          y: clientY - dragStart.y
      });
  };

  const handleDragEnd = () => {
      setIsDragging(false);
  };

  return (
    <div className={`w-full ${includeParent ? 'max-w-4xl' : 'max-w-xl'} animate-slide-up-fade`}>
      <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
        {includeParent ? `Let's see ${heroName} & ${relationship}'s smiles! 📸` : `Let's see ${heroName}'s magical smile! 📸`}
      </h2>
      <p className="text-xl text-gray-400 text-center mb-6">
         {includeParent ? "Upload photos to create your magical avatars." : "We'll use a sprinkle of AI dust to transform this photo into a storybook character."}
      </p>
      
      <div className="flex justify-center mb-6">
          <button onClick={() => setShowGuide(!showGuide)} className="text-sm font-bold text-magic-blue hover:text-white flex items-center gap-2 transition-colors">
              <i className="fa-solid fa-circle-info"></i> {showGuide ? "Hide Photo Tips" : "See Example Photos"}
          </button>
      </div>

      {showGuide && <PhotoGuide />}

      <div className={`grid grid-cols-1 ${includeParent ? 'md:grid-cols-2' : ''} gap-6`}>
          <UploadCard 
              label={heroName}
              icon="fa-solid fa-user-astronaut"
              iconColor="text-magic-orange"
              image={heroPreview}
              isProcessing={processingTarget === 'hero'}
              isCropping={cropMode === 'hero'}
              zoomLevel={zoomLevel}
              cropPos={cropPos}
              isDragging={isDragging}
              onFileSelect={(file) => processFile(file, 'hero')}
              onCropStart={() => startCrop('hero')}
              onCropSave={saveCrop}
              onCropCancel={cancelCrop}
              onZoomChange={setZoomLevel}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
          />

          {includeParent && (
              <UploadCard 
                  label={relationship}
                  icon="fa-solid fa-user-group"
                  iconColor="text-magic-purple"
                  image={parentPreview}
                  isProcessing={processingTarget === 'parent'}
                  isCropping={cropMode === 'parent'}
                  zoomLevel={zoomLevel}
                  cropPos={cropPos}
                  isDragging={isDragging}
                  onFileSelect={(file:any) => processFile(file, 'parent')}
                  onCropStart={() => startCrop('parent')}
                  onCropSave={saveCrop}
                  onCropCancel={cancelCrop}
                  onZoomChange={setZoomLevel}
                  onDragStart={handleDragStart}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
              />
          )}
      </div>

      <div className="flex gap-4 mt-8 max-w-lg mx-auto">
          <Button variant="ghost" onClick={onBack} disabled={processingTarget !== null || cropMode !== null} className="flex-1 text-gray-400 hover:text-white">Back</Button>
          
          {heroPreview ? (
              <Button 
                  onClick={() => { playMagicSound(); onNext(); }} 
                  className="flex-[2] shadow-lg shadow-green-500/20 bg-magic-green hover:bg-green-600" 
                  size="lg"
                  disabled={processingTarget !== null || cropMode !== null}
              >
                  Continue <i className="fa-solid fa-check ml-2"></i>
              </Button>
          ) : (
                <Button 
                  onClick={() => { playMagicSound(); onSkip(); }} 
                  className="flex-[2] shadow-lg shadow-white/10 bg-white/10 hover:bg-white/20" 
                  size="lg"
                  disabled={processingTarget !== null || cropMode !== null}
              >
                  Skip Photo <i className="fa-solid fa-arrow-right ml-2"></i>
              </Button>
          )}
      </div>
    </div>
  );
};

export default PhotoUploadSection;
