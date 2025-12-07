
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { TrustSection } from '@/app/components/TrustSection';
import { Testimonials } from '@/app/components/Testimonials';
import { useLanguage } from '@/app/contexts/LanguageContext';

const COVER_IMAGES = [
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Forest%20Adventure%20boy%20and%20girl%20hiking%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20An%20Amazing%20Adventure%20hiking%20map%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Spooky%20Forest%20halloween%20pumpkins%20kids%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Enchanted%20Castle%20magic%20kids%20torch%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Mysterious%20Cave%20kids%20lantern%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Animal%20Friends%20girl%20dog%20rabbit%20raccoon%20cartoon%20pixar%20style?width=400&height=600&nologo=true",
   "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Curious%20Cat%20boy%20lantern%20white%20cat%20night%20cartoon%20pixar%20style?width=400&height=600&nologo=true"
];

export const StoryPreview: React.FC = () => {
   const router = useRouter();
   const { config } = useStory(); // it should be here generated
   const [mounted, setMounted] = useState(false);
   const { t } = useLanguage();

   useEffect(() => {
      setMounted(true);
   }, []);

   const generatedStory = {
      "title": "The Brave Adventures of ylli",
      "pages": [
         {
            "text": "Once upon a time, in a land far away, lived a brave hero named ylli.",
            "imageDescription": "Hero standing on a hill"
         },
         {
            "text": "ylli loved the color Yellow and always wore a cape of that shade.",
            "imageDescription": "Hero wearing a cape"
         },
         {
            "text": "One day, ylli visited Chocolate Mountain and met a friendly tiny dragon.",
            "imageDescription": "Hero meeting friends"
         },
         {
            "text": "They used  to help a lost star find its way home.",
            "imageDescription": "Hero using powers"
         },
         {
            "text": "The star twinkled 'Thank you!' and granted ylli's wish: asdasd.",
            "imageDescription": "Star glowing brightly"
         },
         {
            "text": "And so, they all lived happily ever after. The End.",
            "imageDescription": "Group hug"
         }
      ]
   }

   const [randomCover] = useState(() => COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)]);

   // Handle case where story is missing
   if (!generatedStory) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
            <div className="text-8xl text-gray-700 mb-6 animate-bounce">
               <i className="fa-solid fa-book-open"></i>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">{t('prev_no_story')}</h2>
            <Button onClick={() => router.push('/hero')} size="lg" className="text-xl">{t('prev_create')}</Button>
         </div>
      );
   }

   if (!mounted) return null;

   // Generate a cover image URL if specific one isn't present
   const coverUrl = randomCover;

   const downloadButtonText = config?.heroName
      ? `Download ${config?.heroName}'s Craft`
      : "Download Your Hero's Craft";

   return (
      <div className="flex flex-col items-center justify-start min-h-[90vh] px-4 py-8 animate-fade-in relative overflow-x-hidden">

         {/* LOCKED BOOK COVER VIEW (Reader Removed) */}
         <div className="relative mb-8 mt-4 group cursor-pointer" onClick={() => router.push('/pricing')}>
            <div className="w-[300px] md:w-[350px] aspect-[2/3] rounded-r-2xl rounded-l-md bg-[#1e293b] relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-105 hover:-rotate-1 border-l-4 border-white/5 overflow-hidden">

               {/* Cover Image */}
               <img
                  src={coverUrl}
                  alt="Cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

               {/* Title */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center z-10">
                  <div className="bg-[#111827]/90 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-[#FF9F1C] shadow-2xl">
                     <h1 className="text-2xl font-black text-[#FF9F1C] leading-tight line-clamp-3 font-serif">
                        {generatedStory.title}
                     </h1>
                  </div>
               </div>

               {/* Lock Overlay */}
               <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 p-6 rounded-full border-2 border-magic-orange shadow-2xl scale-110">
                     <i className="fa-solid fa-lock text-4xl text-magic-orange"></i>
                  </div>
               </div>

               {/* Author */}
               <div className="absolute bottom-8 w-full text-center z-10">
                  <p className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-1">Written For</p>
                  <p className="text-white font-bold text-lg"> {config?.heroName || "The Hero"}</p>
               </div>
            </div>

            {/* Spine Effect */}
            {/* <div className="absolute top-1 bottom-1 -left-2 w-4 bg-gray-800 rounded-l-md shadow-inner"></div> */}
         </div>

         <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Your Story is Ready!</h2>
            <p className="text-gray-400">Unlock the full adventure to start reading.</p>
         </div>

         {/* Download Action */}
         <div className="w-full flex justify-center mb-12">
            <Button
               onClick={() => router.push('/generating-2')}
               size="lg"
               variant="transparent"
               className="bg-magic-green hover:bg-green-600 border-b-4 border-green-700 rounded-2xl shadow-lg shadow-green-500/20 text-xl px-12 py-4 animate-bounce-slow"
            >
               <i className="fa-solid fa-lock-open mr-2"></i> {downloadButtonText}
            </Button>
         </div>

         {/* Footer Trust Section (Reusable) */}
         <TrustSection variant="full" className="mb-16" />

         {/* Testimonials (Reusable) */}
         <Testimonials variant="compact" />

      </div>
   );
};

export default StoryPreview;
