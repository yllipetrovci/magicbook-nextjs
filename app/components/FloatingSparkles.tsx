export const FloatingSparkles = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            {/* Random decorative elements scattered vertically with low opacity */}
            <div className="absolute top-[5%] left-[5%] text-yellow-300/20 text-4xl animate-pulse-slow"><i className="fa-solid fa-star"></i></div>
            <div className="absolute top-[12%] right-[10%] text-magic-purple/20 text-2xl animate-bounce-slow"><i className="fa-solid fa-sparkles"></i></div>
            <div className="absolute top-[18%] left-[20%] text-white/10 text-xs animate-ping"><i className="fa-solid fa-star"></i></div>
            <div className="absolute top-[20%] left-[15%] text-blue-400/20 text-xl animate-float"><i className="fa-solid fa-star"></i></div>
            <div className="absolute top-[28%] right-[5%] text-pink-400/20 text-3xl animate-spin-slow"><i className="fa-solid fa-wand-sparkles"></i></div>

            <div className="absolute top-[35%] left-[8%] text-magic-green/20 text-2xl animate-wiggle"><i className="fa-solid fa-leaf"></i></div>
            <div className="absolute top-[42%] right-[12%] text-yellow-200/20 text-xl animate-pulse"><i className="fa-solid fa-star"></i></div>

            <div className="absolute top-[50%] left-[50%] text-white/5 text-6xl animate-pulse-slow"><i className="fa-solid fa-star"></i></div>

            <div className="absolute top-[55%] left-[4%] text-magic-orange/20 text-3xl animate-float-delayed"><i className="fa-solid fa-fire"></i></div>
            <div className="absolute top-[65%] right-[8%] text-white/10 text-4xl animate-spin-slow"><i className="fa-solid fa-snowflake"></i></div>

            <div className="absolute top-[75%] left-[12%] text-magic-purple/20 text-2xl animate-bounce"><i className="fa-solid fa-star"></i></div>
            <div className="absolute top-[85%] right-[5%] text-magic-blue/20 text-3xl animate-wiggle"><i className="fa-solid fa-cloud"></i></div>

            <div className="absolute top-[92%] left-[8%] text-yellow-400/20 text-xl animate-pulse-slow"><i className="fa-solid fa-star"></i></div>
            <div className="absolute top-[95%] right-[15%] text-pink-500/20 text-lg animate-float"><i className="fa-solid fa-heart"></i></div>
        </div>
    );
};
