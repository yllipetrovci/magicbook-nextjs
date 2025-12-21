
import React from 'react';

interface SelectionCardProps {
  id: string;
  label: string;
  desc: string;
  icon?: string;
  image?: string;
  isSelected: boolean;
  activeColor: 'purple' | 'blue' | 'orange' | 'pink';
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  label,
  desc,
  icon,
  image,
  isSelected,
  activeColor,
  onClick
}) => {
  const colors = {
    purple: 'border-magic-purple bg-magic-purple/10 shadow-purple-500/20',
    blue: 'border-magic-blue bg-magic-blue/10 shadow-blue-500/20',
    orange: 'border-magic-orange bg-magic-orange/10 shadow-orange-500/20',
    pink: 'border-magic-pink bg-magic-pink/10 shadow-pink-500/20'
  };

  const textColors = {
    purple: 'text-magic-purple',
    blue: 'text-magic-blue',
    orange: 'text-magic-orange',
    pink: 'text-magic-pink'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col text-left rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 group
        ${isSelected 
          ? `${colors[activeColor]} scale-[1.02]` 
          : 'border-white/5 bg-magic-card/50 hover:border-white/20 hover:bg-magic-card'}
      `}
    >
      {image && (
        <div className="w-full aspect-video overflow-hidden relative">
          <img 
            src={image} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-105 opacity-60'}`} 
            alt={label} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          {isSelected && (
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow bg-magic-${activeColor}`}>
              <i className="fa-solid fa-check text-white"></i>
            </div>
          )}
        </div>
      )}

      <div className={`p-5 md:p-6 flex flex-col flex-1 ${!image ? 'items-start' : ''}`}>
        {icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${isSelected ? `bg-magic-${activeColor} text-white shadow-lg` : 'bg-white/5 text-gray-500'}`}>
            <i className={`fa-solid ${icon} text-lg`}></i>
          </div>
        )}
        
        <h3 className={`font-black text-lg mb-1 transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
          {label}
        </h3>
        
        <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
        
        <div className={`mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isSelected ? textColors[activeColor] : 'text-gray-600'}`}>
          {isSelected ? <><i className="fa-solid fa-circle-check"></i> Selected</> : <><i className="fa-solid fa-play"></i> Tap to Pick</>}
        </div>
      </div>
    </button>
  );
};
