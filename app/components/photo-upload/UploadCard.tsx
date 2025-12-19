
import React, { useRef } from 'react';
import { CropInterface } from './CropInterface';

interface UploadCardProps {
  label: string;
  icon: string; // e.g. "fa-solid fa-user"
  iconColor: string; // e.g. "text-magic-orange"
  image: string | null;
  isProcessing: boolean;
  isCropping: boolean;
  // Cropping State
  zoomLevel: number;
  cropPos: { x: number; y: number };
  isDragging: boolean;
  // Actions
  onFileSelect: (file: File) => void;
  onCropStart: () => void;
  onCropSave: () => void;
  onCropCancel: () => void;
  onZoomChange: (val: number) => void;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragEnd: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  label,
  icon,
  iconColor,
  image,
  isProcessing,
  isCropping,
  zoomLevel,
  cropPos,
  isDragging,
  onFileSelect,
  onCropStart,
  onCropSave,
  onCropCancel,
  onZoomChange,
  onDragStart,
  onDragMove,
  onDragEnd
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden flex flex-col">
        <h3 className="text-white font-bold mb-4 text-center text-xl flex items-center justify-center gap-2">
            <i className={`${icon} ${iconColor}`}></i> {label}
        </h3>

        {/* STATE: PROCESSING */}
        {isProcessing && (
            <div className="w-full aspect-[4/3] rounded-2xl bg-black/50 flex flex-col items-center justify-center border-4 border-magic-purple/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/20 via-transparent to-magic-blue/20 animate-pulse"></div>
                <div className="w-24 h-24 mb-6 relative">
                    <i className="fa-solid fa-wand-magic-sparkles text-6xl text-magic-purple absolute inset-0 animate-wiggle z-10"></i>
                    <i className="fa-solid fa-star text-3xl text-yellow-400 absolute -top-2 -right-2 animate-spin-slow"></i>
                </div>
                <p className="text-magic-purple font-bold">Scanning...</p>
            </div>
        )}

        {/* STATE: CROPPING */}
        {!isProcessing && isCropping && image && (
            <CropInterface
                image={image}
                zoomLevel={zoomLevel}
                cropPos={cropPos}
                isDragging={isDragging}
                onZoomChange={onZoomChange}
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                onCancel={onCropCancel}
                onSave={onCropSave}
            />
        )}

        {/* STATE: PREVIEW OR EMPTY */}
        {!isProcessing && !isCropping && (
            <div 
                onClick={() => !image && fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`w-full aspect-[4/3] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${image ? 'border-magic-green/50 bg-black' : 'border-white/10 hover:border-magic-orange/50 hover:bg-white/5'}`}
            >
                {image ? (
                    <>
                        <img 
                          src={image} 
                          alt={label} 
                          className="w-full h-full object-contain relative z-10 transition-all duration-300 group-hover:opacity-60" 
                        />
                        {/* Background for contain letterboxing */}
                        <div className="absolute inset-0 bg-black/40 z-0"></div>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2 z-20">
                            <button onClick={(e) => { e.stopPropagation(); onCropStart(); }} className="bg-magic-blue px-4 py-2 rounded-full text-white font-bold shadow-xl border border-white/20 hover:bg-blue-600 transition-colors w-32">
                                <i className="fa-solid fa-crop-simple mr-2"></i> Crop
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold shadow-xl border border-white/20 hover:bg-black/70 transition-colors w-32">
                                <i className="fa-solid fa-camera mr-2"></i> Change
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-magic-surface rounded-full flex items-center justify-center text-3xl text-gray-500 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <p className="text-lg font-bold text-white mb-1">Upload Photo</p>
                    </>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleInputChange} 
                    accept="image/*" 
                    className="hidden" 
                />
            </div>
        )}
    </div>
  );
};
