'use client'
import { useStory } from '@/app/contexts/StoryContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const Success: React.FC = () => {
    const router = useRouter();
    const { resetStory } = useStory();
    const { t } = useLanguage();

    useEffect(() => {
        const timer = setTimeout(() => {
            resetStory();
            router.push('/dashboard');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router, resetStory]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 text-4xl mb-6 animate-bounce shadow-lg shadow-green-500/30 border border-green-500/30">
                <i className="fa-solid fa-check"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-magic-purple mb-4 drop-shadow-lg">{t('succ_title')}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
                {t('succ_desc')}
            </p>
            <div className="flex items-center gap-2 text-magic-orange font-bold animate-pulse">
                <i className="fa-solid fa-spinner fa-spin"></i> {t('succ_redirect')}
            </div>
        </div>
    );
};

export default Success;