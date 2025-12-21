
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { ReadingStyle, VoiceStyle } from '@/app/types';
import { Button } from '@/app/components/Button';
import { playMagicSound } from '@/app/utils/audio';
import { SelectionCard } from './components/SelectionCard';
import { DASHBOARD_PATHS } from '@/app/constants/relativeRoutePaths';

const STYLE_OPTIONS = [
  {
    id: ReadingStyle.MODERN,
    label: "Modern Digital",
    desc: "Clean layout with image on top and story text below. Perfect for all devices.",
    icon: "fa-mobile-screen",
    image: "https://image.pollinations.ai/prompt/layout%20preview%20image%20top%20text%20bottom%20clean%20ui?width=400&height=300&nologo=true"
  },
  {
    id: ReadingStyle.OVERLAY,
    label: "Magic Overlay",
    desc: "The story text floats in a glass card over the illustration for a cinematic feel.",
    icon: "fa-wand-magic-sparkles",
    image: "https://image.pollinations.ai/prompt/immersive%20full%20page%20story%20layout%20floating%20white%20text%20at%20bottom%20no%20box?width=400&height=300&nologo=true"
  },
  {
    id: ReadingStyle.MINIMAL,
    label: "Clean Canvas",
    desc: "Just like a classic storybook. The artwork is centered, and the text flows elegantly underneath.",
    icon: "fa-leaf",
    image: "https://image.pollinations.ai/prompt/minimal%20story%20layout%20white%20text%20on%20dark%20background%20elegant%20serif?width=400&height=300&nologo=true"
  },
  {
    id: ReadingStyle.SPLIT,
    label: "Classic Split",
    desc: "Side-by-side layout that feels like an open book. Best for Tablets and Desktops.",
    icon: "fa-book-open",
    image: "https://image.pollinations.ai/prompt/split%20screen%20layout%20image%20left%20text%20right%20book%20style?width=400&height=300&nologo=true"
  }
];

const VOICE_OPTIONS = [
  {
    id: VoiceStyle.NARRATOR,
    label: "Standard Narrator",
    icon: "fa-microphone",
    desc: "The classic, clear storyteller voice for everyday magic.",
    color: 'blue' as const
  },
  {
    id: VoiceStyle.GRANDMA,
    label: "Grandma Joy",
    icon: "fa-heart",
    desc: "Slow, warm, and comforting bedtime voice for cozy tales.",
    color: 'pink' as const
  },
  {
    id: VoiceStyle.WIZARD,
    label: "Wise Wizard",
    icon: "fa-hat-wizard",
    desc: "Deep, mysterious, and slow magical voice from afar.",
    color: 'purple' as const
  },
  {
    id: VoiceStyle.PIXIE,
    label: "Magic Pixie",
    icon: "fa-sparkles",
    desc: "Fast, energetic, and high-pitched cheerful storyteller.",
    color: 'pink' as const
  }
];

export const ReadingConfig: React.FC = () => {
  const router = useRouter();
  const { readingStyle, setReadingStyle, voiceStyle, setVoiceStyle } = useStory();

  const handleSelectStyle = (style: ReadingStyle) => {
    playMagicSound();
    setReadingStyle(style);
  };

  const handleSelectVoice = (voice: VoiceStyle) => {
    playMagicSound();
    setVoiceStyle(voice);
    
    const utter = new SpeechSynthesisUtterance("Hello! I am your magic story reader.");
    switch (voice) {
      case VoiceStyle.GRANDMA: utter.rate = 0.8; utter.pitch = 1.1; break;
      case VoiceStyle.WIZARD: utter.rate = 0.7; utter.pitch = 0.8; break;
      case VoiceStyle.PIXIE: utter.rate = 1.2; utter.pitch = 1.4; break;
      default: utter.rate = 1.0; utter.pitch = 1.0; break;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="animate-fade-in space-y-12 pb-24">
        {/* Header Well */}
        <div className="bg-magic-card/30 p-6 md:p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-1 drop-shadow-lg">
                    Reader Settings <i className="fa-solid fa-sliders text-magic-orange ml-2"></i>
                </h1>
                <p className="text-gray-400 font-bold">Customize your reading journey.</p>
            </div>
            <Button onClick={() => router.push(DASHBOARD_PATHS.LIBRARY)} variant="ghost" className="text-gray-400 hover:text-white">
               <i className="fa-solid fa-arrow-left mr-2"></i> Back to Library
            </Button>
        </div>

        {/* Visual Layouts Section */}
        <section className="bg-white/2 p-6 md:p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <i className="fa-solid fa-layer-group text-magic-purple"></i> 1. Visual Story Layout
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STYLE_OPTIONS.map((style) => (
                    <SelectionCard
                        key={style.id}
                        id={style.id}
                        label={style.label}
                        desc={style.desc}
                        icon={style.icon}
                        image={style.image}
                        isSelected={readingStyle === style.id}
                        activeColor="purple"
                        onClick={() => handleSelectStyle(style.id)}
                    />
                ))}
            </div>
        </section>

        {/* Voice Personas Section */}
        <section className="bg-white/2 p-6 md:p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <i className="fa-solid fa-volume-high text-magic-blue"></i> 2. Magic Voice Personas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {VOICE_OPTIONS.map((voice) => (
                    <SelectionCard
                        key={voice.id}
                        id={voice.id}
                        label={voice.label}
                        desc={voice.desc}
                        icon={voice.icon}
                        isSelected={voiceStyle === voice.id}
                        activeColor={voice.color}
                        onClick={() => handleSelectVoice(voice.id)}
                    />
                ))}
            </div>
        </section>

        {/* Action Well */}
        <div className="bg-gradient-to-br from-magic-purple/10 to-magic-blue/10 p-10 rounded-[3rem] border border-white/10 text-center flex flex-col items-center gap-6 shadow-2xl">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-magic-purple text-3xl shadow-inner border border-white/5">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for the Adventure?</h3>
                <p className="text-gray-400 max-w-md mx-auto">Open any book to see your new layout and hear your chosen magic voice in action.</p>
             </div>
             <Button onClick={() => router.push(DASHBOARD_PATHS.LIBRARY)} size="lg" className="bg-magic-purple px-12 shadow-purple-500/20">
                Go to My Library
             </Button>
        </div>
    </div>
  );
};

export default ReadingConfig;
