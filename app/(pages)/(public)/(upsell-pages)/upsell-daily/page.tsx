
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { PATHS } from '@/app/constants/relativeRoutePaths';

const FloatingSparkles = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[20%] left-[20%] text-blue-300/20 text-4xl animate-pulse-slow"><i className="fa-solid fa-moon"></i></div>
            <div className="absolute bottom-[20%] right-[10%] text-yellow-200/20 text-3xl animate-float"><i className="fa-solid fa-book-open"></i></div>
            <div className="absolute top-[50%] left-[50%] text-magic-purple/10 text-9xl animate-spin-slow"><i className="fa-solid fa-clock"></i></div>
        </div>
    );
};

export const UpsellDaily: React.FC = () => {
    const router = useRouter();
    const { config } = useStory();

    const handleFinish = () => {
        router.push(PATHS.SUCCESS);
    };

    return (
        <div className=" z-[100] overflow-y-auto bg-[#0B0C15] animate-fade-in font-sans text-white bg-[radial-gradient(circle_at_center,_#1a1c2e_0%,_#0B0C15_100%)]">
            <FloatingSparkles />

            <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto relative z-10">

                {/* Close Button */}
                <button
                    onClick={handleFinish}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all z-50"
                >
                    <i className="fa-solid fa-times text-xl"></i>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                    {/* LEFT: CALENDAR VISUAL */}
                    <div className="relative order-2 lg:order-1 flex justify-center">
                        <div className="relative w-full max-w-md aspect-[4/5] bg-magic-card rounded-t-full rounded-b-[3rem] border-[12px] border-[#1e293b] shadow-2xl overflow-hidden flex flex-col items-center pt-16 pb-8 px-8">

                            {/* Window Shine */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

                            <h3 className="text-magic-orange font-black text-xl tracking-widest uppercase mb-2">Daily Magic</h3>
                            <div className="text-7xl mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-float">
                                <i className="fa-solid fa-calendar-days"></i>
                            </div>

                            <div className="bg-white/5 w-full rounded-2xl p-4 border border-white/10 space-y-3">
                                {[1, 2, 3].map(day => (
                                    <div key={day} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/30">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div>
                                            <div className="h-2 w-24 bg-white/20 rounded-full mb-1.5"></div>
                                            <div className="h-1.5 w-16 bg-white/10 rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center gap-3 p-3 bg-magic-purple/20 rounded-xl border border-magic-purple/50 animate-pulse">
                                    <div className="w-8 h-8 rounded-full bg-magic-purple text-white flex items-center justify-center text-xs font-bold shadow-lg">
                                        <i className="fa-solid fa-lock-open"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">Tomorrow's Story</p>
                                        <p className="text-[10px] text-purple-300">Ready to unlock...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: OFFER CONTENT */}
                    <div className="order-1 lg:order-2 text-left space-y-8">

                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                                <i className="fa-solid fa-infinity"></i> Never Run Out
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white font-serif leading-tight mb-4 drop-shadow-lg">
                                A New Adventure <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Every Single Day</span>
                            </h1>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Imagine {config.heroName} waking up to a brand new personalized story every morning. Build a reading habit that lasts a lifetime.
                            </p>
                        </div>

                        {/* Price & CTA */}
                        <div className="bg-magic-card/30 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-white font-serif">$0.99</span>
                                <span className="text-xl text-gray-400 font-medium">/ day</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-8 font-medium">Billed monthly. Cancel anytime.</p>

                            <Button
                                onClick={handleFinish}
                                fullWidth
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-xl py-5 border-t border-white/20 font-serif mb-4"
                            >
                                Join the Daily Magic Club <i className="fa-solid fa-star ml-2 text-yellow-200"></i>
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <i className="fa-solid fa-shield-halved"></i> 30-Day Happiness Guarantee
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleFinish}
                                className="text-sm text-gray-500 font-medium hover:text-white transition-colors underline decoration-gray-700 underline-offset-4"
                            >
                                No thanks, I'll stick to one story for now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpsellDaily;
