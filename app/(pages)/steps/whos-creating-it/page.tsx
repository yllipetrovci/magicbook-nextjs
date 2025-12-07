'use client'

import { useStory } from "@/app/contexts/StoryContext";
import { useEffect, useState } from "react";
import { playMagicSound } from '@/app/utils/audio';
import { Button } from "@/app/components";
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/app/contexts/LanguageContext";

const PARENT_ROLES = ['Mom', 'Dad', 'Grandma', 'Grandpa', 'Aunt', 'Uncle'];

export default function WhosCreatingItPage() {
    const { config, updateConfig, updateBatchConfigs } = useStory();
    const { t } = useLanguage();
    const router = useRouter();
    const [relationship, setRelationship] = useState(config.parentRelationship || 'Mom');
    const [localEmail, setLocalEmail] = useState(config.email || '');
    const [includeParent, setIncludeParent] = useState(config.includeParent || false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);



    const saveParentConfig = () => {
        updateBatchConfigs({
            parentRelationship: relationship,
            includeParent: includeParent,
        })
    };


    const goNextPage = () => {
        // router.push('/steps/name');
        router.push('/steps/show-cupon');


    }

    const toggleIncludeParent = () => {
        playMagicSound();
        setIncludeParent(!includeParent);
    };

    const handleEmailSubmit = () => {
        saveParentConfig();
        playMagicSound();

        if (localEmail.trim()) {
            updateConfig('email', localEmail);
            setTimeout(() => {
                goNextPage()

            }, 2000);
        } else {
            goNextPage()
        }
    };

    const handleSkipEmail = () => {
        saveParentConfig();
        playMagicSound();
        goNextPage()
    };

    if (!mounted) return null;


    return (<div key="email" className="w-full max-w-lg animate-slide-up-fade md:mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
            {t("whosCreating.title")}
        </h2>
        <p className="text-lg text-gray-400 text-center mb-8">{t("whosCreating.subtitle")}</p>

        <div className="bg-magic-card p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-magic-green to-magic-blue"></div>

            {/* Role Selection */}
            <div className="mb-8">
                <label className="text-sm font-bold text-gray-400 mb-3 block uppercase tracking-wider text-center">{t("whosCreating.role.label")}</label>
                <div className="flex flex-wrap justify-center gap-2">
                    {PARENT_ROLES.map((role) => (
                        <button
                            key={role}
                            onClick={() => setRelationship(role)}
                            className={`px-4 py-2  cursor-pointer rounded-full border-2 text-sm font-bold transition-all ${relationship === role ? 'bg-magic-purple border-magic-purple text-white shadow-lg scale-105' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Include Parent Toggle */}
            <div className="mb-8 bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:bg-white/10 transition-colors cursor-pointer" onClick={toggleIncludeParent}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${includeParent ? 'bg-magic-green text-white' : 'bg-gray-700 text-gray-400'}`}>
                        <i className="fa-solid fa-user-group"></i>
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-white text-sm">{t("whosCreating.includeParent.title")}</p>
                        <p className="text-xs text-gray-400">{t("whosCreating.includeParent.subtitle")}</p>
                    </div>
                </div>
                <div className="w-12 h-6 rounded-full bg-gray-600 p-1 transition-colors" style={{ backgroundColor: includeParent ? '#22C55E' : '#4B5563' }}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${includeParent ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </div>

            {/* Email Section */}
            <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-magic-green/20 rounded-xl flex items-center justify-center text-magic-green text-lg">
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <label className="text-lg font-bold text-white">{t("whosCreating.email.label")}</label>
                </div>

                <input
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    className="w-full p-4 bg-magic-bg rounded-2xl border border-white/10 focus:border-magic-green focus:ring-2 focus:ring-magic-green/50 outline-none transition-all text-lg font-bold text-white placeholder-gray-600 mb-2 text-center"
                    placeholder="parent@example.com"
                />
                <p className="text-xs text-center text-gray-500 mb-6">{t("whosCreating.email.helper")}</p>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={handleEmailSubmit}
                        fullWidth
                        disabled={!localEmail.trim().includes('@')}
                        size="lg"
                        className={!localEmail.trim().includes('@') ? 'opacity-50 cursor-not-allowed' : 'bg-magic-green hover:bg-green-500 shadow-lg shadow-green-500/20'}
                    >
                        {t("whosCreating.email.startButton")} <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
                    </Button>

                    <div className="flex items-center justify-center mt-2">
                        <Button
                            onClick={handleSkipEmail}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-300"
                        >
                            {t("whosCreating.email.skipButton")}
                        </Button>
                    </div>

                    {/* Social Proof & Trust Signals */}
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-yellow-400">
                            <i className="fa-solid fa-star"></i>
                            <span>{t("whosCreating.socialProof.parents")}</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-green-400 opacity-80">
                            <i className="fa-solid fa-shield-halved"></i>
                            <span>{t("whosCreating.socialProof.secure")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}