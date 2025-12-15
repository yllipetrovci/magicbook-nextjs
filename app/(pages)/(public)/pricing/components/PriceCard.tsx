
// import React from 'react';
// import { Button } from '@/app/components/Button';

// export interface PricePlan {
//     id: string;
//     title: string;
//     price: string;
//     subtitle?: string; // e.g. "Forever Free" or "($0.99 / story)"
//     billingText?: string; // e.g. "billed monthly"
//     features: string[];
//     buttonText: string;
//     isPopular?: boolean;
//     colorTheme: 'gray' | 'blue' | 'orange';
//     badge?: string; // Top right badge like "CREDIT PACK"
//     savingsText?: string; // e.g. "Save 40%"
// }

// interface PriceCardProps {
//     plan: PricePlan;
//     onClick: () => void;
// }

// export const PriceCard: React.FC<PriceCardProps> = ({ plan, onClick }) => {
//     const {
//         title,
//         price,
//         subtitle,
//         billingText,
//         features,
//         buttonText,
//         isPopular,
//         colorTheme,
//         badge,
//         savingsText
//     } = plan;

//     // Theme Configuration based on colorTheme prop
//     const themeStyles = {
//         gray: {
//             border: 'border-white/5 hover:border-white/20',
//             titleColor: 'text-gray-400',
//             priceColor: 'text-white',
//             iconColor: 'text-green-500', // Checkmarks
//             iconBg: '',
//             buttonVariant: 'outline' as const,
//             buttonClass: 'rounded-2xl py-3 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500',
//             shadow: ''
//         },
//         blue: {
//             border: 'border-magic-blue/30 hover:border-magic-blue',
//             titleColor: 'text-magic-blue',
//             priceColor: 'text-white',
//             iconColor: 'text-green-500',
//             iconBg: 'bg-green-500/20',
//             buttonVariant: 'transparent' as const,
//             buttonClass: 'rounded-2xl py-4 text-xl bg-magic-blue hover:bg-blue-400 border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 shadow-lg shadow-blue-500/20',
//             shadow: 'shadow-xl'
//         },
//         orange: {
//             border: 'border-magic-orange',
//             titleColor: 'text-magic-orange',
//             priceColor: 'text-white',
//             iconColor: 'text-white',
//             iconBg: 'bg-magic-orange',
//             buttonVariant: 'transparent' as const,
//             buttonClass: 'rounded-2xl py-5 text-xl shadow-xl shadow-orange-500/30 bg-magic-orange hover:bg-orange-400 border-b-4 border-orange-600 active:border-b-0 active:translate-y-1',
//             shadow: 'shadow-2xl shadow-orange-500/10'
//         }
//     };

//     const currentTheme = themeStyles[colorTheme];

//     return (
//         <div
//             className={`
//         bg-magic-card rounded-[2rem] p-8 border-2 transition-all flex flex-col relative group overflow-visible
//         ${currentTheme.border} ${currentTheme.shadow}
//         ${isPopular ? 'transform md:-translate-y-4 z-10' : ''}
//       `}
//         >
//             {/* Top Right Badge (e.g., Credit Pack) */}
//             {badge && (
//                 <div className={`absolute top-[-2px] right-[-2px] ${colorTheme === 'blue' ? 'bg-magic-blue' : 'bg-gray-600'} text-white px-5 py-1.5 rounded-bl-2xl rounded-tr-[1.8rem] font-bold text-sm shadow-lg`}>
//                     {badge}
//                 </div>
//             )}

//             {/* Most Popular Ribbon */}
//             {isPopular && (
//                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-magic-orange text-white px-8 py-2 rounded-full font-black border-4 border-magic-card shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
//                     <i className="fa-solid fa-crown text-yellow-300"></i> MOST POPULAR
//                 </div>
//             )}

//             <div className={`text-center mb-6 ${isPopular ? 'mt-4' : ''}`}>
//                 <div className={`${currentTheme.titleColor} font-bold text-xl`}>{title}</div>
//                 <div className={`text-4xl md:text-5xl font-black ${currentTheme.priceColor} mt-2`}>{price}</div>

//                 {billingText && (
//                     <div className="text-xs text-gray-500 mt-2 bg-white/5 inline-block px-2 py-1 rounded">
//                         {billingText}
//                     </div>
//                 )}

//                 {subtitle && !billingText && (
//                     <div className={`text-sm font-bold mt-2 ${colorTheme === 'gray' ? 'text-gray-500' : 'text-green-400'}`}>
//                         {subtitle}
//                     </div>
//                 )}
//             </div>

//             <ul className="space-y-4 mb-8 flex-1">
//                 {features.map((feature, i) => (
//                     <li key={i} className={`flex items-center gap-3 font-bold ${colorTheme === 'orange' ? 'text-gray-200 text-lg' : 'text-gray-300 text-sm'}`}>
//                         {currentTheme.iconBg ? (
//                             <div className={`w-6 h-6 md:w-8 md:h-8 ${currentTheme.iconBg} rounded-full flex items-center justify-center ${currentTheme.iconColor} text-xs md:text-sm shadow`}>
//                                 <i className="fa-solid fa-check"></i>
//                             </div>
//                         ) : (
//                             <i className={`fa-solid fa-check ${currentTheme.iconColor}`}></i>
//                         )}
//                         {feature}
//                     </li>
//                 ))}
//             </ul>

