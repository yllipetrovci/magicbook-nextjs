
import React, { useState, useEffect } from 'react';
import { playMagicSound } from '@/app/utils/audio';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label: string;
  placeholder: string;
}

const LOCATION_OPTIONS = [
  { id: 'forest', label: 'Forest', text: 'The Enchanted Forest', img: 'https://image.pollinations.ai/prompt/enchanted%20forest%20magical%20glowing%20mushrooms%20pixar%20style?width=600&height=400&nologo=true' },
  { id: 'cave', label: 'Cave', text: 'The Crystal Cave', img: 'https://image.pollinations.ai/prompt/crystal%20cave%20glowing%20gems%20blue%20purple%20pixar%20style?width=600&height=400&nologo=true' },
  { id: 'castle', label: 'Castle', text: 'The Flying Castle', img: 'https://image.pollinations.ai/prompt/flying%20castle%20in%20clouds%20magical%20sky%20pixar%20style?width=600&height=400&nologo=true' },
  { id: 'space', label: 'Space', text: 'The Starry Moon Base', img: 'https://image.pollinations.ai/prompt/moon%20base%20space%20adventure%20stars%20planets%20pixar%20style?width=600&height=400&nologo=true' },
  { id: 'underwater', label: 'Ocean', text: 'Underwater Kingdom', img: 'https://image.pollinations.ai/prompt/underwater%20kingdom%20coral%20reef%20mermaids%20pixar%20style?width=600&height=400&nologo=true' },
  { id: 'random', label: 'Surprise', text: 'RANDOM', img: 'https://image.pollinations.ai/prompt/magical%20mystery%20map%20adventure%20fantasy%20pixar%20style?width=600&height=400&nologo=true', isRandom: true },
];

const RANDOM_LOCATIONS = [
    "Rainbow Valley",
    "The Dragon's Lair",
    "Candy Mountain",
    "The Secret Island",
    "The Cloud City",
    "The Hidden Library",
    "Volcano Village",
    "The Toy Factory"
];

export const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  value, 
  onChange, 
  error, 
  label
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (!value && selectedImg) {
      setSelectedImg(null);
    }
  }, [value, selectedImg]);

  const handleOptionSelect = (opt: typeof LOCATION_OPTIONS[0]) => {
    playMagicSound();
    if (opt.isRandom) {
        const random = RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)];
        onChange(random);
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
            <i className="fa-solid fa-map-location-dot text-magic-blue mr-2"></i> {label}
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
                            <p className="text-xs text-magic-blue font-bold uppercase tracking-wider">Destination</p>
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

        {/* Visual Location Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {LOCATION_OPTIONS.map((opt) => {
                const isSelected = value === opt.text || (opt.isRandom && RANDOM_LOCATIONS.includes(value));

                return (
                    <button 
                        key={opt.id}
                        type="button" 
                        onClick={() => handleOptionSelect(opt)}
                        className={`
                            group relative h-24 sm:h-28 rounded-2xl overflow-hidden border transition-all duration-300
                            ${isSelected 
                                ? 'border-magic-blue ring-2 ring-magic-blue/30 scale-105 shadow-xl shadow-blue-500/20' 
                                : 'border-white/10 hover:border-magic-blue hover:scale-105 hover:shadow-lg'
                            }
                        `}
                    >
                        <img src={opt.img} alt={opt.label} className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        
                        {isSelected && (
                            <div className="absolute top-2 right-2 bg-magic-blue text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md animate-bounce-slow">
                                <i className="fa-solid fa-check"></i>
                            </div>
                        )}

                        <div className="absolute bottom-2 left-0 w-full text-center px-2">
                            <span className="text-xs font-bold text-white uppercase tracking-wider shadow-sm block truncate">{opt.label}</span>
                        </div>
                    </button>
                );
            })}
        </div>
        {error && <p className="text-red-400 text-sm mt-3 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {error}</p>}
    </div>
  );
};
