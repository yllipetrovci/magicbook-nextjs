
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';

export const UpsellBook: React.FC = () => {
   const router = useRouter();

   const handleYes = () => {
      router.push('/upsell-video');
   };

   const handleNo = () => {
      router.push('/upsell-video');
   };

   return (
      <div className=" z-50 overflow-y-auto bg-black/95 backdrop-blur-md animate-fade-in">
         <div className="flex min-h-full items-center justify-center p-3 md:p-4 text-center">
            <div className="w-full max-w-md transform overflow-hidden rounded-3xl bg-magic-card p-4 md:p-8 text-left align-middle shadow-2xl transition-all border-2 border-magic-orange relative my-2 md:my-4">

               <div className="flex flex-col items-center text-center relative z-10">
                  <div className="inline-block bg-magic-orange text-white font-black px-3 py-1 rounded-full text-[10px] md:text-sm mb-4 shadow-lg shadow-orange-500/20">
                     LAST CHANCE
                  </div>

                  <h2 className="text-lg md:text-3xl font-black text-white mb-2 md:mb-4 leading-tight">
                     Add Another Storybook?
                  </h2>

                  <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6 relative py-2 scale-75 md:scale-100 origin-center">
                     <div className="absolute inset-0 bg-magic-orange/10 blur-xl rounded-full transform scale-75"></div>
                     <div className="w-24 h-32 md:w-28 md:h-36 bg-blue-600 rounded-lg shadow-2xl rotate-[-6deg] border-2 border-white/10 transform translate-x-2 md:translate-x-4 hover:rotate-[-3deg] transition-transform"></div>
                     <div className="w-24 h-32 md:w-28 md:h-36 bg-purple-600 rounded-lg shadow-2xl z-10 rotate-[6deg] border-2 border-white/10 transform -translate-x-2 md:-translate-x-4 hover:rotate-[3deg] transition-transform"></div>
                  </div>

                  <p className="text-gray-300 mb-4 md:mb-8 text-xs md:text-lg leading-relaxed">
                     Create a second adventure with a different theme (Space, Dinosaur, or Underwater) for a massive discount.
                  </p>

                  <div className="flex flex-col gap-2 md:gap-4 items-center w-full">
                     <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 bg-white/5 px-3 py-2 rounded-xl border border-white/5 w-full">
                        <span className="text-gray-500 line-through text-sm md:text-lg font-bold">$29.99</span>
                        <i className="fa-solid fa-arrow-right text-gray-600 text-xs"></i>
                        <span className="text-xl md:text-3xl font-black text-green-500">$2.99</span>
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded ml-1">90% OFF</span>
                     </div>

                     <Button onClick={handleYes} fullWidth size="lg" className="bg-magic-orange hover:bg-orange-500 text-base md:text-xl py-3 md:py-4 shadow-xl shadow-orange-500/30 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all">
                        YES! Add Extra Book <i className="fa-solid fa-book-medical ml-2"></i>
                     </Button>

                     <button onClick={handleNo} className="text-gray-500 text-xs md:text-sm hover:text-white hover:underline mt-1 transition-colors py-2">
                        No thanks, I'll stick to one book
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};


export default UpsellBook;