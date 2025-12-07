import React from 'react';

interface ColorOptionProps {
    color: { name: string; class: string };
    watchedColor: string | null | undefined;
    playMagicSound: () => void;
    register: any;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, watchedColor, playMagicSound, register }) => {

    return (
        <label key={color.name} className="cursor-pointer group relative" onClick={playMagicSound}>
            <input type="radio" value={color.name} {...register('color')} className="hidden" />
            <div className={`w-12 h-12 rounded-full ${color.class} shadow-lg transition-transform transform group-hover:scale-110 flex items-center justify-center border-4 ${watchedColor === color.name ? 'border-white scale-110' : 'border-transparent'}`}>
                {watchedColor === color.name && <i className="fa-solid fa-check text-white drop-shadow-md"></i>}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color.name}</span>
        </label>
    );
};

export default ColorOption;