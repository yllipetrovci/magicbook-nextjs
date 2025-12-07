
import React from 'react';
import { useStory } from '@/app/contexts/StoryContext';
import { PriceCard, PricePlan } from '@/app/(pages)/pricing/components/PriceCard';
import { useLanguage } from '../contexts/LanguageContext';

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

    const plans: PricePlan[] = [
        {
            id: 'free',
            title: 'Starter',
            price: 'Free',
            subtitle: '3 Pages',
            features: [
                '3 Page Story',
                'Standard Illustrations',
                'Web View Only'
            ],
            buttonText: 'Start Creating',
            colorTheme: 'dark',
            badge: undefined
        },
        {
            id: 'unlimited',
            title: 'Family Pack',
            price: '$14.99',
            billingText: 'Unlimited',
            features: [
                'Unlimited Stories',
                'Unlimited HD Illustrations',
                'Commercial Rights',
                'Access to New Themes'
            ],
            buttonText: 'Start Creating',
            colorTheme: 'purple',
            isPopular: true,
            savingsText: 'SAVE 40% VS BUYING INDIVIDUALLY'
        },
        {
            id: 'credits',
            title: 'Creator',
            price: '$9.99',
            subtitle: '10 Credits',
            features: [
                '10 Magical Stories',
                'Keep them forever',
                'Printable PDF',
                'No Expiration'
            ],
            buttonText: 'Start Creating',
            colorTheme: 'dark',
            badge: undefined // Removed "CREDIT PACK" badge to match screenshot cleaner look, or we can keep it. Screenshot shows standard dark card.
        }
    ];

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
