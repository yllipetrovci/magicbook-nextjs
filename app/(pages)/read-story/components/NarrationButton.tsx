
import React from 'react';

interface NarrationButtonProps {
  isReading: boolean;
  onClick: () => void;
  variant?: 'large' | 'small' | 'floating';
  className?: string;
}

export const NarrationButton: React.FC<NarrationButtonProps> = ({ 
  isReading, 
  onClick, 
  variant = 'large',
  className = '' 
}) => {
  const baseStyles = "rounded-full border-2 transition-all duration-300 flex items-center justify-center transform active:scale-95";
  
  // Adjusted sizes and styles to match the cinematic (clapperboard) button exactly
  const variants = {
    large: `w-10 h-10 ${isReading ? 'bg-magic-orange border-magic-orange text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`,
    small: `w-10 h-10 ${isReading ? 'bg-magic-orange border-magic-orange text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`,
    floating: `w-9 h-9 border backdrop-blur-md ${isReading ? 'bg-magic-orange border-magic-orange text-white animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-black/50 hover:text-white hover:border-white/20'}`
  };

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      title={isReading ? "Stop Reading" : "Read Aloud"}
    >
      <i className={`fa-solid ${isReading ? 'fa-stop' : 'fa-volume-high'} text-xs`}></i>
    </button>
  );
};
