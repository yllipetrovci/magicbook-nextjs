
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { PATHS } from '@/app/constants/relativeRoutePaths';

const FloatingSparkles = () => {
   return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[10%] left-[10%] text-yellow-300/20 text-4xl animate-pulse-slow"><i className="fa-solid fa-star"></i></div>
         <div className="absolute top-[30%] right-[20%] text-magic-orange/20 text-2xl animate-float"><i className="fa-solid fa-heart"></i></div>
         <div className="absolute bottom-[20%] left-[15%] text-magic-purple/20 text-3xl animate-wiggle"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
      </div>
   );
};

export const UpsellBook: React.FC = () => {
   const router = useRouter();
   const { config } = useStory();

   const handleNext = () => {
      router.push(PATHS.UPSELL_VIDEO);
   };
   // fixed inset-0
   return (
      <div className=" z-[100] overflow-y-auto bg-[#0B0C15] animate-fade-in font-sans text-white bg-[radial-gradient(circle_at_center,_#1a1c2e_0%,_#0B0C15_100%)]">
         <FloatingSparkles />

         <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto relative z-10">

            {/* Close Button */}
            <button
               onClick={handleNext}
               className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all z-50"
            >
               <i className="fa-solid fa-times text-xl"></i>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

               {/* LEFT: EMOTIONAL VISUAL */}
               <div className="relative order-2 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.15)] border border-white/10 group">
                     {/* Magical Glow Behind */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-magic-purple/20 to-magic-orange/20 mix-blend-overlay"></div>

                     <img
                        src="https://image.pollinations.ai/prompt/cozy%20warm%20scene%20child%20reading%20glowing%20magic%20book%20in%20bed%20at%20night%20pixar%20style%20highly%20detailed?width=800&height=800&nologo=true"
                        alt="Magic Moment"
                        className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                     />

                     {/* Overlay Content */}
                     <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="flex gap-1 text-yellow-400 text-sm mb-2">
                           <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <p className="text-white font-serif italic text-lg leading-relaxed">
                           "{config.heroName}'s eyes lit up when they saw the dedication. It wasn't just a story anymore, it was a hug in a book."
                        </p>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">— Sarah, Mom of 2</p>
                     </div>
                  </div>
               </div>

               {/* RIGHT: OFFER CONTENT */}
               <div className="order-1 lg:order-2 text-left space-y-8">

                  <div>
                     <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-magic-orange/10 border border-magic-orange/30 text-magic-orange text-xs font-bold uppercase tracking-widest mb-4">
                        <i className="fa-solid fa-heart"></i> Make it Forever
                     </div>
                     <h1 className="text-4xl md:text-5xl font-black text-white font-serif leading-tight mb-4 drop-shadow-lg">
                        Add a Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-magic-orange to-yellow-300">Dedication</span>
                     </h1>
                     <p className="text-lg text-gray-300 leading-relaxed">
                        Transform this adventure from a fun story into a cherished childhood keepsake. Add your own loving message to the very first page.
                     </p>
                  </div>

                  {/* Feature Box */}
                  <div className="bg-magic-card/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-magic-purple/20 flex items-center justify-center text-magic-purple shrink-0">
                           <i className="fa-solid fa-pen-nib"></i>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Personal Message</h4>
                           <p className="text-gray-400 text-sm">Write a heartfelt note that {config.heroName} will read for years to come.</p>
                        </div>
                     </div>

                     <div className="w-full h-px bg-white/5"></div>

                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-magic-blue/20 flex items-center justify-center text-magic-blue shrink-0">
                           <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Premium Animation</h4>
                           <p className="text-gray-400 text-sm">Unlock custom animation descriptions to make the scenes move exactly how you imagine.</p>
                        </div>
                     </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4">
                     <div className="flex items-end gap-3 mb-6">
                        <span className="text-4xl font-black text-white font-serif">$14.99</span>
                        <span className="text-lg text-gray-500 line-through mb-1.5 decoration-red-500/50">$29.99</span>
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold mb-2 border border-red-500/20">50% OFF TODAY</span>
                     </div>

                     <Button
                        onClick={handleNext}
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-magic-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-[0_0_30px_rgba(249,115,22,0.3)] text-xl py-5 border-t border-white/20 font-serif"
                     >
                        Yes, Make it Special <i className="fa-solid fa-wand-sparkles ml-2 text-yellow-200"></i>
                     </Button>

                     <button
                        onClick={handleNext}
                        className="w-full text-center mt-4 text-sm text-gray-500 font-medium hover:text-white transition-colors"
                     >
                        No thanks, I'll keep the standard version
                     </button>
                  </div>

                  {/* Trust Icons */}
                  <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                     <i className="fa-brands fa-cc-visa text-2xl"></i>
                     <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                     <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
                     <div className="h-4 w-px bg-gray-500"></div>
                     <span className="text-xs font-bold"><i className="fa-solid fa-lock mr-1"></i> Secure</span>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};


export default UpsellBook;