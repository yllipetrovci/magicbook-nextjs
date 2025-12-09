'use client'
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { playMagicSound } from '@/app/utils/audio';
import { Button } from '@/app/components';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { STEPS_PATHS } from '@/app/constants/stepsPaths';

const themeKeys = [
  { id: 'christmas', key: 'theme_santa', icon: 'fa-candy-cane', color: 'bg-red-500', isLimited: true },
  { id: 'comic', key: 'theme_comic', icon: 'fa-book-open', color: 'bg-orange-500' },
  { id: 'fantasy', key: 'theme_fantasy', icon: 'fa-hat-wizard', color: 'bg-purple-500' },
  { id: 'epic', key: 'theme_epic', icon: 'fa-bolt', color: 'bg-green-500' },
  { id: 'royal', key: 'theme_royal', icon: 'fa-crown', color: 'bg-pink-500' },
  { id: 'superhero', key: 'theme_superhero', icon: 'fa-mask', color: 'bg-blue-500' },
  { id: 'special', key: 'theme_special', icon: 'fa-wand-magic-sparkles', color: 'bg-indigo-500', descriptionKey: 'desc_special' },
];




export default function AdventureSelection() {
  const router = useRouter();
  const { updateConfig, config } = useStory();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleSelect = (themeName: string) => {
    playMagicSound();
    updateConfig('theme', themeName);
  };

  const handleArchetypeSelect = (type: 'hero' | 'royal') => {
    playMagicSound();
    updateConfig('archetype', type);
  };

  const currentArchetype = config.archetype || 'hero';

  return (
    <div className="flex flex-col items-center min-h-[60vh] px-4 py-8 w-full">
      <h2 className="text-4xl font-bold text-magic-orange mb-2 drop-shadow-md text-center">{t('adventurePage.title')}</h2>
      <p className="text-xl text-gray-400 mb-12 text-center">{t('adventurePage.subtitle')}</p>

      {/* Archetype Selection (Moved from Details) */}
      <div className="w-full max-w-2xl mx-auto mb-12">
        <h3 className="text-white font-bold text-lg mb-4 text-center text-magic-purple uppercase tracking-wider">{t('adventurePage.characterTitle')}</h3>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleArchetypeSelect('hero')}
            className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 group ${currentArchetype === 'hero' ? 'bg-magic-orange/20 border-magic-orange shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-105' : 'bg-magic-card border-white/10 hover:bg-white/5 opacity-70 hover:opacity-100'}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${currentArchetype === 'hero' ? 'bg-magic-orange text-white' : 'bg-white/10 text-gray-500'}`}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg">{t('adventurePage.characterHero')}</div>
              <div className="text-xs text-gray-400">{t('adventurePage.characterHeroDesc')}</div>
            </div>
          </button>

          <button
            onClick={() => handleArchetypeSelect('royal')}
            className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 group ${currentArchetype === 'royal' ? 'bg-magic-purple/20 border-magic-purple shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105' : 'bg-magic-card border-white/10 hover:bg-white/5 opacity-70 hover:opacity-100'}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${currentArchetype === 'royal' ? 'bg-magic-purple text-white' : 'bg-white/10 text-gray-500'}`}>
              <i className="fa-solid fa-crown"></i>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg">{t('adventurePage.characterRoyal')}</div>
              <div className="text-xs text-gray-400">{t('adventurePage.characterRoyalDesc')}</div>
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {themeKeys.map((theme) => {
          const translatedName = t(theme.key);
          const description = (theme as any).descriptionKey ? t((theme as any).descriptionKey) : (theme.isLimited ? `🎄 ${t('adv_limited')}` : t('adv_click'));
          const isSelected = config.theme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              className={`
                text-left bg-magic-card p-6 rounded-2xl border border-white/5 
                hover:scale-[1.03] hover:shadow-2xl hover:border-magic-purple hover:shadow-purple-500/20 
                transition-all duration-300 group relative overflow-hidden
                ${theme.isLimited && config.theme !== 'christmas' ? 'ring-2 ring-red-500/50' : ''}
                ${isSelected ? 'ring-2 ring-magic-purple' : 'border-magic-purple shadow-purple-500/20'}
                `

              }
            >
              {/* Limited Offer Badge */}
              {theme.isLimited && (
                <div className="absolute top-0 right-0">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500 to-transparent opacity-30 rounded-bl-full"></div>
                  <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl relative z-10 shadow-sm flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-300"></i> {t('adventurePage.specialBadge')}
                  </div>
                </div>
              )}

              <div className={`${theme.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce`}>
                <i className={`fa-solid ${theme.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{translatedName}</h3>
              <p className={`text-sm ${theme.isLimited ? 'text-red-400 font-bold' : ((theme as any).descriptionKey ? 'text-gray-300 font-medium' : 'text-gray-500 group-hover:text-gray-400 transition-colors')}`}>
                {description}
              </p>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => router.push(STEPS_PATHS.STEP_6)} fullWidth size="lg" className="text-xl shadow-xl shadow-purple-500/20 bg-gradient-to-r from-magic-purple to-magic-pink hover:to-pink-500 border-none animate-pulse-slow min-w-[200px]">
          Next
        </Button>
      </div>

    </div>
  );
};
