
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Button } from '@/app/components/Button';

export const FAQ: React.FC = () => {
    const { t } = useLanguage();
    const router = useRouter();

    const faqs = [
        { q: t('landing_faq_1_q'), a: t('landing_faq_1_a') },
        { q: t('landing_faq_2_q'), a: t('landing_faq_2_a') },
        { q: t('landing_faq_3_q'), a: t('landing_faq_3_a') },
        { q: t('landing_faq_4_q'), a: t('landing_faq_4_a') },
        { q: t('landing_faq_5_q'), a: t('landing_faq_5_a') },
        { q: t('landing_faq_6_q'), a: t('landing_faq_6_a') },
    ];

    return (
        <div className="min-h-screen py-12 px-4 flex justify-center">
            <div className="max-w-4xl w-full animate-fade-in">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-magic-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-magic-blue/30">
                        <i className="fa-solid fa-circle-question text-4xl text-magic-blue"></i>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-4">{t('landing_faq_title')}</h1>
                    <p className="text-xl text-gray-400">Common questions about magic, delivery, and safety.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-magic-card rounded-2xl border border-white/10 overflow-hidden hover:border-magic-purple/50 transition-colors">
                            <details className="group">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <h3 className="text-lg font-bold text-white group-hover:text-magic-blue transition-colors pr-4">
                                        {faq.q}
                                    </h3>
                                    <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0">
                                        <i className="fa-solid fa-chevron-down text-gray-400"></i>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4 animate-slide-up-fade">
                                    {faq.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center bg-white/5 p-8 rounded-3xl border border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
                    <p className="text-gray-400 mb-6">Our support wizards are ready to help you.</p>
                    <Button onClick={() => router.push('/contact')} variant="primary" size="lg" className="shadow-lg shadow-blue-500/20">
                        Contact Support <i className="fa-solid fa-headset ml-2"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
