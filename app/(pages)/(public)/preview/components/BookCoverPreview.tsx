
import React from 'react';
import { StoryConfig } from '@/app/types';
import { MagicRecipe } from './MagicRecipe';

interface BookCoverPreviewProps {
  story: any;
  config: StoryConfig;
  isLocked?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BookCoverPreview: React.FC<BookCoverPreviewProps> = ({ 
  story, 
  config, 
  isLocked = false, 
  onClick,
  className = ''
}) => {

    console.log({config});
  const heroName = config.heroName || "The Hero";
  const coverUrl = story.coverImage || `https://picsum.photos/seed/${story.title}/600/900`;

  return (
    <div className={`flex flex-col items-center max-w-4xl mx-auto ${className}`}>
        
        {/* --- 3D BOOK COVER CONTAINER --- */}
        <div 
            className="relative mb-12 group cursor-pointer perspective-1000" 
            onClick={onClick}
        >
            {/* INTENSIVE GLOW & SPARKLES */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
                {/* Main Aura */}
                <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[500px] 
                    bg-gradient-to-tr from-magic-purple/40 via-magic-orange/30 to-magic-blue/40 
                    blur-[80px] rounded-full opacity-70 animate-pulse-slow
                    ${isLocked ? 'scale-110' : 'scale-100'}
                `}></div>
                
                {/* Floating Particles (Sparkles) */}
                <div className="absolute top-0 left-1/4 text-yellow-300 text-xl animate-bounce-slow opacity-80"><i className="fa-solid fa-star"></i></div>
                <div className="absolute bottom-10 right-1/4 text-magic-purple text-2xl animate-float opacity-80"><i className="fa-solid fa-sparkles"></i></div>
                <div className="absolute top-1/3 right-0 text-white text-xs animate-ping"><i className="fa-solid fa-star"></i></div>
                <div className="absolute bottom-1/3 left-0 text-magic-orange text-lg animate-wiggle"><i className="fa-solid fa-star"></i></div>
            </div>

            {/* THE BOOK ITSELF */}
            <div className={`
                w-[280px] md:w-[320px] aspect-[2/3] rounded-r-2xl rounded-l-sm bg-[#1e293b] relative 
                shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform transition-transform duration-500 
                hover:scale-105 hover:-rotate-1 border-l-4 border-white/5 overflow-hidden
                transform-style-3d group-hover:shadow-[0_40px_80px_rgba(139,92,246,0.5)]
            `}>
                
                {/* Cover Image */}
                <img 
                    src={coverUrl} 
                    alt="Cover" 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isLocked ? 'blur-[3px] scale-110 opacity-90' : 'opacity-100 scale-100'}`} 
                />
                
                {/* Mystic Fog/Overlay when locked */}
                {isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C15] via-transparent to-[#0B0C15]/40 opacity-80"></div>
                )}
                
                {/* Standard Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none"></div>
                
                {/* Title */}
                <div className="absolute top-12 w-full px-6 text-center z-10">
                    <h1 className="text-3xl md:text-4xl font-display font-black text-[#FF9F1C] leading-tight line-clamp-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tight">
                        {story.title}
                    </h1>
                </div>
                
                {/* Lock Overlay - Enhanced */}
                {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-300 group-hover:scale-110 transform">
                        <div className="relative">
                            <div className="absolute inset-0 bg-magic-orange/50 blur-xl rounded-full animate-pulse"></div>
                            <i className="fa-solid fa-lock text-5xl text-white drop-shadow-[0_0_15px_rgba(249,115,22,1)] relative z-10 animate-bounce-slow"></i>
                        </div>
                        <p className="text-white/90 font-bold text-sm mt-4 uppercase tracking-widest drop-shadow-md animate-pulse">Secret Story Inside</p>
                    </div>
                )}

                {/* "Written For" - Redesigned (Premium Look) */}
                <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1 opacity-80">
                            <div className="h-px w-6 bg-gradient-to-r from-transparent to-yellow-500"></div>
                            <span className="text-yellow-100/70 text-[10px] font-serif italic tracking-widest uppercase">Written For</span>
                            <div className="h-px w-6 bg-gradient-to-l from-transparent to-yellow-500"></div>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-200 to-yellow-500 drop-shadow-lg tracking-wide">
                            {heroName}
                        </h2>
                        {/* Decorative Ornament */}
                        <div className="text-yellow-500/50 text-[10px] mt-1">
                            <i className="fa-solid fa-diamond"></i>
                        </div>
                    </div>
                </div>
                
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-30"></div>

            </div>

            {/* Spine Effect */}
            <div className="absolute top-1 bottom-1 -left-2 w-4 bg-gray-800 rounded-l-md shadow-inner"></div>
        </div>

        {/* --- NEW MAGIC RECIPE COMPONENT --- */}
        <MagicRecipe config={config} />

    </div>
  );
};


export default BookCoverPreview;