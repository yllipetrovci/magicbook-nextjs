
import React from 'react';
import { useStory } from '@/app/contexts/StoryContext';
import { PriceCard, PricePlan } from '@/app/(pages)/pricing/components/PriceCard';
import { useLanguage } from '../contexts/LanguageContext';
import { plans } from '@/lib/constants/plans';

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

    console.log({ config });

    // Filter out free plan if requested (e.g. inside dashboard)
    const displayPlans = showFreePlan ? plans : plans.filter(p => p.id !== 'free');

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
                {displayPlans.map((plan) => (
                    <PriceCard
                        key={plan.id}
                        plan={plan}
                        onClick={() => onPlanSelected(plan.id)}
                    />
                ))}
            </div>

        </div>
    );
};
