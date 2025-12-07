'use client'
import React from 'react';

interface LivePreviewProps {
    coverImageSrc: string;
    borderClass: string;
    theme: string; // This will be the result of config.theme.split(' ')[0]
    heroName: string;
    watchedColor: string | null;
    watchedWish: string | null;
}

const LivePreview: React.FC<LivePreviewProps> = ({
    coverImageSrc,
    borderClass,
    theme,
    heroName,
    watchedColor,
    watchedWish,
}) => {

    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <div className="bg-magic-card/50 rounded-3xl p-4 border border-white/10 shadow-2xl backdrop-blur-md max-w-[250px] mx-auto">
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Book Preview
            </h3>

            {/* 3D Book Preview */}
            <div className="relative aspect-[2/3] bg-[#1e293b] rounded-r-xl rounded-l-md shadow-2xl border-l-4 border-white/5 overflow-hidden transform transition-all duration-500 hover:scale-105 group cursor-default">
                {/* Cover Image */}
                <img src={coverImageSrc} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                {/* Dynamic Border Overlay */}
                <div className={`absolute inset-3 border-[4px] pointer-events-none transition-all duration-300 ${borderClass} opacity-80 rounded-lg`}></div>

                {/* Top Text (Theme) */}
                <div className="absolute top-6 w-full text-center px-4 z-10">
                    <div className="bg-black/40 backdrop-blur-sm py-1.5 px-3 rounded-lg border border-white/10 inline-block">
                        <h1 className="text-xs font-black text-white drop-shadow-md uppercase tracking-tight font-serif leading-none">
                            The {theme} Adventure
                        </h1>
                    </div>
                </div>

                {/* Bottom Text (Hero & Color) */}
                <div className="absolute bottom-8 w-full text-center px-3 z-10">
                    <p className="text-yellow-400 font-bold text-[8px] tracking-[0.3em] uppercase mb-1 drop-shadow-md">Starring</p>
                    <h2 className="text-lg font-black text-white drop-shadow-lg font-serif mb-2 line-clamp-2 leading-tight">{heroName}</h2>

                    {/* Color Ribbon */}
                    {watchedColor && (
                        <div className={`w-12 h-1.5 mx-auto rounded-full bg-${watchedColor.toLowerCase()}-500 shadow-lg ring-1 ring-white/30`}></div>
                    )}
                </div>
            </div>

            {/* Wish Preview Badge */}
            {watchedWish && (
                <div className="mt-4 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm animate-slide-up-fade">
                    <div className="flex items-center gap-2 mb-1">
                        <i className="fa-solid fa-wand-sparkles text-yellow-400 text-[10px]"></i>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Secret Wish Included</p>
                    </div>
                    <p className="text-white italic text-xs leading-snug">"{watchedWish.slice(0, 50)}{watchedWish.length > 50 ? '...' : ''}"</p>
                </div>
            )}

            {!watchedWish && (
                <div className="mt-4 text-center text-[10px] text-gray-500 italic">
                    (Type a wish to see it here...)
                </div>
            )}
        </div>
    );
};

export default LivePreview;