//             {/* Savings Text for Popular Plan */}
//             {savingsText && (
//                 <div className="text-center mb-4">
//                     <p className="text-xs text-yellow-300 font-bold uppercase tracking-wide bg-white/10 py-1.5 px-3 rounded-lg inline-block shadow-sm">
//                         💰 {savingsText}
//                     </p>
//                 </div>
//             )}

//             <Button
//                 onClick={onClick}
//                 fullWidth
//                 variant={currentTheme.buttonVariant}
//                 className={currentTheme.buttonClass}
//             >
//                 {buttonText}
//             </Button>
//         </div>
//     );
// };





import React from 'react';
import { Button } from '@/app/components/Button';

export interface PricePlan {
    id: string;
    title: string;
    price: string;
    subtitle?: string; // e.g. "Forever Free" or "($0.99 / story)"
    billingText?: string; // e.g. "billed monthly"
    features: string[];
    buttonText: string;
    isPopular?: boolean;
    colorTheme: 'dark' | 'purple'; // Refactored themes
    badge?: string; // Top right badge like "CREDIT PACK"
    savingsText?: string; // e.g. "Save 40%"
}

interface PriceCardProps {
    plan: PricePlan;
    onClick: () => void;
}

export const PriceCard: React.FC<PriceCardProps> = ({ plan, onClick }) => {
    const {
        title,
        price,
        subtitle,
        billingText,
        features,
        buttonText,
        isPopular,
        colorTheme,
        badge,
        savingsText
    } = plan;

    // Theme Configuration
    const themeStyles = {
        dark: {
            container: 'bg-magic-card border-white/10 hover:border-magic-purple/50',
            titleColor: 'text-gray-200',
            priceColor: 'text-magic-purple',
            subtitleColor: 'text-magic-purple',
            featureColor: 'text-gray-400',
            iconColor: 'text-magic-green',
            iconBg: '',
            buttonVariant: 'outline' as const,
            buttonClass: 'rounded-2xl py-3 border-white/20 text-white hover:bg-white/10',
            shadow: 'shadow-xl'
        },
        purple: {
            container: 'bg-gradient-to-br from-magic-purple to-indigo-800 border-white/20 transform md:-translate-y-4 z-10',
            titleColor: 'text-white',
            priceColor: 'text-white',
            subtitleColor: 'text-white/80',
            featureColor: 'text-gray-200',
            iconColor: 'text-white',
            iconBg: 'bg-white/20',
            buttonVariant: 'primary' as const,
            buttonClass: 'rounded-2xl py-5 text-xl bg-magic-orange hover:bg-orange-500 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 shadow-xl shadow-orange-500/30',
            shadow: 'shadow-2xl shadow-purple-500/30'
        }
    };

    const currentTheme = themeStyles[colorTheme];

    return (
        <div
            className={`
        rounded-[2rem] p-8 border-2 transition-all flex flex-col relative group overflow-visible
        ${currentTheme.container} ${currentTheme.shadow}
      `}
        >
            {/* Top Right Badge */}
            {badge && (
                <div className={`absolute top-[-2px] right-[-2px] bg-gray-700 text-white px-5 py-1.5 rounded-bl-2xl rounded-tr-[1.8rem] font-bold text-sm shadow-lg border-b border-l border-white/10`}>
                    {badge}
                </div>
            )}

            {/* Most Popular Ribbon - Styled as a badge on top */}
            {isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-purple-900 px-6 py-1.5 rounded-full font-black border-4 border-magic-bg shadow-lg flex items-center gap-2 whitespace-nowrap z-20 text-sm tracking-wide">
                    <i className="fa-solid fa-crown"></i> MOST POPULAR
                </div>
            )}

            <div className={`text-center mb-8 ${isPopular ? 'mt-4' : ''}`}>
                <div className={`${currentTheme.titleColor} font-bold text-xl`}>{title}</div>
                <div className={`text-5xl font-black ${currentTheme.priceColor} mt-3 mb-2 tracking-tight`}>{price}</div>

                {billingText && (
                    <div className="text-xs text-white/70 mt-1 bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                        {billingText}
                    </div>
                )}

                {subtitle && !billingText && (
                    <div className={`text-sm font-bold mt-2 bg-white/10 inline-block px-3 py-1 rounded-full ${currentTheme.subtitleColor}`}>
                        {subtitle}
                    </div>
                )}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 font-bold ${colorTheme === 'purple' ? 'text-lg' : 'text-sm'} ${currentTheme.featureColor}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${currentTheme.iconBg}`}>
                            <i className={`fa-solid fa-check ${currentTheme.iconColor} ${colorTheme === 'purple' ? 'text-xs' : ''}`}></i>
                        </div>
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Savings Text for Popular Plan */}
            {savingsText && (
                <div className="text-center mb-6">
                    <p className="text-xs text-yellow-300 font-bold uppercase tracking-wide bg-white/10 py-1.5 px-3 rounded-lg inline-block shadow-sm">
                        💰 {savingsText}
                    </p>
                </div>
            )}

            <Button
                onClick={onClick}
                fullWidth
                variant={currentTheme.buttonVariant}
                className={currentTheme.buttonClass}
            >
                {buttonText} {isPopular && <i className="fa-solid fa-wand-magic-sparkles ml-2 text-yellow-200"></i>}
            </Button>

            <p className={`text-[10px] text-center mt-3 ${colorTheme === 'purple' ? 'text-white/60' : 'text-gray-500 group-hover:text-magic-purple transition-colors'}`}>
                Try the first page preview for free
            </p>
        </div>
    );
};
