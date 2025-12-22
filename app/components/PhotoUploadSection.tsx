
import React, { useState } from 'react';
import { Button } from './Button';
import { playMagicSound } from '@/app/utils/audio';
import { PhotoGuide } from './photo-upload/PhotoGuide';
import { UploadCard } from './photo-upload/UploadCard';
import { useStory } from '@/app/contexts/StoryContext';

interface PhotoUploadSectionProps {
  heroName: string;
  includeParent: boolean;
  relationship: string;
  initialHeroImage?: string | null;
  initialParentImage?: string | null;
  onHeroImageUpdate: (optimized: string, original: string) => void;
  onParentImageUpdate: (optimized: string, original: string) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
}

/**
 * Universal optimization helper with configurable profiles.
 * For UI: maxDim 1200, quality 0.8
 * For AI: maxDim 640, quality 0.3 (aggressive reduction)
 */
const optimizeImage = (file: File | string, maxDim: number, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context failed'));

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = quality > 0.5 ? 'high' : 'medium';
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/webp', quality));
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
 * Renders the crop state to a specific quality profile.
 */
const performMagicCrop = (
    imageSrc: string, 
    zoom: number, 
    pos: { x: number, y: number },
    targetW: number,
    targetH: number,
    quality: number
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject();

            canvas.width = targetW;
            canvas.height = targetH;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, targetW, targetH);

            const imgAspect = img.width / img.height;
            const containerAspect = targetW / targetH;

            let drawW, drawH;
            if (imgAspect > containerAspect) {
                drawW = targetW;
                drawH = targetW / imgAspect;
            } else {
                drawH = targetH;
                drawW = targetH * imgAspect;
            }

            const finalW = drawW * zoom;
            const finalH = drawH * zoom;
            const centerX = targetW / 2;
            const centerY = targetH / 2;
            
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = quality > 0.5 ? 'high' : 'medium';
            ctx.drawImage(img, centerX - (finalW / 2) + pos.x, centerY - (finalH / 2) + pos.y, finalW, finalH);
            resolve(canvas.toDataURL('image/webp', quality));
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
  const { config } = useStory();
  const [heroPreview, setHeroPreview] = useState<string | null>(config.heroImageOriginal || initialHeroImage || null);
  const [parentPreview, setParentPreview] = useState<string | null>(config.parentImageOriginal || initialParentImage || null);
  
  const [processingTarget, setProcessingTarget] = useState<'hero' | 'parent' | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [cropMode, setCropMode] = useState<'hero' | 'parent' | null>(null);
  
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const processFile = async (file: File, target: 'hero' | 'parent') => {
    setProcessingTarget(target);
    try {
      // 1. Generate High-Res UI version (Crisp for Magic Recipe)
      const original = await optimizeImage(file, 1200, 0.8);
      // 2. Generate Low-Res AI version (Ultra tiny for backend processing)
      const optimized = await optimizeImage(file, 640, 0.3);

      if (target === 'hero') {
        setHeroPreview(original);
        onHeroImageUpdate(optimized, original);
      } else {
        setParentPreview(original);
        onParentImageUpdate(optimized, original);
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
      const sourceImage = target === 'hero' ? heroPreview : parentPreview;
      
      if (sourceImage) {
          setProcessingTarget(target);
          setCropMode(null);
          try {
              // 1. Crop UI version
              const croppedOriginal = await performMagicCrop(sourceImage, zoomLevel, cropPos, 800, 600, 0.8);
              // 2. Crop AI version (Smaller footprint)
              const croppedOptimized = await performMagicCrop(sourceImage, zoomLevel, cropPos, 512, 384, 0.3);

              if (target === 'hero') {
                  setHeroPreview(croppedOriginal);
                  onHeroImageUpdate(croppedOptimized, croppedOriginal);
              } else {
                  setParentPreview(croppedOriginal);
                  onParentImageUpdate(croppedOptimized, croppedOriginal);
              }
          } catch (e) {
              console.error("Crop failed", e);
          } finally {
              setProcessingTarget(null);
          }
      }
  };

  const cancelCrop = () => setCropMode(null);

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
      setCropPos({ x: clientX - dragStart.x, y: clientY - dragStart.y });
  };

  const handleDragEnd = () => setIsDragging(false);

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
                  onFileSelect={(file) => processFile(file, 'parent')}
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
                  className="flex-[2] shadow-lg shadow-white/10 bg-white/10" 
                  size="lg"
                  disabled
              >
                  Add a photo to continue
              </Button>
          )}
      </div>
    </div>
  );
};
