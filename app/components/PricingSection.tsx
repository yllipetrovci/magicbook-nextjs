
'use client';
import React, { useEffect, useState } from 'react';
import { useStory } from '@/app/contexts/StoryContext';
import { PriceCard, PricePlan } from '@/app/(pages)/(public)/pricing/components/PriceCard';
import { useLanguage } from '../contexts/LanguageContext';
import { plans } from '@/lib/constants/plans';
import { usePaddlePrices } from '../hooks/usePaddle';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';

interface PricingSectionProps {
    onPlanSelected: (planId: string) => void;
    showFreePlan?: boolean;
    title?: string;
    subtitle?: string;
    className?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
    onPlanSelected,
    showFreePlan = true,
    title,
    subtitle,
    className = ''
}) => {
    const { t } = useLanguage();
    const { config } = useStory();
    const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
    const country = 'US';
    const { pricesData, loading } = usePaddlePrices(paddle, country);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
            initializePaddle({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
            }).then((paddle) => {
                console.log("Paddle initialized:", paddle);
                if (paddle) {
                    setPaddle(paddle);
                }
            });
        }
    }, []);

    // Filter out free plan if requested (e.g. inside dashboard)
    const displayPlans = showFreePlan ? plans : plans.filter(p => p.id !== 'free');


    console.log({ plans })

    return (
        <div className={`w-full max-w-6xl mx-auto px-4 ${className}`}>

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-serif drop-shadow-lg">
                    {title || "Simple Pricing"}
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    {subtitle || "Start for free, upgrade for more magic."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start relative z-10">
                {displayPlans.map((plan: any) => {
                    return (
                        <PriceCard
                            key={plan.id}
                            price={plan.id !== 'free' ? pricesData[plan.priceId]?.formattedTotals.total : plan.price}
                            credits={plan.id !== 'free' ? pricesData[plan.priceId]?.customData?.credits : plan.credits}
                            features={plan.features}
                            plan={plan}
                            onClick={() => onPlanSelected(plan.priceId || 'free')}
                        />
                    )
                })}
            </div>

        </div>
    );
};
