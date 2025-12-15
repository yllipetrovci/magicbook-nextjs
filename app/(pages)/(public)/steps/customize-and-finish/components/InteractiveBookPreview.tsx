import { useRef, useState } from "react";

export const InteractiveBookPreview: React.FC<{
    coverImage: string;
    theme: string;
    heroName: string;
    tone: string;
    wish?: string;
    location?: string;
    locationImage?: string;
    companion?: string;
    companionImage?: string;
    gender?: 'boy' | 'girl';
    age?: number;
    pages?: number;
    heroImage?: string | null;
}> = ({ coverImage, theme, heroName, tone, wish, location, locationImage, companion, companionImage, gender, age, pages, heroImage }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        setRotation({ x: rotateX, y: rotateY });
        setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlowPos({ x: 50, y: 50 });
    };

    return (
        <div className="flex flex-col items-center w-full">
            
            {/* 3D Book Container */}
            <div 
                className="perspective-1000 w-56 h-80 relative group z-10 mb-2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    ref={cardRef}
                    className="w-full h-full relative transform-style-3d transition-transform duration-100 ease-out shadow-2xl"
                    style={{ 
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    }}
                >
                    {/* Spine */}
                    <div className="absolute top-1 bottom-1 left-0 w-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-l-md transform -translate-x-4 translate-z-[-2px] rotate-y-[-90deg]"></div>

                    {/* Front Cover */}
                    <div className="absolute inset-0 bg-[#1e293b] rounded-r-xl rounded-l-md overflow-hidden border-l-4 border-white/10">
                        {/* Cover Image */}
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-90" />
                        
                        {/* Dynamic Sheen/Gloss */}
                        <div 
                            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
                            style={{
                                background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
                            }}
                        ></div>

                        {/* Title & Hero Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-b from-black/60 via-transparent to-black/80">
                            <div className="transform translate-z-[20px]">
                                <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-md font-serif uppercase tracking-wider leading-tight text-center border-b-2 border-yellow-500/30 pb-2">
                                    The {theme.split(' ')[0]} Adventure
                                </h1>
                            </div>
                            
                            <div className="text-center transform translate-z-[20px]">
                                <p className="text-[9px] text-yellow-200/80 font-bold uppercase tracking-[0.3em] mb-1">Starring</p>
                                <h2 className="text-xl font-black text-white font-serif drop-shadow-lg">{heroName}</h2>
                            </div>
                        </div>
                    </div>
                    
                    {/* Pages Effect (Right Side) */}
                    <div className="absolute top-2 bottom-2 right-0 w-3 bg-white rounded-r-md transform translate-x-[2px] translate-z-[-5px] border-r border-gray-300" 
                         style={{ background: 'linear-gradient(90deg, #fff 90%, #ccc 100%)', backgroundSize: '2px 100%' }}>
                    </div>
                </div>
                
                {/* Floating Particles around book */}
                <div className="absolute -top-4 -right-4 text-yellow-300 text-xl animate-bounce-slow pointer-events-none"><i className="fa-solid fa-star"></i></div>
                <div className="absolute bottom-10 -left-6 text-magic-purple text-2xl animate-float pointer-events-none"><i className="fa-solid fa-sparkles"></i></div>
            </div>

            {/* RPG Stats / Attributes */}
            <div className="mt-6 w-full space-y-3">
                
                {/* Hero Details Card - Large & Prominent */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl p-3 flex items-center gap-4 backdrop-blur-sm shadow-md transition-all hover:border-white/20">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 overflow-hidden relative shadow-sm shrink-0">
                         {heroImage ? (
                            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                         ) : (
                            <i className={`fa-solid ${gender === 'girl' ? 'fa-venus' : 'fa-mars'} text-lg`}></i>
                         )}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-0.5">The Hero</p>
                        <p className="text-base font-bold text-white truncate">{age || 5} Years Old</p>
                    </div>
                </div>

                {/* Secondary Details - Compact 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2">
                    
                    {/* Location - Compact */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-magic-blue/20 flex items-center justify-center text-magic-blue border border-magic-blue/30 shrink-0 overflow-hidden">
                            {locationImage ? <img src={locationImage} className="w-full h-full object-cover" alt="Loc" /> : <i className="fa-solid fa-map-location-dot text-xs"></i>}
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-[8px] text-gray-500 uppercase font-bold">World</p>
                            <p className="text-xs font-bold text-white truncate leading-tight" title={location}>{location || "?"}</p>
                        </div>
                    </div>

                    {/* Companion - Compact */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-magic-green/20 flex items-center justify-center text-magic-green border border-magic-green/30 shrink-0 overflow-hidden">
                            {companionImage ? <img src={companionImage} className="w-full h-full object-cover" alt="Pet" /> : <i className="fa-solid fa-user-group text-xs"></i>}
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-[8px] text-gray-500 uppercase font-bold">Sidekick</p>
                            <p className="text-xs font-bold text-white truncate leading-tight" title={companion}>{companion || "None"}</p>
                        </div>
                    </div>

                    {/* Tone - Compact */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-magic-purple/20 flex items-center justify-center text-magic-purple border border-magic-purple/30 shrink-0">
                            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-[8px] text-gray-500 uppercase font-bold">Vibe</p>
                            <p className="text-xs font-bold text-white truncate leading-tight">{tone || "Magic"}</p>
                        </div>
                    </div>

                    {/* Length - Compact */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-magic-orange/20 flex items-center justify-center text-magic-orange border border-magic-orange/30 shrink-0">
                            <i className="fa-solid fa-book-open text-xs"></i>
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-[8px] text-gray-500 uppercase font-bold">Length</p>
                            <p className="text-xs font-bold text-white truncate leading-tight">{pages || 6} Pages</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Wish Scroll */}
            {wish && (
                <div className="mt-4 w-full max-w-[320px] bg-[#fdf6e3] text-gray-800 p-4 rounded-xl shadow-lg relative transform rotate-1 border border-gray-300">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-800 rounded-full border-2 border-white shadow-md"></div>
                    <p className="text-[10px] font-bold text-red-800 uppercase tracking-wider text-center mb-1">Secret Wish</p>
                    <p className="text-xs font-serif italic text-center leading-tight">"{wish.slice(0, 50)}{wish.length > 50 ? '...' : ''}"</p>
                </div>
            )}

        </div>
    );
};