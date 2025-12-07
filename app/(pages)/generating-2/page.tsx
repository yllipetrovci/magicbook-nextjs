'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from '@/app/contexts/LanguageContext'




const Generating2: React.FC = () => {
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const { t } = useLanguage();
    const CRAFTING_STEPS = [
        { label: t("generatingPage2.gen2_step_1"), icon: "fa-hat-wizard", color: "text-purple-400" },
        { label: t("generatingPage2.gen2_step_2"), icon: "fa-pen-nib", color: "text-blue-400" },
        { label: t("generatingPage2.gen2_step_3"), icon: "fa-palette", color: "text-pink-400" },
        { label: t("generatingPage2.gen2_step_4"), icon: "fa-book-open", color: "text-orange-400" },
        //   { label: `${heroName} Completed Crafting!`, icon: "fa-check-circle", color: "text-green-400" }
    ];
    const currentStep = CRAFTING_STEPS[currentStepIndex];


    useEffect(() => {
        const totalTime = 5500; // Slightly longer for better effect
        const intervalTime = 50;
        const stepsCount = CRAFTING_STEPS.length;

        const timer = setInterval(() => {
            setProgress(old => {
                const newProg = old + (100 / (totalTime / intervalTime));

                if (newProg >= 100) {
                    clearInterval(timer);
                    // Small delay at 100% before redirect
                    setTimeout(() => router.push('/pricing'), 500);
                    return 100;
                }

                // Update step based on progress thresholds
                const stepIdx = Math.floor((newProg / 100) * stepsCount);
                setCurrentStepIndex(Math.min(stepIdx, stepsCount - 1));

                return newProg;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [CRAFTING_STEPS.length]);

    return (
        <div className="overflow-y-auto animate-fade-in">
            {/* Center Content Wrapper */}
            <div className="flex flex-col items-center justify-center min-h-full w-full p-4 md:p-8 relative">

                {/* Floating Particles Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 text-magic-purple opacity-20 animate-float text-4xl"><i className="fa-solid fa-star"></i></div>
                    <div className="absolute bottom-1/3 right-1/4 text-magic-orange opacity-20 animate-float-delayed text-2xl"><i className="fa-solid fa-sparkles"></i></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-magic-purple/20 blur-[100px] rounded-full"></div>
                </div>

                {/* Main Icon Circle */}
                <div className="relative mb-8 transform scale-90 md:scale-110">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 flex items-center justify-center bg-magic-card shadow-[0_0_50px_rgba(124,58,237,0.3)] relative z-10">
                        <i className={`fa-solid ${currentStep.icon} text-4xl md:text-5xl ${currentStep.color} animate-bounce-slow transition-all duration-300`}></i>
                    </div>
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-t-magic-purple border-r-transparent border-b-magic-orange border-l-transparent animate-spin w-24 h-24 md:w-32 md:h-32 -m-[2px]"></div>
                </div>

                <h2 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 text-center drop-shadow-lg transition-all duration-300">
                    {t("generatingPage2.gen2_title")}
                </h2>
                <p className="text-magic-orange text-lg md:text-2xl mb-6 md:mb-8 font-bold animate-pulse text-center min-h-[32px]">
                    {currentStep.label}
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-xs md:max-w-md h-3 md:h-4 bg-gray-800 rounded-full mb-8 overflow-hidden border border-white/10 relative shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-magic-purple via-magic-pink to-magic-orange transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                    {/* Shine effect on bar */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>

                {/* Steps Checklist */}
                <div className="flex flex-col gap-3 w-full max-w-xs md:max-w-sm">
                    {CRAFTING_STEPS.map((step, idx) => {
                        const isCompleted = idx < currentStepIndex;
                        const isActive = idx === currentStepIndex;

                        return (
                            <div
                                key={idx}
                                className={`flex items-center gap-4 p-2 md:p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/10 scale-105 border border-white/20 shadow-lg' : 'opacity-40'}`}
                            >
                                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs border flex-shrink-0 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : (isActive ? 'border-white text-white animate-spin' : 'border-gray-600 text-gray-600')}`}>
                                    {isCompleted ? <i className="fa-solid fa-check"></i> : (isActive ? <i className="fa-solid fa-circle-notch"></i> : <i className="fa-solid fa-circle"></i>)}
                                </div>
                                <span className={`font-bold text-xs md:text-sm ${isActive || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Generating2;