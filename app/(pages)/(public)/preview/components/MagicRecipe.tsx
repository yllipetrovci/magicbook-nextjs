
'use client';
import React from 'react';
import { StoryConfig } from '@/app/types';

interface MagicRecipeProps {
    config: StoryConfig;
    className?: string;
}


interface MagicRecipeProps {
    config: StoryConfig;
    className?: string;
}

export const MagicRecipe: React.FC<MagicRecipeProps> = ({ config, className = '' }) => {

    // Color mapping for display
    const magicColorHex = {
        'Red': '#EF4444',
        'Orange': '#F97316',
        'Yellow': '#FACC15',
        'Green': '#22C55E',
        'Blue': '#3B82F6',
        'Purple': '#A855F7',
        'Pink': '#EC4899',
    }[config.color] || '#A855F7';

    return (
        <div className={`w-full relative group ${className}`}>

            {/* Animated Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-magic-purple via-magic-orange to-magic-blue rounded-3xl opacity-30 group-hover:opacity-70 blur transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>

            <div className="relative bg-[#0F111A]/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden">

                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

                {/* Floating Orbs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-magic-purple/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-magic-blue/20 rounded-full blur-3xl animate-float-delayed"></div>

                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-8 relative z-10">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/30"></div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <i className="fa-solid fa-flask text-magic-purple animate-wiggle"></i>
                    </div>
                    <h3 className="text-white font-black text-xl tracking-tight">The Magic Recipe</h3>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/30"></div>
                </div>

                {/* Main Ingredients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">

                    {/* Tone */}
                    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all duration-300 group/item hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="text-magic-purple text-xl group-hover/item:scale-110 transition-transform"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Tone</span>
                                <span className="text-white font-bold text-sm leading-tight">{config.tone || 'Magical'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Format */}
                    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all duration-300 group/item hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="text-blue-400 text-xl group-hover/item:scale-110 transition-transform"><i className="fa-solid fa-book-open"></i></div>
                            <div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Format</span>
                                <span className="text-white font-bold text-sm leading-tight">{config.customPageCount || 6} Pgs • Age {config.childAge || 5}</span>
                            </div>
                        </div>
                    </div>

                    {/* Magic Color */}
                    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all duration-300 group/item hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-6 h-6 rounded-full border-2 border-white/20 shadow-[0_0_10px_currentColor] group-hover/item:scale-110 transition-transform" style={{ backgroundColor: magicColorHex, color: magicColorHex }}></div>
                            <div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Magic Color</span>
                                <span className="text-white font-bold text-sm leading-tight">{config.color}</span>
                            </div>
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition-all duration-300 group/item hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="text-magic-orange text-xl group-hover/item:scale-110 transition-transform"><i className="fa-solid fa-hat-wizard"></i></div>
                            <div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Theme</span>
                                <span className="text-white font-bold text-sm leading-tight truncate max-w-[100px]">{config.theme.split(' ')[0]}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Secondary Details */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-start gap-3 hover:border-white/10 transition-colors">
                        <div className="mt-1 text-gray-500 bg-white/5 p-1.5 rounded-lg"><i className="fa-solid fa-paw"></i></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Companions</p>
                            <p className="text-sm text-gray-200 font-medium leading-tight">{config.companions}</p>
                        </div>
                    </div>

                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-start gap-3 hover:border-white/10 transition-colors">
                        <div className="mt-1 text-gray-500 bg-white/5 p-1.5 rounded-lg"><i className="fa-solid fa-map-location-dot"></i></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                            <p className="text-sm text-gray-200 font-medium leading-tight">{config.place}</p>
                        </div>
                    </div>
                </div>

                {/* Secret Wish */}
                {config.secretWish && (
                    <div className="mt-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-xl border border-yellow-500/20 text-center relative z-10">
                        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1"><i className="fa-solid fa-star mr-1 animate-spin-slow"></i> Secret Wish</p>
                        <p className="text-sm text-yellow-100 italic">"{config.secretWish}"</p>
                    </div>
                )}

            </div>
        </div>
    );
};
