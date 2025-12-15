
import { playMagicSound } from '@/app/utils/audio';
import React, { useState, useEffect } from 'react';

interface CompanionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label: string;
  placeholder: string;
}

const COMPANION_OPTIONS = [
  { id: 'dog', label: 'Dog', text: 'a loyal puppy named Spot', img: 'https://image.pollinations.ai/prompt/cute%20magical%20golden%20retriever%20puppy%20pixar%20style%20soft%20lighting?width=600&height=600&nologo=true' },
  { id: 'cat', label: 'Cat', text: 'a clever cat named Whiskers', img: 'https://image.pollinations.ai/prompt/cute%20magical%20kitten%20with%20big%20eyes%20pixar%20style?width=600&height=600&nologo=true' },
  { id: 'dragon', label: 'Dragon', text: 'a friendly tiny dragon', img: 'https://image.pollinations.ai/prompt/cute%20baby%20dragon%20green%20scales%20pixar%20style?width=600&height=600&nologo=true' },
  { id: 'unicorn', label: 'Unicorn', text: 'a sparkling unicorn', img: 'https://image.pollinations.ai/prompt/cute%20baby%20unicorn%20rainbow%20mane%20pixar%20style?width=600&height=600&nologo=true' },
  { id: 'random', label: 'Surprise', text: 'RANDOM', img: 'https://image.pollinations.ai/prompt/magical%20mystery%20gift%20box%20glowing%20sparkles%20pixar%20style?width=600&height=600&nologo=true', isRandom: true },
];

const RANDOM_COMPANIONS = [
    "a wise old owl wearing glasses",
    "a bouncing baby elephant",
    "a robot with a heart of gold",
    "a flying squirrel",
    "a cheeky monkey",
    "a talking penguin",
    "a brave little turtle"
];

export const CompanionSelector: React.FC<CompanionSelectorProps> = ({ 
  value, 
  onChange, 
  error, 
  label
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Sync state if external value changes (e.g. cleared)
  useEffect(() => {
    if (!value && selectedImg) {
      setSelectedImg(null);
    }
  }, [value, selectedImg]);

  const handleOptionSelect = (opt: typeof COMPANION_OPTIONS[0]) => {
    playMagicSound();
    if (opt.isRandom) {
        const random = RANDOM_COMPANIONS[Math.floor(Math.random() * RANDOM_COMPANIONS.length)];
        onChange(random);
        // For random text, we use the random box image as the preview
        setSelectedImg(opt.img);
    } else {
        onChange(opt.text);
        setSelectedImg(opt.img);
    }
  };

  const handleClear = () => {
      onChange('');
      setSelectedImg(null);
  };

  return (
    <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
        <label className="text-white font-bold text-lg mb-4 block">
            <i className="fa-solid fa-user-group text-magic-pink mr-2"></i> {label}
        </label>
        
        {/* Selection Display Area */}
        {value && (
            <div className="mb-6 relative animate-slide-up-fade">
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {selectedImg && (
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                                <img src={selectedImg} className="w-full h-full object-cover" alt="Selected" />
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-magic-pink font-bold uppercase tracking-wider">Selected</p>
                            <p className="text-white font-medium text-lg leading-tight capitalize">{value}</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleClear}
                        type="button"
                        className="w-8 h-8 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full flex items-center justify-center transition-colors"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
        )}

        {/* Visual Options Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {COMPANION_OPTIONS.map((opt) => {
                // Check if this option is currently selected (by text match or random placeholder)
                const isSelected = value === opt.text || (opt.isRandom && RANDOM_COMPANIONS.includes(value));
                
                return (
                    <button 
                        key={opt.id}
                        type="button" 
                        onClick={() => handleOptionSelect(opt)}
                        className={`
                            group relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300
                            ${isSelected 
                                ? 'border-magic-pink ring-2 ring-magic-pink/30 scale-105 shadow-xl shadow-pink-500/20' 
                                : 'border-white/10 hover:border-magic-pink hover:scale-105 hover:shadow-lg'
                            }
                        `}
                    >
                        <img src={opt.img} alt={opt.label} className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        
                        {isSelected && (
                            <div className="absolute top-2 right-2 bg-magic-pink text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md animate-bounce-slow">
                                <i className="fa-solid fa-check"></i>
                            </div>
                        )}

                        <div className="absolute bottom-2 left-0 w-full text-center">
                            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider shadow-sm">{opt.label}</span>
                        </div>
                    </button>
                );
            })}
        </div>
        
        {error && <p className="text-red-400 text-sm mt-3 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {error}</p>}
    </div>
  );
};
