
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const About: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-magic-purple/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-magic-purple/30">
            <i className="fa-solid fa-wand-magic-sparkles text-4xl text-magic-purple"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('about_title')}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('about_subtitle')}
          </p>
        </div>

        <div className="bg-magic-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <i className="fa-solid fa-rocket text-magic-orange"></i> {t('about_mission')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('about_mission_desc')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <i className="fa-solid fa-shield-heart text-magic-green"></i> {t('about_safety')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('about_safety_desc')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <i className="fa-solid fa-users text-magic-blue"></i> {t('about_team')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('about_team_desc')}
            </p>
          </section>
        </div>

        <div className="flex justify-center pt-8">
          <Button onClick={() => router.push('/hero')} size="lg" className="animate-bounce-slow">
            {t('about_btn_start')} <i className="fa-solid fa-arrow-right ml-2"></i>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default About;