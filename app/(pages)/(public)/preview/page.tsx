
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { TrustSection } from '@/app/components/TrustSection';
import { Testimonials } from '@/app/components/Testimonials';
import { useLanguage } from '@/app/contexts/LanguageContext';
// import { generateStoryPDF } from '../../../lib/generateStoryPDF';
import { PATHS } from '@/app/constants/relativeRoutePaths';
import { BookCoverPreview } from './components/BookCoverPreview';

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
   const { config } = useStory();
   const { t } = useLanguage();
   const [isCraftingPDF, setIsCraftingPDF] = useState(false);
   const [randomCover] = useState(() => COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)]);

   // Animation State for PDF Progress
   const [progress, setProgress] = useState(0);
   const [currentStepIndex, setCurrentStepIndex] = useState(0);

   const heroName = config.heroName || "The Hero";

   const CRAFTING_STEPS = [
      { label: "Rendering High-Res Illustrations...", icon: "fa-palette", color: "text-pink-400" },
      { label: "Typesetting Story Text...", icon: "fa-pen-nib", color: "text-blue-400" },
      { label: "Compiling Magic Pages...", icon: "fa-layer-group", color: "text-purple-400" },
      { label: "Binding the Enchanted Book...", icon: "fa-book-open", color: "text-orange-400" },
      { label: "Your PDF is Ready!", icon: "fa-check-circle", color: "text-green-400" }
   ];

   // Handle case where story is missing
   // if (!generatedStory) {
   //    return (
   //       <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
   //          <div className="text-8xl text-gray-700 mb-6 animate-bounce">
   //             <i className="fa-solid fa-book-open"></i>
   //          </div>
   //          <h2 className="text-4xl font-black text-white mb-4">{t('prev_no_story')}</h2>
   //          <Button onClick={() => router.push('/hero')} size="lg" className="text-xl">{t('prev_create')}</Button>
   //       </div>
   //    );
   // }

   // const handleDownloadPDF = async () => {

   //    router.push(PATHS.GENERATING_2);
   //    return;
   //    setIsCraftingPDF(true);
   //    setProgress(10); // Start

   //    try {
   //       // Step 1: Start 
   //       setCurrentStepIndex(0);

   //       // Step 2-4: The PDF service does the heavy lifting. 
   //       // Since it's a single await, we'll simulate steps with a timer interval 
   //       // that fills up to 90%, then jumps to 100% when done.

   //       const progressInterval = setInterval(() => {
   //          setProgress(prev => {
   //             const next = prev + 5;
   //             const totalSteps = CRAFTING_STEPS.length - 1;
   //             // Map 0-90% to steps 0-3
   //             const estimatedStep = Math.floor((next / 90) * (totalSteps));
   //             if (estimatedStep > currentStepIndex && estimatedStep < totalSteps) {
   //                setCurrentStepIndex(estimatedStep);
   //             }
   //             return next > 90 ? 90 : next;
   //          });
   //       }, 500);

   //       // Actual Generation
   //       // await generateStoryPDF(generatedStory);

   //       clearInterval(progressInterval);
   //       setProgress(100);
   //       setCurrentStepIndex(4); // "Ready"

   //       // Short delay to show completion before moving on
   //       setTimeout(() => {
   //          setIsCraftingPDF(false);
   //          router.push('/pricing');
   //       }, 1500);

   //    } catch (error) {
   //       console.error("Failed to generate PDF", error);
   //       alert("Oops! The magic printer jammed. Please try again.");
   //       setIsCraftingPDF(false);
   //    }
   // };

   // Generate a cover image URL if specific one isn't present
   // const coverUrl = generatedStory.coverImage || randomCover;

   const goNextPage = ()=> router.push(PATHS.GENERATING_2)
   const downloadButtonText = config.heroName
      ? `Step Into ${config.heroName}'s Adventure`
      : "Step Into Your Hero's Adventure";

   return (
      <div className="flex flex-col items-center justify-start min-h-[90vh] px-4 py-8 animate-fade-in relative overflow-x-hidden">

         <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 font-serif">Your Story is Ready!</h2>
            <p className="text-gray-400 text-lg">Unlock the full adventure to start reading.</p>
         </div>

         {/* NEW REUSABLE PREVIEW COMPONENT */}
         <BookCoverPreview
            story={{
               title:"The Amazing Adventure",
               coverImage: randomCover,
               heroName: config.heroName || "The Hero"
            }}
            config={config}
            isLocked={true}
            onClick={goNextPage}
            className="mb-8"
         />

         {/* Download Action */}
         <div className="w-full flex justify-center mb-16">
            <Button
               // onClick={handleDownloadPDF}
               onClick={goNextPage}
               size="lg"
               variant='transparent'
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
