
import React, { useState } from 'react';
import { Button } from './Button';
import { playMagicSound } from '../utils/audio';
import { PhotoGuide } from './photo-upload/PhotoGuide';
import { UploadCard } from './photo-upload/UploadCard';

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

  const processFile = (file: File, target: 'hero' | 'parent') => {
    setProcessingTarget(target);
    // Simulate AI Magic Processing
    setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            if (target === 'hero') {
                setHeroPreview(result);
                onHeroImageUpdate(result);
            } else {
                setParentPreview(result);
                onParentImageUpdate(result);
            }
            setProcessingTarget(null);
        };
        reader.readAsDataURL(file);
    }, 1500); // 1.5s delay
  };

  const startCrop = (target: 'hero' | 'parent') => {
      setCropMode(target);
      setZoomLevel(1);
      setCropPos({ x: 0, y: 0 }); // Reset position
  };

  const saveCrop = () => {
      setCropMode(null);
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

  const handleContinue = () => {
      playMagicSound();
      onNext();
  };

  const handleSkipAction = () => {
      playMagicSound();
      onSkip();
  };

  return (
    <div className={`w-full ${includeParent ? 'max-w-4xl' : 'max-w-xl'} animate-slide-up-fade`}>
      <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
        {includeParent ? `Let's see ${heroName} & ${relationship}'s smiles! 📸` : `Let's see ${heroName}'s magical smile! 📸`}
      </h2>
      <p className="text-xl text-gray-400 text-center mb-6">
         {includeParent ? "Upload photos to create your magical avatars." : "We'll use a sprinkle of AI dust to transform this photo into a storybook character."}
      </p>
      
      {/* Photo Guide Toggle */}
      <div className="flex justify-center mb-6">
          <button onClick={() => setShowGuide(!showGuide)} className="text-sm font-bold text-magic-blue hover:text-white flex items-center gap-2 transition-colors">
              <i className="fa-solid fa-circle-info"></i> {showGuide ? "Hide Photo Tips" : "See Example Photos"}
          </button>
      </div>

      {showGuide && <PhotoGuide />}

      <div className={`grid grid-cols-1 ${includeParent ? 'md:grid-cols-2' : ''} gap-6`}>
          
          {/* Hero Upload Box */}
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

          {/* Parent Upload Box */}
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
                  onClick={handleContinue} 
                  className="flex-[2] shadow-lg shadow-green-500/20 bg-magic-green hover:bg-green-600" 
                  size="lg"
                  disabled={processingTarget !== null || cropMode !== null}
              >
                  Continue <i className="fa-solid fa-check ml-2"></i>
              </Button>
          ) : (
                <Button 
                  onClick={handleSkipAction} 
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
