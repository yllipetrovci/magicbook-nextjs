import React from 'react';

interface TrustSectionProps {
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ variant = 'full', className = '' }) => {

  // --- MINIMAL VARIANT ---
  if (variant === 'minimal') {
    return (
      <div className={`bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between ${className}`}>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-green-500 text-sm mb-1">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half-stroke"></i>
          </div>
          <span className="text-xs text-gray-400 font-bold">Trustpilot Excellent</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-300 font-bold flex items-center gap-1 justify-end">
            <i className="fa-solid fa-check-circle text-green-500"></i> Verified
          </div>
          <div className="text-[10px] text-gray-500">Money-back guarantee</div>
        </div>
      </div>
    );
  }

  // --- FULL & COMPACT VARIANT ---
  return (
    <div className={`w-full max-w-4xl bg-magic-card/30 p-6 rounded-3xl border border-white/5 backdrop-blur-sm mx-auto ${className}`}>

      {/* Header for FULL variant */}
      {variant === 'full' && (
        <div className="flex justify-center items-center gap-3 mb-6 opacity-70">
          <i className="fa-solid fa-wand-magic-sparkles text-magic-orange"></i>
          <span className="text-sm font-bold text-magic-muted tracking-widest uppercase">
            Trusted by Thousands of Parents Worldwide
          </span>
          <i className="fa-solid fa-wand-magic-sparkles text-magic-orange"></i>
        </div>
      )}

      {/* TRUST STATS — replaces the old Disney/Scholastic section */}
      <div className="flex justify-center gap-8 md:gap-16 text-center font-black text-xl md:text-2xl mb-8 flex-wrap">

        {/* Stories Created */}
        <div className="flex flex-col items-center">
          <div className="text-magic-orange text-2xl md:text-3xl">⭐</div>
          <span className="text-gray-300 text-sm font-bold mt-1">10,000+</span>
          <span className="text-gray-500 text-xs tracking-wide">Stories Created</span>
        </div>

        <div className="hidden md:block w-px bg-white/10"></div>

        {/* Happy Parents */}
        <div className="flex flex-col items-center">
          <div className="text-magic-purple text-2xl md:text-3xl">🌟</div>
          <span className="text-gray-300 text-sm font-bold mt-1">4.9/5</span>
          <span className="text-gray-500 text-xs tracking-wide">Happy Parents</span>
        </div>

        <div className="hidden md:block w-px bg-white/10"></div>

        {/* Child Safe Content */}
        <div className="flex flex-col items-center">
          <div className="text-magic-green text-2xl md:text-3xl">🛡</div>
          <span className="text-gray-300 text-sm font-bold mt-1">100%</span>
          <span className="text-gray-500 text-xs tracking-wide">Child-Safe Content</span>
        </div>

      </div>

      {/* Trustpilot badge */}
      <div className="pt-6 border-t border-white/5 flex justify-center">
        <div className="bg-magic-card/50 px-5 py-3 rounded-xl border border-white/10 flex items-center gap-6 shadow-lg hover:border-magic-green/30 transition-colors">

          {/* Stars */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1 text-green-500 text-sm mb-1">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <span className="text-xs text-gray-400 font-bold">Trustpilot Excellent</span>
          </div>

          {/* Separator */}
          {variant === 'full' && <div className="h-8 w-px bg-white/10 hidden md:block"></div>}

          {/* Verified badge */}
          {(variant === 'full' || variant === 'compact') && (
            <div className="text-right">
              <div className="text-xs text-gray-300 font-bold flex items-center gap-1 justify-end md:justify-start">
                <i className="fa-solid fa-check-circle text-green-500"></i> Verified
              </div>
              {variant === 'full' && (
                <div className="text-[10px] text-gray-500">Money-back guarantee</div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
