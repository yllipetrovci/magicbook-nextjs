'use client';
import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const Terms: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full animate-fade-in">
        <h1 className="text-4xl font-black text-white mb-8 text-center">{t('terms_title')}</h1>

        <div className="bg-magic-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl text-gray-300 space-y-6 leading-relaxed">
          <p className="text-sm text-gray-500">{t('terms_last_updated')}</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('terms_1_title')}</h2>
            <p>{t('terms_1_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('terms_2_title')}</h2>
            <p>{t('terms_2_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('terms_3_title')}</h2>
            <p>{t('terms_3_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('terms_4_title')}</h2>
            <p>{t('terms_4_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('terms_5_title')}</h2>
            <p>{t('terms_5_desc')}</p>
          </section>

          <div className="border-t border-white/10 pt-6 mt-8">
            <p className="text-sm">{t('terms_contact')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;