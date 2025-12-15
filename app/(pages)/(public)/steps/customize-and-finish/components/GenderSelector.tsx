
import { playMagicSound } from '@/app/utils/audio';
import React from 'react';

interface GenderSelectorProps {
  value: 'boy' | 'girl';
  onChange: (val: 'boy' | 'girl') => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
  
  const handleSelect = (gender: 'boy' | 'girl') => {
    playMagicSound();
    onChange(gender);
  };

  return (
    <div className="flex flex-col w-full h-full">
       <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 text-center md:text-left">Hero's Gender</label>
       
       <div className="grid grid-cols-2 gap-4 h-full">
          
          {/* BOY OPTION */}
          <button
            type="button"
            onClick={() => handleSelect('boy')}
            className={`
                relative h-20 md:h-24 rounded-2xl border-2 transition-all duration-300 flex flex-row items-center justify-center gap-3 group overflow-hidden
                ${value === 'boy' 
                    ? 'border-blue-400 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.02] z-10' 
                    : 'border-white/10 bg-black/30 hover:bg-blue-900/20 hover:border-blue-500/30 opacity-70 hover:opacity-100'
                }
            `}
          >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 ${value === 'boy' ? 'bg-white text-blue-600' : 'bg-white/10 text-gray-400'}`}>
                  <i className="fa-solid fa-mars"></i>
              </div>
              
              <span className={`text-sm md:text-lg font-black uppercase tracking-widest ${value === 'boy' ? 'text-white drop-shadow-md' : 'text-gray-400'}`}>
                  Boy
              </span>

              {value === 'boy' && (
                  <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm animate-bounce-slow">
                      <i className="fa-solid fa-check"></i>
                  </div>
              )}
          </button>

          {/* GIRL OPTION */}
          <button
            type="button"
            onClick={() => handleSelect('girl')}
            className={`
                relative h-20 md:h-24 rounded-2xl border-2 transition-all duration-300 flex flex-row items-center justify-center gap-3 group overflow-hidden
                ${value === 'girl' 
                    ? 'border-pink-400 bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-[1.02] z-10' 
                    : 'border-white/10 bg-black/30 hover:bg-pink-900/20 hover:border-pink-500/30 opacity-70 hover:opacity-100'
                }
            `}
          >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 ${value === 'girl' ? 'bg-white text-pink-600' : 'bg-white/10 text-gray-400'}`}>
                  <i className="fa-solid fa-venus"></i>
              </div>
              
              <span className={`text-sm md:text-lg font-black uppercase tracking-widest ${value === 'girl' ? 'text-white drop-shadow-md' : 'text-gray-400'}`}>
                  Girl
              </span>

              {value === 'girl' && (
                  <div className="absolute top-2 right-2 bg-white text-pink-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm animate-bounce-slow">
                      <i className="fa-solid fa-check"></i>
                  </div>
              )}
          </button>

       </div>
    </div>
  );
};
