
import React, { useState } from 'react';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const InviteFriends: React.FC = () => {
    const { user } = useStory();
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();
    // Generate a mock code based on user name or fallback
    const referralCode = user?.name ? `${user.name.split(' ')[0].toUpperCase()}2024` : "MAGIC2024";
    const referralLink = `https://aimagicbook.com/join?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 animate-fade-in">

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

            {/* Copy Box */}
            <div className="w-full max-w-xl bg-magic-card/80 p-8 rounded-3xl border-2 border-magic-purple/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>

                <label className="block text-gray-400 font-bold mb-3 uppercase tracking-wider text-xs text-center">{t('inv_code_label')}</label>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between group cursor-pointer" onClick={handleCopy}>
                        <span className="text-white font-mono text-lg truncate">{referralLink}</span>
                        <i className="fa-regular fa-copy text-gray-500 group-hover:text-white transition-colors"></i>
                    </div>
                    <Button
                        onClick={handleCopy}
                        className={`min-w-[140px] shadow-lg ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-magic-purple hover:bg-purple-600'}`}
                    >
                        {copied ? (
                            <><i className="fa-solid fa-check mr-2"></i> {t('inv_copied')}</>
                        ) : (
                            <><i className="fa-solid fa-link mr-2"></i> {t('inv_btn_copy')}</>
                        )}
                    </Button>
                </div>

                {/* Social Shares */}
                <div className="flex justify-center gap-4 mt-8">
                    <button className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <i className="fa-brands fa-facebook-f"></i>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <i className="fa-brands fa-twitter"></i>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <i className="fa-brands fa-whatsapp"></i>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <i className="fa-brands fa-instagram"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
