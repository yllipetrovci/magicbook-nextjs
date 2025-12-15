'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { GeneratedStory } from '@/app/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PATHS, STEPS_PATHS } from '@/app/constants/relativeRoutePaths';
import { generateMagicStory } from '@/lib/ai-service/deepseek/generateStoryService';


const Generating: React.FC = () => {
  const router = useRouter();
  const { config,
    setGeneratedStory

  } = useStory();
  const { t } = useLanguage();
  const LOADING_STEPS = [
    t("generatingPage.gen_step_1"),
    t("generatingPage.gen_step_2"),
    t("generatingPage.gen_step_3"),
    t("generatingPage.gen_step_4"),
    t("generatingPage.gen_step_5"),
    t("generatingPage.gen_step_6"),
    t("generatingPage.gen_step_7"),
    t("generatingPage.gen_step_8")
  ];
  const [loadingStep, setLoadingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Animation loop for loading steps
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        const next = (prev + 1) % LOADING_STEPS.length;
        setCompletedSteps(curr => [...curr, LOADING_STEPS[prev]].slice(-3)); // Keep last 3
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;

    const performGeneration = async () => {
      try {
        // In a real app, handle API Key check or user prompt better
        let story: GeneratedStory;

        story = {
          title: `The Brave Adventures of ${config.heroName}`,
          pages: [
            { text: `Once upon a time, in a land far away, lived a brave hero named ${config.heroName}.`, imageDescription: "Hero standing on a hill" },
            { text: `${config.heroName} loved the color ${config.color} and always wore a cape of that shade.`, imageDescription: "Hero wearing a cape" },
            { text: `One day, ${config.heroName} visited ${config.place} and met ${config.companions}.`, imageDescription: "Hero meeting friends" },
            { text: `They used ${config.superPower} to help a lost star find its way home.`, imageDescription: "Hero using powers" },
            { text: `The star twinkled 'Thank you!' and granted ${config.heroName}'s wish: ${config.secretWish}.`, imageDescription: "Star glowing brightly" },
            { text: `And so, they all lived happily ever after. The End.`, imageDescription: "Group hug" }
          ]
        };

        // if (!process.env.API_KEY) {
        //   console.warn("No API Key found, using mock generation");
        //   await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate longer wait for animation
        //   story = {
        //     title: `The Brave Adventures of ${config.heroName}`,
        //     pages: [
        //       { text: `Once upon a time, in a land far away, lived a brave hero named ${config.heroName}.`, imageDescription: "Hero standing on a hill" },
        //       { text: `${config.heroName} loved the color ${config.color} and always wore a cape of that shade.`, imageDescription: "Hero wearing a cape" },
        //       { text: `One day, ${config.heroName} visited ${config.place} and met ${config.companions}.`, imageDescription: "Hero meeting friends" },
        //       { text: `They used ${config.superPower} to help a lost star find its way home.`, imageDescription: "Hero using powers" },
        //       { text: `The star twinkled 'Thank you!' and granted ${config.heroName}'s wish: ${config.secretWish}.`, imageDescription: "Star glowing brightly" },
        //       { text: `And so, they all lived happily ever after. The End.`, imageDescription: "Group hug" }
        //     ]
        //   };
        // } else {
        //   // story = await generateMagicStory(config, 'en');
        // }

        if (mounted) {
          // setGeneratedStory(story as GeneratedStory);
          router.push(PATHS.PREVIEW);
        }
      } catch (e) {
        console.error(e);
        if (mounted) {
          alert("Oops! The magic wands got tangled. Please try again.");
          router.push(STEPS_PATHS.STEP_6);
        }
      }
    };

    performGeneration();

    return () => {
      mounted = false;
    }
    // setGeneratedStory, language
  }, [config, router]);

  if (!mounted) {
    return null;
  }
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
        {/* {t("gen_title", { name: (config.heroName || 'the Hero') })} */}
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