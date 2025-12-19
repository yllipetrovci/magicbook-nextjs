'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/app/constants/relativeRoutePaths';
import { useStory } from '@/app/contexts/StoryContext';

const LOADING_STEPS = [
  "✨ Sprinkling Magic Dust...",
  "📖 Opening the Big Book...",
  "🎨 Mixing Rainbow Colors...",
  "🧙‍♂️ Waking up the Wizard...",
  "🐉 Feeding the Dragons...",
  "🏰 Building the Castle...",
  "🌞 Polishing the Sun...",
  "✍️ Crafting the Hero's Tale..."
];

export const Generating: React.FC = () => {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const {config} = useStory();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Animation loop for loading steps
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        const next = (prev + 1) % LOADING_STEPS.length;
        setCompletedSteps(curr => [...curr, LOADING_STEPS[prev]].slice(-3)); // Keep last 3
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      router.push(PATHS.PREVIEW);
    }, 2500);

    return () => {
      mounted = false;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden relative w-full">

      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 text-6xl text-magic-pink opacity-10 animate-bounce-slow"><i className="fa-solid fa-star"></i></div>
      <div className="absolute bottom-20 right-10 text-6xl text-magic-blue opacity-10 animate-float"><i className="fa-solid fa-cloud"></i></div>
      <div className="absolute top-1/2 right-20 text-5xl text-magic-yellow opacity-10 animate-spin"><i className="fa-solid fa-sun"></i></div>

      <div className="relative z-10 mb-12">
        {/* Book Animation */}
        <div className="w-48 h-48 bg-magic-card rounded-3xl shadow-2xl border-b-[16px] border-r-[16px] border-magic-purple flex items-center justify-center animate-float mx-auto relative shadow-purple-900/30">
          <div className="absolute inset-0 border-4 border-white/5 rounded-2xl"></div>
          <i className="fa-solid fa-book-open text-8xl text-magic-orange animate-wiggle drop-shadow-lg"></i>

          {/* Particles emitting from book */}
          <div className="absolute -top-4 -right-4 text-4xl text-magic-yellow animate-bounce"><i className="fa-solid fa-sparkles"></i></div>
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg px-4">
        Crafting {config.heroName || 'the Hero'}'s Adventure...
      </h2>

      {/* Dynamic Loading Steps */}
      <div className="h-24 flex flex-col items-center justify-center gap-2">
        <div className="text-2xl font-bold text-magic-purple animate-pulse transition-all duration-300 scale-110 drop-shadow-sm">
          {LOADING_STEPS[loadingStep]}
        </div>
        <div className="flex gap-2 mt-2">
          {completedSteps.map((step, i) => (
            <span key={i} className="text-sm text-green-400 font-bold opacity-70 animate-fade-in"><i className="fa-solid fa-check"></i></span>
          ))}
        </div>
      </div>

      <div className="mt-8 w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div className="h-full bg-gradient-to-r from-magic-blue via-magic-purple to-magic-pink w-full animate-[shimmer_2s_infinite_linear]" style={{ backgroundSize: '200% 100%' }}></div>
      </div>
    </div>
  );
};

export default Generating;