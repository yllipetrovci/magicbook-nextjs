
'use client';
import React, { useEffect, useState } from 'react';
// useLocation
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PricingSection } from '@/app/components/PricingSection';
import { PATHS } from '@/app/constants/relativeRoutePaths';

export const Pricing: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { config, updateConfig } = useStory();
    const { t } = useLanguage();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [mounted, setMounted] = useState(false);

    const isDashboardFlow = pathname.includes("dashboard");

    useEffect(() => {
        setMounted(true);
    }, [])

    const handleEmailSubmit = () => {
        if (emailInput.includes('@')) {
            updateConfig('email', emailInput);
            updateConfig('planType', 'free');
            router.push(PATHS.SUCCESS);
        }
    };

    const handlePricePlan = (plan: string) => {
        updateConfig('planType', plan);
        if (plan === 'free') {
            router.push(PATHS.SUCCESS);
            return;
        }

        router.push(`${PATHS.CHECKOUT}?source=dashboard`);
    };

    const handleBack = () => {
        if (isDashboardFlow) {
            router.push(PATHS.DASHBOARD);
        } else {
            router.push(PATHS.PREVIEW);
        }
    };

    if (!mounted) return null;

    // const freePlan: PricePlan = {
    //    id: 'free',
    //    title: 'Free Magic',
    //    price: '$0',
    //    subtitle: 'Forever Free',
    //    features: [
    //       '3 Page Story',
    //       'Standard Illustrations',
    //       'Web View Only'
    //    ],
    //    buttonText: 'Choose Free',
    //    colorTheme: 'gray'
    // };

    // const creditPlan: PricePlan = {
    //    id: 'credits',
    //    title: '10 Credits',
    //    price: '$9.99',
    //    subtitle: '($0.99 / story)',
    //    features: [
    //       '10 Magical Stories',
    //       'Keep them forever',
    //       'Printable PDF',
    //       'No Expiration'
    //    ],
    //    buttonText: 'Get Credits',
    //    colorTheme: 'blue',
    //    badge: 'CREDIT PACK'
    // };

    // const unlimitedPlan: PricePlan = {
    //    id: 'unlimited',
    //    title: 'Unlimited Magic',
    //    price: '$14.99',
    //    billingText: 'billed monthly',
    //    features: [
    //       'Unlimited Stories',
    //       'Unlimited HD Illustrations',
    //       'Commercial Rights',
    //       'Access to New Themes'
    //    ],
    //    buttonText: t('price_best_value'),
    //    colorTheme: 'orange',
    //    isPopular: true
    // };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-transparent relative">

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
                    <div className="bg-magic-card w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                        <button onClick={() => setShowEmailModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><i className="fa-solid fa-times text-xl"></i></button>
                        <div className="w-16 h-16 bg-magic-green/20 rounded-full flex items-center justify-center text-3xl text-magic-green mx-auto mb-4">
                            <i className="fa-solid fa-envelope-open-text"></i>
                        </div>
                        <h3 className="text-2xl font-black text-white text-center mb-2">One Last Step!</h3>
                        <p className="text-gray-400 text-center mb-6">Enter your email to unlock your 3-page story for free.</p>
                        <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="parent@example.com"
                            className="w-full p-4 bg-black/50 rounded-xl border border-white/20 text-white mb-4 outline-none focus:border-magic-green"
                            autoFocus
                        />
                        <Button onClick={handleEmailSubmit} fullWidth className="bg-magic-green hover:bg-green-600 shadow-lg">
                            Unlock Free Story <i className="fa-solid fa-lock-open ml-2"></i>
                        </Button>
                    </div>
                </div>
            )}

            {/* --- NEBULA GLOW COUPON --- */}
            <div className="relative mb-16 transform hover:scale-105 transition-all duration-500 cursor-default group">
                {/* Moving Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-magic-purple to-pink-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-slow"></div>

                <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 px-8 py-3 rounded-full flex items-center gap-6 shadow-2xl overflow-hidden">
                    {/* Holographic sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg border border-white/20">
                            <i className="fa-solid fa-bolt text-white text-lg"></i>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em] leading-none mb-0.5">Voucher Verified</span>
                            <span className="text-xl font-black text-white font-display">MAGICFUN</span>
                        </div>
                    </div>

                    <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

                    <div className="hidden sm:flex items-center gap-2 bg-magic-purple/20 px-4 py-1.5 rounded-full border border-magic-purple/30">
                        <span className="text-xs font-black text-magic-purpleLight uppercase tracking-widest flex items-center gap-2">
                            <i className="fa-solid fa-sparkles animate-wiggle"></i> 3 Pages Unlocked
                        </span>
                    </div>
                </div>
            </div>

            <PricingSection
                onPlanSelected={handlePricePlan}
                showFreePlan={!isDashboardFlow}
                title={isDashboardFlow ? "Add Story Credits" : t('price_title')}
                subtitle={isDashboardFlow ? "Top up your account to create more magic." : undefined}
            />

            <div className="mt-12 text-gray-500 text-sm font-bold text-center max-w-md">
                <i className="fa-solid fa-shield-halved mr-2"></i>
                100% Satisfaction Guarantee. If the magic doesn't work for you, we'll fix it!
            </div>
        </div>
    );
};

export default Pricing;
