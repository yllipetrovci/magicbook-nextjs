'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const UpsellVideo: React.FC = () => {
   const router = useRouter();
   const { config } = useStory();
   const { t } = useLanguage();

   const handleYes = () => {
      // Logic to add to cart/order
      router.push('/success');
   };

   const handleNo = () => {
      router.push('/success');
   };

   return (
      <div className=" overflow-y-auto bg-black/95 backdrop-blur-md animate-fade-in">
         <div className="flex min-h-full items-center justify-center p-3 md:p-4 text-center">
            <div className="w-full max-w-md transform overflow-hidden rounded-3xl bg-magic-card p-4 md:p-8 text-left align-middle shadow-2xl transition-all border-2 border-magic-purple relative my-2 md:my-4">

               {/* Background Glow */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-magic-purple/10 to-transparent pointer-events-none"></div>

               <div className="flex flex-col items-center text-center relative z-10">
                  <div className="inline-block bg-red-600 text-white font-black px-3 py-1 rounded-full text-[10px] md:text-sm mb-3 md:mb-4 animate-pulse shadow-lg shadow-red-500/20 tracking-wide">
                     WAIT! SPECIAL ONE-TIME OFFER
                  </div>

                  <h2 className="text-lg md:text-3xl font-black text-white mb-2 md:mb-4 leading-tight">
                     Want a <span className="text-magic-purple">Magic Video</span> of {config.heroName}?
                  </h2>

                  <div className="relative w-full aspect-video bg-black rounded-xl mb-3 md:mb-6 border border-white/10 flex items-center justify-center overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/video/600/400')] bg-cover opacity-60"></div>
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/50 z-10 group-hover:scale-110 transition-transform cursor-pointer">
                        <i className="fa-solid fa-play text-xl md:text-3xl text-white pl-1"></i>
                     </div>
                     <p className="absolute bottom-3 text-white font-bold text-[10px] md:text-sm shadow-black drop-shadow-md bg-black/30 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                        AI Generated Video Message
                     </p>
                  </div>

                  <p className="text-gray-300 mb-4 md:mb-6 text-xs md:text-lg leading-relaxed">
                     Watch {config.heroName} come to life in a personalized video message! Perfect for sharing with family.
                  </p>

                  <div className="flex flex-col gap-2 md:gap-4 items-center w-full">
                     <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 bg-white/5 px-3 py-2 rounded-xl border border-white/5 w-full">
                        <span className="text-gray-500 line-through text-sm md:text-lg font-bold">$24.99</span>
                        <i className="fa-solid fa-arrow-right text-gray-600 text-xs"></i>
                        <span className="text-xl md:text-3xl font-black text-green-500">$4.99</span>
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded ml-1">80% OFF</span>
                     </div>

                     <Button onClick={handleYes} fullWidth size="lg" className="bg-green-600 hover:bg-green-500 text-base md:text-xl py-3 md:py-4 shadow-xl shadow-green-500/30 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all">
                        YES! Add to Order <i className="fa-solid fa-plus-circle ml-2"></i>
                     </Button>

                     <button onClick={handleNo} className="text-gray-500 text-xs md:text-sm hover:text-white hover:underline mt-1 transition-colors py-2">
                        No thanks, I don't want this special offer
                     </button>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default UpsellVideo;
