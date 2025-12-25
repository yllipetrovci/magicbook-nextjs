
'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const InviteFriends: React.FC = () => {
    const { user }:any = useAuth()
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    // Generate a mock code based on user name or fallback
    const referralCode = user ? user.uid : '';
    const referralLink = `https://aimagicbook.com/join?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    console.log({user})

    return (
        <div className="flex flex-col items-center p-4 animate-fade-in">

            <div className="text-center mb-10 max-w-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(251,191,36,0.4)] animate-float">
                    <i className="fa-solid fa-gift text-5xl text-white"></i>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">{t('inv_title')}</h2>
                <p className="text-xl text-gray-300 font-medium">
                    {t('inv_subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
                {[
                    { icon: 'fa-share-nodes', title: t('inv_step_1'), color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { icon: 'fa-user-plus', title: t('inv_step_2'), color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { icon: 'fa-coins', title: t('inv_step_3'), color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
                ].map((step, idx) => (
                    <div key={idx} className="bg-magic-card p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden group">
                        {idx < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 rotate-45 border-t border-r border-white/20 z-10 bg-magic-bg"></div>
                        )}
                        <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center text-2xl ${step.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <i className={`fa-solid ${step.icon}`}></i>
                        </div>
                        <p className="font-bold text-white text-lg">{step.title}</p>
                    </div>
                ))}
            </div>

            {/* Copy Box - Redesigned to show full link and prevent cropping */}
            <div className="w-full max-w-2xl bg-magic-card/80 p-6 md:p-8 rounded-[2rem] border-2 border-magic-purple/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>

                <label className="block text-gray-400 font-bold mb-4 uppercase tracking-wider text-xs text-center">{t('inv_code_label')}</label>

                <div className="flex flex-col gap-4">
                    {/* Link Area - No truncation, break-all for long URLs */}
                    <div
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-magic-purple/40 transition-all cursor-pointer"
                        onClick={handleCopy}
                    >
                        <span className="text-white font-mono text-sm md:text-base break-all text-center md:text-left flex-1 selection:bg-magic-purple selection:text-white">
                            {referralLink}
                        </span>
                        <div className="flex-shrink-0 flex items-center gap-2 text-magic-purple font-bold text-xs uppercase tracking-widest bg-magic-purple/10 px-3 py-1.5 rounded-full border border-magic-purple/20">
                            <i className="fa-regular fa-copy"></i>
                            <span>{copied ? 'Copied' : 'Click to Copy'}</span>
                        </div>
                    </div>

                    {/* Easy Copy Button - Large and prominent */}
                    <Button
                        onClick={handleCopy}
                        fullWidth
                        size="lg"
                        variant='transparent'
                        className={`h-16 text-lg md:text-xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all transform active:scale-95 ${copied ? 'bg-green-500 hover:bg-green-600 border-green-700' : 'bg-magic-purple hover:bg-purple-600 border-purple-800'} border-b-4`}
                    >
                        {copied ? (
                            <><i className="fa-solid fa-check-circle mr-3 text-2xl"></i> {t('inv_copied')}</>
                        ) : (
                            <><i className="fa-solid fa-copy mr-3 text-2xl"></i> Copy Magic Link</>
                        )}
                    </Button>
                </div>

                {/* Social Shares */}
                <div className="flex justify-center gap-5 mt-10">
                    {[
                        { icon: 'fa-facebook-f', color: 'bg-[#1877F2]', shadow: 'shadow-[#1877F2]/20' },
                        { icon: 'fa-twitter', color: 'bg-[#1DA1F2]', shadow: 'shadow-[#1DA1F2]/20' },
                        { icon: 'fa-whatsapp', color: 'bg-[#25D366]', shadow: 'shadow-[#25D366]/20' },
                        { icon: 'fa-instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', shadow: 'shadow-pink-500/20' }
                    ].map((social, i) => (
                        <button
                            key={i}
                            className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all shadow-lg ${social.shadow}`}
                        >
                            <i className={`fa-brands ${social.icon} text-lg`}></i>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
