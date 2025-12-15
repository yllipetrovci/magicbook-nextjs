'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface SeasonalQuestBannerProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  imageUrl?: string;
  href?: string;
  className?: string;
}

export const SeasonalQuestBanner: React.FC<SeasonalQuestBannerProps> = ({
  title = 'The Lost Reindeer',
  subtitle = 'Daily Chapter Quest',
  badgeText = 'Special Event',
  imageUrl = 'https://image.pollinations.ai/prompt/christmas%20magic%20forest%20snowy%20road%20wide%20banner?width=1200&height=400&nologo=true',
  href = '/quest',
  className,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={clsx(
        'relative w-full h-40 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border-2 border-red-500/30 hover:border-red-500/60 transition-all',
        className
      )}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
      />

      {/* Gradient content overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-transparent to-transparent flex flex-col justify-center px-8 md:px-12">
        <div className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2 animate-pulse shadow-lg">
          {badgeText}
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-1 group-hover:translate-x-2 transition-transform">
          {title}
        </h2>

        <p className="text-gray-200 font-bold flex items-center gap-2">
          <i className="fa-solid fa-map-location-dot" />
          {subtitle}
        </p>
      </div>

      {/* Play button */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
        <i className="fa-solid fa-play text-white text-2xl ml-1" />
      </div>
    </div>
  );
};
