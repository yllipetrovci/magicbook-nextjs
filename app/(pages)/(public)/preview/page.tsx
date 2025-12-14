
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
   const { generatedStory, t, config } = useStory();
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

   const handleDownloadPDF = async () => {

      router.push(PATHS.GENERATING_2);
      return;
      setIsCraftingPDF(true);
      setProgress(10); // Start

      try {
         // Step 1: Start 
         setCurrentStepIndex(0);

         // Step 2-4: The PDF service does the heavy lifting. 
         // Since it's a single await, we'll simulate steps with a timer interval 
         // that fills up to 90%, then jumps to 100% when done.

         const progressInterval = setInterval(() => {
            setProgress(prev => {
               const next = prev + 5;
               const totalSteps = CRAFTING_STEPS.length - 1;
               // Map 0-90% to steps 0-3
               const estimatedStep = Math.floor((next / 90) * (totalSteps));
               if (estimatedStep > currentStepIndex && estimatedStep < totalSteps) {
                  setCurrentStepIndex(estimatedStep);
               }
               return next > 90 ? 90 : next;
            });
         }, 500);

         // Actual Generation
         // await generateStoryPDF(generatedStory);

         clearInterval(progressInterval);
         setProgress(100);
         setCurrentStepIndex(4); // "Ready"

         // Short delay to show completion before moving on
         setTimeout(() => {
            setIsCraftingPDF(false);
            router.push('/pricing');
         }, 1500);

      } catch (error) {
         console.error("Failed to generate PDF", error);
         alert("Oops! The magic printer jammed. Please try again.");
         setIsCraftingPDF(false);
      }
   };

   if (isCraftingPDF) {
      const currentStep = CRAFTING_STEPS[currentStepIndex];

      return (
         <div className="fixed inset-0 bg-[#0B0C15]/95 backdrop-blur-xl z-50 overflow-y-auto animate-fade-in">
            {/* Center Content Wrapper */}
            <div className="flex flex-col items-center justify-center min-h-full w-full p-4 md:p-8 relative">

               {/* Floating Particles Background */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 text-magic-purple opacity-20 animate-float text-4xl"><i className="fa-solid fa-star"></i></div>
                  <div className="absolute bottom-1/3 right-1/4 text-magic-orange opacity-20 animate-float-delayed text-2xl"><i className="fa-solid fa-sparkles"></i></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-magic-purple/20 blur-[100px] rounded-full"></div>
               </div>

               {/* Main Icon Circle */}
               <div className="relative mb-8 transform scale-90 md:scale-110">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 flex items-center justify-center bg-magic-card shadow-[0_0_50px_rgba(124,58,237,0.3)] relative z-10">
                     <i className={`fa-solid ${currentStep.icon} text-4xl md:text-5xl ${currentStep.color} animate-bounce-slow transition-all duration-300`}></i>
                  </div>
                  {/* Spinning Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-t-magic-purple border-r-transparent border-b-magic-orange border-l-transparent animate-spin w-24 h-24 md:w-32 md:h-32 -m-[2px]"></div>
               </div>

               <h2 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 text-center drop-shadow-lg transition-all duration-300">
                  Crafting Your PDF...
               </h2>
               <p className="text-magic-orange text-lg md:text-2xl mb-6 md:mb-8 font-bold animate-pulse text-center min-h-[32px]">
                  {currentStep.label}
               </p>

               {/* Progress Bar */}
               <div className="w-full max-w-xs md:max-w-md h-3 md:h-4 bg-gray-800 rounded-full mb-8 overflow-hidden border border-white/10 relative shadow-inner">
                  <div
                     className="h-full bg-gradient-to-r from-magic-purple via-magic-pink to-magic-orange transition-all duration-100 ease-linear"
                     style={{ width: `${progress}%` }}
                  ></div>
                  {/* Shine effect on bar */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
               </div>

               {/* Steps Checklist */}
               <div className="flex flex-col gap-3 w-full max-w-xs md:max-w-sm">
                  {CRAFTING_STEPS.map((step, idx) => {
                     const isCompleted = idx < currentStepIndex;
                     const isActive = idx === currentStepIndex;

                     return (
                        <div
                           key={idx}
                           className={`flex items-center gap-4 p-2 md:p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/10 scale-105 border border-white/20 shadow-lg' : 'opacity-40'}`}
                        >
                           <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs border flex-shrink-0 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : (isActive ? 'border-white text-white animate-spin' : 'border-gray-600 text-gray-600')}`}>
                              {isCompleted ? <i className="fa-solid fa-check"></i> : (isActive ? <i className="fa-solid fa-circle-notch"></i> : <i className="fa-solid fa-circle"></i>)}
                           </div>
                           <span className={`font-bold text-xs md:text-sm ${isActive || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                              {step.label}
                           </span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      );
   }

   // Generate a cover image URL if specific one isn't present
   const coverUrl = generatedStory.coverImage || randomCover;
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
            story={generatedStory}
            config={config}
            isLocked={true}
            onDownload={handleDownloadPDF}
            className="mb-8"
         />

         {/* Download Action */}
         <div className="w-full flex justify-center mb-16">
            <Button
               onClick={handleDownloadPDF}
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
