
import React from 'react';
import { playMagicSound } from '@/app/utils/audio';

interface PageCountSelectorProps {
  value: number;
  onChange: (val: number) => void;
}

const OPTIONS = [
    { count: 4, label: 'Short', color: 'bg-blue-500' },
    { count: 6, label: 'Standard', color: 'bg-green-500' },
    { count: 8, label: 'Long', color: 'bg-yellow-500' },
    { count: 10, label: 'Epic', color: 'bg-orange-500' },
    { count: 12, label: 'Novel', color: 'bg-purple-500' },
];

export const PageCountSelector: React.FC<PageCountSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
       <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 text-center md:text-left">Story Length</label>
       <div className="grid grid-cols-5 gap-2 h-full">
          {OPTIONS.map((opt) => {
              const isSelected = value === opt.count;
              return (
                  <button
                    key={opt.count}
                    type="button"
                    onClick={() => { playMagicSound(); onChange(opt.count); }}
                    className={`
                        relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-300 min-h-[80px]
                        ${isSelected 
                            ? `${opt.color} border-white/50 shadow-lg scale-110 z-10` 
                            : 'bg-black/20 border-white/5 hover:bg-white/10 hover:border-white/20'
                        }
                    `}
                  >
                      <span className={`text-xl font-black leading-none ${isSelected ? 'text-white' : 'text-gray-300'}`}>{opt.count}</span>
                      <span className={`text-[8px] font-bold uppercase mt-1 ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>{opt.label}</span>
                      
                      {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-white text-black w-4 h-4 flex items-center justify-center rounded-full shadow-md text-[8px]">
                              <i className="fa-solid fa-check"></i>
                          </div>
                      )}
                  </button>
              );
          })}
       </div>
    </div>
  );
};
