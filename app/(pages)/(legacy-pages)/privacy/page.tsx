'use client'
import { useLanguage } from '@/app/contexts/LanguageContext';

export const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full animate-fade-in">
        <h1 className="text-4xl font-black text-white mb-8 text-center">{t('privacy_title')}</h1>

        <div className="bg-magic-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl text-gray-300 space-y-6 leading-relaxed">

          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl mb-8 flex items-start gap-4">
            <i className="fa-solid fa-shield-halved text-3xl text-green-500 mt-1"></i>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{t('privacy_promise_title')}</h3>
              <p className="text-green-100/80">{t('privacy_promise_desc')}</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy_1_title')}</h2>
            <p>{t('privacy_1_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy_2_title')}</h2>
            <p>{t('privacy_2_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy_3_title')}</h2>
            <p>{t('privacy_3_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy_4_title')}</h2>
            <p>{t('privacy_4_desc')}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">{t('privacy_5_title')}</h2>
            <p>{t('privacy_5_desc')}</p>
          </section>

          <div className="border-t border-white/10 pt-6 mt-8">
            <p className="text-sm">{t('privacy_contact')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;