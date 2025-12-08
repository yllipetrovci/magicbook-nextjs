
import React from 'react';
import { StoryConfig, GeneratedStory } from '@/app/types';

interface BookCoverPreviewProps {
    story: GeneratedStory;
    config: StoryConfig;
    isLocked?: boolean;
    onDownload?: () => void;
    className?: string;
}

export const BookCoverPreview: React.FC<BookCoverPreviewProps> = ({
    story,
    config,
    isLocked = false,
    onDownload,
    className = ''
}) => {
    const heroName = config.heroName || "The Hero";
    const coverUrl = story.coverImage || `https://picsum.photos/seed/${story.title}/600/900`;

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
        <div className={`flex flex-col items-center max-w-4xl mx-auto ${className}`}>

            {/* --- 3D BOOK COVER --- */}
            <div
                className="relative mb-12 group cursor-pointer perspective-1000"
                onClick={onDownload}
            >
                <div className={`
                w-[280px] md:w-[320px] aspect-[2/3] rounded-r-2xl rounded-l-sm bg-[#1e293b] relative 
                shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 
                hover:scale-105 hover:-rotate-1 border-l-4 border-white/5 overflow-hidden
                transform-style-3d
            `}>

                    {/* Cover Image */}
                    <img
                        src={coverUrl}
                        alt="Cover"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isLocked ? 'blur-sm scale-110 opacity-80' : 'opacity-100 scale-100'}`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

                    {/* Title */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center z-10">
                        <div className="bg-[#111827]/80 backdrop-blur-md px-4 py-4 rounded-xl border-2 border-[#FF9F1C] shadow-2xl transform hover:scale-105 transition-transform">
                            <h1 className="text-xl md:text-2xl font-black text-[#FF9F1C] leading-tight line-clamp-3 font-serif drop-shadow-md">
                                {story.title}
                            </h1>
                        </div>
                    </div>

                    {/* Lock Overlay */}
                    {isLocked && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/60 p-5 rounded-full border-2 border-magic-orange shadow-2xl scale-110 animate-bounce-slow">
                                <i className="fa-solid fa-lock text-3xl text-magic-orange"></i>
                            </div>
                        </div>
                    )}

                    {/* Author Badge */}
                    <div className="absolute bottom-8 w-full flex justify-center z-10 pointer-events-none">
                        <div className="bg-black/40 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10 text-center shadow-lg">
                            <p className="text-white/80 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">Written For</p>
                            <div className="flex items-center justify-center bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                <span className="text-white font-bold text-base font-serif">{heroName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spine Effect */}
                <div className="absolute top-1 bottom-1 -left-2 w-4 bg-gray-800 rounded-l-md shadow-inner"></div>
            </div>

            {/* --- MAGIC RECIPE (DETAILS) --- */}
            <div className="w-full bg-magic-card/50 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <h3 className="text-center text-white font-black text-xl mb-6 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-flask text-magic-purple"></i> The Magic Recipe
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {/* Tone */}
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Tone</span>
                        <div className="flex items-center gap-2 text-magic-purple font-bold">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <span>{config.tone || 'Magical'}</span>
                        </div>
                    </div>

                    {/* Age & Pages */}
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Format</span>
                        <div className="flex items-center gap-2 text-blue-400 font-bold">
                            <i className="fa-solid fa-book-open"></i>
                            <span>{config.customPageCount || 6} Pgs • Age {config.childAge || 5}</span>
                        </div>
                    </div>

                    {/* Magic Color */}
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Magic Color</span>
                        <div className="flex items-center gap-2 font-bold text-white">
                            <div className="w-4 h-4 rounded-full border border-white/30 shadow-sm" style={{ backgroundColor: magicColorHex }}></div>
                            <span>{config.color}</span>
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Theme</span>
                        <div className="flex items-center gap-2 text-magic-orange font-bold truncate max-w-full">
                            <i className="fa-solid fa-hat-wizard"></i>
                            <span className="truncate">{config.theme.split(' ')[0]}</span>
                        </div>
                    </div>

                </div>

                {/* Detailed Rows */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-start gap-3">
                        <div className="mt-1 text-gray-500"><i className="fa-solid fa-paw"></i></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Companions</p>
                            <p className="text-sm text-gray-200 font-medium leading-tight">{config.companions}</p>
                        </div>
                    </div>

                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-start gap-3">
                        <div className="mt-1 text-gray-500"><i className="fa-solid fa-map-location-dot"></i></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                            <p className="text-sm text-gray-200 font-medium leading-tight">{config.place}</p>
                        </div>
                    </div>
                </div>

                {/* Secret Wish */}
                {config.secretWish && (
                    <div className="mt-4 bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 text-center">
                        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1"><i className="fa-solid fa-star mr-1"></i> Secret Wish</p>
                        <p className="text-sm text-yellow-100 italic">"{config.secretWish}"</p>
                    </div>
                )}

            </div>
        </div>
    );
};
