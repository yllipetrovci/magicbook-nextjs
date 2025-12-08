
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';

const FloatingSparkles = () => {
   return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[15%] right-[10%] text-yellow-300/20 text-4xl animate-pulse-slow"><i className="fa-solid fa-star"></i></div>
         <div className="absolute bottom-[30%] left-[5%] text-magic-green/20 text-2xl animate-float"><i className="fa-solid fa-film"></i></div>
         <div className="absolute top-[40%] left-[20%] text-magic-purple/20 text-3xl animate-wiggle"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
      </div>
   );
};

export const UpsellVideo: React.FC = () => {
   const router = useRouter();
   const { config } = useStory();

   const handleNext = () => {
      router.push('/upsell-daily');
   };

   return (
      <div className="z-[100] overflow-y-auto bg-[#0B0C15] animate-fade-in font-sans text-white bg-[radial-gradient(circle_at_center,_#1a1c2e_0%,_#0B0C15_100%)]">
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

               {/* LEFT: VIDEO PREVIEW VISUAL */}
               <div className="relative order-2 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.15)] border border-white/10 group aspect-video bg-black">
                     {/* Magical Glow Behind */}
                     <div className="absolute inset-0 bg-gradient-to-bl from-magic-green/20 to-magic-blue/20 mix-blend-overlay"></div>

                     <div className="absolute inset-0 flex items-center justify-center bg-[url('https://image.pollinations.ai/prompt/cinematic%20shot%20cute%20child%20hero%20flying%20dragon%20clouds%20pixar%20movie%20still?width=800&height=450&nologo=true')] bg-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"></div>

                     {/* Play Button Overlay */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-pulse-slow">
                           <i className="fa-solid fa-play text-3xl text-white ml-1"></i>
                        </div>
                     </div>

                     {/* Overlay Content */}
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="flex items-center gap-2 text-magic-green text-xs font-bold uppercase tracking-widest mb-1">
                           <i className="fa-solid fa-video"></i> 4K Resolution
                        </div>
                        <p className="text-white font-serif italic text-lg leading-relaxed">
                           "Watching {config.heroName} fly across the screen brought tears to my eyes. It's like a real movie!"
                        </p>
                     </div>
                  </div>
               </div>

               {/* RIGHT: OFFER CONTENT */}
               <div className="order-1 lg:order-2 text-left space-y-8">

                  <div>
                     <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-magic-green/10 border border-magic-green/30 text-magic-green text-xs font-bold uppercase tracking-widest mb-4">
                        <i className="fa-solid fa-film"></i> Bring the Story to Life
                     </div>
                     <h1 className="text-4xl md:text-5xl font-black text-white font-serif leading-tight mb-4 drop-shadow-lg">
                        Turn the Adventure into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-magic-green to-emerald-300">Magic Video</span>
                     </h1>
                     <p className="text-lg text-gray-300 leading-relaxed">
                        Don't just read the story—watch it! We'll transform your book into a narrated, animated video starring {config.heroName}.
                     </p>
                  </div>

                  {/* Feature Box */}
                  <div className="bg-magic-card/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-magic-purple/20 flex items-center justify-center text-magic-purple shrink-0">
                           <i className="fa-solid fa-microphone-lines"></i>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Professional Narration</h4>
                           <p className="text-gray-400 text-sm">Soothing voiceover that reads the story aloud perfectly.</p>
                        </div>
                     </div>

                     <div className="w-full h-px bg-white/5"></div>

                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-magic-blue/20 flex items-center justify-center text-magic-blue shrink-0">
                           <i className="fa-solid fa-share-nodes"></i>
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Easy to Share</h4>
                           <p className="text-gray-400 text-sm">Perfect for sending to grandparents or sharing on social media.</p>
                        </div>
                     </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4">
                     <div className="flex items-end gap-3 mb-6">
                        <span className="text-4xl font-black text-white font-serif">$4.99</span>
                        <span className="text-lg text-gray-500 line-through mb-1.5 decoration-red-500/50">$24.99</span>
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold mb-2 border border-red-500/20">80% OFF</span>
                     </div>

                     <Button
                        onClick={handleNext}
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-magic-green to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 shadow-[0_0_30px_rgba(34,197,94,0.3)] text-xl py-5 border-t border-white/20 font-serif"
                     >
                        Yes, Add Magic Video <i className="fa-solid fa-wand-sparkles ml-2 text-yellow-200"></i>
                     </Button>

                     <button
                        onClick={handleNext}
                        className="w-full text-center mt-4 text-sm text-gray-500 font-medium hover:text-white transition-colors"
                     >
                        No thanks, just the book
                     </button>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};

export default UpsellVideo;
