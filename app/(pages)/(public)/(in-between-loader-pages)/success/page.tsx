
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { PATHS } from '@/app/constants/relativeRoutePaths';
import { useLanguage } from '@/app/contexts/LanguageContext';

const Confetti = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                        top: '-10%',
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 12 + 6}px`,
                        height: `${Math.random() * 12 + 6}px`,
                        backgroundColor: ['#FCD34D', '#F87171', '#60A5FA', '#34D399', '#A78BFA'][Math.floor(Math.random() * 5)],
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animationDuration: `${Math.random() * 4 + 3}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: 0.7
                    }}
                />
            ))}
        </div>
    );
};

export const Success: React.FC = () => {
    const router = useRouter();
    const { resetStory, config } = useStory();
    const { t } = useLanguage();
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Step animation sequence
        const t1 = setTimeout(() => setStep(2), 2000);
        const t2 = setTimeout(() => setStep(3), 3000);

        // Optional: Auto redirect after a long while if no interaction
        const t3 = setTimeout(() => {
            // resetStory();
            router.push(PATHS.UPSELL_BOOK);
        }, 5000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [router, resetStory]);

    // const handleDashboard = () => {
    //     resetStory();
    //     router.push('/dashboard');
    // };

    //   const handleCreateNew = () => {
    //       resetStory();
    //       router.push('/hero');
    //   };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 relative overflow-hidden bg-[#0B0C15]">
            <Confetti />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-magic-purple/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl w-full bg-magic-card/60 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl animate-slide-up-fade">

                {/* Success Icon */}
                <div className="relative mb-8 inline-block transform scale-110">
                    <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(52,211,153,0.6)] animate-bounce-slow border-4 border-white/10">
                        <i className="fa-solid fa-check text-5xl text-white"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin-slow border-2 border-white/20 shadow-lg">
                        <i className="fa-solid fa-star text-white text-lg"></i>
                    </div>
                    <div className="absolute bottom-0 -left-2 w-10 h-10 bg-magic-purple rounded-full flex items-center justify-center animate-pulse border-2 border-white/20 shadow-lg">
                        <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg font-serif">
                    {t('succ_title')}
                </h1>
                <p className="text-xl text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed font-medium">
                    Your magical journey has been secured. Get ready for an adventure of a lifetime!
                </p>

                {/* Progress Steps */}
                <div className="flex flex-col gap-4 max-w-sm mx-auto mb-10">
                    {/* Step 1 */}
                    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-700 border ${step >= 1 ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-white/5 border-transparent opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= 1 ? 'bg-green-500 text-white scale-110' : 'bg-white/10 text-gray-500'}`}>
                            {step > 1 ? <i className="fa-solid fa-check"></i> : 1}
                        </div>
                        <div className="text-left">
                            <p className={`font-bold transition-colors ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Payment Confirmed</p>
                            <p className="text-xs text-gray-400">Secure transaction complete</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-700 border ${step >= 2 ? 'bg-magic-purple/10 border-magic-purple/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-white/5 border-transparent opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= 2 ? 'bg-magic-purple text-white scale-110' : 'bg-white/10 text-gray-500'}`}>
                            {step > 2 ? <i className="fa-solid fa-check"></i> : (step === 2 ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 2)}
                        </div>
                        <div className="text-left">
                            <p className={`font-bold transition-colors ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Generating Magic</p>
                            <p className="text-xs text-gray-400">Crafting story for {config.heroName || 'Hero'}</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-700 border ${step >= 3 ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-transparent opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= 3 ? 'bg-blue-500 text-white scale-110' : 'bg-white/10 text-gray-500'}`}>
                            {step >= 3 ? <i className="fa-solid fa-envelope"></i> : 3}
                        </div>
                        <div className="text-left">
                            <p className={`font-bold transition-colors ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Delivery</p>
                            <p className="text-xs text-gray-400">{step >= 3 ? `Sent to ${config?.email || config.email || 'email'}` : 'Sending shortly...'}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 transform ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                    {/* <Button onClick={handleDashboard} size="lg" className="bg-white text-magic-bg hover:bg-gray-200 shadow-xl font-bold py-4 text-lg">
                        Go to Dashboard
                    </Button> */}
                    {/* <Button onClick={handleCreateNew} size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 py-4 text-lg">
                   Create Another
               </Button> */}
                </div>

            </div>
        </div>
    );
};

export default Success;
