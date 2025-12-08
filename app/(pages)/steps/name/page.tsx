
'use client'
import { playMagicSound } from "@/app/utils/audio";
import { useEffect, useState } from "react";
import { useStory } from "@/app/contexts/StoryContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Button } from "@/app/components";
import { useRouter } from "next/navigation";
import { STEPS_PATHS } from "@/app/constants/stepsPaths";

export default function NamePage() {
    const router = useRouter();
    const names = ['Lucas', 'Emma', 'Leo', 'Mila', 'Noah', 'Sofia', 'Oliver', 'Mia', 'Ethan', 'Ava'];
    const { config, updateConfig } = useStory();
    const { t } = useLanguage();

    const [localName, setLocalName] = useState(config.heroName || '');
    const randomIndex = Math.floor(Math.random() * names.length);
    const [placeholderName, setPlaceholderName] = useState(names[randomIndex]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 👈 Prevent hydration mismatch

    const goNextPage = () => {
        router.push(STEPS_PATHS.STEP_2)
    }

    const handleNameSubmit = () => {
        if (!localName.trim()) return;
        playMagicSound();
        updateConfig('heroName', localName);
        goNextPage();
    };




    return (
        <div key="name" className="w-full max-w-lg animate-slide-up-fade md:mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
                {t('namePage.title')}
            </h2>
            <p className="text-xl text-gray-400 text-center mb-8">{t('namePage.subtitle')}</p>

            <div className="bg-magic-card p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-magic-orange to-magic-purple"></div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-magic-orange/20 rounded-xl flex items-center justify-center text-magic-orange text-xl">
                        <i className="fa-solid fa-pen-nib"></i>
                    </div>
                    <label className="text-lg font-bold text-white">{t('namePage.heroNameLabel')}</label>
                </div>

                <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                    className="w-full p-5 bg-magic-bg rounded-2xl border border-white/10 focus:border-magic-orange focus:ring-2 focus:ring-magic-orange/50 outline-none transition-all text-2xl font-bold text-white placeholder-gray-600 mb-3 text-center"
                    placeholder={`e.g. ${placeholderName}`}
                    autoFocus
                />

                <p className="text-sm text-gray-400 font-medium text-center mb-8 flex items-center justify-center gap-2 animate-pulse">
                    {t('namePage.nameWillAppear')}
                </p>

                <Button
                    onClick={handleNameSubmit}
                    fullWidth
                    disabled={!localName.trim()}
                    size="lg"
                    className={!localName.trim() ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-slow shadow-lg shadow-orange-500/20'}
                >
                    {t('namePage.nextStep')} <i className="fa-solid fa-arrow-right ml-2"></i>
                </Button>

                <div className="mt-4 text-center">
                    <Button variant="ghost" onClick={() => router.back()} className="text-gray-500 hover:text-white text-sm">
                        <i className="fa-solid fa-arrow-left mr-1"></i> {t('namePage.back')}
                    </Button>
                </div>
            </div>
        </div>
    )
}