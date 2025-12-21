
import React from 'react';

interface ReaderHeaderProps {
  title: string;
  currentPage: number;
  totalPages: number;
  isCover: boolean;
  isEnd: boolean;
  isFullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
  className?: string;
}

export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  title,
  currentPage,
  totalPages,
  isCover,
  isEnd,
  isFullscreen,
  onClose,
  onToggleFullscreen,
  className = ''
}) => {
  return (
    <div className={`w-full p-4 md:p-6 flex justify-between items-center  z-[210] bg-[#0B0C15] border-b border-white/10 ${className} mt-20`}>
      <div className="flex gap-4">
        {/* PROMINENT CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="w-12 h-12 rounded-full bg-white text-[#0B0C15] flex items-center justify-center hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] border-2 border-white transform active:scale-90"
          aria-label="Close reader"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        
        {/* FULLSCREEN BUTTON */}
        <button 
          onClick={onToggleFullscreen} 
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg backdrop-blur-md border border-white/20" 
          title="Toggle Fullscreen"
        >
          <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
        </button>
      </div>
      
      <div className="text-center flex-1 px-4">
        <h4 className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] mb-1">
          {!isCover && !isEnd ? `Chapter ${currentPage + 1} / ${totalPages}` : 'The Magic Book'}
        </h4>
        <p className="text-magic-orange font-black text-xs md:text-lg truncate max-w-[150px] sm:max-w-[300px] md:max-w-[500px] mx-auto drop-shadow-md uppercase tracking-wider">
          {title}
        </p>
      </div>

      {/* Responsive Spacer */}
      <div className="hidden sm:flex w-24"></div>
    </div>
  );
};
