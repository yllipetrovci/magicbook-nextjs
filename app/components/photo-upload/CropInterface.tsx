
import React from 'react';

interface CropInterfaceProps {
  image: string;
  zoomLevel: number;
  cropPos: { x: number; y: number };
  isDragging: boolean;
  onZoomChange: (zoom: number) => void;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragEnd: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const CropInterface: React.FC<CropInterfaceProps> = ({
  image,
  zoomLevel,
  cropPos,
  isDragging,
  onZoomChange,
  onDragStart,
  onDragMove,
  onDragEnd,
  onCancel,
  onSave
}) => {
  return (
    <div className="w-full aspect-[4/3] rounded-2xl bg-black flex flex-col items-center justify-center relative overflow-hidden border-2 border-magic-blue">
        <div 
          className={`w-full h-full relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
            {/* Using object-contain ensures the full photo is visible initially. 
                Users can zoom in to fill the frame if desired. */}
            <img 
              src={image} 
              alt="Crop Preview" 
              className={`w-full h-full object-contain transition-transform ${isDragging ? 'duration-0' : 'duration-100'} ease-linear origin-center relative z-10`}
              style={{ transform: `translate3d(${cropPos.x}px, ${cropPos.y}px, 0) scale(${zoomLevel})` }} 
              draggable={false}
            />
            
            {/* Darker background behind the contained image */}
            <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 border-2 border-white/30 grid grid-cols-3 grid-rows-3 pointer-events-none z-20">
                <div className="border-r border-white/20"></div><div className="border-r border-white/20"></div><div></div>
                <div className="border-r border-white/20 border-t border-white/20"></div><div className="border-r border-white/20 border-t border-white/20"></div><div className="border-t border-white/20"></div>
                <div className="border-r border-white/20 border-t border-white/20"></div><div className="border-r border-white/20 border-t border-white/20"></div><div className="border-t border-white/20"></div>
            </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 z-30 shadow-2xl border border-white/10">
            <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 pointer-events-none">Drag to Adjust Magic Framing</div>
            <div className="flex items-center gap-3">
                <i className="fa-solid fa-magnifying-glass-minus text-gray-500 text-xs"></i>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4" 
                  step="0.01" 
                  value={zoomLevel} 
                  onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-magic-blue"
                />
                <i className="fa-solid fa-magnifying-glass-plus text-white text-xs"></i>
            </div>
            <div className="flex gap-2 mt-1">
                <button onClick={onCancel} className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 rounded-lg">Cancel</button>
                <button onClick={onSave} className="flex-1 py-2 text-xs font-bold bg-magic-blue rounded-lg text-white hover:bg-blue-600 shadow-lg transition-all active:scale-95">Save View</button>
            </div>
        </div>
    </div>
  );
};
