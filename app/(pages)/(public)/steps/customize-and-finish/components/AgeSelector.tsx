
import { playMagicSound } from '@/app/utils/audio';
import React from 'react';

interface AgeSelectorProps {
  value: number;
  onChange: (val: number) => void;
}

export const AgeSelector: React.FC<AgeSelectorProps> = ({ value, onChange }) => {
  const handleDecrement = () => {
    if (value > 1) {
      playMagicSound();
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < 12) {
      playMagicSound();
      onChange(value + 1);
    }
  };

  const getAgeLabel = (age: number) => {
    if (age <= 3) return "Tiny Tot";
    if (age <= 5) return "Little Dreamer";
    if (age <= 8) return "Young Explorer";
    return "Master Wizard";
  };

  return (
    <div className="flex flex-col w-full h-full">
       <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 text-center md:text-left">Child's Age</label>
       <div className="flex-1 flex items-center justify-between bg-black/20 rounded-2xl border border-white/10 p-4">
          <button 
            type="button"
            onClick={handleDecrement}
            disabled={value <= 1}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all active:scale-95 border border-white/5"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          
          <div className="text-center w-24">
             <div className="text-5xl font-black text-white drop-shadow-lg leading-none mb-1">{value}</div>
             <div className="text-[10px] font-bold text-magic-blue uppercase tracking-wide">{getAgeLabel(value)}</div>
          </div>

          <button 
            type="button"
            onClick={handleIncrement}
            disabled={value >= 12}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all active:scale-95 border border-white/5"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
       </div>
    </div>
  );
};
